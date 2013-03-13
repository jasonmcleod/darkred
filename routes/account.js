// var User = require('../models/User');
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
    account.create({email:'test!'})
}
