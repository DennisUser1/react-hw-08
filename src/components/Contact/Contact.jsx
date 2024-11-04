import { FaRegUser, FaIdCard } from "react-icons/fa";
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

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  const handleAnchorClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className={styles.contactCardWrapper}>
        <div className={styles.frontSide}>
          <div className={styles.wrapperTitleCard}>
            <FaIdCard className={styles.iconIdCard} />
            <p className={styles.textFrontSide}>Front Side</p>
          </div>
          <div className={styles.wrapperContacts}>
            <div className={styles.iconCardWrapper}>
              <FaRegUser className={styles.iconReUser} />
              <p className={styles.name}>{name}</p>
            </div>
            <div className={styles.iconCardWrapperPhone}>
              <MdPhoneIphone className={styles.iconIphone} />
              <p className={styles.number}>
                <a
                  href={`tel:${number}`}
                  className={styles.phoneLink}
                  onClick={handleAnchorClick}
                >
                  {number}
                </a>
              </p>
            </div>
          </div>

          <button
            className={styles.deleteButton}
            onClick={(event) => {
              handleButtonClick(event);
              openDeleteModal();
            }}
          >
            Delete
          </button>
          {isDeleteOpen && (
            <ConfirmDeleteModal id={id} onClose={closeDeleteModal} />
          )}
          <button
            className={styles.updateButton}
            onClick={(event) => {
              handleButtonClick(event);
              dispatch(setCurrentEditingContact({ id, name, number }));
            }}
          >
            Update
          </button>
        </div>
        <div className={styles.backSide}>
          <FaIdCard className={styles.iconIdCard} />
          <p className={styles.textBackSide}>Back Side</p>
        </div>
      </div>
    </>
  );
}
