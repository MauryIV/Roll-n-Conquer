import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Roll1, Roll2, Roll3 } from './style';

const themes = [Roll1, Roll2, Roll3];

const DiceRoller = () => {
  const [diceType, setDiceType] = useState(6);
  const [rolling, setRolling] = useState(false);
  const [rollingAnimation, setAnimate] = useState("");
  const [numFlash, setNumFlash] = useState("‽");

  const loadRandomTheme = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const styleElement = document.createElement('style');
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
    4: { position: 'absolute', top: `${60.5 + (rolling ? -14 : 0)}%`, left: `${37.75 + (rolling ? 11 : 0)}%`, transform: 'translate(-50%, -50%) rotate(25deg)', zIndex: '1', color: 'white', padding: '10px' },
    6: { position: 'absolute', top: `${63 + (rolling ? -12.5 : 0)}%`, left: `${38 + (rolling ? 11.5 : 0)}%`, transform: 'translate(-50%, -50%)', zIndex: '1', color: 'white' },
    8: { position: 'absolute', top: `${62.75 + (rolling ? -13 : 0)}%`, left: `${38.5 + (rolling ? 11.5 : 0)}%`, transform: 'translate(-50%, -50%)', zIndex: '1', color: 'white' },
    10: { position: 'absolute', top: `${61.5 + (rolling ? -13.5 : 0)}%`, left: `${38.55 + (rolling ? 11.5 : 0)}%`, transform: 'translate(-50%, -50%)', zIndex: '1', color: 'white' },
    12: { position: 'absolute', top: `${63 + (rolling ? -12.25 : 0)}%`, left: `${38.65 + (rolling ? 11.5 : 0)}%`, transform: 'translate(-50%, -50%)', zIndex: '1', color: 'white' },
    20: { position: 'absolute', top: `${63 + (rolling ? -12.25 : 0)}%`, left: `${38.5 + (rolling ? 11.5 : 0)}%`, transform: 'translate(-50%, -50%)', zIndex: '1', color: 'white' },
    100: { position: 'absolute', top: `${62 + (rolling ? -12.5 : 0)}%`, left: `${38.5 + (rolling ? 11.5 : 0)}%`, transform: 'translate(-50%, -50%)', zIndex: '1', color: 'white' },       
  }

  return (
    <div className="dice-roller">
      <h1>Dice Roller</h1>
      <div className="dice-type-selector">
        <label>Select Dice Type: </label>
        <select value={diceType} disabled={rolling} onChange={(e) => {
            setDiceType(Number(e.target.value));
            setNumFlash("‽");
        }}>
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
        <img src={`../src/assets/svgs/sharpAlt2/d${diceType} sharp alt 2.svg`} alt={`D${diceType}`} className={`dice`} />
        <div style={diceNums[diceType]}>{numFlash}</div>
        {diceType === 4 && <div style={{ position: 'absolute', top: `${60.75 + (rolling ? -14 : 0)}%`, left: `${39.5 + (rolling ? 12.25 : 0)}%`, transform: 'translate(-50%, -50%) rotate(-30deg)', zIndex: '1', color: 'white' }}>{numFlash}</div>}
      </div>
      <button onClick={rollDice} disabled={rolling}>Roll Dice</button>
    </div>
  );
};

export default DiceRoller;
