import { GoKebabHorizontal } from "react-icons/go";
import { FaRegHeart, FaHeart } from "react-icons/fa"; 
import { MdContacts } from "react-icons/md";
import { useToggle } from "../../shared/hooks/useToggleState";
import styles from "./KebabMenuHorizontal.module.css";

export default function KebabMenuHorizontal({ isOpen, setIsOpen, title, isFavorite, setIsFavorite}) {

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
        title="Menu"
      >
        <GoKebabHorizontal />
      </button>
      <div
        className={`${styles.menuWrapper} ${isMenuOpen ? styles.open : ""}`}
        style={{ zIndex: isOpen ? 1 : 1 }}
      >
        <div className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
          {isMenuOpen && <h3 className={styles.kebabTitle}>{title}</h3>}

          <button
            className={`${styles.favoriteButton} ${
              isFavorite ? styles.favoriteActive : ""
            }`}
            title="Favorites"
            onClick={(event) => {
              handleButtonClick(event);
              setIsFavorite((prev) => !prev);
            }}
          >
            {isFavorite ? (
              <FaHeart className={styles.icon} style={{ color: "red" }} />
            ) : (
              <FaRegHeart className={styles.icon} />
            )}
            Favorite
          </button>

          <button
            className={styles.detailButton}
            title="Contact Detail"
            onClick={(event) => {
              handleButtonClick(event);
            }}
          >
            <MdContacts className={styles.icon} /> Detail
          </button>
        </div>
      </div>
    </>
  );
};
