var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('fixtures', {
        id:{type: 'int', primaryKey:true, autoIncrement: true},
        name:'string',
        fixture:'int',
        x:'int',
        y:'int'
    },callback())
};

exports.down = function(db, callback) {

};
