var fs = require('fs'),
server = require('./server');

function sendInterface(response) {
  console.log("Request handler 'interface' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  var html = fs.readFileSync(__dirname + "/pages/interface.html")
  response.end(html);
}

function sendCondomino(response) {
  console.log("Request handler 'condomino' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  var html = fs.readFileSync(__dirname + "/pages/condomino.html")
  response.end(html);
}

exports.sendInterface = sendInterface;
exports.sendCondomino = sendCondomino;