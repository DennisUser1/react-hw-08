import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import styles from "./Navigation.module.css";
import { useState } from "react";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.burgerMenu} onClick={updateMenu}>
        <div
          className={`${styles.burgerBar} ${
            isMenuClicked ? styles.clicked : styles.unClicked
          }`}
        ></div>
        <div
          className={`${styles.burgerBar} ${
            isMenuClicked ? styles.clicked : styles.unClicked
          }`}
        ></div>
        <div
          className={`${styles.burgerBar} ${
            isMenuClicked ? styles.clicked : styles.unClicked
          }`}
        ></div>
      </div>

      <div
        className={`${styles.menu} ${
          isMenuClicked ? styles.hidden : styles.visible
        }`}
      >
        <NavLink className={styles.link} to="/">
          Home
        </NavLink>

        {isLoggedIn && (
          <>
            <NavLink className={styles.link} to="/contacts">
              Contacts
            </NavLink>

            <NavLink className={styles.link} to="/statistics">
              Statistics
            </NavLink>
          </>
        )}
      </div>
      {isLoggedIn && (
        <div className={styles.burgerMenuDesktop}>
          <NavLink className={styles.linkDesktop} to="/">
            Home
          </NavLink>
          <NavLink className={styles.linkDesktop} to="/contacts">
            Contacts
          </NavLink>
          <NavLink className={styles.linkDesktop} to="/statistics">
            Statistics
          </NavLink>
        </div>
      )}

      {!isLoggedIn && (
        <div className={styles.burgerMenuDesktopLogout}>
          <NavLink className={styles.linkDesktop} to="/">
            Home
          </NavLink>
        </div>
      )}
    </nav>
  );
}
