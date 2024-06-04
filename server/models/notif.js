const { Schema, model } = require('mongoose');

const notifSchema = new Schema (
    {
        description: {
            type: String,
            required: true
        }
    }
);

const notIf = model('notIf', notifSchema);

module.exports = notIf;