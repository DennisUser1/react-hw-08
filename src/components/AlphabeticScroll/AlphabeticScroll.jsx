import styles from "./AlphabeticScroll.module.css";
const AlphabeticScroll = ({ groupedContacts, onLetterClick, activeLetter }) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
    return (
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
    );
};
  
export default AlphabeticScroll;