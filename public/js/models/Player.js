var Player = new Base;
Player.extend({
    name:'Unnamed Player',

    fire:function() {
        console.log('pew')
    },

    setRotation:function(r) {
        this.sprite.rotation = r;
    }

})

