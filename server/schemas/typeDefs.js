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
    messages: [Messages]
    friendslist: [friendsList]
  }

  type Auth {
    token: ID!
    user: User
  }

  type friendsList {
    _id: ID!
    username: String
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

  type Messages {
    _id: ID!
    userOne: String!
    userTwo: String!
    msgOne: String
    msgTwo: String
  }

  type Query {
    me(userId: ID!): User
    users: [User]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(username: String!, wins: Int, losses: Int, ties: Int, streak: Int, dailyWins: Int, daily: Int): User
    recordStats(username: String!, wins: Int, losses: Int, ties: Int, streak: Int, daily: Int, dailyWins: Int): User updateDaily: [User]
    addChallenge(userOne: String!, userTwo: String!, d4One: Int, d6One: Int, d8One: Int, d10One: Int, d12One: Int, d20One: Int, d100One: Int, d4Two: Int, d6Two: Int, d8Two: Int, d10Two: Int, d12Two: Int, d20Two: Int, d100Two: Int): User
    updateChallenge(userOne: String!, userTwo: String!, d4One: Int, d6One: Int, d8One: Int, d10One: Int, d12One: Int, d20One: Int, d100One: Int, d4Two: Int, d6Two: Int, d8Two: Int, d10Two: Int, d12Two: Int, d20Two: Int, d100Two: Int): User
    addMessage(userOne: String!, userTwo: String!, msgOne: String, msgTwo: String): User
  }
`;

module.exports = typeDefs;


// Need to edit to this

// recordStats(username: String!, wins: Int, losses: Int, ties: Int, streak: Int, dailyWins: Int): User
// recordDaily(username: String!, daily: Int): User