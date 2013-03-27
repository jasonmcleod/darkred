function MapParser(options) {
    var self = this;

    MAP = this
    MAPOP = options

    var blocksMovement = []
    var blocksView = [];

    var arr = [];

    $.get(options.map, function(data) {

        console.log(data)

        self.layers = data.layers

        // extract tile properties
        if(data.tilesets[0].hasOwnProperty('tileproperties')) {
            $.each(data.tilesets[0].tileproperties, function(key) {

                if(this.hasOwnProperty('blocksView')) {
                    //options.blockView.push(parseInt(key)+1)
                }

                if(this.hasOwnProperty('blocksMovement') || this.hasOwnProperty('b')) {
                    blocksMovement.push(parseInt(key)+1)
                }

            })
        }

        var layers = [];
        for(var z = 0; z<data.layers.length; z++) {
            if(data.layers[z].hasOwnProperty('properties')) {
                layers.push(data.layers[z].properties.type)// == 'base' ? 0:1)
            // } else {
            //     layers.push(0)
            }
        }

        var tilesetFile = data.tilesets[0].image.split('/');
        tilesetFile = tilesetFile[tilesetFile.length-1]

        console.log(layers)

        img = new Image()
        img.src = options.assetsPath + tilesetFile;
        img.onload = function() {

            var tileset = {
                img:transparentImage(this),
                width:this.width / options.tileSize,
                height:this.height / options.tileSize
            }

            // setup the 3D array
            for(var y = 0;y < data.height; y++) {
                arr[y] = []
                for(var x = 0; x< data.width; x++) {
                    arr[y][x] = []
                }
            }

            // for each layer
            for(var z = 0; z < data.layers.length; z++) {
                console.log(data.layers[z].type)
                if(data.layers[z].type == 'tilelayer') {
                    for(var y = 0;y < data.height; y++) {
                        for(var x = 0; x< data.width; x++) {
                            arr[y][x][z] = data.layers[z].data[y * data.height + x]
                        }
                    }
                }
            }

            options.callback(arr, layers, tileset)
        }
    });

    this.blocked = function(x, y, ox, oy) {

        var tileX = Math.floor(x/(options.tileSize))
        var tileY = Math.floor(y/(options.tileSize))

        for(var z = 0; z<self.layers.length; z++) {
            if(blocksMovement.indexOf(arr[tileY][tileX][z]) >-1) return true
        }
    }

}