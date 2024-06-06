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
        difference: Int
        friendslist: [friendsList]
    }
    type Dice {
        _id: ID!
        dicesize: Int
        diceimage: String
    }
    type Auth {
        token: ID!
        user: User
    }

    type friendsList {
        _id: ID!
        username: String
    }

    type Query {
        me(userId: ID!): User
        users: [User]
        pickDice(dicesize: Int, diceimage: String): Dice
    }
    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addFriend(username: String!, wins: Int, losses: Int, ties: Int, streak: Int, difference: Int): User
        recordOutcome(userId: ID!, wins: Int, losses: Int, ties: Int, streak: Int, difference: Int): User
    }
`;

module.exports = typeDefs;
