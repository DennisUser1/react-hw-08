import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import styles from "./AppBar.module.css";
import logo from "../../assets/images/logo.png";

export default function AppBar() {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={styles.header}>
      {isLoggedIn ? (
        <div className={styles.text}>
          Welcome, {user.name}!  {/* Test name - Schwarzenegger */}
        </div>
      ) : (
        <Link className={styles.headerLogo} to="/">
          <img src={logo} className={styles.logo} alt="PhoneBook Logo" />
          <p className={styles.phoneBookText}>PhoneBook</p>
        </Link>
      )}

      {isLoggedIn ? <UserMenu /> : <AuthNav />}
      <Navigation />

      {/* <div className={styles.navigationItems}>
      </div> */}
    </header>
  );
}
