const { Schema } = require('mongoose');

const friendsSchema = new Schema ({
    username: {
        type: String
    }
});

module.exports = friendsSchema;