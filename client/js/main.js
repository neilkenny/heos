var socket = io();
var progress = document.getElementById('song-progress');
var max, current, playState, intervalSubscription;

socket.on('progress_update', (event) => {
  console.log(event);
  stopProgressBar();
  current = event.cur_pos;
  max = event.duration;
  if(playState == 'play'){
    startProgressBar();
  }
});

function discoverDevices(){
  socket.emit('discover_devices');
}

function getPlayState(){
  socket.emit('get_play_state');
}

function stopProgressBar(){
  if(intervalSubscription){
    clearInterval(intervalSubscription);
  }
}

function startProgressBar(){
  intervalSubscription = setInterval(() => {
    current += 100;
    updateProgress()
  }, 100);
}

function updateProgress(){
  progress.max = max;
  progress.value = current;
}

function nextTrack(){
  console.log('sending next');
  socket.emit('next_track');
}

function previousTrack(){
  console.log('sending previous');
  socket.emit('previous_track');
}

function volumeChanged(volume){
  let volumeDiv = document.getElementById('current-volume-level');
  volumeDiv.innerHTML = volume.toString();
}

function volumeUp(volume){
  socket.emit('increase_volume');
}

function volumeDown(volume){
  socket.emit('decrease_volume');
}

function volumeChanged(volume){
  let volumeDiv = document.getElementById('current-volume-level');
  volumeDiv.innerHTML = volume.toString();
}

function playStateChanged(state){
  playState = state;
  const icon = document.getElementById('play-pause-icon');

  switch(state){
    case 'play':
      icon.classList.add("fa-pause");
      icon.classList.remove("fa-stop");
      icon.classList.remove("fa-play");
      break;
    case 'stop':
    case 'pause':
      stopProgressBar();
      icon.classList.remove("fa-pause");
      icon.classList.remove("fa-stop");
      icon.classList.add("fa-play");
      break;
  }
}

function onDeviceDiscovered(){
  
}

function togglePlayPause(){
  if(playState != 'play'){
    playState = 'play';
    startProgressBar();
  }
  else{
    playState = 'pause';
    stopProgressBar();
  }
  playStateChanged(playState);

  console.log('sending play pause');
  socket.emit('toggle_play_pause');
}

socket.on('track_updated', (event) => {
  document.getElementById('track-title').innerHTML = event.song;
  document.getElementById('track-artist').innerHTML = event.artist;
  document.getElementById('track-album').innerHTML = event.album;
  document.getElementById('track-img').src = event.image_url;
  document.title = event.song + " - " + event.artist;
});

socket.on('device_discovered', onDeviceDiscovered);

socket.on('volume_changed', volumeChanged);

socket.on('play_state_changed', playStateChanged);

getPlayState();