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

        this.sprite = new SpriteWithContainer('/assets/sprites/fed.png', 32, 32)
        this.sprite.globalx = this.$scope.camera.width *  this.$scope.tileSize / 2;
        this.sprite.globaly = this.$scope.camera.height * this.$scope.tileSize / 2;
        this.$scope.renderer.stage.add(this.sprite);

        // socket.emit('hi', {yay:'!'})
    }
})

