const { Schema } = require('mongoose');

const messageSchema = new Schema (
  {
    userOne: {
      type: String,
      required: true
    },
    userTwo: {
      type: String,
      required: true
    },
    msgOne: {
      type: String,
    },
    msgTwo: {
      type: String,
    },
  },
);

module.exports = messageSchema;
