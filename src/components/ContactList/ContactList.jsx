import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import {
  selectFilteredContacts,
  selectIsLoading,
} from "../../redux/contacts/selectors.js";
import { useSelector } from "react-redux";
import { FaChess } from "react-icons/fa";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);

    return (
      <>
        <ul className={styles.contactsList}>
          {filteredContacts.length == 0 && !isLoading ? (
            <div className="messageWrapper">
              <div className="messageContentWrapper">
                <FaChess className="messageIconInfo" size="16"/>
                <p className="messageInfo">
                  No contacts are available at the moment. 
                  <br/> 
                  Please, add some contacts to view them here.
                </p>
              </div>
            </div>
          ) : (
            filteredContacts.map(({ id, name, number }) => {
              return (
                <li className={styles.contactItem} key={id}>
                  <Contact
                    id={id}
                    name={name}
                    number={number}
                  />
                </li>
              );
            })
          )}
        </ul>
      </>
    );
};


