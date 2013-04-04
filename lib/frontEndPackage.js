function generate(path, callback) {
    var dirs = ['controllers', 'models', 'managers', 'directives'];
    var files = [];
    for(dir in dirs) {
        require("fs").readdirSync("./public/js/" + path + "/" + dirs[dir]).forEach(function(file) {
            files.push(dirs[dir] + '/' + file)
        });
    }
    callback(files)
}
module.exports.generate = generate;
