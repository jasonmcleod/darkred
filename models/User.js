var User = {

    authenticate:function(email, password, cb) {
        db.where({email:email, password:password}).get('accounts',function(err, results) {
            if(results.length==0) {
                cb({success:0})
            } else {
                User.characterList(results[0].id, function(characters) {
                    cb({success:1, token:User.generateToken(results[0].id), characters:characters})
                })
            }
        })
    },

    generateToken:function(account) {
        var token = Math.random()*99999;
        db.insert('account_tokens', {token:token, account:account})
        return token;
    },

    destroyTokens:function(account) {
        db.where({account:account}).delete('account_tokens')
    },

    findCharacter:function(character, token, cb) {

        db.query([
            "SELECT characters.*, accounts.id as account",
            "FROM account_tokens, characters, accounts",
            "WHERE account_tokens.account = characters.account AND characters.id = " + character + " AND account_tokens.token = '" + token + "'"
        ].join(' '),function(err, results) {
            if(results.length==1) User.destroyTokens(results[0].account)
            cb(results)
        })

    },

    characterList:function(account, cb) {
        db.where({account:account}).get('characters', function(err, results) {
            cb(results)
        })
    }

}

module.exports = User;