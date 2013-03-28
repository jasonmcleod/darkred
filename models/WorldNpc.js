var _ = require('underscore')

var WorldNpc = function(options) {
    this.id = options.id
    this.x = options.x || 100
    this.y = options.y || 100
    this.rotation = options.rotation || 0
    var self = this
    return this;
}

WorldNpc.prototype.spawn = function(instance) {
    this.wandering = true;
}

WorldNpc.prototype.wander = function(io){
    this.x+=_.random(0,2)
    this.y+=_.random(0,2)
    this.rotation+=_.random(0,3)
    io.sockets.emit('npcMove', this)
}

module.exports = WorldNpc;