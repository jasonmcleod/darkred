function Renderer(options) {
    var options = options || {}


    // localize camera, tileset, and map. throw errors if they are not passed correctly
    var camera = options.camera || false; if(!camera) console.error('Renderer needs a Camera() passed into it.');
    var tileset = options.tileset || false; if(!tileset) console.error('Renderer needs a MapParser.tileset passed into it.');
    var map = options.map || false; if(!tileset) console.error('Renderer needs a MapParser.map passed into it.');


    // setup a canvas to render the tileset
    var bufferCanvas = document.createElement('canvas');
    bufferCanvas.width = options.width || 640;
    bufferCanvas.height = options.height || 480;
    var bufferCtx = bufferCanvas.getContext('2d')


    // setup a canvas to use as the easel stage
    var stageCanvas = document.createElement('canvas')
    stageCanvas.width = options.width || 640;
    stageCanvas.height = options.height || 480;
    var stageCtx = stageCanvas.getContext('2d')


    // initialize an easel stage
    var easelStage = new createjs.Stage(stageCanvas);
    easelStage.autoClear = true;


    // initilaize a stage manager to help add/remove elements
    var stage = new StageManager({stage:easelStage})


    // cache the last zone that was drawn. if we are asked to draw here again, abort.
    lastBufferRender = {x:undefined,y:undefined};


    // method to render the tiles to the buffer
    var renderBuffer = function(x,y) {

        // if(x==lastBufferRender.x && y==lastBufferRender.y) return;

        // var walls = [];

        for(var yy=0;yy<camera.height+1;yy++) {
            for(var xx=0;xx<camera.width+1;xx++) {

                var tile = map[yy + camera.y][xx + camera.x];
                renderTile(bufferCtx, tile-1, xx*options.tileSize,yy*options.tileSize)
                // if($.inArray(tile, tilesThatBlockView) >-1) walls[walls.length] = {x:xx, y:yy}
            }
        }

        lastBufferRender = {x:x, y:y}

        // return walls;

        // easelStage.update();
    }


    // method to render a single tile onto the buffer
    var renderTile = function(ctx, tile, x, y) {
        var sourceY = Math.floor(tile / tileset.width)
        var sourceX = tile - sourceY * tileset.width
        ctx.drawImage(tileset.img, sourceX * options.tileSize, sourceY* options.tileSize, options.tileSize, options.tileSize, x, y, options.tileSize, options.tileSize)
    }


    // method to render the terrain base
    var render = function(x,y) {
        stageCtx.drawImage(bufferCanvas, 0, 0)
    }


    // return whats public
    return {
        stage:stage,
        stageCanvas:stageCanvas,
        easelStage:easelStage,
        render:render,
        renderBuffer:renderBuffer
    };
}