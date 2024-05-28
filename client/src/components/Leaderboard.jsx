// src/Leaderboard.js
import React, { useState, useEffect } from 'react';
import '../App.css'

const Leaderboard = () => {
  const [diceRolls, setDiceRolls] = useState([]);

  useEffect(() => {
    const rolls = [
        { name: 'Alice', roll: 4 },
        { name: 'Bob', roll: 6 },
        { name: 'Charlie', roll: 2 },
        { name: 'Diana', roll: 5 },
        { name: 'Eve', roll: 3 },
        { name: 'Frank', roll: 1 },
        { name: 'Grace', roll: 6 },
        { name: 'Hank', roll: 4 },
        { name: 'Ivy', roll: 5 },
        { name: 'Jack', roll: 3 }
      ];
    rolls.sort((a, b) => b.roll - a.roll);
    setDiceRolls(rolls);
  }, []);

  return (
    <div className="leaderboard">
      <h2>Dice Rolls Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Roll</th>
          </tr>
        </thead>
        <tbody>
          {diceRolls.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.roll}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

