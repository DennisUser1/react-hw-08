import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import {
  selectFilteredContacts,
  selectIsLoading,
} from "../../redux/contacts/selectors.js";
import { useSelector } from "react-redux";
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
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const groupedContacts = groupContactsByLetter(filteredContacts);

  return (
    <>
      <ul className={styles.contactsList}>
        {Object.keys(groupedContacts).length === 0 && !isLoading ? (
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
        ) : (
          Object.entries(groupedContacts).map(([letter, contacts]) => (
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
          ))
        )}
      </ul>
    </>
  );
}
