var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('accounts_characters', {
        id:{type: 'int', primaryKey:true},
        accounts_id:'int',
        characters_id:'int'
    },callback())
};

exports.down = function(db, callback) {

};
