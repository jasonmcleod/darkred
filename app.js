var config = require('./config/application');
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var hbs = require('express-hbs');
var socketio = require('socket.io');
var app = module.exports = express();
var server = require('http').createServer(app)

// load models
var Instance = require('./models/instance')


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
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
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// bootstrap app
app.instances = {};

// Start server
server.listen(3000)
io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    console.log('connection')
    socket.emit('news', { hello: 'world' });
    socket.on('hi', function (data) {
        console.log(data);
    });
});
io.set('log level', 1);

// var instance = new Instance('challenger-io');
// instance.attachPacketHandlers(app.io)
// app.instances[instance.id] = instance;


