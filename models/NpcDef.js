var NpcDef = db.define("npc_defs", {
    id: Number,
    name: String,
    level: String,
    hp:Number
});

module.exports = NpcDef;