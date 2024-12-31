import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import styles from "./HomePage.module.css";
import Creators from "../../components/Creators/Creators";
import DocumentTitle from "../../components/DocumentTitle";
import { TypeAnimation } from "react-type-animation";
import { Wave } from "react-animated-text";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <>
      <DocumentTitle
        title="Home. Welcome to Your Personal Phonebook!"
        description="Manage your contacts easily with this phonebook app."
      />

      <section className={styles.homePage}>
        <div className={styles.homePageWrapper}>
          {user.name ? (
            <>
              <h1 className={styles.title}>Welcome, {user.name}!</h1>
              <div className={styles.desc}>
                <Wave
                  text={`Here you can add, edit, delete, restore and find your contacts!`}
                  effect="color"
                  effectChange="var(--first-color-animation-home)"
                  speed={15}
                />
              </div>
              <Link className={styles.button} to="/contacts">
                My contacts 
              </Link>
            </>
          ) : (
            <>
              <p className={styles.typeText}>
                <TypeAnimation
                  sequence={[
                    "Save your contacts.",
                    1500,
                    "Edit your contacts.",
                    1500,
                    "Manage your contacts.",
                    1500,
                  ]}
                  cursor={true}
                  repeat={Infinity}
                />
              </p>
              <h1 className={styles.title}>
                Welcome to Your Personal Phonebook!
              </h1>
              {isLoggedIn ? (
                <Link className={styles.button} to="/contacts">
                  Phonebook
                </Link>
              ) : (
                <Link className={styles.button} to="/login">
                  Get started
                </Link>
              )}
              <Creators />
            </>
          )}
        </div>
      </section>
    </>
  );
}
