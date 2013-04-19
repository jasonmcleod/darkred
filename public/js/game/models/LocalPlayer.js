function LocalPlayer(options, $scope) {
    var self = this;

    $.extend(self, options)

    this.lastPushTime = 0;
    this.lastPushData = {}
    this.firingSpeed = 30;
    $scope.firing = false;
    $scope.hp = 60;

    var firingInterval = false;
    this.recoilFactor = 0

    $scope.$watch('firing', function(n) {
        if(n) {
            firingInterval = setInterval(function() {
                if(!n) clearInterval(firingInterval)
                self.fire(self);
            },self.firingSpeed)
        } else {
            clearInterval(firingInterval)
        }
    })

    this.fire = function() {
        var bullet = new Projectile({
            x:$scope.camera.x + ($scope.camera.width * app.game.tileSize / 2),
            y:$scope.camera.y + ($scope.camera.height * app.game.tileSize / 2),
            trajectoryX:$scope.mouseX + _.range(self.recoilFactor*-1, self.recoilFactor) - ($scope.camera.width * app.game.tileSize / 2),
            trajectoryY:$scope.mouseY + _.range(self.recoilFactor*-1, self.recoilFactor) - ($scope.camera.height * app.game.tileSize / 2),
            owner:self.id,
            speed:25
        }, $scope)

        $scope.socket.emit('fireProjectile', bullet);
    }

    this.moveBy = function(options) {

        var final = {
            x:this.x + (options.x || 0),
            y:this.y + (options.y || 0)
        };

        if(!this.$scope.mapParser.blocked(final.x, final.y, this.x, this.y)) {

            this.x = final.x
            this.y = final.y;

            this.sprite.globalx += options.x || 0
            this.sprite.globaly += options.y || 0
            this.rotation = this.sprite.rotation = options.rotation || this.rotation

            this.x = this.sprite.globalx;
            this.y = this.sprite.globaly;

            this.syncCamera()

            if((new Date()).getTime() - this.lastPushTime > 40) {
                if(this.lastPushData.x != this.x || this.lastPushData.y != this.y) {
                    $scope.socket.emit('move', {x:this.x, y:this.y, rotation:this.rotation})
                    this.lastPushTime = (new Date()).getTime()
                }
            }
        }

    }

    this.push = function() {
        $scope.socket.emit('move', {x:this.x, y:this.y})
    }

    this.syncCamera = function() {
        $scope.camera.x = $scope.me.x - $scope.camera.width *  $scope.tileSize /2
        $scope.camera.y = $scope.me.y - $scope.camera.height * $scope.tileSize /2
    }

    return this;

}