import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
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
    }
`;