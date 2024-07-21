import { useState, useEffect } from "react";
import "../App.css";
import "./Landing/style/landing1.css";
import DiceAnimation from "../components/DiceAnimation";
import { landing1 } from "./Landing/style";
import FriendListModal from "../components/FriendList/FriendList";
import { useMutation } from "@apollo/client";
import { getUser, getAll } from "../utils/userQueries";
import { ADD_FRIEND } from "../utils/mutations";
import Auth from "../utils/auth";
import { useRandomTheme } from "../utils/helpers";

const themes = [landing1];

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [addedFriends, setAddedFriends] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);

  const { loading: usersLoading, error: usersError, users } = getAll();
  const { friends, challenges, messages } = getUser();
  const [addFriend] = useMutation(ADD_FRIEND);

  useRandomTheme(themes);
  
  // for rendering users list, organized by daily wins, with search bar
  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 10);
  };

  useEffect(() => {
    setDisplayCount(10);
  }, [searchQuery]);

  const handleAddFriend = async (user) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      console.log("No token provided");
      return;
    }
    if (friends.includes(user._id)) {
      return;
    } else {
      try {
        await addFriend({
          variables: { userId: user._id, username: user.username },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });
        setAddedFriends([...addedFriends, user.username]);
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    }
  };

  return (
    <div className="image-overlay">
      <div className="landing-page">
        <DiceAnimation />
        <FriendListModal
          friends={friends}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
        />
        <div className="users-column">
          <h1>Users</h1>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {usersLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="py-4">
              {filteredUsers
                .sort((a, b) => b.dailyWins - a.dailyWins)
                .map((user) => (
                  <p key={user._id}>
                    {user.username} - {user.dailyWins} daily wins
                    {Auth.loggedIn() ? (
                      !friends.some(
                        (friend) => friend.username === user.username
                      ) && !addedFriends.includes(user.username) ? (
                        <button onClick={() => handleAddFriend(user)}>
                          Add Friend‽
                        </button>
                      ) : user.username === Auth.getProfile().data.username ? (
                        <button disabled>
                          I hope you're friends with yourself
                        </button>
                      ) : (
                        <button disabled>Y'all be friends!</button>
                      )
                    ) : null}
                  </p>
                ))}
              {displayCount < users.length && (
                <button onClick={handleLoadMore}>Load More</button>
              )}
            </div>
          )}
          {usersError && (
            <div className="my-3 p-3 bg-danger text-white">
              {usersError.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
