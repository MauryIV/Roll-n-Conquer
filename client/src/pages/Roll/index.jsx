import React, { useState, useEffect } from "react";
import "../../App.css";
import { roll1, roll2, roll3, roll4 } from "./style";

const themes = [roll1, roll2, roll3, roll4];

const DiceRoller = () => {
  const [diceType, setDiceType] = useState(6);
  const [rolling, setRolling] = useState(false);
  const [rollingAnimation, setAnimate] = useState("");
  const [numFlash, setNumFlash] = useState("‽");

  const loadRandomTheme = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const styleElement = document.createElement("style");
    styleElement.textContent = randomTheme;
    document.head.appendChild(styleElement);
  };

  useEffect(() => {
    loadRandomTheme();
  }, []);

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);
    setAnimate("roll-animation");

    let interval = setInterval(() => {
      setNumFlash(Math.floor(Math.random() * diceType) + 1);
    }, 72);

    setTimeout(() => {
      clearInterval(interval);
      setRolling(false);
      setAnimate("");
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
        <label>Select Dice Type: </label>
        <select
          value={diceType}
          disabled={rolling}
          onChange={(e) => {
            setDiceType(Number(e.target.value));
            setNumFlash("‽");
          }}
        >
          <option value={4}>D4</option>
          <option value={6}>D6</option>
          <option value={8}>D8</option>
          <option value={10}>D10</option>
          <option value={12}>D12</option>
          <option value={20}>D20</option>
          <option value={100}>D100</option>
        </select>
      </div>
      <div className={`roll-dice-container ${rollingAnimation}`}>
        <img
          src={`../src/assets/svgs/sharpAlt2/d${diceType}.svg`}
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
      <button onClick={rollDice} disabled={rolling}>
        Roll Dice
      </button>
    </div>
  );
};

export default DiceRoller;
