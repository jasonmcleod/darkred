var Account = require('../../models/Account');
var config = require('../../config/application');

var Db = require('mysql-activerecord');
db = new Db.Adapter({
    server: config.database.host,
    username: config.database.user,
    password: config.database.pass,
    database: config.database.database,
    port:config.database.port
});

var account = new Account({email:'tests',password:'tests'});

describe('Login', function() {

    it('find a user if login is valid', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            results.success.should.equal(1)
            done();
        })
    })

    it('fail to find a user if login is invalid', function(done) {
        account.authenticate(account.email, 'badpassword', function(results) {
            results.success.should.equal(0)
            done();
        })
    })

})

describe('Characters', function() {

    it('return a list of characters', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token
            account.findCharacter(1, token, function(chars) {
                chars[0].id.should.be.above(0)
                done();
            })
        })
    })

    it('allow me to select one of my own characters', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token
            account.findCharacter(1, token, function(chars) {
                chars[0].id.should.equal(1)
                done();
            })
        })
    })

    it('allow fail if i try to select a character thats not mine', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token
            account.findCharacter(-1, token, function(chars) {
                chars.length.should.equal(0)
                done();
            })
        })
    })

    it('create a character', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token

            account.createCharacter(token, {name:'testCharacter', class:1}, function(results) {
                results.insertId.should.not.equal(0)

                db.where({id:results.insertId}).delete('characters')
                done();
            })

        })
    })

})

describe('Tokens', function() {

    it('create a token for me', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token
            results.token.should.not.equal(false)
            db.where({token:token, account:1}).get('account_tokens', function(err, results) {
                results.length.should.equal(1)
                done()
            })
        })
    })

    it('remove my tokens from the database once I choose a character', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token
            account.findCharacter(1, token, function(chars) {
                db.where({account:1}).get('account_tokens', function(err, results) {
                    results.length.should.equal(0)
                    done()
                })
            })
        })
    })

})
