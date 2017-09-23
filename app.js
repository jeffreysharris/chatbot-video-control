const express = require('express');
const app = express();
const path = require('path');
var http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function (client) {
  console.log("Socket connected");
})

http.listen(3000, function () {
  console.log('http listening');
})

var carpart;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function (request, response) {
  response.render('index', {
    carpart: '',
  })
})

app.get('/:carpart', function(request, response, next) {
  carpart = request.params.carpart;
  io.sockets.emit('part', request.params.carpart);
})

// app.listen(3000, function () {
//   console.log('app listening on port 3000!')
// })
