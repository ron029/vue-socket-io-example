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

let oppans = [
  {
    oppa: "K-0000000398",
    status: "pending"
  },
  {
    oppa:  "K-0000000399",
    status: "pending"
  }
];
let room_admins = 1;

// app.get('/login', (req, res) => {
//   let data = {
//     role: req.body.ROLE,
//     username: req.body.USERNAME,
//     user_id: req.body.USER_ID
//   }
//   users.push(data);
// });

// app.get('/oppan/new', (req, res) => {
//   let data = {
//     role: req.body.ROLE,
//     username: req.body.USERNAME,
//     user_id: req.body.USER_ID,
//     oppa_number: req.body.OPPA
//   }
// });

io.on('connection', socket => {
  console.log(`A user connected with socket id ${socket.id}`);
  socket.on('user-connected', data => {
    console.log('user: ', data);
    if (data.role === 'admin') {
      socket.join(room_admins);
      console.log('admin connected to room number: ', room_admins)
      // socket.emit('oppa_list', oppans);
      // socket.emit('OPPA_LIST', oppans);
      // socket.broadcast.to(room_admins).emit('oppa_list', oppans);
      io.to(socket.id).emit('oppa_list', oppans);
    } else {
      console.log('new patient has been connected.')
    }
  });

  socket.on('new_oppa', data => {
    oppans.push(data);
    socket.to(room_admins).emit("oppa_list", oppans);
    // io.to(socket.id).emit('oppa_list', oppans);
    // socket.broadcast.to(room_admins).emit('oppa_list');
  });
})

http.listen(3000, () => {
  console.log('Listening on *:3000')
})
