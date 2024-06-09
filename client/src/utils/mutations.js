import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        password
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
  mutation AddFriend($username: String!, $wins: Int, $losses: Int, $ties: Int, $streak: Int, $daily: Int) {
    addFriend(username: $username, wins: $wins, losses: $losses, ties: $ties, streak: $streak, daily: $daily, dailyWins: $dailyWins) {
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

export const RECORD_STATS = gql`
  mutation RecordStats($username: String!, $wins: Int, $losses: Int, $ties: Int, $streak: Int, $daily: Int) {
    recordStats(username: $username, wins: $wins, losses: $losses, ties: $ties, streak: $streak, daily: $daily, dailyWins: $dailyWins) {
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

export const UPDATE_DAILY = gql`
  mutation UpdateDaily($daily: Int!) {
    updateDaily(daily: $daily) {
      _id
      username
      daily
    }
  }
`;

export const ADD_CHALLENGE = gql`
  mutation AddChallenge($userOne: String!, $userTwo: String!, $d4One: Int, $d6One: Int, $d8One: Int, $d10One: Int, $d12One: Int, $d20One: Int, $d100One: Int, $d4Two: Int, $d6Two: Int, $d8Two: Int, $d10Two: Int, $d12Two: Int, $d20Two: Int, $d100Two: Int) {
    addChallenge(userOne: $userOne, userTwo: $userTwo, d4One: $d4One, d6One: $d6One, d8One: $d8One, d10One: $d10One, d12One: $d12One, d20One: $d20One, d100One: $d100One, d4Two: $d4Two, d6Two: $d6Two, d8Two: $d8Two, d10Two: $d10Two, d12Two: $d12Two, d20Two: $d20Two, d100Two: $d100Two) {
      _id
      username
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
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation AddMessage($userOne: String!, $userTwo: String!, $msgOne: String, $msgTwo: String) {
    addMessage(userOne: $userOne, userTwo: $userTwo, msgOne: $msgOne, msgTwo: $msgTwo) {
      _id
      username
      messages {
        _id
        userOne
        userTwo
        msgOne
        msgTwo
      }
    }
  }
`;