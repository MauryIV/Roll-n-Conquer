import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me($userId: ID!) {
    me(userId: $userId) {
      _id
      username
      password
      email
      wins
      losses
      ties
      streak
      daily
      dailyWins
      challenges {
        _id
        userOne
        userTwo
        d4One
        d6One
        d8One
        d10One
        d12One
        d20One
        d100One
        d4Two
        d6Two
        d8Two
        d10Two
        d12Two
        d20Two
        d100Two
        status
      }
      friendslist {
        friendId {
          _id
          username
          wins
          losses
          ties
          streak
          daily
          dailyWins
        }
      }
    }
  }
`;

  export const GET_USERS = gql`
  query Users {
    users {
      _id
      username
      wins
      losses
      ties
      streak
      daily
      dailyWins
    }
  }
`;
