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
        friendslist: [String]
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

    type Query {
        me(userId: ID!): User
        pickDice(dicesize: Int, diceimage: String): Dice
    }
    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, firstname: String!, 
            lastname: String!, email: String!, password: String!): Auth
        recordWin(username: String!, wins: Int): User
        recordLoss(username: String!, losses: Int): User
        recordTie(username: String!, ties: Int): User
        recordGap(username: String!, difference: Int): User
    }
`

module.exports = typeDefs;