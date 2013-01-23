function StageManager(options) {
    var options = options || {}
    this.stage = options.stage;
    this.elements = []

    this.add = function(what, index) {
        console.log(arguments)
        this.elements.push(what)
        if(arguments.length==2) {
            this.stage.addChildAt(what, index)
        } else {
            this.stage.addChild(what)
        }
    }

    this.remove = function(what) {
        this.stage.removeChild(what.container)
        $.each(this.elements, function() {
            if(this==what) delete this;
        })
    }
}