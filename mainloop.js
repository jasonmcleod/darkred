var config = require('./config/application');
var MapParser = require('./lib/MapParser');
var Encounter = require('./models/Encounter');
var Npc = require('./models/Npc');
var Player = require('./models/Player');
var WorldNpc = require('./models/WorldNpc');
var EncounterManager = require('./managers/encounters');

var Mainloop = function(app, io) {

    var self = this;

    this.players = {}
    this.npcs = []

    this.map = new MapParser(config.map)
    this.encounterManager = new EncounterManager(this)

    setInterval(this.loop, 20, this, io)

    return this;
}

Mainloop.prototype.addPlayer = function(id, name) {
    var player = new Player(id, name);
    this.players[id] = player;
    return player;
}

Mainloop.prototype.removePlayer = function(id) {
    delete this.players[id]
}

Mainloop.prototype.addNpc = function(data) {
    var npc = new WorldNpc({id:this.npcs.length, x:Math.random()*200, y:Math.random()*200});
    this.npcs.push(npc);
    return npc;
}

Mainloop.prototype.loop = function(self, io) {
    for(var n in self.npcs) {
        self.npcs[n].wander(io)
    }
}

module.exports = Mainloop