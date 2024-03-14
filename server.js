var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
})

let users = [];
let oppans = [];
let room_admins = 1;

app.get('/login', (req, res) => {
  let data = {
    role: req.body.ROLE,
    username: req.body.USERNAME,
    user_id: req.body.USER_ID
  }
  users.push(data);
});

app.get('/oppan/new', (req, res) => {
  let data = {
    role: req.body.ROLE,
    username: req.body.USERNAME,
    user_id: req.body.USER_ID,
    oppa_number: req.body.OPPA
  }
  oppans.push(data);
});

app.get('/clients', (req, res) => {
  res.send(Object.keys(io.sockets.clients().connected))
});

io.on('connection', socket => {
  console.log(`A user connected with socket id ${socket.id}`);

  socket.on('new_appa', () => {
    socket.broadcast.to(room_admins).emit('get_oppa', oppans);
  });

  socket.on('user-connected', data => {
    if (data.role === 'admin') {
      socket.join(room_admins);
    }
  });
})

http.listen(3000, () => {
  console.log('Listening on *:3000')
})
