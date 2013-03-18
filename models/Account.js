var Character = require('../models/Character');
var Account = db.define("accounts", {
    id: Number,
    email: String,
    password: String,
    activated: Number,
    token:String,
    activationCode:String
}, {
    methods: {
        fullName: function () {
            return this.name + ' ' + this.surname;
        },
        generateToken: function(cb) {
            this.token = Math.random()*99999999999;
            this.save(cb)
        },
        generateActivationCode:function(cb) {
            this.activationCode = Math.random()*99999999999;
            this.save(cb)
        }
    },
    validations: {
        //age: orm.validators.rangeNumber(18, undefined, "under-age")
    }
});

Account.hasMany("characters", Character); // omitting the other Model, it will assume self model

module.exports = Account