import { motion } from "framer-motion";
import { d4bk, d6bk, d8bk, d10bk, d12bk, d20bk } from "../../assets/svgs/filledNumbered";
import { d4wh, d6wh, d8wh, d10wh, d12wh, d20wh } from "../../assets/svgs/fullNumbered";

const DiceAnimation = () => {
  const diceImages = [d4bk, d6bk, d8bk, d10bk, d12bk, d20bk, d4wh, d6wh, d8wh, d10wh, d12wh, d20wh];

  const flyDie = Array.from(
    { length: 12 },
    () => diceImages[Math.floor(Math.random() * diceImages.length)]
  );

  return(
    <div className="dice-container">
    {flyDie.map((src, index) => (
      <div key={index} className="dice-wrapper">
        <motion.img
          src={src}
          className="homedice"
          initial={{
            x: index % 2 === 0 ? -100 : window.innerWidth + 100,
            y: index % 2 === 0 ? window.innerHeight + 100 : -100,
          }}
          animate={{
            x:
              index % 2 === 0
                ? [-100, window.innerWidth, window.innerWidth / 2, -100]
                : [
                    window.innerWidth,
                    -100,
                    window.innerWidth / 2,
                    window.innerWidth,
                  ],
            y:
              index % 2 === 0
                ? [window.innerHeight, window.innerHeight / 2, -100]
                : [-100, window.innerHeight / 2, window.innerHeight],
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear",
            delay: index % 2 === 0 ? 0 : 4,
          }}
        />
      </div>
    ))}
    </div>
  );
};

export default DiceAnimation;
