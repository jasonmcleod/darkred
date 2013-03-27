// var config = require('../config/application');
// var gameConfig = require('../config/game.config');
// var Player = require('./player');
// var Npc = require('../models/Npc');
//
// var Instance = function(id) {
//     var self = this;
//     this.id = id;
//     this.players = {};
//     this.npcs = [];
//     this.kills = 0;
//     this.state = 'running';
//
//     this.addNpc = function() {
//         var npc = new Npc(this);
//         this.npcs.push(npc);
//         npc.spawn();
//         return npc;
//     }
//
//     this.addPlayer = function(id, name) {
//         var player = new Player(id, name);
//         this.players[id] = player;
//         return player;
//     }
//
//     this.removePlayer = function(id) {
//         delete this.players[id]
//     }
//
//     this.playerList = function() {
//         var playerNames = [];
//         for(var p = 0, plen = Object.keys(this.players).length; p < plen; p++) {
//             var player = this.players[Object.keys(this.players)[p]];
//             playerNames.push(player.name)
//         }
//         return playerNames;
//     }
//
//     this.data = function() {
//         return {
//             id: this.id,
//             players: this.players,
//             npcs:this.npcs,
//             score: this.kills,
//             state: this.state
//         }
//     }
//
//     // this.full = function() {
//     //     return Object.keys(this.players).length >= gameConfig.instance.player_limit
//     // }
//     //
//     // this.gameover = function() {
//     //     return this.kills == config.kill_total;
//     // }
//     //
//     // this.newGame = function() {
//     //     self.kills = 0;
//     //     for(var p = 0, plen = Object.keys(this.players).length; p < plen; p++) {
//     //         var player = this.players[Object.keys(this.players)[p]];
//     //         player.reset(player.id, player.name);
//     //         player.setPosition(self.map.randomSpawn())
//     //         player.respawn();
//     //     }
//     // }
//
// };
// module.exports = Instance;