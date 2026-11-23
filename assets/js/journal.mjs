import { createVault, decryptVault, encryptVault, decryptWithKey, toBase64 } from './journal-crypto.mjs';
import { GitHubVault } from './journal-github.mjs';

const $ = id => document.getElementById(id);
let session = null;
let selected = null;
let dirty = false;
let busy = false;
let suspended = null; // Encrypted unsaved draft, memory only, with its original remote SHA.
let lastActivity = Date.now();

function status(message, error = false) {
  $('status').textContent = message;
  $('status').classList.toggle('error', error);
}

function updateControls() {
  $('gate-fields').disabled = busy;
  $('editor-fields').disabled = busy || !session?.client.token;
  for (const id of ['save', 'new-entry', 'delete', 'restore']) {
    $(id).disabled = busy || !session?.client.token;
  }
  for (const id of ['backup', 'lock']) $(id).disabled = busy;
  for (const button of $('entry-list').querySelectorAll('button')) button.disabled = busy;
}

async function run(action) {
  if (busy) return;
  busy = true;
  updateControls();
  try { await action(); }
  catch (error) { status(error.message || '操作未完成，请保留当前页面并重试。', true); }
  finally { busy = false; updateControls(); lastActivity = Date.now(); }
}

function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function renderList() {
  $('entry-list').replaceChildren();
  $('empty').hidden = session.entries.length > 0;
  const entries = [...session.entries].sort((a, b) => b.date.localeCompare(a.date));
  for (const entry of entries) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-current', String(selected === entry.id));
    const title = document.createElement('span');
    title.textContent = entry.title || '无题';
    const date = document.createElement('small');
    date.textContent = entry.date;
    button.append(title, date);
    button.addEventListener('click', () => { if (!busy) select(entry.id); });
    li.append(button);
    $('entry-list').append(li);
  }
}

function select(id) {
  selected = id;
  const entry = session.entries.find(item => item.id === id);
  $('editor').hidden = !entry;
  $('choose').hidden = !!entry;
  $('entry-date').value = entry?.date || '';
  $('entry-title').value = entry?.title || '';
  $('entry-body').value = entry?.body || '';
  renderList();
  updateControls();
}

function enter(vault, client, repository, hasDraft = false) {
  session = { ...vault, client, repository };
  dirty = hasDraft;
  $('key').value = '';
  $('confirm-key').value = '';
  $('token').value = '';
  $('gate').hidden = true;
  $('workspace').hidden = false;
  $('create-panel').hidden = true;
  $('connection').textContent = `${repository} · ${client.token ? '可编辑' : '只读'}`;
  select(session.entries[0]?.id || null);
  status(hasDraft ? '已恢复本页中未保存的草稿。请保存到 GitHub；若其他设备已更新，请先导出备份。' : '已解锁。内容仅在本次页面中解密。');
}

async function openJournal(create = false) {
  const repository = $('repository').value.trim();
  const client = new GitHubVault(repository, $('token').value.trim());
  const password = $('key').value;
  if (!password) throw new Error('请输入你的 key。');
  status('正在读取 GitHub 上的加密日记…');
  const envelope = await client.read();
  if (suspended && suspended.repository === repository) {
    const vault = await decryptVault(suspended.envelope, password);
    client.sha = suspended.sha;
    enter(vault, client, repository, true);
    suspended = null;
  } else if (envelope) {
    const vault = await decryptVault(envelope, password);
    if (suspended) throw new Error('本页还有另一个仓库的未保存草稿，请先打开原仓库并保存或导出备份。');
    enter(vault, client, repository);
  } else if (create) {
    if (suspended) throw new Error('请先打开原仓库，保存本页保留的草稿。');
    if (!client.token) throw new Error('创建日记需要有 Contents 读写权限的 GitHub Token。');
    if (password !== $('confirm-key').value) throw new Error('两次输入的 key 不一致。');
    const vault = await createVault(password);
    await client.write(await encryptVault(vault.entries, vault.key, vault.salt));
    enter(vault, client, repository);
    status('加密日记已创建在 GitHub。可以开始写了。');
  } else {
    $('create-panel').hidden = false;
    status('这个仓库还没有日记，请确认 key 后创建。');
  }
}

async function save() {
  if (!session) return;
  if (!$('editor').hidden && !$('editor').reportValidity()) return;
  status('正在加密并保存到 GitHub…');
  const envelope = await encryptVault(session.entries, session.key, session.salt);
  await session.client.write(envelope);
  dirty = false;
  status(`已保存到 GitHub · ${new Date().toLocaleTimeString('zh-CN')}`);
}

async function lock() {
  if (!session) return;
  if (dirty) {
    // Never keep decrypted drafts or credentials while locked.
    const envelope = await encryptVault(session.entries, session.key, session.salt);
    suspended = { envelope, repository: session.repository, sha: session.client.sha };
  }
  session.client.token = '';
  session = null;
  selected = null;
  dirty = false;
  $('editor').reset();
  $('entry-list').replaceChildren();
  $('connection').textContent = '';
  $('workspace').hidden = true;
  $('gate').hidden = false;
  status(suspended ? '已锁定。未保存草稿已加密，暂存在本页内存中；请重新解锁并保存，刷新或关闭会丢失草稿。' : '已锁定。再次输入 key 即可打开。');
  $('key').focus();
}

function download(envelope) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(envelope, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `journal-encrypted-${today()}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

$('unlock-form').addEventListener('submit', event => { event.preventDefault(); run(() => openJournal()); });
$('create').addEventListener('click', () => run(() => openJournal(true)));
$('lock').addEventListener('click', () => run(lock));
$('save').addEventListener('click', () => run(save));
$('editor').addEventListener('submit', event => { event.preventDefault(); run(save); });
$('new-entry').addEventListener('click', () => {
  if (busy || !session?.client.token) return;
  const entry = { id: crypto.randomUUID(), date: today(), title: '', body: '' };
  session.entries.unshift(entry);
  dirty = true;
  select(entry.id);
  $('entry-title').focus();
  status('新记录尚未保存。写完后点击“加密并保存到 GitHub”。');
});
$('editor').addEventListener('input', () => {
  if (busy || !session?.client.token) return;
  const entry = session.entries.find(item => item.id === selected);
  if (!entry) return;
  entry.title = $('entry-title').value;
  entry.body = $('entry-body').value;
  if ($('entry-date').value) entry.date = $('entry-date').value;
  dirty = true;
  renderList();
  status('有未保存的修改。');
});
$('delete').addEventListener('click', () => {
  if (busy || !session?.client.token || !confirm('删除这篇记录？点击保存后会同步到 GitHub，历史提交仍保留密文。')) return;
  session.entries = session.entries.filter(item => item.id !== selected);
  dirty = true;
  select(session.entries[0]?.id || null);
  status('已从当前草稿移除。点击保存后同步到 GitHub。');
});
$('backup').addEventListener('click', () => run(async () => {
  download(await encryptVault(session.entries, session.key, session.salt));
  status('已导出加密备份（含未保存的修改）。请与 key 分开保管。');
}));
$('restore').addEventListener('click', () => { if (!busy) $('backup-file').click(); });
$('backup-file').addEventListener('change', () => {
  const file = $('backup-file').files[0];
  $('backup-file').value = '';
  if (!file) return;
  run(async () => {
    if (!session?.client.token) throw new Error('导入需要以可编辑模式打开日记。');
    if (file.size > 1000000) throw new Error('备份文件过大。');
    // Imported backups use the current vault's salt and key; no second password prompt.
    const envelope = JSON.parse(await file.text());
    if (envelope.salt !== toBase64(session.salt) || envelope.version !== 1 ||
        envelope.cipher !== 'AES-256-GCM' || envelope.kdf !== 'PBKDF2-SHA256' || envelope.iterations !== 600000) {
      throw new Error('这不是当前日记的备份。请先打开创建该备份的日记。');
    }
    const entries = await decryptWithKey(envelope, session.key);
    if (!confirm('用备份替换当前全部记录？建议先导出当前备份。导入后需点击保存才会更新 GitHub。')) return;
    session.entries = entries;
    dirty = true;
    select(entries[0]?.id || null);
    status('备份已导入到当前草稿，请检查后保存到 GitHub。');
  });
});

for (const event of ['pointerdown', 'keydown', 'input']) {
  document.addEventListener(event, () => { lastActivity = Date.now(); }, { passive: true });
}
function checkIdle() {
  if (session && !busy && Date.now() - lastActivity >= 10 * 60 * 1000) run(lock);
}
setInterval(checkIdle, 10000);
document.addEventListener('visibilitychange', checkIdle);
window.addEventListener('beforeunload', event => {
  if (dirty || suspended || busy) { event.preventDefault(); event.returnValue = ''; }
});
// BFCache must not restore a screen full of decrypted notes.
window.addEventListener('pagehide', () => { document.body.hidden = true; });
window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });

if (!globalThis.crypto?.subtle) {
  status('当前环境不支持安全加密。请通过 HTTPS 或 localhost 打开，并使用现代浏览器。', true);
} else {
  updateControls();
  status('日记已锁定。');
}
