var files = ''

var FixtureDef = require('../models/FixtureDef');
var NpcDef = require('../models/NpcDef');


require('../lib/frontEndPackage').generate('editor', function(data) {
    files = data
})

exports.index = function(req, res){
    res.render('editor', {
        frontEndPackage:files
    });
};

exports.fixtureDefs = function(req, res){
    FixtureDef.find(function(err, data) {
        res.send(data)
    })
};

exports.npcDefs = function(req, res){
    NpcDef.find(function(err, data) {
        res.send(data)
    })
};
