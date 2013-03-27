var config = require('./config/application');
var MapParser = require('./lib/MapParser');
var Encounter = require('./models/Encounter');
var Npc = require('./models/Npc');
var Player = require('./models/Player');
var WorldNpc = require('./models/WorldNpc');

var Mainloop = function(app, io) {

    var self = this;

    this.players = {}
    this.npcs = []

    this.map = new MapParser(config.map)
    this.map.encounters.map(function(e) {
        Encounter.find({id:e.properties.id},function(err, data) {

            if(data.length==0) {
                Encounter.create([{
                    id:e.id,
                    name:e.name,
                    x:e.x,
                    y:e.y,
                    width:e.width,
                    height:e.height
                }], function(err, results) {
                    self.addNpc(results[0])
                })
            } else {
                self.addNpc(data)
            }
        })
    })

    setInterval(this.loop,20, this, io)

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

Mainloop.prototype.addNpc = function() {
    var npc = new WorldNpc({id:this.npcs.length});
    this.npcs.push(npc);
    return npc;
}

Mainloop.prototype.loop = function(self, io) {
    for(var n in self.npcs) {
        self.npcs[n].wander(io)
    }
    //console.log(instance);
    // console.log('looping...')
}

module.exports = Mainloop
