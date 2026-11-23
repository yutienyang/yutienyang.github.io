// Versioned, authenticated vault format. No key or plaintext is persisted.
const ITERATIONS = 600000;
const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });
export const MAX_VAULT_BYTES = 700000;

export function toBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(binary);
}

export function fromBase64(value) {
  if (typeof value !== 'string') throw new Error('无效的加密文件。');
  return Uint8Array.from(atob(value.replace(/\s/g, '')), c => c.charCodeAt(0));
}

export function validateEntries(entries) {
  if (!Array.isArray(entries) || entries.length > 10000) throw new Error('日记格式不正确。');
  const ids = new Set();
  for (const entry of entries) {
    if (!entry || typeof entry.id !== 'string' || ids.has(entry.id) ||
        typeof entry.title !== 'string' || typeof entry.body !== 'string' ||
        typeof entry.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
      throw new Error('日记格式不正确。');
    }
    ids.add(entry.id);
  }
  return entries;
}

export async function deriveKey(password, salt) {
  const material = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
  );
}

export async function encryptVault(entries, key, salt) {
  validateEntries(entries);
  const plaintext = encoder.encode(JSON.stringify({ entries }));
  if (plaintext.length > MAX_VAULT_BYTES) throw new Error('日记超过容量上限（约 700 KB），请先导出备份。');
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  return { version: 1, kdf: 'PBKDF2-SHA256', iterations: ITERATIONS, cipher: 'AES-256-GCM',
    salt: toBase64(salt), iv: toBase64(iv), ciphertext: toBase64(new Uint8Array(ciphertext)) };
}

export async function createVault(password) {
  if (password.length < 16) throw new Error('请使用至少 16 个字符的 key，建议用密码管理器生成。');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return { key: await deriveKey(password, salt), salt, entries: [] };
}

export async function decryptVault(envelope, password) {
  if (!envelope || envelope.version !== 1 || envelope.kdf !== 'PBKDF2-SHA256' ||
      envelope.iterations !== ITERATIONS || envelope.cipher !== 'AES-256-GCM') {
    throw new Error('不支持的加密文件格式。');
  }
  const salt = fromBase64(envelope.salt);
  const iv = fromBase64(envelope.iv);
  const ciphertext = fromBase64(envelope.ciphertext);
  if (salt.length !== 16 || iv.length !== 12 || ciphertext.length < 16 || ciphertext.length > MAX_VAULT_BYTES + 16) {
    throw new Error('加密文件损坏或过大。');
  }
  const key = await deriveKey(password, salt);
  try {
    const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
    const { entries } = JSON.parse(decoder.decode(plaintext));
    return { key, salt, entries: validateEntries(entries) };
  } catch {
    throw new Error('无法解锁：key 不正确，或加密文件已损坏。');
  }
}

export async function decryptWithKey(envelope, key) {
  try {
    const iv = fromBase64(envelope.iv);
    const data = fromBase64(envelope.ciphertext);
    if (iv.length !== 12 || data.length > MAX_VAULT_BYTES + 16) throw new Error();
    const bytes = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return validateEntries(JSON.parse(decoder.decode(bytes)).entries);
  } catch {
    throw new Error('无法导入：备份损坏或不是当前日记的备份。');
  }
}
