
//Problem: We need a simple solution to look at a user's badge count and JavaScript point from a web browser.
//Solution: Use Node.js to perform the profile look ups and server our template via HTTP.

//Create a web server.
var http = require("http");
var route = require("./route");

var server = http.createServer(function(req, res) {
  route.home (req, res);
  route.user (req, res);
});
server.listen(8080);
console.log("Server running on 8080");
