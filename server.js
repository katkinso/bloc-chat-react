const io = require("socket.io")();

io.on('connection', (client) => {

  //start emitting events to the client
  //when get event 'typingUsers' call a function and emit 'typers' to client
  client.on('typingUsers', (user) => {
      console.log(client)
      // let users = user.concat(user)
      client.broadcast.emit('typer', user); //needs to be io.emit, not client.emit. doesn't emit to all clients if not!!!!!!
  });

  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);

