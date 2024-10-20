import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

export default function AuthNav () {
  return (
    <div>
      <ul className={styles.authNavList}>
        <li>
          <NavLink className={styles.link} to="/register">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="/login">
            Log In
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
