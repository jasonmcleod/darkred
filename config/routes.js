var routes = require('../routes');
var account = require('../routes/account');

exports.init = function(app) {

    // root
    app.get('/',                            routes.index);

    // authentication
    app.post('/auth',                       account.index)

    // account
    app.post('/accounts/create',            account.create)
    app.get('/accounts/activate/:code',     account.activate)

    // character
    app.post('/characters/create',          account.createCharacter)
    app.get('/characters/list',             account.characterList)

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