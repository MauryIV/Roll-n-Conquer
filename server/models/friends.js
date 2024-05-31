const { Schema, model } = require('mongoose');

const friendsSchema = new Schema ({
    username: {
        type: String
    }
});

module.exports = friendsSchema;