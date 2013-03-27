var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('spawns_npcs', {
        id:{type: 'int', primaryKey:true, autoIncrement: true},
        spawns_id:'int',
        npcs_id:'int',
    },callback())
};

exports.down = function(db, callback) {

};
