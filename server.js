var express = require('express');
var http = require('http');

var app = express();
app.use(express.static('./'));

http.createServer(app).listen(80);