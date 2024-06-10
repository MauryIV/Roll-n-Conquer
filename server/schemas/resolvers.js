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
      return await User.find({});
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

    addFriend: async (parent, { username, wins, losses, ties, streak, dailyWins }, context) => {
      if (context.user) {
        const friend = { username, wins, losses, ties, streak, dailyWins };
        const friendlyUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friendslist: friend } },
          { new: true }
        ).populate("friendslist");
        return friendlyUser;
      }
      throw AuthenticationError;
    },

    recordStats: async (parent, { wins, losses, ties, streak, dailyWins, daily }, context) => {
      if (context.user) {
        const updateFields = { wins, losses, ties, streak, dailyWins, daily };
        let userStats = await User.findOneAndUpdate(
          { _id: context.user._id },
          updateFields,
          { new: true }
        );
        return userStats;
      }
      throw AuthenticationError;
    },
    

    updateDaily: async () => {
      try {
        await User.updateMany({}, { daily: 0 });
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error("Failed to reset daily values for all users");
      }
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