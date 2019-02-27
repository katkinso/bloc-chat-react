import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

function subscribeToTimer(cb) {
  socket.on("timer", timestamp => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
}

//call getTypingUsers from Messages.js
//send in callback function and user from typing event

function getTypingUsers(cb, user){
    socket.emit("typingUsers", user); //emit typingUsers to server
    socket.on('typer', user => cb(null, user)) //get 'typer' event from server and call setState
}

export { subscribeToTimer, getTypingUsers };

//services folder
// - post new message generic






