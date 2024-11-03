import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredContacts,
  selectIsLoading,
  selectContacts,
} from "../../redux/contacts/selectors.js";
import {
  selectNameFilter,
  selectNumberFilter,
} from "../../redux/filters/selectors.js";
import { undoDeleteContact } from "../../redux/contacts/operations.js";
import { FaChess } from "react-icons/fa";
import { GiBoomerang } from "react-icons/gi";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

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
  const nameFilter = useSelector(selectNameFilter);
  const numberFilter = useSelector(selectNumberFilter);
  const [textColor, setTextColor] = useState("#ff0000");

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
              List of
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

      {!isLoading && filteredContacts.length === 0 ? (
        nameFilter || numberFilter ? (
          <div className={styles.messageWrapper}>
            <div className={styles.messageContentWrapper}>
              <GiBoomerang className={styles.messageIconWarning} size="24" />
              <p className={styles.messageWarning}>
                No contacts found matching your search criteria.
                <br />
                Try refining your search.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.messageWrapper}>
            <div className={styles.messageContentWrapper}>
              <FaChess className={styles.messageIconInfo} size="16" />
              <p className={styles.messageInfo}>
                No contacts are available at the moment.
                <br />
                <span
                  style={{
                    color: textColor,
                  }}
                >
                  <TypeAnimation
                    sequence={[
                      "Please,",
                      800,
                      () => setTextColor("#313131"),
                      "Please, add",
                      800,
                      () => setTextColor("#0000ff"),
                      "Please, add some",
                      800,
                      () => setTextColor("#ff00ff"),
                      "Please, add some contacts",
                      800,
                      () => setTextColor("#7b2cb3"),
                      "Please, add some contacts to view",
                      800,
                      () => setTextColor("#ff0000"),
                      "Please, add some contacts to view them",
                      800,
                      () => setTextColor("#b91b6a"),
                      "Please, add some contacts to view them here.",
                      1000,
                      () => setTextColor("#313131"),
                      "",
                    ]}
                    repeat={Infinity}
                  />
                </span>
              </p>
            </div>
          </div>
        )
      ) : (
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
      )}
    </>
  );
}
