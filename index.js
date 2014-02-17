#!/usr/bin/env node

var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  path = require('path');

/**
 * Main cofiguration
 */

io.disable('heartbeats');
io.set('log level', 2); // 1/2/3
app.listen(9090);

/**
 * Alghoritm configuration
 */
var min = -1;
var max = 2;
var precise = 20;
var bestMember = null;

var start = new Date().getTime();

/////////////////////////////////////////

var bestResults = {
  
};

function handler (req, res) {
  var filePath = req.url;
  console.log('URL: ', req.url);
  console.log('__dirname: ', __dirname);
  if (filePath == '/') {
    filePath = __dirname + filePath + 'index.html';
  } else {
    filePath = __dirname + filePath;
  }
    

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  console.log('files in folder:', fs.readdirSync('.'));

  fs.exists(filePath, function(exists) {
    console.log(filePath, exists);
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          res.writeHead(500);
          res.end();
        }
        else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    }
    else {
      res.writeHead(404);
      res.end();
    }
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('newBestMember', function (data) {
    console.log('newBestMember');
    var end = new Date().getTime();
    var time = end - start;
    console.log('Data: ', data, ' in: ', time, 'ms');
    if(bestMember === null || data.y < bestMember.y) {
      bestMember = data;
    }
    socket.broadcast.emit('newBestMember', data);
  });
  socket.on('getBestMember', function (data) {
    if(bestMember !== null) {
      console.log('getBestMember', bestMember);
      socket.emit('bestMember', bestMember);
    }
  });
});