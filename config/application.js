function config() {
    var env = process.env.NODE_ENV || 'development';

    var conf = require('./env/' + env + '.config')
    conf.connectionString = [
        "mysql://",
        conf.database.user,
        (conf.database.pass ? ':' + conf.database.pass : ''),
        '@' + conf.database.host,
        (conf.database.port ? ':' + conf.database.port : ''),
        '/' + conf.database.database
    ].join('')
    return conf
}
module.exports = config();