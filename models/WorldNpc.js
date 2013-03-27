var WorldNpc = function(options) {
    this.id = options.id
    this.x = options.x || 100
    this.y = options.y || 100
    var self = this

    console.log('my id is', this.id)
    return this;
}

WorldNpc.prototype.spawn = function(instance) {
    this.wandering = true;
    // setInterval(this.loop,1000)
}

WorldNpc.prototype.wander = function(io){
    this.x+=1
    this.y+=1
    io.sockets.emit('npcMove', this)
}

module.exports = WorldNpc;