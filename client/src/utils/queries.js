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
      difference
      friendslist {
        _id
        username
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
      difference
    }
  }
`;

export const WHAT_DICE = gql`
  query PickDice($dicesize: Int, $diceimage: String) {
    pickDice(dicesize: $dicesize, diceimage: $diceimage) {
      _id
      dicesize
      diceimage
    }
  }
`;
