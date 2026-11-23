import { toBase64, fromBase64 } from './journal-crypto.mjs';

export const VAULT_PATH = '_private/journal.enc.json';

export class GitHubVault {
  constructor(repository, token, request = (...args) => fetch(...args)) {
    if (!/^[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+$/.test(repository)) {
      throw new Error('仓库请填写为 用户名/仓库名。');
    }
    this.url = `https://api.github.com/repos/${repository}`;
    this.token = token;
    this.request = request;
    this.branch = null;
    this.sha = null;
  }

  async api(path, options = {}, allowMissing = false) {
    const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    if (options.body) headers['Content-Type'] = 'application/json';
    let response;
    try {
      response = await this.request(this.url + path, { ...options, headers, cache: 'no-store',
        credentials: 'omit', redirect: 'error', signal: AbortSignal.timeout(30000) });
    } catch {
      throw new Error('无法连接 GitHub。若刚才正在保存，结果可能尚未确认；请导出加密备份，再重新打开核对。');
    }
    if (response.status === 404 && allowMissing) return null;
    if (!response.ok) {
      const messages = {
        401: 'GitHub Token 无效或已过期。请锁定后重新输入。',
        403: 'GitHub 拒绝访问：请检查 Token 的 Contents 权限、分支规则或 API 频率限制。',
        404: '找不到仓库或没有访问权限。私有仓库需要有权限的 GitHub Token。',
        409: 'GitHub 上已有更新或分支冲突。当前草稿保留在页面中；请导出加密备份，再重新打开最新版本。',
        422: '保存未完成：文件可能已被其他设备更新，或分支不允许直接写入。请先导出加密备份。'
      };
      throw new Error(messages[response.status] || `GitHub 请求失败（${response.status}）。内容尚未确认保存，请保留备份。`);
    }
    return response.json();
  }

  async read() {
    const repository = await this.api('');
    this.branch = repository.default_branch;
    if (!this.branch) throw new Error('请先在 GitHub 仓库中创建一个 README，以初始化默认分支。');
    const file = await this.api(`/contents/${VAULT_PATH}?ref=${encodeURIComponent(this.branch)}`, {}, true);
    if (!file) return null;
    if (file.type !== 'file' || file.encoding !== 'base64' || file.size > 1000000 || !file.sha) {
      throw new Error('日记文件格式不正确或超过容量上限。');
    }
    const envelope = JSON.parse(new TextDecoder().decode(fromBase64(file.content)));
    this.sha = file.sha;
    return envelope;
  }

  async write(envelope) {
    if (!this.token) throw new Error('保存需要 GitHub Token。请先导出备份，再锁定并使用 Token 打开。');
    if (!this.branch) throw new Error('请先读取仓库。');
    const body = { message: 'Update encrypted journal', branch: this.branch,
      content: toBase64(new TextEncoder().encode(JSON.stringify(envelope) + '\n')) };
    // GitHub rejects stale SHAs; never retry a conflict with a newer SHA.
    if (this.sha) body.sha = this.sha;
    const result = await this.api(`/contents/${VAULT_PATH}`, { method: 'PUT', body: JSON.stringify(body) });
    if (!result.content?.sha) throw new Error('GitHub 未确认保存结果。请保留加密备份后重新打开核对。');
    this.sha = result.content.sha;
  }
}
