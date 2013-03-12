function Character(options) {
    this.name = options.name || 'Unnamed Character'
    this.xp = options.xp || 0
    this.str = options.str || 0;

    this.level = function() {
        var table = new LevelTable();
        return table.calculate(this.xp)
    }

    return this;
}