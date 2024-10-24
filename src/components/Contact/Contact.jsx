import { FaRegUser } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import styles from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { setCurrentEditingContact } from "../../redux/contacts/slice.js";
import ConfirmDeleteModal from "../ConfirmDeleteContactModal/ConfirmDeleteContactModal";
import { useToggle } from "../../shared/hooks/useToggleState";

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useToggle();

  return (
    <>
      <div className={styles.contactCardWrapper}>
        <div className={styles.iconCardWrapper}>
          <FaRegUser className={styles.iconReUser} />
          <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.iconCardWrapperPhone}>
          <MdPhoneIphone className={styles.iconIphone} />
          <p className={styles.number}>
            <a href={`tel:${number}`} className={styles.phoneLink}>
              {number}
            </a>
          </p>
        </div>
      </div>

      <button className={styles.deleteButton} onClick={openDeleteModal}>
        Delete
      </button>
      {isDeleteOpen && (
        <ConfirmDeleteModal id={id} onClose={closeDeleteModal} />
      )}
      <button
        className={styles.updateButton}
        onClick={() => dispatch(setCurrentEditingContact({ id, name, number }))}
      >
        Update
      </button>
    </>
  );
}
