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