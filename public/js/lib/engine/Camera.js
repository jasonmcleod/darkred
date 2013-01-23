function Camera(options) {
    var options = options || {};

    this.width = options.width || 9;
    this.height = options.height || 9;
    this.x = options.x || 0;
    this.y = options.y || 0;

    return this;
}