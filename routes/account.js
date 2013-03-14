var Account = require('../models/Account');

exports.index = function(req, res) {
    var account = new Account()
    account.authenticate(req.body.email, req.body.password, function(data) {
        console.log(data)
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
    account.createCharacter(req.body, function() {
        res.send(data)
    })
}