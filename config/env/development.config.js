var json = require('../../database.json')

module.exports = {
    port: 3000,
    map:'../public/assets/maps/losteden40.json',
    database: {
        host:json.dev.host,
        port:json.dev.port,
        user:json.dev.user,
        pass:json.dev.password,
        database:json.dev.database
    }
};