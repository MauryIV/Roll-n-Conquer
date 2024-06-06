import Auth from "./auth";
import { useQuery } from "@apollo/client";
import { GET_USERS, GET_ME } from "./queries";

export const getAll = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  return {
    loading,
    error,
    users: data?.users || [],
  };
};

export const getUser = () => {
  const currentId = Auth.getUserId();
  const { loading, error, data } = useQuery(GET_ME, {
    variables: { userId: currentId }
  });
  return {
    loading,
    error,
    friends: data?.me?.friendslist || [],
    wins: data?.me?.wins,
    losses: data?.me?.losses,
    ties: data?.me?.ties,
    streak: data?.me?.streak,
    difference: data?.me?.difference
  };
};

