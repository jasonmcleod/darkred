var Account = require('../models/Account');
var Character = require('../models/Character');

//req/res
module.exports.create = function(req, res) {

    Character.find({name:req.body.name}, function(err, results) {
        if(results.length>0) {
            res.send({success:0, error:'That name is already in use'})
        } else {
            Character.create([{
                name:req.body.name,
                xp:0
            }], function(err, char) {

                Account.find({token:req.body.token}, function(err, account) {
                    account[0].addCharacters(char[0], function() {
                        res.send({success:1})
                    })

                })

            })

        }
    })
}

module.exports.list = function(req, res) {
    Account.find({token:req.query.token},function (err, accounts) {
        accounts[0].getCharacters(function(err, chars) {
            res.send(chars)
        })
    })
}

//io
module.exports.bindSocket = function(socket, io, game) {

    socket.on('move', function(data) {
        var player = game.players[socket.id]
        if(!player) return
        player.x = data.x
        player.y = data.y
        player.rotation = data.rotation
        socket.broadcast.emit('playerMove', player)
    });

}

controllers['characters'] = module.exports;
