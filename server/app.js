const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const DeviceManager = require('./device');
const deviceManager = new DeviceManager(io);

deviceManager.discoverDevices();

app.use(express.static('client'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  deviceManager.socketConnected(socket);
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});