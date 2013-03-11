var config = require('../config/application');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : config.database.host,
  user     : config.database.user,
  port     : config.database.port,
  password : config.database.pass
});

connection.connect();
connection.query('USE ' + config.database.database);

function query(table, options, fields, cb) {
    if(typeof fields == 'function') { cb=fields; fields='*';}

    var args = [];
    for(var o in options) {
        args.push('`' + o + '` = "' + options[o] +'"');
    }

    var queryString = 'SELECT ' + fields + ' FROM `' + table + '` WHERE ' + args.join(' && ')
    console.log(queryString)
    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        cb(rows)
    });

}

function insert(table, data, cb) {

    var keys = [];
    var vals = [];
    for(var f in data) {
        keys.push(f.toString())
        vals.push(isNaN(data[f]) ? '"' + data[f] + '"' : data[f])
    }
    var queryString = 'INSERT INTO `' + table + '` (`' + keys.join('`,`') + '`) VALUES (' + vals.join(',') + ')'
    console.log(queryString)

    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        cb(rows)
    });

}

module.exports.query = query;
module.exports.insert = insert