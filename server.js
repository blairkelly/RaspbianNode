var config = require('./config');
var thefile = config.xmlfile;
var imagepath = config.imagepath;

var fs = require('fs');
var app = require('express')();
var http = require('http');




http.createServer(function(req,resp) {
    resp.writeHead(200, {"Content-Type": "text/plain"});
    resp.write("Hello World " + thefile);
    resp.end();
    
    console.log("sample output to console");
}).listen(3002);