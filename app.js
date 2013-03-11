var config = require('./config/application');
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var hbs = require('express-hbs');
var socketio = require('socket.io');
var app = module.exports = express();
var server = require('http').createServer(app)
var util = require('util');
// var everyauth = require('everyauth');
// require('./auth').setup();
// require('./lib/objectWatch');


var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));











// load models
var Instance = require('./models/instance')

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret:'as09fj2p3oj23f0i32'}));
  // app.use(everyauth.middleware());
  app.use(passport.initialize());
  app.use(passport.session());
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
// app.get('/partials/:name', routes.partials);

// JSON API
// app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);


app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

// bootstrap app
app.instances = {};

// Start server
server.listen(3000)
io = socketio.listen(server);
io.set('log level', 1);

var instance = new Instance('main');
instance.attachPacketHandlers(io)
app.instances[instance.id] = instance;


