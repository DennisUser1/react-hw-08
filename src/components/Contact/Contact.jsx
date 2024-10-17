import { FaRegUser } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import styles from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps.js";

export default function Contact({ id, name, number }) {

    const dispatch = useDispatch();
    const handleDelete = () => {
      dispatch(deleteContact(id));
    };
    
    return (
      <>
        <div className={styles.contactCardWrapper}>
          <div className={styles.iconCardWrapper}>
              <FaRegUser className={styles.iconReUser}/>
              <p className={styles.name}>
              {name}
              </p>
          </div>
          <div className={styles.iconCardWrapperPhone}>
              <MdPhoneIphone className={styles.iconIphone}/>
              <p className={styles.number}>
              <a href={`tel:${number}`} className={styles.phoneLink}>
              {number}
            </a>
              </p>
          </div>
        </div>
  
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </>
    );
  };