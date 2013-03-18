var routes = require('../routes');
var account = require('../controllers/account');
var character = require('../controllers/character');
var chat = require('../controllers/chat');

exports.init = function(app, io, instance) {

    // root
    app.get('/',                            routes.index);

    // authentication
    app.post('/auth',                       account.authenticate)

    // account
    app.post('/accounts/create',            account.create)
    app.get('/accounts/activate/:code',     account.activate)

    // character
    app.post('/characters/create',          character.create)
    app.get('/characters/list',             character.list)


    io.sockets.on('connection', function(socket) {
        for(var c in controllers) {
            controllers[c].bindSocket(socket, io, instance)
        }
    })


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