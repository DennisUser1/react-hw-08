import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations.js";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.wrapperButton}>
      <button
        className={styles.buttonLogOut}
        type="button"
        onClick={handleClick}
      >
        LogOut
      </button>
    </div>
  );
}
