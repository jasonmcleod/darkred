var WorldNpc = require('../models/WorldNpc');
var Npc = require('../models/Npc');

var Spawn = db.define("spawns", {
    id: Number,
    name: String,
    npc:Number,
    chance:Number,
    low:Number,
    high:Number,
}, {
});

Spawn.hasMany('npcs', Npc)
module.exports = Spawn;