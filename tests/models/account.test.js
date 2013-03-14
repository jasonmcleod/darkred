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

// delete test data from db
db.where({email:'tests'}).delete('accounts')
db.where({name:'testCharacter'}).delete('characters')

describe('New Account', function() {

    it('create a new account with a unique email, and valid credential', function(done) {
        account.create({email: account.email, password:account.password}, function(results) {

            results.success.should.equal(1)
            done();

        })
    })
});

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

    it('create a character with a unique name', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token

            account.createCharacter(token, {name:'testCharacter', class:1}, function(data) {
                data.success.should.equal(1)
                done();
            })

        })
    })

    it('fail when creating a character, if the name is in use', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token

            account.createCharacter(token, {name:'testCharacter', class:1}, function(results) {
                results.success.should.equal(0)
                done();
            })

        })
    })

    it('return a list of characters', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token
            account.findCharacter(account.id, token, function(chars) {
                chars.length.should.be.above(0)
                done();
            })
        })
    })

    it('allow me to select one of my own characters', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token
            account.findCharacter(account.id, token, function(chars) {
                chars[0].id.should.be.above(0)
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



})

describe('Tokens', function() {

    it('create a token for me', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token
            results.token.should.not.equal(false)
            db.where({token:token, account:account.id}).get('account_tokens', function(err, results) {
                results.length.should.equal(1)
                done()
            })
        })
    })

    it('remove my tokens from the database once I choose a character', function(done) {
        account.authenticate(account.email, account.password, function(results) {
            var token = results.token
            account.findCharacter(account.id, token, function(chars) {
                db.where({account:account.id}).get('account_tokens', function(err, results) {
                    results.length.should.equal(0)
                    done()
                })
            })
        })
    })

})