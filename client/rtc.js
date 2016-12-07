let errorElement = document.querySelector('#errorMsg');
let localVideo = document.querySelector('#localVideo');
let peerVideo = document.querySelector('#peerVideo');
var startButton = document.getElementById('startButton');
var callButton = document.getElementById('callButton');
var hangupButton = document.getElementById('hangupButton');

room = "";

callButton.onclick = () => {
  room = 5;
  console.log('set room as '+room);
  socket.emit('createOrJoin', room);
  console.log('joining room');
};
// dummy
// room = prompt("Enter room name:");

var socket = io.connect("https://aacfea0a.ngrok.io");


if (room !== "") {
  console.log('Joining room ' + room);
  // socket.emit('createOrJoin', room);
}

socket.on('full', function (room){
  console.log('Room ' + room + ' is full');
});

socket.on('empty', function (room){
  isInitiator = true;
  console.log('Room ' + room + ' is empty');
});

socket.on('join', function (room){
  console.log('Making request to join room ' + room);
  console.log('You are the initiator!');
});

socket.on('log', function (array){
  console.log.apply(console, array);
});




const constraints = {
  audio: true,
  video: true
}

const onSuccess = (stream) => {
  var videoTracks = stream.getVideoTracks();
  let audioTracks = stream.getAudioTracks();
  console.log('Got local stream with constraints:', constraints);
  console.log('Using video device: ' + videoTracks[0].label);
  stream.oninactive = function() {
    console.log('Stream inactive');
  };
  window.stream = stream; // make variable available to browser console
  localVideo.srcObject = stream;
  peerVideo.srcObject = stream;
  // audio.srcObject = stream;
}

const onError = (err) => {
  console.warn(err);
}

navigator.mediaDevices.getUserMedia(constraints).then(onSuccess).catch(onError);


// let localPc;
// let peerPc;
// let server = null;
//
// call(server);
//
// function call(server) {
//   localPc = new RTCPeerConnection(server);
//   peerPc = new RTCPeerConnection(server);
//
//
// }
