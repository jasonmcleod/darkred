var orm = require('orm');
var config = require('../config/application');

controllers = {};

orm.connect(config.connectionString, function (err, db) { if (err) throw err;
    global.db = db;

    var Fixture = require('../models/Fixture');

    var Encounter = require('../models/Encounter');
    var Spawn = require('../models/Spawn');

    var MapParser = require('../lib/MapParser');

    var map = new MapParser(config.map)
    map.encounters.map(function(e) {
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
                    db.close()
                })
            }
        })
    })

    map.fixtures.map(function(e) {
        Fixture.find({id:e.properties.id},function(err, data) {
            if(data.length==0) {
                Fixture.create([{
                    id:e.id,
                    name:e.name,
                    x:e.x,
                    y:e.y,
                }], function(err, results) {
                    db.close()
                })
            }
        })
    })

})