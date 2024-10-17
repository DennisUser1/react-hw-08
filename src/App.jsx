import { useEffect } from "react";
import ContactForm from "components/ContactForm/ContactForm";
import SearchBox from "components/SearchBox/SearchBox";
import ContactList from "components/ContactList/ContactList";
import ScrollTopBtn from "components/ScrollTopBtn/ScrollTopBtn";
import { FaAddressBook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; 
import { fetchContacts, undoDeleteContact } from "./redux/contactsOps.js";
import { selectIsError, selectIsLoading, selectContacts } from "./redux/contactsSlice.js";
import Loader from "./components/Loader/Loader.jsx";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts); 
  const noContacts = contacts.length == 0;   
  const deletedContact = useSelector(state => state.contacts.deletedContact); 
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      const screenWidth = window.innerWidth;

      const toastPosition = screenWidth < 768 ? 'bottomCenter' : 'topRight'; 

      iziToast.error({
        title: 'Something went wrong...',
        message: 'Please check your internet connection',
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
    <div className="cardBox">
      <FaAddressBook className="iconBook" />
      <h1 className="mainTitle">Phonebook</h1>
      <ContactForm /> 
      <SearchBox />
      <div className="boxShadow">
        <div className="boxBackground">
          <div className={noContacts || !deletedContact ? "centeredTitleWrapper" : "subtitleWrapper"}>
            <h2 className="preTitle">Contacts</h2>
            {!noContacts && deletedContact && (
              <button className="undoButton" onClick={handleUndoDelete}>
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
};
