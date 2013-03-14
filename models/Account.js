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
                self.characterList(results[0].id, function(characters) {
                    cb({success:1, token:self.generateToken(results[0].id), characters:characters})
                })
            }
        })
    }

    this.generateToken = function(account) {
        var token = Math.random()*99999;
        db.insert('account_tokens', {token:token, account:account})
        return token;
    }

    this.destroyTokens = function(account) {
        db.where({account:account}).delete('account_tokens')
    }

    this.characterList = function(account, cb) {
        db.where({account:account}).get('characters', function(err, results) {
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