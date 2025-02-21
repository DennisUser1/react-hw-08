import { useState, useEffect } from "react";
import styles from "./AlphabeticScroll.module.css";

const AlphabeticScroll = ({ groupedContacts, onLetterClick, activeLetter }) => {
  const [isVisible, setIsVisible] = useState(false);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768 && window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const hasContacts = Object.keys(groupedContacts).length > 0;

  return (
    <>
      {hasContacts && isVisible && (
        <div className={styles.alphabeticScroll}>
          {alphabet.map((letter) => {
            const isActive = !!groupedContacts[letter];
            const isCurrent = activeLetter === letter;

            return (
              <button
                key={letter}
                className={`${styles.letterButton} ${isActive ? styles.active : styles.inactive} ${
                  isCurrent ? styles.current : ""
                }`}
                onClick={() => isActive && onLetterClick(letter)}
                disabled={!isActive}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AlphabeticScroll;
