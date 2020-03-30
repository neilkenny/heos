const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const heosManager = require('./heos')(io);
const devices = [];
const events = require('./src/events');

app.use(express.static('client'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  

  socket.on(events.DISCOVER_DEVICES,  () => {
    var discover = require('./ssdpClient');

    discover.on('response', function (headers, statusCode, rinfo) {
      console.log('Got a response to an m-search.');
      devices.push(rinfo);

      io.emit(events.DEVICES_DISCOVERED, rinfo);
    });

    discover.search('urn:schemas-denon-com:device:ACT-Denon:1');
  });
  // heosManager.connect('192.168.0.73', socket);
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});