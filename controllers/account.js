var Account = require('../models/Account');

exports.create = function(req, res) {
    var account = new Account()

    account.create(req.body, function(data) {
        res.send(data)
    })
}

exports.authenticate = function(req, res) {
    Account.find({email:req.body.email, password:req.body.password},function (err, accounts) {
        if(accounts.length==0) {
            res.send({success:0})
        } else {
            var acct = accounts[0]
            if(acct.activated==1) {
                acct.generateToken(function() {
                    res.send({success:1, token: acct.token})
                })
            } else {
                res.send({success:0, error:'Account has not been activated'})
            }
        }
    })
}

exports.createCharacter = function(req, res) {
    var account = new Account();
    var token = req.body.token
    delete req.body.token
    account.createCharacter(token, req.body, function(data) {
        res.send(data)
    })
}

exports.characterList = function(req, res) {
    console.log(req.query.token)
    Account.find({token:req.query.token},function (err, accounts) {
        console.log(arguments)
        res.send([{name:'test'}])
    })
}

//    account.authByToken(token, function(data) {
//         account.characterList(function(data) {
//             res.send(data)
//         })
// //    })
// }

// socket.on('createCharacter', function(data) {
//
//     var account = new Account();
//
//     account.findCharacter(data.character, data.token, function(results) {
//         if(results.length<=0) { socket.emit('join-fail'); return false; }
//
//         var player = instance.addPlayer(socket.id, results[0].name);
//
//         socket.emit('instance', {instance:instance.data(), me:player.id});
//         socket.emit('join-success', {me:player.id});
//
//         socket.broadcast.emit('playerJoin', player)
//
//     })
//
// })