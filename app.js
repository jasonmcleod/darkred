var config = require('./config/application');
var express = require('express');
var routes = require('./routes');
var ajax = require('./routes/ajax');
var hbs = require('express-hbs');
var socketio = require('socket.io');
var app = module.exports = express();
var server = require('http').createServer(app)
var util = require('util');
db = require('./lib/db')

// load models
var Instance = require('./models/instance')

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret:'as09fj2p3oj23f0i32'}));
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// build front-end file list
require('./lib/frontEndPackage').generate(function(files) { global.frontEndPackage = files; })

// Routes
app.get('/', routes.index);
app.post('/auth', ajax.auth);
app.get('/login', ajax.login)

// shared directory
require("fs").readdirSync("./shared/").forEach(function(file) {
    app.get('/shared/' + file, function(req, res) {
        require("fs").readFile('./shared/' + file, function(err, data) {
            res.writeHead(200, {'Content-Type':'text/javascript'});
            res.end(data, 'utf-8');
        })
    })
});

// bootstrap app
app.instances = {};

// Start server
server.listen(3000)
io = socketio.listen(server);
io.set('log level', 1);

var instance = new Instance('main');
instance.attachPacketHandlers(io)
app.instances[instance.id] = instance;