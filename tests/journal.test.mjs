import test from 'node:test';
import assert from 'node:assert/strict';
import { createVault, encryptVault, decryptVault, decryptWithKey, toBase64, fromBase64 } from '../assets/js/journal-crypto.mjs';
import { GitHubVault, VAULT_PATH } from '../assets/js/journal-github.mjs';

const password = 'test-only-long-random-key-2026';
const entries = [{ id: 'id-1', date: '2026-11-23', title: '一点心路 🌱', body: '<script>alert(1)</script>\n私密内容。' }];

test('Unicode vault round trips; plaintext/key absent, IV unique, key non-extractable', async () => {
  const vault = await createVault(password);
  const first = await encryptVault(entries, vault.key, vault.salt);
  const second = await encryptVault(entries, vault.key, vault.salt);
  assert.notEqual(first.iv, second.iv);
  assert.notEqual(first.ciphertext, second.ciphertext);
  assert.equal(vault.key.extractable, false);
  for (const secret of [password, entries[0].title, entries[0].body, entries[0].date]) {
    assert.equal(JSON.stringify(first).includes(secret), false);
  }
  assert.deepEqual((await decryptVault(first, password)).entries, entries);
  assert.deepEqual(await decryptWithKey(first, vault.key), entries);
  await assert.rejects(decryptVault(first, 'wrong-password'), /无法解锁/);
  const corrupted = fromBase64(first.ciphertext);
  corrupted[0] ^= 1;
  await assert.rejects(decryptVault({ ...first, ciphertext: toBase64(corrupted) }, password), /无法解锁/);
  await assert.rejects(decryptVault({ ...first, iterations: 1 }, password), /不支持/);
  await assert.rejects(createVault('short'), /16/);
});

test('reject invalid decrypted records and oversized vaults', async () => {
  const vault = await createVault(password);
  await assert.rejects(encryptVault([entries[0], entries[0]], vault.key, vault.salt), /格式/);
  await assert.rejects(encryptVault([{ ...entries[0], body: 'x'.repeat(700001) }], vault.key, vault.salt), /容量/);
});

function response(status, data) {
  return { status, ok: status >= 200 && status < 300, json: async () => data };
}

test('read and save use same branch, SHA, ciphertext and scoped GitHub authorization', async () => {
  const calls = [];
  const vault = await createVault(password);
  const envelope = await encryptVault(entries, vault.key, vault.salt);
  const replies = [response(200, { default_branch: 'journal/main' }), response(200, {
    type: 'file', encoding: 'base64', size: 500, sha: 'old-sha', content: toBase64(new TextEncoder().encode(JSON.stringify(envelope)))
  }), response(200, { content: { sha: 'new-sha' } })];
  const client = new GitHubVault('owner/repo', 'fake-token', async (url, init) => {
    calls.push({ url, init }); return replies.shift();
  });
  assert.deepEqual(await client.read(), envelope);
  await client.write(envelope);
  assert.equal(client.sha, 'new-sha');
  assert.equal(calls[1].url, `https://api.github.com/repos/owner/repo/contents/${VAULT_PATH}?ref=journal%2Fmain`);
  const payload = JSON.parse(calls[2].init.body);
  assert.equal(payload.sha, 'old-sha');
  assert.equal(payload.branch, 'journal/main');
  assert.deepEqual(JSON.parse(new TextDecoder().decode(fromBase64(payload.content))), envelope);
  for (const call of calls) {
    assert.equal(call.init.headers.Authorization, 'Bearer fake-token');
    assert.equal(call.init.credentials, 'omit');
    assert.equal(JSON.stringify(call).includes(password), false);
    assert.equal(JSON.stringify(call).includes(entries[0].title), false);
  }
});

test('new file omits SHA; conflicts are not retried and do not advance SHA', async () => {
  let putCount = 0;
  const client = new GitHubVault('owner/repo', 'fake-token', async (url, init) => {
    if (init.method === 'PUT') {
      putCount++;
      assert.equal(JSON.parse(init.body).sha, undefined);
      return response(409, {});
    }
    return url.includes('/contents/') ? response(404, {}) : response(200, { default_branch: 'main' });
  });
  assert.equal(await client.read(), null);
  await assert.rejects(client.write({ ciphertext: 'fake' }), /冲突/);
  assert.equal(client.sha, null);
  assert.equal(putCount, 1);
});

test('repository permission failures never become an empty vault; read-only cannot write', async () => {
  const client = new GitHubVault('owner/repo', '', async () => response(404, {}));
  await assert.rejects(client.read(), /权限/);
  await assert.rejects(client.write({}), /Token/);
  assert.throws(() => new GitHubVault('https://evil.example/repo', 'secret'), /仓库/);
});
