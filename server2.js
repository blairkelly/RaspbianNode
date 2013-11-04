var config = require('./config');

var thefile = config.xmlfile;
var imagepath = config.imagepath;

var fs = require('fs');
var app = require('express')(),           // start Express framework
    server = require('http').createServer(app), // start an HTTP server
    io = require('socket.io').listen(server);

app.get('/', function (request, response) {
  response.sendfile(__dirname + '/index.html');
});
app.get('/client.js', function (request, response) {
  response.sendfile(__dirname + '/client.js');
});
app.get('/bootstrap/css/bootstrap.css', function (request, response) {
  response.sendfile(__dirname + '/bootstrap/css/bootstrap.css');
});
app.get('/bootstrap/css/bootstrap-responsive.css', function (request, response) {
  response.sendfile(__dirname + '/bootstrap/css/bootstrap-responsive.css');
});

app.get('/style.css', function (request, response) {
  response.sendfile(__dirname + '/style.css');
});
app.get('/jquery-2.0.3.min.js', function (request, response) {
  response.sendfile(__dirname + '/jquery-2.0.3.min.js');
});
app.get('/jquery-2.0.3.min.map', function (request, response) {
  response.sendfile(__dirname + '/jquery-2.0.3.min.map');
});

app.get('/bootstrap/js/bootstrap.min.js', function (request, response) {
  response.sendfile(__dirname + '/bootstrap/js/bootstrap.min.js');
});


io.configure(function(){
  io.set('log level', 1);  //tells IO socket to be mostly quiet.
});
server.listen(config.serverport);                    // listen for incoming requests on the server


// Send current time to all connected clients
var thetime = new Date().toJSON();
function sendTime() {
    thetime = new Date().toJSON();
    //thetime = new Date().valueOf();
    io.sockets.emit('time', { time: thetime });
    console.log("Sent time.");
}

var getsettings = function () {
    var fs = require('fs');
    data = fs.readFileSync(settingsfile, {encoding: 'utf-8'});
    return data;
}

var rf = function() {
    var fs = require('fs');
    data = fs.readFileSync(thefile, {encoding: 'utf-8'});
    return data;
}
var sendfileguts = function() {
    io.sockets.emit('fileguts', { fileguts: rf() });
}
function wfsync(towrite) {
    var fs = require('fs');
    fs.writeFileSync(thefile, towrite);
    console.log("Saved to file, Sync.");
    io.sockets.emit('saved', true);
}
function wfcb(towrite) {
    var fs = require('fs');
    fs.writeFile(thefile, towrite, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Saved to file, A-Sync.");
        }
    });
}


// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
    var address = socket.handshake.address;
    console.log("Client connected at " + address.address + ":" + address.port);

    socket.emit('welcome', { 
        message: 'Welcome',
        address: address.address,
        imagepath: imagepath,
        xmlfile: thefile
    }); //was: socket.emit('welcome', { message: 'Hi', time: new Date().toJSON() });
    sendfileguts();
    
    socket.on('write to file', function(thedata) {
        console.log("Function called: Write to File");
        wfsync(thedata.data);  //writes received data to file
        //sendfileguts();  //sends back contents of file.
    });
});