module.exports.bindSocket = function(socket, io, instance) {
    socket.on('chat', function(data) {
        io.sockets.emit('addChat', {user: socket.id, text:data.text})
    });
}

controllers['chat'] = module.exports