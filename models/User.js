var User = {


    authenticate:function(req, res) {
        db.query('accounts', {email:req.body.email, password:req.body.password}, '*', function(results) {
            if(results.length==0) {
                res.send({success:0})
            } else {

                User.characterList(results[0].id, function(characters) {
                    res.send({success:1, token:User.generateToken(results[0].id), characters:characters})
                })
            }
        })
    },


    generateToken:function(account) {
        var token = Math.random()*99999;
        db.insert('account_tokens', {token:token, account:account},function(results) {
            console.log(results)
        })
        return token;
    },


    findByToken:function(req, res) {
        db.query('account_tokens', {token:req.query.token},function(results) {
            if(results.length==0) {
                res.send({success:0})
            } else {
                console.log(req.socket)
                res.send({success:1, socket:req.socket.id})
            }
        })
    },

    characterList:function(account, cb) {
        db.query('characters', {account:account}, function(results) {
            cb(results)
        })
    }


}

module.exports = User;