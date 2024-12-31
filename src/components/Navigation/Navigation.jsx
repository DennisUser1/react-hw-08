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
      {isMenuClicked && (
        <div className={styles.overlay} onClick={updateMenu}></div>
      )}

      <div
        className={`${styles.burgerMenu} ${
          isMenuClicked ? styles.menuOpen : styles.menuClosed
        }`}
        onClick={updateMenu}
      >
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

      <ul
        className={`${styles.menu} ${
          isMenuClicked ? styles.hidden : styles.visible
        }`}
      >
        <li>
          <NavLink className={styles.link} to="/">
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <NavLink className={styles.link} to="/contacts">
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/statistics">
                Statistics
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {isLoggedIn && (
        <ul className={styles.burgerMenuDesktop}>
          <li>
            <NavLink className={styles.linkDesktop} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.linkDesktop} to="/contacts">
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.linkDesktop} to="/statistics">
              Statistics
            </NavLink>
          </li>
        </ul>
      )}

      {!isLoggedIn && (
        <ul className={styles.burgerMenuDesktopLogout}>
          <li>
            <NavLink className={styles.linkDesktop} to="/">
              Home
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
