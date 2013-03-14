var Email = require('./Email');

var Account = function(options) {

    if(arguments.length==0) options = {}
    var self = this;

    this.password = options.password || '';
    this.email = options.email || '';

    this.create = function(details, cb, skipEmail) {

        db.where({email:details.email}).get('accounts', function(err, results) {

            if(results.length>0) {
                cb({success:0, error:"Email already registered"})
                return false;
            } else {
                var activationCode = Math.floor(Math.random()*999999999)

                details.activated = 0;
                db.insert('accounts', details, function(err, results) {

                    db.insert('account_activations', {account:results.insertId, code:activationCode}, function(err, results) {

                        if(skipEmail === undefined) {
                            var msg = new Email({
                                to:details.email,
                                template:'account-created',
                                subject:'Activation',
                                locals:{
                                    activationCode:activationCode
                                }
                            },function(err, results) {
                                // console.log(err, results)
                                if(err) {
                                    cb({success:0, results:results, err:err})
                                } else {
                                    self.id = results.insertId
                                    cb({success:1, results:results})
                                }
                            })
                        } else {
                            self.id = results.insertId
                            cb({success:1, results:results})
                        }

                    })
                })
            }
        })


    }

    this.activate = function(code, cb) {
        db.where({code:code}).get('account_activations', function(err, results) {
            if(results.length==1) {
                self.id = results[0].account
                db.where({id:self.id}).update('accounts',{activated:1}, function(err, results) {

                    db.where({code:code}).delete('account_activations')

                    cb({success:1})
                })
            } else {
                cb({success:0})
            }
        })
    }

    this.authenticate = function(email, password, cb) {
        db.where({email:email, password:password}).get('accounts',function(err, results) {
            if(results.length==0) {
                cb({success:0})
            } else {
                self.id = results[0].id
                if(results[0].activated==1) {
                    self.characterList(function(characters) {
                        cb({success:1, token:self.generateToken(results[0].id), characters:characters})
                    })
                } else {
                    cb({success:0, error:'Account has not been activated'})
                }
            }
        })
    }

    this.authByToken = function(token, cb) {
        db.where({token:token}).get('account_tokens', function(err, results) {
            if(results.length==1) {
                self.id = results[0].account
                cb({success:1})
            } else {
                cb({success:0})
            }
        })
    }

    this.generateToken = function() {
        var token = Math.random()*99999;
        db.insert('account_tokens', {token:token, account:self.id})
        return token;
    }

    this.destroyTokens = function() {
        db.where({account:self.id}).delete('account_tokens')
    }

    this.characterList = function(cb) {
        var account = self.id
        db.where({account:self.id}).get('characters', function(err, results) {
            cb(results)
        })
    }

    this.findCharacter = function(character, token, cb) {

        db.query([
            "SELECT characters.*, accounts.id as account",
            "FROM account_tokens, characters, accounts",
            "WHERE account_tokens.account = characters.account AND characters.id = " + character + " AND characters.account = accounts.id AND account_tokens.token = '" + token + "'"
        ].join(' '),function(err, results) {
            if(results.length==1) self.destroyTokens(results[0].account)
            cb(results)
        })

    }

    this.createCharacter = function(token, details, cb) {

        db.where({token:token}).get('account_tokens', function(err, results) {

            if(results.length==0) { cb({success:0, error:'missing token'}); return; }
            details.account = results[0].account

            db.where({name:details.name}).get('characters', function(err, results) {
                if(results.length>0) {
                    cb({success:0, error: 'Character name in use'});
                } else {
                    db.insert('characters', details, function(err, results) {
                        cb({success:1, results:results})
                    })
                }
            })
        })
    }

    return this;

}

module.exports = Account