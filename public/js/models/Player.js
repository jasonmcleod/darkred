var Player = new Base;
Player.extend({
    name:'Unnamed Player',

    fire:function() {
        console.log('pew')
    },

    isMe:function() {
        me = this;
    },

    join:function() {
        console.log(this.socket)
        this.socket.emit('join','test')
        // socket.emit('hi', {yay:'!'})
    }
})

