var config = require('./config');
var thefile = config.xmlfile;
var imagepath = config.imagepath;

var fs = require('fs');

var app = require('express')(),           // start Express framework
    server = require('http').createServer(app); // start an HTTP server


app.get('/', function (request, response) {
  response.sendfile(__dirname + '/index.html');
});

server.listen(3002);

/*
http.createServer(function(req,resp) {
    resp.writeHead(200, {"Content-Type": "text/plain"});
    resp.write("Hello World " + thefile);
    resp.end();
    
    console.log("sample output to console");
}).listen(3002);
*/