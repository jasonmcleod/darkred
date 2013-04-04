function Character(options) {
    $.extend(this, options)

    this.level = function() {
        var table = new LevelTable();
        return table.calculate(this.xp)
    }

    return this;
}