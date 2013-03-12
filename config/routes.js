var routes = require('../routes');
// var ajax = require('../routes/ajax');

var User = require('../models/User');

exports.init = function(app) {

    // root
    app.get('/', routes.index);

    // authenticate (accepts email/password), generates token
    app.post('/auth', User.authenticate);

    // login with token
    app.get('/login', User.findByToken)

    // app.get('/account/create', )

    // dynamically create routes for all files in the shared directory
    require("fs").readdirSync("./shared/").forEach(function(file) {
        app.get('/shared/' + file, function(req, res) {
            require("fs").readFile('./shared/' + file, function(err, data) {
                res.writeHead(200, {'Content-Type':'text/javascript'});
                res.end(data, 'utf-8');
            })
        })
    });

}