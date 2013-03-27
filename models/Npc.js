var Npc = db.define("npcs", {
    id: Number,
    name: String,
    level: String,
    hp:Number
});

module.exports = Npc;