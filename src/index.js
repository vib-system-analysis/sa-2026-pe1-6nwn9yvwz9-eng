const http = require('node:http');

function createGreeting(name = 'world') {
  return `Hello, ${name}!`;
}

function createServer() {
  return http.createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/health') {
      response.writeHead(200, {
        'content-type': 'application/json; charset=utf-8',
      });
      response.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    if (request.method === 'GET' && request.url === '/') {
      response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      response.end(createGreeting());
      return;
    }

    response.writeHead(404, {
      'content-type': 'application/json; charset=utf-8',
    });
    response.end(JSON.stringify({ error: 'not_found' }));
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  createServer().listen(port, '0.0.0.0', () => {
    console.log(`AI Review Analyzer placeholder listening on port ${port}`);
  });
}

module.exports = {
  createGreeting,
  createServer,
};
