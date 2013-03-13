var User = require('../models/User')
module.exports = function(socket, io, instance) {
    socket.on('join', function(data) {
        console.log(data)

        User.findCharacter(data.character, data.token, function(results) {
            console.log(results)
            if(results.length<=0) { socket.emit('join-fail'); return false; }

            var player = instance.addPlayer(socket.id, results[0].name);

            socket.emit('instance', {instance:instance.data(), me:player.id});
            socket.emit('join-success', {me:player.id});

            socket.broadcast.emit('playerJoin', player)

        })

    })

    socket.on('move', function(data) {
        var player = instance.players[socket.id]
        if(!player) return
        player.x = data.x
        player.y = data.y
        player.rotation = data.rotation
        socket.broadcast.emit('playerMove', player)
    });

    socket.on('disconnect', function(data) {
        instance.removePlayer(this.id);
        socket.broadcast.emit('playerDrop', {id:this.id});
    })

}

managers.push(module.exports)