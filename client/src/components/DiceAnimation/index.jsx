import { motion } from "framer-motion";
import { d4bk ,d6bk ,d8bk ,d10bk ,d12bk ,d20bk } from "../../assets/svgs/filledNumbered";
import { d4wh, d6wh, d8wh, d10wh, d12wh, d20wh } from "../../assets/svgs/fullNumbered";
import { d4shpOut, d6shpOut, d8shpOut, d10shpOut, d12shpOut, d20shpOut } from "../../assets/svgs/sharpAlt2";
import { d4shpFil, d6shpFil, d8shpFil, d10shpFil, d12shpFil, d20shpFil } from "../../assets/svgs/sharpAlt";
import { d4shpFilOut, d6shpFilOut, d8shpFilOut, d10shpFilOut, d12shpFilOut, d20shpFilOut } from "../../assets/svgs/sharp";
import { d4bubOut, d6bubOut, d8bubOut, d10bubOut, d12bubOut, d20bubOut } from "../../assets/svgs/realFull";
import { d4bubHol, d6bubHol, d8bubHol, d10bubHol, d12bubHol, d20bubHol } from "../../assets/svgs/outline";
import { d4filOut, d6filOut, d8filOut, d10filOut, d12filOut, d20filOut } from "../../assets/svgs/filled";
import { d4fil, d6fil, d8fil, d10fil, d12fil, d20fil } from "../../assets/svgs/filledAlt";

const DiceAnimation = () => {
  const diceImages = [d4bk, d6bk, d8bk, d10bk, d12bk, d20bk, d4wh, d6wh, d8wh, d10wh, d12wh, d20wh, d4shpOut, d6shpOut, d8shpOut, d10shpOut, d12shpOut, d20shpOut, d4shpFil, d6shpFil, d8shpFil, d10shpFil, d12shpFil, d20shpFil, d4shpFilOut, d6shpFilOut, d8shpFilOut, d10shpFilOut, d12shpFilOut, d20shpFilOut, d4bubOut, d6bubOut, d8bubOut, d10bubOut, d12bubOut, d20bubOut, d4bubHol, d6bubHol, d8bubHol, d10bubHol, d12bubHol, d20bubHol, d4filOut, d6filOut, d8filOut, d10filOut, d12filOut, d20filOut, d4fil, d6fil, d8fil, d10fil, d12fil, d20fil];

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
