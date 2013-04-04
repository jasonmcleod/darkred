function SpriteWithContainer(path, width, height) {

    // create a container so we can rotate this sprite on it's center
    var container = new createjs.Container();

    var img = new Image();
    img.src = path
    img.onload = function() {
        var spriteSheet = new createjs.SpriteSheet({
            images: [img],
            frames: {width:width, height:height, regX:width/2, regY:height/2},
            animations: {
                alive:{frames:[0], frequency:5}
            }
        });

        var bitmap = new createjs.BitmapAnimation(spriteSheet);
        bitmap.rotation = 270
        bitmap.scaleX = bitmap.scaleY = .75
        bitmap.gotoAndPlay('alive')
        //playerContainer.addChild(self.bitmap)
        container.addChild(bitmap);
    }

    return container;
}