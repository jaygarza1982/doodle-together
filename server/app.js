const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const getRandom = (max) => { return Math.random() * max; }

let userDrawings = {
  '1': {
    id: '1',
    left: getRandom(500),
    top: getRandom(500),
    width: getRandom(100),
    height: getRandom(100)
  },
  '2': {
    id: '2',
    left: getRandom(500),
    top: getRandom(500),
    width: getRandom(100),
    height: getRandom(100)
  },
  '3': {
    id: '3',
    left: getRandom(500),
    top: getRandom(500),
    width: getRandom(100),
    height: getRandom(100)
  },
  '4': {
    id: '4',
    left: getRandom(500),
    top: getRandom(500),
    width: getRandom(100),
    height: getRandom(100)
  },
};

// Send drawings from all users
// Users can use this when first joining
app.get('/api/objects', (req, res) => {
  res.send(userDrawings);
});

io.on('connection', (socket) => {

  socket.on('object-event', msg => {
    try {
      console.log(msg.id, 'was updated');
  
      // Set the object to the msg object
      userDrawings[msg.id] = msg.object;

      // Set the id of updated object, this is not in the msg.object, so it must be done here
      userDrawings[msg.id].id = msg.id;
      
      io.emit('object-event', msg);
    } catch (error) {
      console.log('Unable to preform object-event', error);
    }
  });

});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
