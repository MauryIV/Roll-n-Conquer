// src/Dice.js
import React from 'react';
import { motion } from 'framer-motion';
import '../App.css'

const diceImages = [
  'dice1.png', // Add the actual path to your dice images
  'dice2.png',
  'dice3.png',
  'dice4.png',
  'dice5.png',
  'dice6.png',
];

const Dice = () => {
  const dice = diceImages.map((src, index) => (
    <motion.img
      key={index}
      src={src}
      className="dice"
      animate={{
        x: [0, window.innerWidth],
        y: [0, window.innerHeight / 2, window.innerHeight],
        rotate: [0, 360],
      }}
      transition={{
        repeat: Infinity,
        duration: 10,
        ease: 'linear',
      }}
    />
  ));

  return <div className="dice-container">{dice}</div>;
};

export default Dice;
