import React, { useState, useEffect } from "react";
import "../../App.css";
import "./leaderboard.css";

const Leaderboard = () => {
  const [diceRolls, setDiceRolls] = useState([]);

  const bgShades = [
    '#ece8f2', 
    '#e5e1ec', 
    '#cfc3e0',
    '#bfafd5',
    '#b09bcb',
    '#a086c0',
    '#9072b6',
    '#805eab',
    '#704aa0',
    '#603696'
  ];

  const textShades = [
    '#007641',
    '#008e50',
    '#0aa762',
    '#29b276',
    '#47bd8a',
    '#66c89d',
    '#84d3b1',
    '#a3dec4',
    '#c2e9d8',
    '#e0f4eb'
  ];

  useEffect(() => {
    const rolls = [
      { name: "Alice", roll: 4 },
      { name: "Bob", roll: 6 },
      { name: "Charlie", roll: 2 },
      { name: "Diana", roll: 5 },
      { name: "Eve", roll: 3 },
      { name: "Frank", roll: 1 },
      { name: "Grace", roll: 6 },
      { name: "Hank", roll: 4 },
      { name: "Ivy", roll: 5 },
      { name: "Jack", roll: 3 },
    ];
    rolls.sort((a, b) => b.roll - a.roll);
    setDiceRolls(rolls);
  }, []);

  return (
    <div className="leaderboard">
      <div className="header">
        <h1 className="glowing-header">⚀⚁⚂⚃⚄⚅ Leaderboard ⚀⚁⚂⚃⚄⚅</h1>
        {/* <p className="glowing-header">🎲🎲</p> */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rank</th>
            <th>Roll</th>
          </tr>
        </thead>
        <tbody>
          {diceRolls.map((entry, index) => (
            <tr key={index} style={{ backgroundColor: bgShades[index % bgShades.length], color: textShades[index % textShades.length] }}>
              <td>{entry.name}</td>
              <td>{index + 1}</td>
              <td>{entry.roll}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
