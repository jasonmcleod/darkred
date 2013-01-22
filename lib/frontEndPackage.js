function generate(callback) {
    var files = [];
    require("fs").readdirSync("./public/js/controllers").forEach(function(file) {
        files.push('controllers/' + file)
    });

    callback(files)
}
module.exports.generate = generate;
