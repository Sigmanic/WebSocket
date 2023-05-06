const port = 33850	// Your port here
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  rateLimit(ws);
  ws.on('message', function incoming(data) {
    if (data.length > 1000) { return; }
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
      	client.send(data);
      }
    });
  });
});

server.listen(port);
