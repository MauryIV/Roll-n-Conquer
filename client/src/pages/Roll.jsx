import React, { useState } from 'react';
import '../App.css'

const DiceRoller = () => {
  const [diceType, setDiceType] = useState(6);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [rollingAnimation, setAnimate] = useState("")

  const rollDice = () => {
    if (rolling) return;
    const rolledNumber = Math.floor(Math.random() * diceType) + 1;
    setRolling(true);
    setResult(null);
    setAnimate("roll-animation")

    setTimeout(() => {
      setRolling(false);
      setResult(rolledNumber);
      setAnimate("")
    }, 6000);
  };

  return (
    <div className="dice-roller">
      <h1>Dice Roller</h1>
      <div className="dice-type-selector">
        <label>Select Dice Type: </label>
        <select value={diceType} onChange={(e) => setDiceType(Number(e.target.value))}>
          <option value={6}>D6</option>
          <option value={20}>D20</option>
          <option value={100}>D100</option>
        </select>
      </div>
      <div className={`roll-dice-container ${rollingAnimation}`}>
        <img src={`../src/assets/svgs/sharpAlt2/d${diceType} sharp alt 2.svg`} alt={`D${diceType}`} className={`dice`} />
        {rolling ? (
          <div className="rolling"></div>
        ) : (
          <div className="result">{result}</div>
        )}
      </div>
      <button onClick={rollDice} disabled={rolling}>Roll Dice</button>
    </div>
  );
};

export default DiceRoller;
