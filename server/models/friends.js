const { Schema, model } = require('mongoose');

const friendsSchema = new Schema ({
    userID: {
        type: String
    },
    username: {
        type: String
    }
});

module.exports = friendsSchema;