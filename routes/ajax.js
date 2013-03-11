var User = require('../models/User');

exports.auth = User.authenticate;
exports.login = User.findByToken;