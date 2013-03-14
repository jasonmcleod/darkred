var Account = function(options) {

    if(arguments.length==0) options = {}
    var self = this;

    this.password = options.password || '';
    this.email = options.email || '';

    this.create = function(details, cb) {
        db.insert('accounts', details, function(err, results) {
            cb({success:1, results:results})
            self.id = results.insertId
        })
    }

    this.authenticate = function(email, password, cb) {
        db.where({email:email, password:password}).get('accounts',function(err, results) {
            if(results.length==0) {
                cb({success:0})
            } else {
                self.id = results[0].id
                self.characterList(function(characters) {
                    cb({success:1, token:self.generateToken(results[0].id), characters:characters})
                })
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

            if(results.length==0) { cb({success:0}); return; }
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