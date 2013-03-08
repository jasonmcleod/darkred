module.exports = function(socket, io, instance) {
    socket.on('join', function(data) {

        var player = instance.addPlayer(socket.id, data.name);

        player.name = data.name;

        socket.emit('instance', {instance:instance.data(), me:player.id});
        console.log('emit instance')

        socket.broadcast.emit('playerJoin', player)
    })

    socket.on('move', function(data) {
        var player = instance.players[socket.id]
        player.x = data.x
        player.y = data.y
        socket.broadcast.emit('playerMove', player)
    });

    socket.on('disconnect', function(data) {
        instance.removePlayer(this.id);
        socket.broadcast.emit('playerDrop', {id:this.id});
    })

}