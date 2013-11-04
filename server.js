var config = require('./config');
var thefile = config.xmlfile;
var imagepath = config.imagepath;

var fs = require('fs');

//var app = require('express')();
//var http = require('http');

var app = require('express')(),           // start Express framework
    server = require('http').createServer(app); // start an HTTP server

app.get('/', function (request, response) {
  response.sendfile(__dirname + '/index.html');
});

server.listen(config.serverport);