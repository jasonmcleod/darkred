var LocalPlayer = new Base;
LocalPlayer.extend({
    moveBy:function(options) {
        this.sprite.globalx += options.x || 0
        this.sprite.globaly += options.y || 0
        this.$scope.socket.emit('move', options)
        this.syncCamera()
    },

    moveTo:function(options) {
        this.sprite.globalx = options.x || this.sprite.globalx
        this.sprite.globaly = options.y || this.sprite.globalx
        this.sprite.rotation = options.rotation || this.sprite.rotation
        this.syncCamera()
    },

    syncCamera:function() {
        this.$scope.camera.x = this.sprite.globalx - this.$scope.camera.width *  this.$scope.tileSize /2
        this.$scope.camera.y = this.sprite.globaly - this.$scope.camera.height * this.$scope.tileSize /2
    },

    join:function() {
        this.$scope.socket.emit('join','test')

        this.sprite = new SpriteWithContainer('/assets/sprites/fed.png', 32, 32)
        this.$scope.renderer.stage.add(this.sprite);

        this.$scope.socket.emit('join')
    },
    handleInitialData:function(data) {
        this.moveTo({x:data.x, y:data.y, rotation: data.rotation})
    }
})

