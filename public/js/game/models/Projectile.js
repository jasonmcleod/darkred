var Projectile = function(options, $scope) {
    var self = this;
    options = options || {}

    this.speed = options.speed || 12;
    this.delta = 1;
    this.trajectoryX = options.trajectoryX
    this.trajectoryY = options.trajectoryY
    this.length = Math.sqrt(Math.pow(this.trajectoryX,2) + (Math.pow(this.trajectoryY,2)))
    this.owner = options.owner;
    this.spawnTime = new Date();
    this.removed = false;

    self.sprite = new SpriteWithContainer('/assets/sprites/projectile.png', 16, 16)
    self.sprite.globalx = options.x
    self.sprite.globaly = options.y
    $scope.renderer.stage.add(self.sprite);

    if(config.sounds) {
        this.sound = new Audio("/assets/sounds/single.mp3");
        this.sound.volume = ( Math.random()/2 + .5);
        this.sound.play();
    }

    $(document).bind('tick', function() {
        if(!self.removed) {
            self.delta = self.speed / self.length
            var x = self.delta * self.trajectoryX
            var y = self.delta * self.trajectoryY

            //if($scope.mapParser.blocked(self.sprite.x, self.sprite.y, 2)) {
                // hit a wall
               //self.remove();
            // } else if(false || hitPlayer = playerHit(self)) {
            //     // hit a player
            //     if(self.owner == me.id) socket.emit('hit', {projectile: self.data(), hitPlayer: hitPlayer.data()})
            //    self.remove();
            //} else {
                // console.log(x,y)
                self.sprite.globalx += x
                self.sprite.globaly += y
            //}

            if(self.sprite.x < 0 || self.sprite.x > 820 || self.sprite.y < 0) {
                self.remove();
            }

            // if(self.sprite.x < $scope.tileSize || self.sprite.y < $scope.tileSize || self.sprite.x > canvas_main.width - $scope.tileSize || self.sprite.y > canvas_main.height - $scope.tileSize) {
            //      self.remove();
            // }

        }
    });

    this.remove = function() {
        $scope.renderer.stage.remove(this.sprite)
        this.removed = true;
        delete this;
    }

    return {
        x:options.x,
        y:options.y,
        trajectoryX:this.trajectoryX,
        trajectoryY:this.trajectoryY,
        owner:this.owner,
        length:this.length,
        sprite:{
            globalx:this.sprite.globalx,
            globaly:this.sprite.globaly
        }
    };

}