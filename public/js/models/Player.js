Player = function(data) {
    var self = this;
    this.name = data.name || 'Unnamed Player'
    this.x = data.x || 0
    this.y = data.y || 0
    this.rotation = data.rotation || 0
    this.$scope = data.$scope

    this.level = function() {
        return new LevelTable.calculate(this.xp)
    }

    this.addToStage = function() {
        self.sprite = new SpriteWithContainer('/assets/sprites/fed.png', 32, 32)
        self.sprite.globalx = self.x
        self.sprite.globaly = self.y
        self.$scope.renderer.stage.add(self.sprite);
    }

    this.update = function(data) {
        self.x = data.x;
        self.y = data.y;
        self.sprite.globalx = data.x;
        self.sprite.globaly = data.y;
        self.sprite.rotation = data.rotation;
        //self.name = data.name
    }

    this.drop = function() {
        self.$scope.renderer.stage.remove(self.sprite)
    }

}