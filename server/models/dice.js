const { Schema, model } = require('mongoose');
const diceSchema = new Schema(
  {
    dicesize: {
      type: Number,
      required: true,
      unique: true,
      default: 0
    },
    diceimage: {
      type: String,
      required: true
    }
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);
const Dice = model('Dice', diceSchema);
module.exports = Dice;