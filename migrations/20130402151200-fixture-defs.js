var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('fixture_defs', {
        id:{type: 'int', primaryKey:true, autoIncrement: true},
        name:'string',
        sprite:'string'
    },callback())
};

exports.down = function(db, callback) {

};
