import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <section className={styles.homePage}>
      <div className={styles.homePageWrapper}>
        <h1 className={styles.title}>Welcome to Your Personal Phonebook!</h1>
        {isLoggedIn ? (
          <Link className={styles.button} to="/contacts">
            Phonebook
          </Link>
        ) : (
          <Link className={styles.button} to="/login">
            Get started
          </Link>
        )}
      </div>
    </section>
  );
}
