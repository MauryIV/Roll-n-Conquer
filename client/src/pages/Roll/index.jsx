import React, { useState, useEffect } from "react";
import "../../App.css";
import { roll1, roll2, roll3, roll4 } from "./style";
import auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import {
  RECORD_STATS,
  // RECORD_DAILY,
  ADD_CHALLENGE,
  UPDATE_CHALLENGE
} from "../../utils/mutations";
import { getUser } from "../../utils/userQueries";

const themes = [roll1, roll2, roll3, roll4];

const DiceRoller = () => {
  const { daily, friends, challenges } = getUser();

  const [diceType, setDiceType] = useState(6);
  const [rolling, setRolling] = useState(false);
  const [rollingAnimation, setAnimate] = useState("");
  const [numFlash, setNumFlash] = useState("‽");
  const [finalResult, setFinalResult] = useState(null);
  const [buttonShake, setButtonShake] = useState(false);
  const [challengeRoll, setChallengeRoll] = useState(false);
  const [challengeRebuttal, setChallengeRebuttal] = useState("");
  const [dailyRoll, setDailyRoll] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState("");

  // const [recordDaily] = useMutation(RECORD_DAILY);
  const [recordStats] = useMutation(RECORD_STATS);
  const [addChallenge] = useMutation(ADD_CHALLENGE);
  const [updateChallenge] = useMutation(UPDATE_CHALLENGE);

  const token = auth.loggedIn() ? auth.getToken() : null;
  const userId = auth.getUserId();
  const name = auth.getUsername();

  const loadRandomTheme = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const styleElement = document.createElement("style");
    styleElement.textContent = randomTheme;
    document.head.appendChild(styleElement);
  };

  useEffect(() => {
    loadRandomTheme();
  }, []);

  // this is so the challenge default is the user at index 0
  useEffect(() => {
    if (friends.length > 0) {
      const username = friends[0].username;
      setSelectedFriend(username);
    }
  }, [friends]);

  useEffect(() => {
    if (dailyRoll) {
      setDiceType(100);
      setNumFlash("‽");
      console.log("daily roll activated");
    }
  }, [dailyRoll]);

  useEffect(() => {
    if (challengeRoll) {
      console.log("challenge roll activated");
    }
  }, [challengeRoll]);

  const handleChallengeRollClick = () => {
    setNumFlash("‽");
    setChallengeRoll(true);
  };
  const handleDailyRollClick = () => {
    setNumFlash("‽");
    setDailyRoll(true);
  };





  
  const handleViewChallengesClick = async () => {
    setNumFlash("‽");
    console.log(challenges);
    if (!challenges.length) {
      console.log("No challenges available.");
      return;
    }
    
    // Assume we are dealing with the first challenge for simplicity
    const currentChallenge = challenges[0];

    // Find the dice type used for the challenge
    const diceTypes = [4, 6, 8, 10, 12, 20, 100];
    let diceNumber = null;
    let rollOneValue = null;
    
    for (let type of diceTypes) {
      if (currentChallenge[`d${type}One`] !== null) {
        diceNumber = type;
        rollOneValue = currentChallenge[`d${type}One`]
        break;
      }
    }
    
    // Set dice type to the challenge's dice number
    setDiceType(diceNumber);
    



// animation here
    // Perform the roll
    const rollResult = Math.floor(Math.random() * diceNumber) + 1;
    console.log(`Rolled a D${diceNumber} and got ${rollResult}`);
    



    // Determine the currentRollingUser and the appropriate dice field to update
    const diceOne = `d${diceNumber}One`;
    const diceTwo = `d${diceNumber}Two`;

    const challengeVariables = {
      userOne: currentChallenge.userOne,
      userTwo: currentChallenge.userTwo,
      [diceOne]: rollOneValue,
      [diceTwo]: rollResult,
    };

    console.log("Callenge Variables: ", challengeVariables)
    
    // Save the result to the challenge
    try {
      await updateChallenge({
        variables: challengeVariables,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      
      // Compare rolls      
      if (rollOneValue > rollResult) {
        console.log(`${challengeVariables.userOne} wins!`);
      } else if (rollOneValue < rollResult) {
        console.log(`${challengeVariables.userTwo} wins!`);
      } else {
        console.log("It's a tie!");
      }
    } catch (error) {
      console.error("Error updating challenge: ", error.message);
    }
    setChallengeRebuttal("")
  };
  


  // Then need to send stats to both users
  // Then need to delete challenge form userTwo challenges,





  const rollDice = () => {
    if (rolling) return;
    console.log(diceType);
    setRolling(true);
    setAnimate("roll-animation");

    let interval = setInterval(() => {
      setNumFlash(Math.floor(Math.random() * diceType) + 1);
    }, 72);

    setTimeout(async () => {
      clearInterval(interval);
      setRolling(false);
      setAnimate("");

      const finalRoll = Math.floor(Math.random() * diceType) + 1;
      setNumFlash(finalRoll);
      // Use this for the Current users roll value to be passed into the challenge roll
      if (dailyRoll) {
        if (!token) {
          return false;
        }
        setDailyRoll(false);
        setFinalResult(finalRoll);
        console.log("dailyRoll: ", finalRoll);
        try {
          await recordStats({
            variables: { username: name, daily: finalRoll },
            context: {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          });
          console.log("dailyRoll updated: ", finalRoll);
        } catch (error) {
          console.error("Error updating daily roll: ", error);
        }

        // Challenge Roll
      } else if (challengeRoll) {
        if (!token) {
          return false;
        }
        setChallengeRoll(false);
        setFinalResult(finalRoll);
        console.log("challengeRoll: ", finalRoll);
        const challengeVariables = {
          userOne: name,
          userTwo: selectedFriend,
        };

        challengeVariables[`d${diceType}One`] = finalRoll;
        try {
          await addChallenge({
            variables: challengeVariables,
            context: {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          });
          console.log("Challenge sent: ", finalRoll);
        } catch (error) {
          console.error("Error sending challenge: ", error);
        }
      } else {
        setFinalResult(finalRoll);
      }
    }, 6000);
  };

  const diceNums = {
    4: {
      paddingBottom: "40px",
      paddingRight: "13px",
      paddingLeft: "5px",
      transform: "rotate(28deg)",
      zIndex: "100",
      color: "white",
    },
    6: {
      paddingTop: "12px",
      paddingRight: "15px",
      zIndex: "100",
      color: "white",
    },
    8: {
      zIndex: "100",
      color: "white",
    },
    10: {
      paddingBottom: "22px",
      paddingLeft: "3px",
      zIndex: "100",
      color: "white",
    },
    12: {
      paddingLeft: "3px",
      zIndex: "100",
      color: "white",
    },
    20: {
      zIndex: "100",
      color: "white",
    },
    100: {
      zIndex: "100",
      color: "white",
    },
  };

  return (
    <div className="dice-roller">
      <h1>Dice Roller</h1>
      <div className="dice-type-selector">
        <h2>Select Dice Type: </h2>

        <select
          value={diceType}
          disabled={rolling}
          onChange={(e) => {
            setDiceType(Number(e.target.value));
            setNumFlash("‽");
          }}
        >
          {dailyRoll ? (
            <option value={100}>D100</option>
          ) : (
            <>
              <option value={4}>D4</option>
              <option value={6}>D6</option>
              <option value={8}>D8</option>
              <option value={10}>D10</option>
              <option value={12}>D12</option>
              <option value={20}>D20</option>
              <option value={100}>D100</option>
            </>
          )}
        </select>
        {challengeRoll && (
          <>
            <select
              className="mx-2"
              value={selectedFriend}
              onChange={(e) => setSelectedFriend(e.target.value)}
              disabled={rolling || !friends.length}
            >
              {friends.map((friend, index) => (
                <option key={index} value={friend.username}>
                  {friend.username}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <div className={`roll-dice-container ${rollingAnimation}`}>
        {!rolling && (
          <>
            <div className="row row-button">
              <div className="col">
                <button
                  className="challenge-btn"
                  onClick={handleChallengeRollClick}
                >
                  Challenge a friend
                </button>
              </div>
              <div className="col">
                <button 
                  className="your-challenge-btn"
                  onClick={handleViewChallengesClick}
                >
                  View Challenges</button>
              </div>
              <div className="col">
                <button
                  className="daily-btn"
                  onClick={handleDailyRollClick}
                  disabled={daily !== 0}
                >
                  Daily Roll
                </button>
              </div>
            </div>
          </>
        )}

        {/* view challenges modal */}

        <img
          // src={`../src/assets/svgs/sharpAlt2/d${diceType}.svg`}
          src={`/images/sharpAlt2/d${diceType}.svg`}
          alt={`D${diceType}`}
          className={`dice`}
        />
        <div className="dice-number" style={diceNums[diceType]}>
          {numFlash}
        </div>
        {diceType === 4 && (
          <div
            className="dice-number"
            style={{
              paddingBottom: "32px",
              paddingLeft: "21px",
              transform: "rotate(-38deg)",
              zIndex: "100",
              color: "white",
            }}
          >
            {numFlash}
          </div>
        )}
      </div>
      <button className="die-btn" onClick={rollDice}>
        Roll Dice
      </button>
    </div>
  );
};

export default DiceRoller;
