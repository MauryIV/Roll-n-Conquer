const typeDefs = `
  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    wins: Int
    losses: Int
    ties: Int
    streak: Int
    daily: Int
    dailyWins: Int
    challenges: [Challenges]
    friendslist: [Friend]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Friend {
    friendId: User
  }

  type Challenges {
    _id: ID!
    userOne: String!
    userTwo: String!
    d4One: Int
    d6One: Int
    d8One: Int
    d10One: Int
    d12One: Int
    d20One: Int
    d100One: Int
    d4Two: Int
    d6Two: Int
    d8Two: Int
    d10Two: Int
    d12Two: Int
    d20Two: Int
    d100Two: Int
    status: String!
  }

  type Query {
    me(userId: ID!): User
    users: [User]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    recordStats(wins: Int, losses: Int, ties: Int, streak: Int, daily: Int, dailyWins: Int): User 
    updateDaily: [User]
    addChallenge(userOne: String!, userTwo: String!, d4One: Int, d6One: Int, d8One: Int, d10One: Int, d12One: Int, d20One: Int, d100One: Int, d4Two: Int, d6Two: Int, d8Two: Int, d10Two: Int, d12Two: Int, d20Two: Int, d100Two: Int): User
    updateChallenge(userOne: String!, userTwo: String!, d4One: Int, d6One: Int, d8One: Int, d10One: Int, d12One: Int, d20One: Int, d100One: Int, d4Two: Int, d6Two: Int, d8Two: Int, d10Two: Int, d12Two: Int, d20Two: Int, d100Two: Int): User
  }
`;

module.exports = typeDefs;
