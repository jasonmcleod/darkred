var LocalPlayer = new Base;
LocalPlayer.extend({
    moveBy:function(options) {
        this.sprite.globalx += options.x || 0
        this.sprite.globaly += options.y || 0

        this.$scope.camera.x += options.x || 0
        this.$scope.camera.y += options.y || 0
    },
    join:function() {
        this.socket.emit('join','test')

        // create a container so we can rotate this sprite on it's center
        var container = new createjs.Container();

        // move to the local middle of the screen
        container.globalx = this.$scope.camera.width * this.$scope.tileSize / 2;
        container.globaly = this.$scope.camera.height * this.$scope.tileSize / 2;

        // white box placeholder
        var graphic = new createjs.Shape();
        graphic.x = -8;
        graphic.y = -8;
        graphic.graphics.beginFill('#FFFFFF').drawRect(0,0,16,16)

        // attach sprite to container
        container.addChild(graphic);

        // add it to the stage
        this.$scope.renderer.stage.add(container);

        // make the container available to player as "sprite"
        this.sprite = container

        // socket.emit('hi', {yay:'!'})
    }
})

