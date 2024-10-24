import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { FcOk, FcCancel } from "react-icons/fc";
import { deleteContact } from "../../redux/contacts/operations.js";
import useCloseModal from "../../shared/hooks/useCloseModal";
import styles from "./ConfirmDeleteContactModal.module.css";

const modalRoot = document.querySelector("#modal-root");
const ConfirmDeleteModal = ({ id, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const { handleBackdropClick } = useCloseModal(onClose);

  return ReactDOM.createPortal(
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <p className={styles.message}>
          Are you sure you want to <b>delete</b> this contact?
        </p>
        <div className={styles.btnPanel}>
          <button className={styles.btn} type="button" onClick={handleDelete}>
            Yes
            <FcOk size="25px" />
          </button>
          <button className={styles.btn} type="button" onClick={handleCancel}>
            No
            <FcCancel size="25px" />
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ConfirmDeleteModal;
