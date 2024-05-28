const { User, Dice } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  Query: {
    me: async (parent, { userId }) => {
      const userData = await User.findOne({ _id: userId });
      if (!user) {
        throw new AuthenticationError("Not logged in");
      }
      return userData;
    }
  },
  // added mutations login, adduser and 
  Mutation: {
    // for login do we use email or username?
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // TODO: username or email?
    recordWin: async (parent, { username, wins }) => {
      const user = await User.findOneAndUpdate(
        { username },
        { $inc: { wins } }
      );
      return user;
    },
    // TODO: username or email?
    recordLost: async (parent, { username, losses }) => {
      const user = await User.findOneAndUpdate(
        { username },
        { $inc: { losses } }
      );
      return user;
    },
    // TODO: username or email?
    recordTie: async (parent, { username, ties }) => {
      const user = await User.findOneAndUpdate(
        { username },
        { $inc: { ties } }
      );
      return user;
    },
    // TODO: username or email?
    recordGap: async (parent, { username, difference }) => {
      const user = await User.findOneAndUpdate(
        { username },
        { $inc: { difference } }
      );
      return user;
    },
    pickDice: async (parent, { dicesize, diceimage }) => {
      const dice = await Dice.findOne({ dicesize, diceimage });
      return dice;
    }
  }
};

module.exports = resolvers;