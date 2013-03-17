var Character = db.define("characters", {
    id: Number,
    name: String,
    xp: String
}, {
    methods: {
        level: function () {
            return this.name + ' ' + this.surname;
        }
    },
    validations: {
        //age: orm.validators.rangeNumber(18, undefined, "under-age")
    }
});

module.exports = Character;

// Character.hasOne("account", Account, {
//     reverse : "accounts"
// });
// Character.hasOne("account", Account, {
//     reverse : "account"
// });

// Character.hasOne("account", Account);

// Character.find({id:1},function(err, data) {
//
//     console.log(arguments)
//
//     data[0].getAccount(function() {
//         console.log(arguments)
//     })
//
// })