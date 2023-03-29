//Where the servers are created
// Agar.io clone
const express = require('express');
const app = express();
app.use(express.static(__dirname+'/public'));
const expressServer = app.listen(9000);
const socketio = require('socket.io');
const io = socketio(expressServer);

// App organization
// servers.js is NOT the entry point. it creates our servers
// and exports them
module.exports = {
    app,
    io
}
