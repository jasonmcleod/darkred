var mysql      = require('mysql');
var config     = require('./config/application');

var connection = mysql.createConnection({
  host     : config.database.host,
  user     : config.database.user,
  password : config.database.pass,
  port     : config.database.port,
  database : config.database.database
});

var tables = [
    'accounts',
    'accounts_characters',
    'characters',
    'migrations',
    'encounters',
    'encounters_spawns',
    'fixture_defs',
    'fixtures',
    'migrations',
    'npc_defs',
    'npcs',
    'spawns',
    'spawns_npcs'
]

function next() {
    tables.splice(0,1)
    drop()
}

connection.connect();

function drop() {
    if(tables.length==0) { connection.end(); return false; }
    table = tables[0]
    connection.query('DROP TABLE ' + table + ';', function(err, rows, fields) {
        console.log('dropped ' + table)
        next();
    });
}
drop()