const { User, Dice } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, { userId }) => {
      const userData = await User.findOne({ _id: userId }).populate("friendslist");
      if (!userData) {
        throw new AuthenticationError("Not logged in");
      }
      return userData;
    },
    users: async () => {
      return await User.find({}).sort({ wins: -1 });
    },
    pickDice: async (parent, { dice }) => {
      const diceData = await Dice.findAll({dicesize: dice });
      return diceData;
    }
  },
  
  // added mutations login, adduser and 
  Mutation: {
    // for login do we use email or username?
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
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

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    addFriend: async (parent, { username, wins, losses, ties, streak, difference }, context) => {
      if (context.user) {
        const friend = { username, wins, losses, ties, streak, difference };
        const friendlyUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friendslist: friend } },
          { new: true }
        ).populate("friendslist");
        return friendlyUser;
      }
      throw AuthenticationError;
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
    recordLoss: async (parent, { username, losses }) => {
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
  }
};

module.exports = resolvers;