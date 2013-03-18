var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('characters', {
        id:{type: 'int', primaryKey:true},
        name:'string',
        xp:'int'
    },callback())
};

exports.down = function(db, callback) {

};
