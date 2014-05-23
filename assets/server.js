var express = require('express');
var fs = require ("fs");
var app = express();


app.use(express.logger('dev'));
app.use('/assets', express.static(__dirname + '/public'))
app.use(app.router);

//use this for the application manager healthcheck
app.get('/', function (req, res) {

  res.send(res.statusCode)
});


module.exports = app;
