var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('encounters_spawns', {
        id:{type: 'int', primaryKey:true, autoIncrement: true},
        encounters_id:'string',
        spawns_id:'int'
    },callback())
};

exports.down = function(db, callback) {

};
