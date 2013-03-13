var User = {

    authenticate:function(email, password, cb) {
        db.where({email:email, password:password}).get('accounts',function(err, results) {
            console.log(results)
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
        db.insert('account_tokens', {token:token, account:account},function(err, results) {

        })
        return token;
    },

    findCharacter:function(character, token, cb) {

        db.query([
            "SELECT characters.*",
            "FROM account_tokens, characters, accounts",
            "WHERE account_tokens.account = characters.account AND characters.id = " + character + " AND account_tokens.token = '" + token + "'"
        ].join(' '),function(err, results) {
            console.log(results)
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