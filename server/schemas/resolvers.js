const { User } = require("../models");
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

    addFriend: async (parent, { username, wins, losses, ties, streak }, context) => {
      if (context.user) {
        const friend = { username, wins, losses, ties, streak };
        const friendlyUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friendslist: friend } },
          { new: true }
        ).populate("friendslist");
        return friendlyUser;
      }
      throw AuthenticationError;
    },

    recordStats: async (parent, { wins, losses, ties, streak, daily }, context) => {
      if (context.user) {
        // Build the increment object dynamically based on provided arguments
        const incrementFields = {};
        if (wins !== undefined) incrementFields.wins = wins;
        if (losses !== undefined) incrementFields.losses = losses;
        if (ties !== undefined) incrementFields.ties = ties;
        if (streak !== undefined) incrementFields.streak = streak;
        if (daily !== undefined) incrementFields.daily = daily;
        let userStats = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $inc: incrementFields },
          { new: true }
        );
        return userStats;
      }
      throw AuthenticationError;
    },

    addChallenge: async (parent, { userOne, userTwo, d4One, d6One, d8One, d10One, d12One, d20One, d100One, d4Two, d6Two, d8Two, d10Two, d12Two, d20Two, d100Two }, context) => {
      if (context.user) {
        const challenge = { userOne, userTwo, d4One, d6One, d8One, d10One, d12One, d20One, d100One, d4Two, d6Two, d8Two, d10Two, d12Two, d20Two, d100Two };
        const userChallenge = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { challenges: challenge } },
          { new: true }
        ).populate("challenges");
        return userChallenge;
      }
      throw AuthenticationError;
    },

    addMessage: async (parent, { userOne, userTwo, msgOne, msgTwo }, context) => {
      if (context.user) {
        const message = { userOne, userTwo, msgOne, msgTwo };
        const userMsg = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { messages: message } },
          { new: true }
        ).populate("messages");
        return userMsg;
      }
      throw AuthenticationError;
    },

  }
};

module.exports = resolvers;