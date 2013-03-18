var json = require('../../database.json')

module.exports = {
    port: 3000,
    database: {
        host:json.test.host,
        port:json.test.port,
        user:json.test.user,
        pass:json.test.password,
        database:json.test.database
    }
};