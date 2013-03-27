var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('spawns', {
        id:{type: 'int', primaryKey:true, autoIncrement: true},
        name:'string',
        npc:'int',
        chance:'int',
        low:'int',
        high:'int'
    },callback())
};

exports.down = function(db, callback) {

};
