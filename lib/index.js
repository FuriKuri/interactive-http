var http = require('http');
var app = require('express')();
var server = http.Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});

http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    var body = '';
    req.on('data', function (data) {
      body += data;
      if (body.length > 1e6)
        req.connection.destroy();
    });
    req.on('end', function () {
      console.log(body);
      var msg = "URL: " + req.url + " --- Body: " + body;
      io.emit('chat message', msg);
    });
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("response");
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');