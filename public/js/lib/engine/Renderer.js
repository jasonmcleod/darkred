function Renderer(options) {
    var options = options || {}

    var camera = options.camera || false; if(!camera) console.error('Renderer needs a Camera() passed into it.');
    var tileset = options.tileset || false; if(!tileset) console.error('Renderer needs a MapParser.tileset passed into it.');
    var map = options.map || false; if(!tileset) console.error('Renderer needs a MapParser.map passed into it.');

    this.canvas = document.createElement('canvas');
    this.canvas.width = options.width || 640;
    this.canvas.height = options.height || 480;
    var ctx = this.canvas.getContext('2d')

    var easelStage = new createjs.Stage(this.canvas);
    easelStage.autoClear = true;
    var stage = new StageManager({stage:easelStage})

    easelStage.update();

    var renderBuffer = function(x,y) {

        // if(x==lastBufferRender.x && y==lastBufferRender.y) return;

        // var walls = [];

        for(var yy=0;yy<camera.height+1;yy++) {
            for(var xx=0;xx<camera.width+1;xx++) {

                var tile = map[yy + camera.y][xx + camera.x];
                renderTile(ctx, tile-1, xx*options.tileSize,yy*options.tileSize)
                // if($.inArray(tile, tilesThatBlockView) >-1) walls[walls.length] = {x:xx, y:yy}
            }
        }

        // lastBufferRender = {x:x, y:y}

        // return walls;

        // easelStage.update();
    }

    var renderTile = function(ctx, tile, x, y) {
        var sourceY = Math.floor(tile / tileset.width)
        var sourceX = tile - sourceY * tileset.width
        ctx.drawImage(tileset.img, sourceX * options.tileSize, sourceY* options.tileSize, options.tileSize, options.tileSize, x, y, options.tileSize, options.tileSize)

    }


    return {
        canvas:this.canvas,
        stage:stage,
        easelStage:easelStage,
        renderBuffer:renderBuffer
    };
}