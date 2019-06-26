"use strict";
// require("dotenv").config();
// const $ = require("../gulp/config.js");
const http = require("http");

const GetCode = require("./GetCode.js");

var server;
const lServerPort = 8080;
const lServerHost = "localhost";

const myApp = function (request, response) {
	console.log("Parsing Input Request");
	if ("GET" == request.method) {
		GetCode.process(request, response);
	}
	else {
		console.log("Request other than GET = ", request.method);
	}
};

server = http.createServer(myApp);
server.listen(lServerPort);
console.log(`Server running at: ${lServerHost}:${lServerPort}/`);
