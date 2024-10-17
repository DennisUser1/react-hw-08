import { HashLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default function Loader () {
  return (
    <div className={styles.loader}>
      <HashLoader
        height="80"
        width="80"
        color="#9381ff"
        aria-label="hash-loading"
      />
    </div>
  );
};
