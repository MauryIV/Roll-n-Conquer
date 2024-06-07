const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const messageSchema = require('./Messages');
const challengeSchema = require('./Challenges');
const friendsSchema = require('./friends');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema (
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // added regular expression to result in a valid email address
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    wins: { 
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    },
    ties: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    daily: {
      type: Number,
      default: 0
    },
    challenges: [challengeSchema],
    messages: [messageSchema],
    friendslist: [friendsSchema]
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
  }
);

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
