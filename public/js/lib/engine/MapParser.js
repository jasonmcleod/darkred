function MapParser(options) {

    MAP = this
    MAPOP = options

    var blocksMovement = []
    var blocksView = [];

    var arr = [];

    $.get(options.map, function(data) {

        // extract tile properties
        if(data.tilesets[0].hasOwnProperty('tileproperties')) {
            $.each(data.tilesets[0].tileproperties, function(key) {

                if(this.hasOwnProperty('blocksView')) {
                    //options.blockView.push(parseInt(key)+1)
                }

                if(this.hasOwnProperty('blocksMovement')) {
                    blocksMovement.push(parseInt(key)+1)
                }

            })
        }

        var tilesetFile = data.tilesets[0].image.split('/');
        tilesetFile = tilesetFile[tilesetFile.length-1]

        img = new Image()
        img.src = options.assetsPath + tilesetFile;
        img.onload = function() {
            // console.log(this.width)

            var tileset = {
                img:this,
                width:this.width / options.tileSize,
                height:this.height / options.tileSize
            }

            for(var y = 0;y < data.height; y++) {
                arr[y] = []
                for(var x = 0; x< data.width; x++) {
                    arr[y][x] = data.layers[0].data[y * data.height + x]
                }
            }
            options.callback(arr, tileset)
        }
    });

    this.blocked = function(x, y) {

        var tileX = Math.floor(x/options.tileSize)
        var tileY = Math.floor(y/options.tileSize)

        return blocksMovement.indexOf(arr[tileY][tileX])>-1
    }

}