module.exports = function(socket, io) {
    socket.on('chat', function(data) {
        io.sockets.emit('addChat', {user: socket.id, text:data.text})
    });
}
managers.push(module.exports)