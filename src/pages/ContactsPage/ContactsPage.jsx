import { useEffect } from "react";
import ContactForm from "components/ContactForm/ContactForm";
import SearchBox from "components/SearchBox/SearchBox";
import ContactList from "components/ContactList/ContactList";
import ScrollTopBtn from "components/ScrollTopBtn/ScrollTopBtn";
import Loader from "components/Loader/Loader";
import ContactUpdateForm from "components/ContactUpdateForm/ContactUpdateForm";
import { FaAddressBook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  undoDeleteContact,
} from "../../redux/contacts/operations.js";
import {
  selectIsError,
  selectIsLoading,
  selectContacts,
  selectCurrentContact,
} from "../../redux/contacts/selectors.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import styles from "./ContactsPage.module.css";

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const noContacts = !contacts || contacts.length == 0;
  const deletedContact = useSelector((state) => state.contacts.deletedContact);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const currentContact = useSelector(selectCurrentContact);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      const screenWidth = window.innerWidth;

      const toastPosition = screenWidth < 768 ? "bottomCenter" : "topRight";

      iziToast.error({
        title: "Something went wrong...",
        message: "Please check your internet connection",
        position: toastPosition,
        timeout: 5000,
        progressBar: true,
        close: true,
      });
    }
  }, [isError]);

  const handleUndoDelete = () => {
    dispatch(undoDeleteContact(deletedContact));
  };

  return (
    <div className={styles.cardBox}>
      <FaAddressBook className={styles.iconBook} />
      <h1 className={styles.mainTitle}>Phonebook</h1>
      {currentContact ? (
        <ContactUpdateForm {...currentContact} />
      ) : (
        <ContactForm />
      )}
      <SearchBox />
      <div className={styles.boxShadow}>
        <div className={styles.boxBackground}>
          <div
            className={
              noContacts || !deletedContact
                ? styles.centeredTitleWrapper
                : styles.subtitleWrapper
            }
          >
            <h2 className={styles.preTitle}>Contacts</h2>
            {!noContacts && deletedContact && (
              <button className={styles.undoButton} onClick={handleUndoDelete}>
                Undo
              </button>
            )}
          </div>
        </div>
        <ContactList />
        {isLoading && !isError && <Loader />}
      </div>
      <ScrollTopBtn />
    </div>
  );
}
