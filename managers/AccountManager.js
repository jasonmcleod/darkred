var Account = require('../models/Account')
module.exports = function(socket, io, instance) {
    socket.on('createCharacter', function(data) {

        var account = new Account();

        account.findCharacter(data.character, data.token, function(results) {
            if(results.length<=0) { socket.emit('join-fail'); return false; }

            var player = instance.addPlayer(socket.id, results[0].name);

            socket.emit('instance', {instance:instance.data(), me:player.id});
            socket.emit('join-success', {me:player.id});

            socket.broadcast.emit('playerJoin', player)

        })

    })
}

managers.push(module.exports)