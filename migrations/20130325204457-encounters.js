var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('encounters', {
        id:{type: 'int', primaryKey:true, autoIncrement: true},
        name:'string',
        x:'int',
        y:'int',
        width:'int',
        height:'int'
    },callback())
};

exports.down = function(db, callback) {

};
