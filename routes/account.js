var Account = require('../models/Account');

exports.index = function(req, res) {
    var account = new Account()
    account.authenticate(req.body.email, req.body.password, function(data) {
        res.send(data)
    })
}

exports.create = function(req, res) {
    var account = new Account()
    account.create(req.body, function() {
        res.send(data)
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
    var account = new Account();
    var token = req.query.token
    account.authByToken(token, function(data) {
        account.characterList(function(data) {
            res.send(data)
        })
    })
}