var config = require('../config/application');
var gameConfig = require('../config/game.config');

managers = [];
require("fs").readdirSync("./managers/").forEach(function(file) { require('../managers/' + file.replace('.js','')) });

var Player = require('./player');

var Instance = function(id) {
    var self = this;
    this.id = id;
    this.players = {};
    this.iio;
    this.kills = 0;
    this.state = 'running';

    this.addPlayer = function(id, name) {
        console.log(name)
        var player = new Player(id, name);
        this.players[id] = player;
        return player;
    }

    this.removePlayer = function(id) {
        delete this.players[id]
    }

    this.playerList = function() {
        var playerNames = [];
        for(var p = 0, plen = Object.keys(this.players).length; p < plen; p++) {
            var player = this.players[Object.keys(this.players)[p]];
            playerNames.push(player.name)
        }
        return playerNames;
    }

    this.data = function() {
        return {
            id: this.id,
            players: this.players,
            score: this.kills,
            state: this.state
        }
    }

    this.full = function() {
        return Object.keys(this.players).length >= gameConfig.instance.player_limit
    }

    this.gameover = function() {
        return this.kills == config.kill_total;
    }

    this.newGame = function() {
        self.kills = 0;
        for(var p = 0, plen = Object.keys(this.players).length; p < plen; p++) {
            var player = this.players[Object.keys(this.players)[p]];
            player.reset(player.id, player.name);
            player.setPosition(self.map.randomSpawn())
            player.respawn();
        }
    }

    this.attachPacketHandlers = function(io) {
        var self = this;
        io.sockets.on('connection', function(socket) {

            for(var m in managers) {
                managers[m](socket,io,self)
            }

        })
    }
};
module.exports = Instance;