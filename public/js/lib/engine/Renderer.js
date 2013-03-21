function Renderer(options) {
    var self = this;

    var options = options || {}
    options.width = options.width || 640;
    options.height = options.height || 480;

    // localize camera, tileset, and map. throw errors if they are not passed correctly
    var camera =    options.camera  || false; if(!camera)  console.error('Renderer needs a Camera() passed into it.');
    var tileset =   options.tileset || false; if(!tileset) console.error('Renderer needs a MapParser.tileset passed into it.');
    var map =       options.map     || false; if(!tileset) console.error('Renderer needs a MapParser.map passed into it.');

    var finalCanvas = document.createElement('canvas');
    finalCanvas.width = options.width;
    finalCanvas.height = options.height;
    var finalCtx = finalCanvas.getContext('2d')

    // setup a canvas to render the tileset
    var bufferCanvas = document.createElement('canvas');
    bufferCanvas.width = options.width;
    bufferCanvas.height = options.height;
    var bufferCtx = bufferCanvas.getContext('2d')

    // setup a canvas to use as the easel stage
    var stageCanvas = document.createElement('canvas')
    stageCanvas.width = options.width;
    stageCanvas.height = options.height;
    var stageCtx = stageCanvas.getContext('2d')

    // initialize an easel stage
    var easelStage = new createjs.Stage(stageCanvas);
    easelStage.autoClear = true;

    // initilaize a stage manager to help add/remove elements
    var stage = new StageManager({stage:easelStage})
    STAGE = stage;

    // cache the last zone that was drawn. if we are asked to draw here again, abort.
    lastBufferRender = {x:undefined,y:undefined};

    // method to render the tiles to the buffer
    var renderBuffer = function(x,y) {

        if(x==lastBufferRender.x && y==lastBufferRender.y) return;

        for(var yy=0;yy<camera.height+1;yy++) {
            for(var xx=0;xx<camera.width+1;xx++) {

                var mapX = xx + ~~(camera.x/options.tileSize)
                var mapY = yy + ~~(camera.y/options.tileSize)

                if(!map[mapY] || !map[mapY][mapX]) { return }

                var tile = map[mapY][mapX][0];
                renderTile(bufferCtx, tile-1, xx*options.tileSize,yy*options.tileSize)
            }
        }

        for(var yy=0;yy<camera.height+1;yy++) {
            for(var xx=0;xx<camera.width+1;xx++) {

                var mapX = xx + ~~(camera.x/options.tileSize)
                var mapY = yy + ~~(camera.y/options.tileSize)

                if(!map[mapY] || !map[mapY][mapX]) { return }

                var tile = map[mapY][mapX][1];
                renderTile(bufferCtx, tile-1, xx*options.tileSize,yy*options.tileSize)
            }
        }

        lastBufferRender = {x:x, y:y}

        return true;
    }


    // method to render a single tile onto the buffer
    var renderTile = function(ctx, tile, x, y) {
        var sourceY = Math.floor(tile / tileset.width)
        var sourceX = tile - sourceY * tileset.width
        ctx.drawImage(tileset.img, sourceX * options.tileSize, sourceY* options.tileSize, options.tileSize, options.tileSize, x, y, options.tileSize, options.tileSize)
    }


    // method to render the terrain base
    var render = function(x,y) {

        finalCtx.drawImage(bufferCanvas,x%options.tileSize,y%options.tileSize, camera.width * options.tileSize, camera.height * options.tileSize, 0, 0, camera.width * options.tileSize, camera.height * options.tileSize)

        stage.elements.map(function(elm) {
            elm.x = elm.globalx - x
            elm.y = elm.globaly - y
        })
        stage.stage.update()

        finalCtx.drawImage(stageCanvas, 0, 0, camera.width * options.tileSize, camera.height * options.tileSize, 0, 0, camera.width * options.tileSize, camera.height * options.tileSize)
    }

    var start = function() {
        (function animloop(){
          requestAnimFrame(animloop);
          loop();
        })();
    }

    var loop = function() {
        renderBuffer(camera.x,camera.y)
        render(camera.x, camera.y);
    }

    // return whats public
    return {
        stage:stage,
        stageCanvas:stageCanvas,
        easelStage:easelStage,
        render:render,
        renderBuffer:renderBuffer,
        bufferCanvas:bufferCanvas,
        finalCanvas:finalCanvas,
        start:start
    };
}