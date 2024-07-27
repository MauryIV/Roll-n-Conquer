import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import "../../App.css";
import "./friendlist.css";
import { getUser } from "../../utils/userQueries";
import { ADD_CHALLENGE } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";

const FriendListModal = () => {
  const myModalRef = useRef(null);
  const navigate = useNavigate();

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [challengeSent, setChallengeSent] = useState(false);

  const { friends, challenges } = getUser();
  const [addChallenge] = useMutation(ADD_CHALLENGE);

  const handleChallenge = (friend) => {
    const currentUser = Auth.getUsername();
    setSelectedFriend(friend);
    addChallenge({
      variables: {
        userOne: currentUser,
        userTwo: friend.username,
      },
    })
      .then(() => {
        setChallengeSent(true);
        setTimeout(() => {
          setChallengeSent(false);
        }, 2000);
        navigate("/roll");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div
        className="modal"
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
                    <h4>{friend.friendId.username}</h4>
                    <div className="col row">
                      <button
                        type="button"
                        className="btn btn-primary col"
                        onClick={() => handleProfileView(friend)}
                      >
                        Profile
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
