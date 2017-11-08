const http = require("http");
const PORT = 8080;





// a function which handles requests and sends response
function requestHandler(request, response) {
   if (request.url == "/") {
    response.end("Welcome!");
  } else if (request.url == "/urls") {
    response.end("www.lighthouselabs.ca\nwww.google.com");
  } else {
    response.statusCode = 404;
    response.end("Unknown Path");
  }
}


var server = http.createServer(requestHandler);
// call back called AFTER PORT IS FOUND server started so it goes and does console.log before and once port is recognized
server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

console.log('executed before port')



