import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import styles from "./HomePage.module.css";
import Creators from "../../components/Creators/Creators";
import DocumentTitle from "../../components/DocumentTitle";
import { Helmet } from "react-helmet-async";
import { TypeAnimation } from "react-type-animation";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <>
      <DocumentTitle>Home. Welcome to Your Personal Phonebook!</DocumentTitle>
      <Helmet>
        <meta
          name="description"
          content="Manage your contacts easily with this phonebook app."
        />
      </Helmet>

      <section className={styles.homePage}>
        <div className={styles.homePageWrapper}>
          {user.name ? (
            <>
              <h1 className={styles.title}>Welcome {user.name}!</h1>
              <p className={styles.desc}>
                Here you can add, edit and find your contacts
              </p>
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
