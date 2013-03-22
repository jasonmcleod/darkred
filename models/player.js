var MIN_DAMAGE = 8;
var MAX_DAMAGE = 14;

var Player = function(id, name) {
    var self = this;
    this.TOTAL_HEALTH = 100;
    this.CLIP_SIZE = 32;
    this.reset(id, name)

}

Player.prototype.reset = function(id, name) {

    console.log('reseting',id)
    this.id = id;
    this.name = name;
    this.team = 0;
    this.x = 400;
    this.y = 400;
    this.rotation = 0;

    this.lastUpdate = 0;
    this.lastHit = 0;
    this.hitBy;
    this.killCount = 0;
    this.killSpree = 0;
    this.deaths = 0;

    this.dead = false;
    this.health = this.TOTAL_HEALTH;
    this.respawning = false;

    this.clip = this.CLIP_SIZE;
}

Player.prototype.move = function(data) {
    this.x = data.x || this.x;
    this.y = data.y || this.y;
    this.rotation = data.rotation || this.rotation;
}

Player.prototype.moveBy = function(data) {
    this.x += data.x || 0
    this.y += data.y || 0
}

Player.prototype.dash = function(data) {
    this.x = data.x || this.x;
    this.y = data.y || this.y;
}

Player.prototype.takeDamage = function(killer) {
    var damage = Math.floor(Math.random() * (MAX_DAMAGE - MIN_DAMAGE + 1)) + MIN_DAMAGE;
    this.hitBy = killer;
    this.lastHit = damage;
    this.health -= damage;
    if(this.isDead()) {
        this.die(killer);
    }
}

Player.prototype.die = function(killer) {
    this.deaths++;
    this.hitBy = killer;
    this.killSpree = 0;
    this.health = 0;
    this.dead = true;
    this.x = -10000;
    this.y = -10000;
}

Player.prototype.isDead = function() {
    return this.health < 0 || this.dead;
}

Player.prototype.isEmpty = function() {
    return this.clip <= 0;
}

Player.prototype.respawn = function(x, y) {
    this.health = this.TOTAL_HEALTH;
    this.dead = false;
}

Player.prototype.shotFired = function() {
    this.clip--;
}

Player.prototype.reload = function() {
    this.clip = this.CLIP_SIZE;
}

Player.prototype.setPosition = function(obj) {
        this.x = obj.x;
        this.y = obj.y;
    }

Player.prototype.onKillingSpree = function() {
    return this.killSpree >= 2;
}

Player.prototype.killSpreeLevel = function() {
    var str = this.name + ' got a ';
    if(this.killSpree == 2) {
        return str + 'double kill';
    } else if(this.killSpree == 3) {
        return str + 'triple kill';
    } else if(this.killSpree == 4) {
        return str + 'multi kill';
    } else if(this.killSpree == 5) {
        return str + 'ultra kill';
    } else if(this.killSpree == 6) {
        return str + 'monster kill';
    } else if(this.killSpree > 6) {
        return this.name + ' is a killing machine';
    }
}

module.exports = Player;