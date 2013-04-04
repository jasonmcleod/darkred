var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('npcs', {
        id:{type: 'int', primaryKey:true, autoIncrement: true},
        name:'string',
        npc:'int',
        hp:'int',
        x:'int',
        y:'int'
    },callback())
};

exports.down = function(db, callback) {

};
