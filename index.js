///////////
//Express//
///////////

var express = require('express');
var logger = require('morgan');
var app = express();

// log requests
app.use(logger('dev'));

// serve content from /public
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000);
console.log('Listening on port %d', server.address().port);

///////////////
//node-canvas//
///////////////

var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(200,200)
  , ctx = canvas.getContext('2d');

ctx.font = '30px Impact';
ctx.rotate(.1);
ctx.fillText("Awesome!", 50, 100);

var te = ctx.measureText('Awesome!');
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50 + te.width, 102);
ctx.stroke();

console.log('<img src="' + canvas.toDataURL() + '" />');