var files = ''
require('../lib/frontEndPackage').generate(function(data) {
    files = data
})

exports.index = function(req, res){
    res.render('index', {
        frontEndPackage:files
    });
};

