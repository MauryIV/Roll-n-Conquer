import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import "../../App.css";
import "./friendlist.css";
import { getUser } from "../../utils/userQueries";
import { ADD_CHALLENGE, ADD_MESSAGE } from "../../utils/mutations";

const FriendListModal = () => {
  const myModalRef = useRef(null);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [challengeSent, setChallengeSent] = useState(false);

  const { friends, challenges, messages } = getUser();
  const [addMessage] = useMutation(ADD_MESSAGE);

  // const handleMessage = () => {
  //   if (selectedFriend && message) {
  //     addMessage({
  //       variables: {
  //         userOne: Auth.getProfile().data.username,
  //         userTwo: selectedFriend.username,
  //         msgOne: message,
  //         msgTwo: "",
  //       },
  //     })
  //       .then(() => {
  //         setMessage("");
  //         setMessageSent(true);
  //         setTimeout(() => {
  //           setMessageSent(false);
  //         }, 2000);
  //       })
  //       .catch((err) => console.error(err));
  //   } else {
  //     console.log("Invalid message");
  //   }
  // };

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
                            {messageSent && selectedFriend === friend
                              ? "Message Sent"
                              : "Send Message"}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="col row">
                      {/* <button
                        type="button"
                        className="btn btn-primary col"
                        onClick={() => handleProfileView(friend)}
                      >
                        Profile
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary col"
                        onClick={() => setSelectedFriend(friend)}
                      >
                        Message
                      </button> */}
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


// import io from "socket.io-client";
// const socket = io("ws://localhost:3001");

// const sendMessage = (text, selectedFriend) => {
//   const trimmedText = text.toString().trim();
//   console.log("Sending message:", trimmedText, selectedFriend);
//   socket.emit("message", {
//     from: Auth.getUsername(),
//     to: selectedFriend,
//     text: trimmedText,
//   });
// };

// const handleChallenge = (selectedFriend) => {
//   if (selectedFriend) {
//     sendChallenge(selectedFriend.username);
//     setChallengeSent(true);
//     setTimeout(() => {
//       setChallengeSent(false);
//     }, 2000);
//   } else {
//     console.log("Unable to send challenge");
//   }
// };

// const sendChallenge = (selectedFriendUsername) => {
//   console.log("Sending challenge to ", selectedFriendUsername);
//   socket.emit("challenge", {
//     from: Auth.getUsername(),
//     to: selectedFriend,
//   });
// };
