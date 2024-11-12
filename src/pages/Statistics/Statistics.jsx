import {
  selectFilteredContacts,
  selectAddedContactsCount,
  selectDeletedContactsCount,
  selectUpdatedContactsCount,
} from "../../redux/contacts/selectors.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GiChart } from "react-icons/gi";
import styles from "./Statistics.module.css";

export default function Statistics() {
  const contacts = useSelector(selectFilteredContacts);
  const addedCount = useSelector(selectAddedContactsCount);
  const deletedCount = useSelector(selectDeletedContactsCount);
  const updatedCount = useSelector(selectUpdatedContactsCount);

  useEffect(() => {
    if (contacts.length > 0) {
    }
  }, [contacts]);

  return (
    <div className={styles.statisticsContainer}>
      <GiChart className={styles.statisticsIcon} />
      <h2 className={styles.statisticsTitle}>Statistics Page</h2>
      <div className={styles.statisticsWrapperText}>
        <p className={styles.statisticsText}>
          <span className={styles.boldText}>Total Contacts:</span>
          <span className={styles.valueText}> {contacts.length} contacts.</span>
        </p>
        <p className={styles.statisticsText}>
          <span className={styles.boldText}>Added Contacts:</span>
          <span className={styles.valueText}> {addedCount} contacts.</span>
        </p>
        <p className={styles.statisticsText}>
          <span className={styles.boldText}>Deleted Contacts:</span>
          <span className={styles.valueText}> {deletedCount} contacts.</span>
        </p>
        <p className={styles.statisticsText}>
          <span className={styles.boldText}>Updated Contacts:</span>
          <span className={styles.valueText}> {updatedCount} contacts.</span>
        </p>
      </div>
    </div>
  );
}
