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

            var canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            var ctx = canvas.getContext('2d')
            ctx.drawImage(img,0,0)
            var imgsrc = ctx.getImageData(0,0,img.width,img.height)
            var imgdata = imgsrc.data
            for (var i = 0, n = imgdata.length; i <n; i += 4) {
                if(imgdata[i] == 255 && imgdata[i+2] == 255) {
                    imgdata[i+3] = 0
                }
            }

            ctx.putImageData(imgsrc, 0, 0)

            $('body')[0].appendChild(canvas)

            var tileset = {
                img:canvas,
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
                for(var y = 0;y < data.height; y++) {
                    for(var x = 0; x< data.width; x++) {
                        arr[y][x][z] = data.layers[z].data[y * data.height + x]
                    }
                }
            }

            options.callback(arr, tileset)
        }
    });

    this.blocked = function(x, y) {

        var tileX = Math.floor(x/options.tileSize)
        var tileY = Math.floor(y/options.tileSize)

        return blocksMovement.indexOf(arr[tileY][tileX][0])>-1
    }

}