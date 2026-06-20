const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const TARGET = 'opencode.ai';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.mp4': 'video/mp4',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);

  // API proxy: /zen/* → opencode.ai/zen/*
  if (parsed.pathname.startsWith('/zen/')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
    const options = {
      hostname: TARGET,
      port: 443,
      path: parsed.path,
      method: req.method,
      headers: { ...req.headers, host: TARGET },
    };
    delete options.headers['origin'];
    const proxyReq = https.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });
    proxyReq.on('error', (e) => { res.writeHead(502); res.end('Proxy error: ' + e.message); });
    req.pipe(proxyReq);
    return;
  }

  // Serve static files
  let filePath = req.url === '/' ? '/index.html' : parsed.pathname;
  filePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 開啟 http://localhost:${PORT} 使用 AI Liza Chat`);
  console.log(`已選擇 OpenCode (big-pickle) 時，Base URL 會自動設為 http://localhost:${PORT}/zen/v1`);
});
