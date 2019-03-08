var app = require('express')();
const express = require('express');
var server = require('http').Server(app);
const port = 80;
server.listen(port);
app.use(express.static(`${__dirname}/public`));
