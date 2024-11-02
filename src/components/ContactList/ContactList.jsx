import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import {
  selectFilteredContacts,
  selectIsLoading,
  selectContacts,
} from "../../redux/contacts/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import { undoDeleteContact } from "../../redux/contacts/operations.js";
import { FaChess } from "react-icons/fa";

const groupContactsByLetter = (contacts) => {
  return contacts.reduce((groups, contact) => {
    const letter = contact.name[0].toUpperCase();
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(contact);
    return groups;
  }, {});
};

export default function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const contacts = useSelector(selectContacts);
  const deletedContact = useSelector((state) => state.contacts.deletedContact);
  const noContacts = !contacts || contacts.length === 0;

  const groupedContacts = groupContactsByLetter(filteredContacts);

  const handleUndoDelete = () => {
    dispatch(undoDeleteContact(deletedContact));
  };

  return (
    <>
      <div className={styles.boxBackground}>
        <div
          className={
            noContacts || !deletedContact
              ? styles.centeredTitleWrapper
              : styles.subtitleWrapper
          }
        >
          <h2 className={styles.preTitle}>
            <span
              className={
                deletedContact
                  ? `${styles.titleList} ${styles.titleWithUndo}`
                  : styles.titleList
              }
            >
              List
            </span>
            <br />
            Contacts
          </h2>
          {!noContacts && deletedContact && (
            <button className={styles.undoButton} onClick={handleUndoDelete}>
              Undo
            </button>
          )}
        </div>
      </div>
      {Object.keys(groupedContacts).length === 0 && !isLoading && (
        <div className={styles.messageWrapper}>
          <div className={styles.messageContentWrapper}>
            <FaChess className={styles.messageIconInfo} size="16" />
            <p className={styles.messageInfo}>
              No contacts are available at the moment.
              <br />
              Please, add some contacts to view them here.
            </p>
          </div>
        </div>
      )}
      <ul className={styles.contactsList}>
        {Object.entries(groupedContacts).map(([letter, contacts]) => (
          <div key={letter}>
            <div className={styles.letterDivider}>
              <span className={styles.letter}>{letter}</span>
              <hr className={styles.dividerLine} />
            </div>
            {contacts.map(({ id, name, number }) => (
              <li className={styles.contactItem} key={id}>
                <Contact id={id} name={name} number={number} />
              </li>
            ))}
          </div>
        ))}
      </ul>
    </>
  );
}
