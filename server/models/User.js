const { Schema, model } = require('mongoose');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      // added regular expression to result in a valid email address
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    ties: { type: Number, default: 0 },
    difference: { type: Number, default: 0 },
    // friendslist needs investigation
    friendslist: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);

const User = model('User', userSchema);

module.exports = User;
