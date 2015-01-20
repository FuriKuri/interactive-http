var http = require('http');
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

http.createServer(function (req, res) {
  rl.question("Your response: ", function(response) {
  	res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(response);
  });
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');