import { useState, useEffect } from "react";
import "../App.css";
import './Landing/style/landing1.css'
import DiceAnimation from "../components/DiceAnimation";
import { landing1 } from "./Landing/style";
import FriendListModal from "../components/TestFriendList";
import { useMutation } from "@apollo/client";
import { getUser, getAll } from "../utils/userQueries";
import { ADD_FRIEND } from "../utils/mutations";
import Auth from "../utils/auth";
import { useRandomTheme } from "../utils/helpers";

const themes = [landing1];

const LandingPage = () => {
  useRandomTheme(themes);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [socket, setSocket] = useState(null);

  const { loading: usersLoading, error: usersError, users } = getAll();
  const { friends } = getUser();
  const [addFriend] = useMutation(ADD_FRIEND);

  const filteredUsers = users.filter((user) =>
    user.username.includes(searchQuery)
  );

  // We are not receiving any messages though
  // possibly parse out messages that are sent and saved to a DB
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connected to the client");
    };
    newSocket.onmessage = (event) => {
      console.log("Message received:", event.data);
      if (event.data.startsWith("Echo: ")) {
        const jsonStr = event.data.slice("Echo: ".length);
        try {
          const parsedMessage = JSON.parse(jsonStr);
          setChallenges((prevChallenges) => [
            ...prevChallenges,
            {
              from: parsedMessage.from,
              text: parsedMessage.text,
            },
          ]);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };
    newSocket.onclose = () => {
      console.log("Disconnected from the server");
    };
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  const newFriend = async (user) => {
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
      } catch (err) {
        console.error("An error occurred: ", err);
      }
    }
  };

  return (
    <div className="landing-page">
      <DiceAnimation />
      <div className="challenges-column">
        <h1>Challenges</h1>
        <FriendListModal
          friends={friends}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
        />
        <div id="challenges">
          {challenges
            .filter(
              (msg) => msg.from === selectedFriend?._id || msg.from === "me"
            )
            .map((msg, index) => (
              <p key={index}>
                {msg.from === "me" ? "Me" : selectedFriend.username}: {msg.text}
              </p>
            ))}
        </div>
      </div>
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
          <div>
            {filteredUsers.map((user) => (
              <p key={user._id}>
                {user.username} - {user.wins} wins
                {Auth.loggedIn() ? (
                  !friends.some((friend) => friend.username === user.username) ? (
                    <button onClick={() => newFriend(user)}>Add Friend‽</button>
                  ) : user.username === Auth.getProfile().data.username ? (
                    <button disabled>I hope you're friends with yourself</button>
                  ) : (
                    <button disabled>Y'all be friends!</button>
                  )
                ) : null}
              </p>
            ))}
          </div>
        )}
        {usersError && (
          <div className="my-3 p-3 bg-danger text-white">
            {usersError.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
