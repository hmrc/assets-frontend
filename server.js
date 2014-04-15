var express = require('express');
var fs = require ("fs");
var app = express();

app.use(express.static(__dirname + '/assets'));
app.use(express.logger('dev'));
app.use(app.router);

//use this for the application manager healthcheck
app.get('/', function (req, res) {

  res.send(res.statusCode)
});
module.exports = app;
