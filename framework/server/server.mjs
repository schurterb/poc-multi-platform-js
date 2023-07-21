// server.js
import http from 'http';
import fs from 'fs';
import path from 'path';

import ipModule from './core/ip.js';

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'www');

const server = http.createServer((req, res) => {
  if (req.url === '/ip') {
    // ----- module executed -----
    ipModule.getIP().then(ip => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Your IP is ${ip}`);
    });
    //////////////////////////////
  } else {
    let filePath;
    let contentType;
    if (req.url.startsWith('/framework/www/')) {
      filePath = path.join(__dirname, req.url);
      contentType = getContentType(path.extname(filePath));
    } else if (req.url.startsWith('/src/www/')) {
      filePath = path.join(__dirname, req.url);
      contentType = getContentType(path.extname(filePath));
    } else {
      filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
      contentType = getContentType(path.extname(filePath));
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404);
          res.end('404 Not Found');
        } else {
          res.writeHead(500);
          res.end('500 Internal Server Error');
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

function getContentType(extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpg';
    case '.gif':
      return 'image/gif';
    default:
      return 'text/plain';
  }
}