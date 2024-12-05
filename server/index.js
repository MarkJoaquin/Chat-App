// import express from 'express';
// const express = require('express');
// const logger = require('morgan');

import express from 'express';
import logger from 'morgan';

import { Server } from 'socket.io';
import { createServer } from 'node:http';


const port = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
});


app.use(logger('dev'));

io.on('connection', (socket) => {
    console.log('an user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });
});



app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});