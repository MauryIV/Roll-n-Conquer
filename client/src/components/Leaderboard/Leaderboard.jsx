import { useEffect, useState } from "react";
import { getAll } from "../../utils/userQueries";
import { useMutation } from "@apollo/client";
import { UPDATE_DAILY, RECORD_STATS } from "../../utils/mutations";
import "../../App.css";
import "./leaderboard.css";

const Leaderboard = () => {
  const [dailyRank, setDailyRank] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  const { loading, error, data: userData, refetch } = getAll();
  const [updateDaily] = useMutation(UPDATE_DAILY);
  const [recordDailywin] = useMutation(RECORD_STATS);

  useEffect(() => {
    const dailyReset = async () => {
      try {
        if (!userData) return;

        const users = [...userData.users];
        const rank = [...users]
          .sort((a, b) => b.daily - a.daily)
          .slice(0, 10);

        const todaysWinner = rank[0];

        // resets users daily
        const resetUsers = users.map((user) => ({
          _id: user._id,
          username: user.username,
          daily: 0,
        }));

        // Update each user's daily value using the mutation
        await updateDaily({
          variables: { userUpdates: resetUsers },
          optimisticResponse: {
            __typename: "Mutation",
            updateDaily: resetUsers.map((user) => ({
              __typename: "User",
              _id: user._id,
              username: user.username,
              daily: 0,
            })),
          },
        });

        if (todaysWinner) {
          await recordDailywin({
            variables: { _id: todaysWinner._id, username: todaysWinner.username, dailyWins: 1 },
          });
        }

        // gives us users daily
        setDailyRank(rank);
        setUsersLoading(false);
        refetch();
      } catch (error) {
        setUsersError(error);
        setUsersLoading(false);
      }
    };

    const interval = setInterval(() => {
      dailyReset();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [userData, updateDaily, recordDailywin, loading, error, refetch]);

  const bgShades = [
    "#ece8f2",
    "#e5e1ec",
    "#cfc3e0",
    "#bfafd5",
    "#b09bcb",
    "#a086c0",
    "#9072b6",
    "#805eab",
    "#704aa0",
    "#603696",
  ];

  const textShades = [
    "#007641",
    "#008e50",
    "#0aa762",
    "#29b276",
    "#47bd8a",
    "#66c89d",
    "#84d3b1",
    "#a3dec4",
    "#c2e9d8",
    "#e0f4eb",
  ];

  return (
    <div className="leaderboard">
      <div className="header">
        <h1 className="glowing-header">⚀⚁⚂⚃⚄⚅ Leaderboard ⚀⚁⚂⚃⚄⚅</h1>
        {/* <p className="glowing-header">🎲🎲</p> */}
      </div>
      {usersLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rank</th>
                <th>Roll</th>
              </tr>
            </thead>
            <tbody>
              {dailyRank.map((user, index) => (
                <tr
                  key={user._id}
                  style={{
                    backgroundColor: bgShades[index % bgShades.length],
                    color: textShades[index % textShades.length],
                  }}
                >
                  <td>{user.username}</td>
                  <td>{index + 1}</td>
                  <td>{user.daily}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {usersError && (
            <div className="my-3 p-3 bg-danger text-white">
              {usersError.message}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Leaderboard;
