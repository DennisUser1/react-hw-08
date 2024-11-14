import styles from "./Creators.module.css";

const Creators = () => {
  return (
    <div className={styles.creators}>
      <h3 className={styles.title}>Creators</h3>
      <p className={styles.textWrapper}>
        <span className={styles.textPosition}>Developer:</span>
        <span className={styles.textName}>Fedorov Denis</span>
      </p>
      <p className={styles.textWrapper}>
        <span className={styles.textPosition}>QA Engineer:</span>
        <span className={styles.textName}>Fedorov Denis</span>
      </p>
    </div>
  );
};

export default Creators;
