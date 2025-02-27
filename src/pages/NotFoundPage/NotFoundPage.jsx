import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "notfound-styles";
    style.innerHTML = `
      * {
        box-sizing: border-box;
        transform-style: preserve-3d;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById("notfound-styles");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <section className={styles.NotFoundPage}>
      <NavLink
        className={`${styles.linkContacts} ${styles.noBorder}`}
        to="/contacts"
        data-ribbon="Back to Contacts"
        title="Back to Contacts"
      ></NavLink>
      <h1 className={styles.titlePage}>404</h1>
      <div className={styles.cloakWrapper}>
        <div className={styles.cloakContainer}>
          <div className={styles.cloak}></div>
        </div>
      </div>
      <div className={styles.info}>
        <h2>
          Page Not Found. <br />
          This is last page of the internet.
        </h2>
        <p>Refresh it once, you might find something else.</p>
        <br />
        <NavLink className={styles.btnHome} to="/">
          Go home
        </NavLink>
      </div>
    </section>
  );
}
