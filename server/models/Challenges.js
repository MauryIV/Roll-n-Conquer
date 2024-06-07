const { Schema } = require('mongoose');

const challengeSchema = new Schema (
  {
    userOne: {
      type: String,
      required: true
    },
    userTwo: {
      type: String,
      required: true
    },
    d4One: { 
      type: Number,
      default: null
    },
    d6One: { 
      type: Number,
      default: null
    },
    d8One: { 
      type: Number,
      default: null
    },
    d10One: { 
      type: Number,
      default: null
    },
    d12One: { 
      type: Number,
      default: null
    },
    d20One: { 
      type: Number,
      default: null
    },
    d100One: { 
      type: Number,
      default: null
    },
    d4Two: { 
      type: Number,
      default: null
    },
    d6Two: { 
      type: Number,
      default: null
    },
    d8Two: { 
      type: Number,
      default: null
    },
    d10Two: { 
      type: Number,
      default: null
    },
    d12Two: { 
      type: Number,
      default: null
    },
    d20Two: { 
      type: Number,
      default: null
    },
    d100Two: { 
      type: Number,
      default: null
    },
  },
);

module.exports = challengeSchema;
