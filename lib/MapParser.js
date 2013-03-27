var Encounter = require('../models/Encounter')
module.exports = function(path) {
    var data = require(path)

    var tiles = [];
    var encounters = [];

    // setup the 3D array
    for(var y = 0;y < data.height; y++) {
        tiles[y] = []
        for(var x = 0; x< data.width; x++) {
            tiles[y][x] = []
        }
    }

    // for each layer
    for(var z = 0; z < data.layers.length; z++) {
        if(data.layers[z].type == 'tilelayer') {
            for(var y = 0;y < data.height; y++) {
                for(var x = 0; x< data.width; x++) {
                    tiles[y][x][z] = data.layers[z].data[y * data.height + x]
                }
            }
        } else {
            if(data.layers[z].type == 'objectgroup') {
                if(data.layers[z].properties.type == 'encounters') {
                    for(var e in data.layers[z].objects) {
                        encounters.push(data.layers[z].objects[e])
                    }
                }
            }
        }
    }

    return {
        tiles:tiles,
        encounters:encounters
    };
}