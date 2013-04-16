function StageManager(options) {
    var options = options || {}
    this.stage = options.stage;
    this.elements = []

    this.add = function(what, index) {
        what.x = what.globalx;
        what.y = what.globaly;
        this.elements.push(what)
        if(arguments.length==2) {
            this.stage.addChildAt(what, index)
        } else {
            this.stage.addChild(what)
        }
        this.stage.update();
    }

    this.remove = function(what) {
        var self = this;
        $.each(this.elements, function(i) {
            if(this.id==what.id) {
                self.stage.removeChild(what)
                self.elements.remove(i)
                delete this;
            }
        })
    }
}