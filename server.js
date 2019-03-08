var app = require('express')();
const express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = 80;
var elements = require('./config/elements.json');
server.listen(port);
console.log("Server listening on port 80");
app.use(express.static(`${__dirname}/public`));

app.get('/app', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
    /**
     * req.query.element is the ?element= part of the url
     */
    if (req.query.element === undefined) {
        sendAllData();
    } else {
        sendData(req.query.element);
    }
});

function sendAllData() {
    io.on('connection', function (socket) {
        socket.emit('init', {
            elements: elements
        });
    });
}

function sendData(brandwatchElement) {
    toSend = elements[brandwatchElement].packages;
    io.on('connection', function (socket) {
        socket.emit('init', {
            elements: toSend
        });
    });
}