// var orm = require('orm');
// var config = require('../../config/application');
//
// controllers = {}
//
// describe('Connection', function() {
//     it('should connect to the database and run tests', function(allDone) {
//         orm.connect("mysql://" + config.database.user + ":" + config.database.pass + "@" + config.database.host + ":" + config.database.port + "/" + config.database.database, function (err, db) {
//             if (err) throw err;
//
//             global.db = db
//             global.Account = require('../../models/Account');
//
//             Account.find({email:'tests'}).remove()
//
//             var account = require('../../controllers/account');
//
//             describe("Create", function() {
//                 it("should create an account", function(done){
//                     var request = {
//                         body:{
//                             email:'tests',
//                             password:'tests',
//                             test:1
//                         }
//                     }
//                     var response = {
//                         send:function(data) {
//                             data.success.should.equal(1)
//                             done();
//                         }
//                     }
//                     account.create(request, response);
//                 });
//
//                 it("should fail to create an account if the email is in use", function(done){
//                      var request = {
//                          body:{
//                              email:'tests',
//                              password:'tests',
//                              test:1
//                          }
//                      }
//                      var response = {
//                          send:function(data) {
//                              data.success.should.equal(0)
//                              done();
//                          }
//                      }
//                      account.create(request, response);
//                  });
//             });
//
//             describe("Authentication / Activation", function() {
//
//                 it("fail to login if credentials are incorrect", function(done){
//                     var request = {
//                         body:{
//                             email:'tests-bad',
//                             password:'tests-bad'
//                         }
//                     }
//                     var response = {
//                         send:function(data) {
//                             data.success.should.equal(0)
//                             done();
//                         }
//                     }
//                     account.authenticate(request, response);
//                 });
//
//
//                 it("should block login if the account has not been activated", function(done){
//                     var request = {
//                         body:{
//                             email:'tests',
//                             password:'tests'
//                         }
//                     }
//                     var response = {
//                         send:function(data) {
//                             data.success.should.equal(0)
//                             done();
//                         }
//                     }
//                     account.authenticate(request, response);
//                 });
//
//                 it("should fail to activate the account if the code is invalid", function(done){
//
//                     var request = {
//                         params:{
//                             code:'badcode'
//                         }
//                     }
//                     var response = {
//                         redirect:function(data) {
//                             data.should.equal('/#activation-failed')
//                             done();
//                         }
//                     }
//
//                     account.activate(request, response);
//
//                 });
//
//                 it("should activate the account with a valid code", function(done){
//
//                     Account.find({email:'tests'},function(err, accounts) {
//                         var request = {
//                             params:{
//                                 code:accounts[0].activationCode
//                             }
//                         }
//                         var response = {
//                             redirect:function(data) {
//                                 data.should.equal('/#activated')
//                                 done();
//                             }
//                         }
//
//                         account.activate(request, response);
//                     })
//                 });
//
//                 it("login if the account has been activated", function(done){
//                     var request = {
//                         body:{
//                             email:'tests',
//                             password:'tests'
//                         }
//                     }
//                     var response = {
//                         send:function(data) {
//                             data.success.should.equal(1)
//                             done();
//                         }
//                     }
//                     account.authenticate(request, response);
//                 });
//
//             });
//
//             allDone();
//         })
//     })
// })