const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
        wins: { 
            type: Number
        }
}, {timestamps: true});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;