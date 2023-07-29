// process.env.PATH = `${process.env.PATH}:${__dirname}/framework:${__dirname}/src`;
// import Module from 'module';
// Module.__initPaths();

// server.js
import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';

//TODO: Find a better way to do this part...
import getIP from '../../src/core/ip.mjs';

const PORT = 3000;
const __dirname = path.dirname(new URL(import.meta.url).pathname).slice(os.platform() === 'win32' ? 1 : 0).replace('/framework/server', '');
const FRAMEWORK_DIR = __dirname+'/framework/www';
const SRC_DIR = __dirname+'/src/www';
const MODULE_DIR = __dirname+'/src/core';
const server = http.createServer((req, res) => {
  console.log(req);
  if (req.url === '/ip') {
    // ----- module executed -----
    getIP().then(ip => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Your IP is ${ip}`);
    });
    //////////////////////////////
  } else {
    let filePath;
    let contentType;
    const relativePath = req.url === '/' ? '/index.html' : req.url;
    let frameworkPath = path.join(FRAMEWORK_DIR, relativePath);
    let srcPath = path.join(SRC_DIR, relativePath);
    let modulesPath = path.join(MODULE_DIR, relativePath);
    
    if (fs.existsSync(frameworkPath)) {
      filePath = frameworkPath;
    } else if(fs.existsSync(srcPath)) {
      filePath = srcPath;
    } else if(fs.existsSync(modulesPath)) {
      filePath = modulesPath;
    } else {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }
    console.log("filePath: " + filePath);
      
    if(filePath) {
      contentType = getContentType(path.extname(filePath));
      
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
    case '.mjs':
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