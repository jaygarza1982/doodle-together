const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const getRandom = (max) => { return Math.random() * max; }

let userDrawings = [
  {
    id: getRandom(500),
    left: getRandom(500),
    top: getRandom(500),
    width: getRandom(100),
    height: getRandom(100)
  },
  {
    id: getRandom(500),
    left: getRandom(500),
    top: getRandom(500),
    width: getRandom(100),
    height: getRandom(100)
  },
  {
    id: getRandom(500),
    left: getRandom(500),
    top: getRandom(500),
    width: getRandom(100),
    height: getRandom(100)
  },
  {
    id: getRandom(500),
    left: getRandom(500),
    top: getRandom(500),
    width: getRandom(100),
    height: getRandom(100)
  }
];

// Send drawings from all users
// Users can use this when first joining
app.get('/api/objects', (req, res) => {
  res.send(userDrawings);
});

io.on('connection', (socket) => {

  socket.on('object-event', msg => {
    console.log('object event message', msg?.id);

    // TODO: Update userDrawings when this event fires
    // TODO: This is so that new users will see the new changes
    
    io.emit('object-event', msg);
  });

});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
