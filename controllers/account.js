var Email = require('../lib/Email');
var Account = require('../models/Account');
var Character = require('../models/Character');

// req/res
module.exports.authenticate = function(req, res) {
    Account.find({email:req.body.email, password:require('crypto').createHash('sha1').update(req.body.password).digest('hex')},function (err, accounts) {
        if(accounts.length==0) {
            res.send({success:0, error:'Incorrect email/password combination'})
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

module.exports.create = function(req, res) {
    Account.find({email:req.body.email}, function(err, results) {
        if(results && results.length>0) {
            res.send({success:0, error:"Email already registered"})
            return false;
        } else {

            Account.create([{
                email:req.body.email,
                password:require('crypto').createHash('sha1').update(req.body.password).digest('hex'),
                token:0,
                activationCode:0
            }],function(err, results) {

                results[0].generateActivationCode(function(err, account) {
                    if(!err) {
                        if(!req.body.test) {
                            var msg = new Email({
                                to:account.email,
                                template:'account-created',
                                subject:'Activation',
                                locals:{
                                    activationCode:account.activationCode
                                }
                            },function(err, results) {
                                if(err) {
                                    res.send({success:0, err:err})
                                } else {
                                    res.send({success:1})
                                }
                            })
                        } else {
                            res.send({success:1})
                        }
                    }
                })
            })
        }
    })
}

module.exports.activate = function(req, res) {
    Account.find({activationCode:req.params.code}, function(err, accounts) {
        if(err || accounts.length<=0) {
            res.redirect('/#activation-failed')
        } else {
            accounts[0].activated=1
            accounts[0].activationCode = '';
            accounts[0].save();
            res.redirect('/#activated')
        }
    })
}

module.exports.forgot = function(req, res) {
    Account.find({email:req.query.email}, function(err, results) {
        if(err || results.length<=0) {
            res.send({success:0, error:'No account found by that email.'})
        } else {
            results[0].generatePasswordCode(function(err, account) {
                if(!err) {
                    if(!req.query.test) {
                        var msg = new Email({
                            to:account.email,
                            template:'account-forgot',
                            subject:'Forgot Password',
                            locals:{
                                passwordCode:account.passwordCode
                            }
                        },function(err, results) {
                            if(err) {
                                res.send({success:0, err:err})
                            } else {
                                res.send({success:1})
                            }
                        })
                    } else {
                        res.send({success:1})
                    }
                }
            })
        }
    })

}

module.exports.resetStart = function(req, res) {
    res.redirect('/#reset/' + req.params.code || 'invalid')
}

module.exports.resetEnd = function(req, res) {
    Account.find({passwordCode:req.body.passwordCode||''}, function(err, results) {
        if(results.length<=0) {
            res.send({success:0})
        } else {
            results[0].password = req.body.password
            results[0].save();
            res.send({success:1})
        }
    })
}
//io
module.exports.bindSocket = function(socket, io, game) {
    socket.on('join', function(data) {

        Account.find({token:data.token}, function(err, accounts) {
            if(accounts.length) {
                accounts[0].getCharacters(function(err, characters) {

                    var found = false;
                    for(var c in characters) {
                        if(characters[c].id == data.character) {
                            var player = game.addPlayer(socket.id, characters[c].name);

                            socket.emit('instance', {game:game, me:player.id});
                            socket.emit('join-success', {me:player.id});

                            socket.broadcast.emit('playerJoin', player)
                            found = true
                        }
                    }

                    if(!found) {
                        socket.emit('join-fail', {me:player.id});
                    }

                })
            }
        })
    })

    socket.on('disconnect', function(data) {
        game.removePlayer(this.id);
        socket.broadcast.emit('playerDrop', {id:this.id});
    })

}

controllers['account'] = module.exports;