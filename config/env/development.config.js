var json = require('../../database.json')

module.exports = {
    port: 3000,
    database: {
        host:json.dev.host,
        port:json.dev.port,
        user:json.dev.user,
        pass:json.dev.password,
        database:json.dev.database
    }
};