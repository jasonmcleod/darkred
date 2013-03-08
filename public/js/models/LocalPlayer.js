function LocalPlayer(options) {

    this.moveBy = function(options) {


        var final = {
            x:this.x + (options.x || 0),
            y:this.y + (options.y || 0)
        };

        if(!this.$scope.mapParser.blocked(final.x, final.y)) {

            this.x = final.x
            this.y = final.y;

            this.sprite.globalx += options.x || 0
            this.sprite.globaly += options.y || 0
            this.x = this.sprite.globalx
            this.y = this.sprite.globaly

            this.$scope.socket.emit('move', {x:this.x, y:this.y})

            this.syncCamera()

        }

    }

    this.syncCamera = function() {
        this.$scope.camera.x = this.$scope.me.x - this.$scope.camera.width *  this.$scope.tileSize /2
        this.$scope.camera.y = this.$scope.me.y - this.$scope.camera.height * this.$scope.tileSize /2
    }

}