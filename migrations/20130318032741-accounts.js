var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('accounts', {
        id:{type: 'int', primaryKey:true, autoIncrement: true},
        email:'string',
        password:'string',
        activated:'int',
        token:'string',
        activationCode:'string'
    },callback())
};

exports.down = function(db, callback) {

};
