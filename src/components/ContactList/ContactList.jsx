import Contact from "../Contact/Contact";
import AlphabeticScroll from "../AlphabeticScroll/AlphabeticScroll";
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
import { useEffect, useState, useRef } from "react";
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
  const isLoading = useSelector(selectIsLoading);
  const contacts = useSelector(selectContacts);
  const deletedContact = useSelector((state) => state.contacts.deletedContact);
  const noContacts = !contacts || contacts.length === 0;
  const nameFilter = useSelector(selectNameFilter);
  const numberFilter = useSelector(selectNumberFilter);
  const isSearching = nameFilter || numberFilter;
  const [textColor, setTextColor] = useState("#ff0000");
  const [flippedContacts, setFlippedContacts] = useState(false);
  const [contactHeights, setContactHeights] = useState({});

  const contactRefs = useRef({});
  const filteredContacts = useSelector(selectFilteredContacts);
  const groupedContacts = groupContactsByLetter(filteredContacts);
  const letterRefs = useRef({});
  const [activeLetter, setActiveLetter] = useState("");

  const handleLetterClick = (letter) => {
    if (letterRefs.current[letter]) {
      letterRefs.current[letter].scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let lastVisibleLetter = null;
      let closestBottomLetter = null;
  
      Object.entries(letterRefs.current).forEach(([letter, ref]) => {
        if (!ref) return;
  
        const rect = ref.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
  
        if (
          (rect.top >= 0 && rect.top <= viewportHeight * 0.2) || 
          (rect.bottom <= viewportHeight && rect.top < viewportHeight)
        ) {
          lastVisibleLetter = letter;
        }
  
        if (rect.bottom > viewportHeight * 0.8 && rect.bottom < viewportHeight + 50) {
          closestBottomLetter = letter;
        }
      });
  
      setActiveLetter(lastVisibleLetter || closestBottomLetter);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
   
  const handleFlip = (id) => {
    setFlippedContacts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const calculateHeight = (id, nameElement) => {
    const lineHeight = parseFloat(getComputedStyle(nameElement).lineHeight);
    const height = nameElement.offsetHeight;
    const numberOfLines = Math.round(height / lineHeight);

    if (numberOfLines === 2) {
      return { maxHeight: "230px", height: "170px" };
    } else if (numberOfLines === 3) {
      return { maxHeight: "190px", height: "300px" };
    }
    return {};
  };

  const setHeights = (id, nameElement) => {
    const newHeight = calculateHeight(id, nameElement);
    setContactHeights((prev) => ({ ...prev, [id]: newHeight }));
  };

  useEffect(() => {
    Object.keys(contactRefs.current).forEach((id) => {
      const nameElement = contactRefs.current[id];
      if (nameElement) {
        setHeights(id, nameElement);
      }
    });
  }, [filteredContacts]);

  const handleUndoDelete = () => {
    dispatch(undoDeleteContact(deletedContact));
  };

  const renderNoContactsMessage = () => {
    if (isSearching) {
      return (
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
      );
    } else {
      return (
        <div className={styles.messageWrapper}>
          <div className={styles.messageContentWrapper}>
            <FaChess className={styles.messageIconInfo} size="16" />
            <p className={styles.messageInfo}>
              No contacts are available at the moment.
              <br />
              <span style={{ color: textColor }}>
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
                    () => setTextColor("#000000"),
                    "",
                  ]}
                  repeat={Infinity}
                />
              </span>
            </p>
          </div>
        </div>
      );
    }
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
        renderNoContactsMessage()
      ) : (
        <>
          <AlphabeticScroll
            groupedContacts={groupedContacts}
            onLetterClick={handleLetterClick}
            activeLetter={activeLetter}
          />

          <ul
            className={`${styles.contactsList} ${
              isSearching ? styles.contactsListCentered : ""
            }`}
          >
            {Object.entries(groupedContacts).map(([letter, contacts]) => (
              <div key={letter} ref={(el) => (letterRefs.current[letter] = el)}>
                <div className={styles.letterDivider}>
                  <span className={styles.letter}>{letter}</span>
                  <hr className={styles.dividerLine} />
                </div>
                {contacts.map((contact, contactIndex) => {
                  const nextItem =
                    contactIndex + 1 < contacts.length
                      ? contacts[contactIndex + 1]
                      : null;

                  const nextIsContact = nextItem && nextItem.id;
                  const marginBottom = nextIsContact ? "-8px" : "0px";

                  return (
                    <li
                      key={contact.id}
                      className={`${styles.contactItem} ${
                        flippedContacts[contact.id] ? styles.flipped : ""
                      }`}
                      style={{
                        marginBottom,
                        ...contactHeights[contact.id],
                      }}
                      onClick={() => handleFlip(contact.id)}
                    >
                      <Contact
                        id={contact.id}
                        name={contact.name}
                        number={contact.number}
                        avatar={contact.avatar}
                        gender={contact.gender}
                        nameRef={(el) => (contactRefs.current[contact.id] = el)}
                        cardHeight={
                          contactHeights[contact.id]?.maxHeight === "190px"
                            ? "max190"
                            : "default"
                        }
                      />
                    </li>
                  );
                })}
              </div>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
