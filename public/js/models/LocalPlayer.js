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

        var player = new createjs.Shape();
        player.graphics.beginFill('#FFFFFF').drawRect(0,0,16,16)
        player.globalx = this.$scope.camera.width * this.$scope.tileSize / 2;
        player.globaly = this.$scope.camera.height * this.$scope.tileSize / 2;

        // add it to the stage
        this.$scope.renderer.stage.add(player);
        this.sprite = player

        // socket.emit('hi', {yay:'!'})
    }
})

