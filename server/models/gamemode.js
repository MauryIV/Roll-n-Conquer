const { Schema, model } = require('mongoose');

const gameModeSchema = new Schema (
    {

    }
);

const gameMode = model('gameMode', gameModeSchema);

module.exports = gameMode;