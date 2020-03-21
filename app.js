var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const heosManager = require('./heos')(io);
const devices = [];

app.use(express.static('client'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/templates/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  

  socket.on('discover_devices', () => {
    var discover = require('./ssdpClient');

    discover.on('response', function (headers, statusCode, rinfo) {
      console.log('Got a response to an m-search.');
      devices.push(rinfo);

      io.emit('device_discovered', rinfo);
    });

    discover.search('urn:schemas-denon-com:device:ACT-Denon:1').then((result) => {
      console.log('and then!', result);
    });
  });
  // heosManager.connect('192.168.0.73', socket);
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});