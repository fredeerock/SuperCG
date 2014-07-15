///////////
//Express//
///////////

var express = require('express');
var logger = require('morgan');
var app = express();
var server = app.listen(3000);

// log requests
app.use(logger('dev'));

// serve content from /public
app.use(express.static(__dirname + '/public'));

console.log('Listening on port %d', server.address().port);

/////////////
//socket.io//
/////////////

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {

    socket.on('message', function(data) {
        console.log("from client: " + data);
    });

    socket.send("hi");

    socket.emit('image', canvasImage);

    socket.on('disconnect', function() {
        console.log("server says bye client");
    });

});

///////////////
//node-canvas//
///////////////

var Canvas = require('canvas'),
    Image = Canvas.Image,
    canvas = new Canvas(200, 200),
    ctx = canvas.getContext('2d');

ctx.font = '30px Impact';

ctx.fillText("Awesome!", 50, 100);

var te = ctx.measureText('Awesome!');
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50 + te.width, 102);
ctx.stroke();

var canvasImage = canvas.toDataURL();

function draw() {
    ctx.rotate(0.1);
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

// var canvasImage = ctx.getImageData();

// console.log('<img src="' + canvas.toDataURL() + '" />');
