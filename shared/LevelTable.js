var LevelTable = function() {

    this.data = [
        2000,
        4000,
        10000
    ]

    this.calculate = function(n) {
        var ret = 1;
        for(var i in this.data) {
            if(n > this.data[i]) ret = parseInt(i) + 1;
        }
        return ret
    }

    return this;
}

if(typeof module!= 'undefined') module.exports = LevelTable();