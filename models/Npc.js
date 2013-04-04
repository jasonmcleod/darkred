var Npc = db.define("npcs", {
    id: Number,
    name: String,
    x: Number,
    y: Number,
    hp:Number
});

module.exports = Npc;