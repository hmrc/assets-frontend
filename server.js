var express = require('express');
var app = express();

app.use(express.static(__dirname + '/assets'));
app.use(express.logger('dev'));
module.exports = app;
