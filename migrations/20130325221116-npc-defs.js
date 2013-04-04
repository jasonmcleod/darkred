var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('npc_defs', {
        id:{type: 'int', primaryKey:true, autoIncrement: true},
        name:'string',
        hp:'int',
        level:'int'
    },callback())
};

exports.down = function(db, callback) {

};
