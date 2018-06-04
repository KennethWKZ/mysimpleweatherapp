'use strict';

var express = require('express');
var app = express();
var helmet = require('helmet');
var port = process.env.PORT || 3000;
var searchWeather = require('./routes/searchWeather');
var searchLocation = require('./routes/searchLocation');
app.use(helmet());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + './../../')); //serves the index.html

app.use('/api', searchWeather, searchLocation);

app.listen(port, function () {
  return console.log('Listening on port ' + port);
});

//module.exports = app;