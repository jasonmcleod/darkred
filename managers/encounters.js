var _ = require('underscore')
var jm = require('../lib/jm')

module.exports = function(self) {
    var Encounter = require('../models/Encounter');
    var Npc = require('../models/Npc');

    Encounter.find(function(err, encounters) {
        for(var e=0; e < encounters.length; e++) {



            (function(e) {
                encounters[e].getSpawns(function(err, spawns) {
                    for(var s=0;s<spawns.length;s++) {
                        for(var n=spawns[s].low; n<spawns[s].high;n++) {
                            if(_.chance(spawns[s].chance)) {
                                self.addNpc({
                                    npc:spawns[s].npc,
                                    x: _.between(encounters[e].x, encounters[e].width),
                                    y: _.between(encounters[e].y, encounters[e].height)
                                })
                            }
                        }
                    }
                })
            })(e)



        }
    })

}