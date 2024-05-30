import { gql } from '@apollo/client';

export const GET_ME = gql `
    query Me {
        me {
            _id
            username
            email
            wins
            losses
            ties
            streak
            difference
            friendslist {
                friends
            }
        }
    }
`;

export const WHAT_DICE = gql `
    query pickDice {
        pickDice {
            dicesize
            diceimage
        }
    }
`;