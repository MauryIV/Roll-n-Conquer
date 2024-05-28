const typeDefs = `
    type User {
        _id: ID!
        username: String!
        password: String!
        // do we need first and last name?
        firstname: String!
        lastname: String!
        email: String!
        wins: Int
        losses: Int
        ties: Int
        // will streak be win only or win /losses
        streak: String
        difference: Int
        // where do we create friendslist sub from?
        friendslist: [freinds]
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
        me(userid: ID!): User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, firstname: String!, 
            lastname: String!, email: String!, password: String!): Auth
        recordWin(username: String!, wins: Int): User
        recordLoss(username: String!, losses: Int): User
        recordTie(username: String!, ties: Int): User
        recordGap(username: String!, difference: Int): User
        pickDice(dicesize: Int, diceimage: String): Dice
    }
}
`
module.exports = typeDefs;