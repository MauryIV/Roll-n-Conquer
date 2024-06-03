import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
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
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($username: String!, $wins: Int, $losses: Int, $ties: Int, $streak: Int, $difference: Int) {
    addFriend(username: $username, wins: $wins, losses: $losses, ties: $ties, streak: $streak, difference: $difference) {
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
