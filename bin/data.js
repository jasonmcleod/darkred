var orm = require('orm');
var config = require('../config/application');

controllers = {};

orm.connect(config.connectionString, function (err, db) { if (err) throw err;
    global.db = db;

    var Encounter = require('../models/Encounter');
    var Spawn = require('../models/Spawn');
    var Npc = require('../models/Npc');
    var Account = require('../models/Account');
    var Character = require('../models/Character');

    Npc.create([{
        name:'Test NPC',
        hp:1000
    }], function(err, npcs) {
        Encounter.create([{
            name:'Test Encounter 1'
        }], function(err, encounters) {

            Spawn.create([{
                name:'Test Encounter 1 - Test Spawn 1',
                chance:80,
                low:4,
                high:10,
                npc:npcs[0].id
            }], function(err, spawns) {
                encounters[0].addSpawns(spawns[0], function() {
                    console.log(arguments)
                })
            })
        })
    });



    Account.create([{
        email:'tests',
        password:'tests',
        activated:1
    }], function(err, accounts) {
        console.log(accounts)

        Character.create([{
            name:'test character'
        }], function(err, characters) {
            accounts[0].addCharacters(characters[0])
        })
    })


})