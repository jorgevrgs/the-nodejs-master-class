/*
 * Primary file for API
 *
 */

// Dependencies
const http = require("http");
const url = require("url");

// Configure the server to respond to all requests with a string
const server = http.createServer(function (req, res) {
  // Parse the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLowerCase();

  //Get the headers as an object
  const headers = req.headers;

  // Send the response
  res.end("Hello World!\n");

  // Log the request/response
  console.log("Request received with these headers: ", headers);
});

// Start the server
server.listen(3000, function () {
  console.log("The server is up and running now");
});
