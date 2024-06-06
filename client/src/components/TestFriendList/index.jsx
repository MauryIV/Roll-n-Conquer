import { useEffect, useRef, useState } from "react";
import Auth from "../../utils/auth";
import "../../App.css";
import "./friendlist.css";
import { getUser } from "../../utils/userQueries";
import io from "socket.io-client";
const socket = io("ws://localhost:3001");

const FriendListModal = () => {
  const myModalRef = useRef(null);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [challengeSent, setChallengeSent] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [challenge, setChallenge] = useState("");

  const { friends } = getUser();

  const handleChallenge = (friend) => {
    setSelectedFriend(friend);
    setChallengeSent(true);
    sendChallenge("Challenge message", friend.username);
  };

  const handleMessage = () => {
    if (selectedFriend && message) {
      sendMessage(message, selectedFriend.username);
      setMessage("");
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
      }, 1300);
    } else {
      console.log("Invalid message");
    }
  };

  const sendMessage = (text, selectedFriendUsername) => {
    const trimmedText = text.toString().trim();
    console.log("Sending message:", trimmedText, selectedFriendUsername);
    socket.emit('message', {
      from: Auth.getUsername(),
      to: selectedFriendUsername,
      text: trimmedText,
    })
  };

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary modal-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Friends
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={myModalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" id="modal-custom">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Your Friends
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {friends.map((friend, index) => (
                <div className="card m-1" key={index}>
                  <div className="card-body row">
                    <div className="col">
                      <h4>{friend.username}</h4>
                      {selectedFriend === friend && !challengeSent && (
                        <div>
                          <textarea
                            className="form-control mb-2"
                            placeholder="Type your message here"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          ></textarea>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleMessage}
                          >
                            Send Message
                          </button>
                          {messageSent && (
                            <p className="mt-2 text-success">Message sent!</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="col row">
                      <button type="button" className="btn btn-primary col">
                        Profile
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary col"
                        onClick={() => setSelectedFriend(friend)}
                      >
                        Message
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger col"
                        onClick={() => handleChallenge(friend)}
                        disabled={challengeSent && selectedFriend === friend}
                      >
                        {challengeSent && selectedFriend === friend
                          ? "Challenge Sent"
                          : "Challenge"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendListModal;
