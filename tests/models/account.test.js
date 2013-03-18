// var orm = require('orm');
// var config = require('../../config/application');
//
// describe('Connection', function() {
//
//     it('should connect to the database and run tests', function(done) {
//
//         orm.connect("mysql://" + config.database.user + ":" + config.database.pass + "@" + config.database.host + ":" + config.database.port + "/" + config.database.database, function (err, db) {
//
//             global.db = db
//
//             var Account = require('../../models/Account');
//
//             Account.find({email:'tests'}).remove()
//
//             if (err) throw err;
//
//             describe('New Account', function() {
//
//                 it('should create a new account with a unique email, and valid credential', function(done) {
//                     Account.create([{
//                         email: 'tests',
//                         password:'tests',
//                         activated:0,
//                     }], function(err, results) {
//                         results[0].email.should.equal('tests')
//                         done();
//                     })
//                 })
//             });
//
//             done();
//         })
//     })
// })