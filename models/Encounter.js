var Spawn = require('../models/Spawn');

var Encounter = db.define("encounters", {
    id: Number,
    name: String,
    x: Number,
    y: Number,
    width:Number,
    height:Number
});

Encounter.hasMany('spawns', Spawn)
module.exports = Encounter;