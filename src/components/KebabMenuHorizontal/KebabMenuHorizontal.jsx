import { GoKebabHorizontal } from "react-icons/go";
import { useToggle } from "../../shared/hooks/useToggleState";
import styles from "./KebabMenuHorizontal.module.css";

export default function KebabMenuHorizontal({ isOpen, setIsOpen }) {
    const toggleMenu = (event) => {
      event.stopPropagation();
      setIsOpen((prev) => !prev);
    };
  
    const {
      isOpen: isMenuOpen,
      openModal: openMenu,
      closeModal: closeMenu,
    } = useToggle();

    const handleButtonClick = (event) => {
        event.stopPropagation();
    };
    
  return (
    <>
      <button
        className={`${styles.kebabButton} ${
          isMenuOpen ? styles.kebabButtonActive : ""
        }`}
        onClick={(event) => {
          handleButtonClick(event);
          toggleMenu(event);
          isMenuOpen ? closeMenu() : openMenu();
        }}
      >
        <GoKebabHorizontal />
      </button>
      <div className={`${styles.menuWrapper} ${isMenuOpen ? styles.open : ""}`} style={{ zIndex: isOpen ? 1 : 1 }}>
        <div className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
          <button
            className={styles.favoriteButton}
            title="Favorites"
            onClick={(event) => {
              handleButtonClick(event);
            }}
          >
            Favorites
          </button>

          <button
            className={styles.detailButton}
            title="Contact Detail"
            onClick={(event) => {
              handleButtonClick(event);
            }}
          >
            Detail
          </button>
        </div>
      </div>
    </>
  );
}
