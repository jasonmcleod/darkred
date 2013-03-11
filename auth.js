var everyauth = require('everyauth');
module.exports.setup = function() {
    var usersById = {};
    var nextUserId = 0;
    var usersByTwitId = {};

    function addUser (source, sourceUser) {
        var user;
        if (arguments.length === 1) { // password-based
            user = sourceUser = source;
            user.id = ++nextUserId;
            return usersById[nextUserId] = user;
            } else { // non-password-based
                user = usersById[++nextUserId] = {id: nextUserId};
                user[source] = sourceUser;
            }
            return user;
        }

    everyauth.everymodule
        .findUserById( function (id, callback) {
            callback(null, usersById[id]);
        });

    // twitter
    everyauth.twitter
        .consumerKey('hAZligGKajgHAEqHrulNQ')
        .consumerSecret('PSoJmRZtsIomvmWtesbG8EXJMswDhpMeXm0Og1o')
        .findOrCreateUser( function (sess, accessToken, accessSecret, twitUser) {
            return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
        })
        .redirectPath('/');


    everyauth
        .password
        .loginWith('email')
        .getLoginPath('/login')
        .postLoginPath('/login')
        .loginView('login.ejs')
        .loginLocals( function (req, res, done) {
            setTimeout( function () {
                done(null, {
                    title: 'Async login'
                });
                }, 200);
            })
        .authenticate( function (login, password) {
            var errors = [];
            if (!login) errors.push('Missing login');
            if (!password) errors.push('Missing password');
            if (errors.length) return errors;
            var user = usersByLogin[login];
            if (!user) return ['Login failed'];
            if (user.password !== password) return ['Login failed'];
            return user;
        })

        .getRegisterPath('/register')
        .postRegisterPath('/register')
        .registerView('register.ejs')
        .registerLocals( function (req, res, done) {
            setTimeout( function () {
                done(null, {
                    title: 'Async Register'
                });
                }, 200);
            })
        .validateRegistration( function (newUserAttrs, errors) {
            var login = newUserAttrs.login;
            if (usersByLogin[login]) errors.push('Login already taken');
            return errors;
        })
        .registerUser( function (newUserAttrs) {
            var login = newUserAttrs[this.loginKey()];
            return usersByLogin[login] = addUser(newUserAttrs);
        })

        .loginSuccessRedirect('/')
        .registerSuccessRedirect('/');
}