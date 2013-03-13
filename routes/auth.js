var User = require('../models/User');

exports.index = function(req, res) {
    User.authenticate(req.body.email, req.body.password, function(data) {
        res.send(data)
    })
}
