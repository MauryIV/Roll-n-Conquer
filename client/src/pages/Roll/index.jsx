import React, { useState, useEffect } from "react";
import "../../App.css";
import { roll1, roll2, roll3, roll4 } from "./style";
import FriendListModal from '../../components/FriendList/FriendList'
import auth from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { RECORD_STATS, UPDATE_DAILY } from "../../utils/mutations";
import { getUser } from "../../utils/userQueries";

const themes = [roll1, roll2, roll3, roll4];

const DiceRoller = () => {
  const [diceType, setDiceType] = useState(6);
  const [rolling, setRolling] = useState(false);
  const [rollingAnimation, setAnimate] = useState("");
  const [numFlash, setNumFlash] = useState("‽");
  const [finalResult, setFinalResult] = useState(null);
  const [buttonShake, setButtonShake] = useState(false);
  const [challengeRoll, setChallengeRoll] = useState(false);
  const [dailyRoll, setDailyRoll] = useState(false)

  const [recordDaily, { error }] = useMutation(RECORD_STATS)
  const { daily } = getUser();
  
  const loadRandomTheme = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const styleElement = document.createElement("style");
    styleElement.textContent = randomTheme;
    document.head.appendChild(styleElement);
  };
 
  useEffect(() => {
    loadRandomTheme();
  }, []);

  useEffect(() => {
    if(dailyRoll){
      setDiceType(100);
      setNumFlash("‽")
      console.log('daily roll activated')
      
    }
  }, [dailyRoll]);

  const handleDailyRollClick = () => {
    setDailyRoll(true);
  };



  const rollDice = () => {
    if (rolling) return;
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
      const token = auth.loggedIn() ? auth.getToken() : null;
      const userId = auth.getUserId()
      const name = auth.getUsername()
      if (!token) {
        return false;
      }
      setDailyRoll(false);
      setFinalResult(finalRoll);
      console.log("dailyRoll: ", finalRoll)
      try {
        await recordDaily({variables: {username: name, daily: finalRoll},
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        })
        console.log("dailyRoll updated: ", finalRoll)
      } catch (error) {
        console.error("Error updating daily roll: ", error)
      }
       } else {
        setFinalResult(finalRoll)
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
      </div>
      
      <div className={`roll-dice-container ${rollingAnimation}`}>
        {!rolling && (
          <button className="daily-btn" onClick={handleDailyRollClick} disabled={daily !== 0}>
            Daily Roll
          </button>
        )}
        <img
          // src={`../src/assets/svgs/sharpAlt2/d${diceType}.svg`}
          src={`/images/sharpAlt2/d${diceType}.svg`}
          alt={`D${diceType}`}
          className={`dice`}
        />
        <div className="dice-number" style={diceNums[diceType]}>{numFlash}</div>
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
      <button className="die-btn" onClick={rollDice} >
        Roll Dice
      </button>
    </div>
  );
};

export default DiceRoller;
