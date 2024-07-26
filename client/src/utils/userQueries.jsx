import Auth from "./auth";
import { useQuery } from "@apollo/client";
import { GET_USERS, GET_ME } from "./queries";

export const getAll = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  return {
    loading,
    error,
    data,
    refetch,
    users: data?.users || [],
  };
};

export const getUser = () => {
  const currentId = Auth.getUserId();
  const { loading, error, data } = useQuery(GET_ME, {
    variables: { userId: currentId },
    context: {
      headers: {
        authorization: `Bearer ${Auth.getToken()}`,
      },
    },
  });
  return {
    loading,
    error,
    friends: data?.me || [],
    challenges: data?.me?.challenges || [],
    wins: data?.me?.wins,
    losses: data?.me?.losses,
    ties: data?.me?.ties,
    streak: data?.me?.streak,
    daily: data?.me?.daily,
    dailyWins: data?.me?.dailyWins
  };
};
