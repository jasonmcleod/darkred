function generate(callback) {
    var dirs = ['controllers', 'modules', 'models', 'managers'];
    var files = [];
    for(dir in dirs) {
        require("fs").readdirSync("./public/js/" + dirs[dir]).forEach(function(file) {
            files.push(dirs[dir] + '/' + file)
        });
    }
    callback(files)
}
module.exports.generate = generate;
