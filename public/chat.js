// Make connection
//var port = require('app').port;
//var socket = io.connect('http://localhost:'+port);
var socket = io(window.location.href);
// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      feedback = document.getElementById('feedback'),
      output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function(){
  if(message.value!="" && handle.value!=""){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
}
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML="";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

message.addEventListener('keypress', function(){
  if(handle.value!="")
  socket.emit('typing', handle.value);
});

socket.on('typing', function(data){
  //console.log('data');
  feedback.innerHTML = '<p><em>'+data+' is typing...'+'</em></p>';
});
