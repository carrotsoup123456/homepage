// ======================================================
// 联系表单后端（零依赖，Node 内置 http + fs）
// 用途：接收主页 /contact 表单提交，存到本地 JSON 文件
// 端口：5175（与主页 dev server 5174 区分）
// 数据：保存在本文件同目录 feedback-data.json
// ======================================================
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'feedback.json');
const PORT = 5175;

// 允许跨域访问的前端来源（主页 dev server）
const ALLOW_ORIGIN = 'http://127.0.0.1:5174';

function ensureDataFile() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(DATA_FILE)) writeFileSync(DATA_FILE, '[]', 'utf-8');
}

function readMessages() {
  ensureDataFile();
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeMessages(list) {
  ensureDataFile();
  writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, status, payload) {
  setCors(res);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

// 读取请求体（JSON）
function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(new Error('无效的 JSON'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);

  // 预检请求
  if (req.method === 'OPTIONS') {
    setCors(res);
    res.writeHead(204);
    res.end();
    return;
  }

  // 提交留言：POST /api/feedback
  if (req.method === 'POST' && url.pathname === '/api/feedback') {
    try {
      const body = await readBody(req);
      const name = (body.name || '').toString().trim();
      const email = (body.email || '').toString().trim();
      const message = (body.message || '').toString().trim();

      if (!name || !message) {
        sendJson(res, 400, { ok: false, msg: '称呼和内容不能为空' });
        return;
      }

      const list = readMessages();
      const item = {
        id: 'msg-' + Date.now(),
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      };
      list.push(item);
      writeMessages(list);

      console.log(`[心得] 收到留言 #${item.id} 来自 ${name}`);
      sendJson(res, 200, { ok: true, msg: '已收到你的留言！', id: item.id });
    } catch (e) {
      sendJson(res, 400, { ok: false, msg: e.message || '提交失败' });
    }
    return;
  }

  // 查看留言：GET /api/feedback（便于调试/查看）
  if (req.method === 'GET' && url.pathname === '/api/feedback') {
    sendJson(res, 200, { ok: true, data: readMessages() });
    return;
  }

  // 健康检查
  if (req.method === 'GET' && url.pathname === '/healthz') {
    sendJson(res, 200, { ok: true, status: 'up' });
    return;
  }

  sendJson(res, 404, { ok: false, msg: 'Not Found' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`✅ 联系表单后端运行中：http://127.0.0.1:${PORT}`);
  console.log(`   前端来源允许：${ALLOW_ORIGIN}`);
  console.log(`   数据存储：${DATA_FILE}`);
});
