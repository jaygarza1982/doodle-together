const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('object-event', msg => {
    io.emit('object-event', msg);
  });

});

// TODO: Store objects server side
// TODO: Send objects when users connect
// TODO: Users will update their client side storage when server sends events

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
