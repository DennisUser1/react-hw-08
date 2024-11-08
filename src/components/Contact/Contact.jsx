import { FaRegUser, FaIdCard } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go";
import styles from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { setCurrentEditingContact } from "../../redux/contacts/slice.js";
import {
  generateAvatarUrl,
  determineGender,
} from "../../redux/contacts/operations.js";
import ConfirmDeleteModal from "../ConfirmDeleteContactModal/ConfirmDeleteContactModal";
import { useToggle } from "../../shared/hooks/useToggleState";
import { useState, useEffect } from "react";
import { formatPhoneNumber } from "../ContactForm/ContactForm";

export default function Contact({ id, name, number, nameRef }) {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState("Unknown");

  const {
    isOpen: isMenuOpen,
    openModal: openMenu,
    closeModal: closeMenu,
  } = useToggle();

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

  useEffect(() => {
    const fetchAvatarAndGender = async () => {
      const avatarUrl = await generateAvatarUrl(name);
      setAvatar(avatarUrl);

      const genderResult = await determineGender(name);
      setGender(genderResult);
    };
    fetchAvatarAndGender();
  }, [name]);

  const formatPhoneNumberForLink = (value) => {
    return value.replace(/[^\d+]/g, "");
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
              <p className={styles.name} ref={nameRef}>
                {name}
              </p>
            </div>
            <div className={styles.iconCardWrapperPhone}>
              <MdPhoneIphone className={styles.iconIphone} />
              <p className={styles.number}>
                <a
                  href={`tel:${formatPhoneNumberForLink(number)}`}
                  className={styles.phoneLink}
                  onClick={handleAnchorClick}
                >
                  {formatPhoneNumber(number)}
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
        <div className={styles.contactCardWrapper}>
          <div className={styles.backSide}>
            <div className={styles.wrapperTitleCard}>
              <FaIdCard className={styles.iconIdCard} />
              <p className={styles.textBackSide}>Back Side</p>
            </div>
            <div className={styles.avatarWrapper}>
              <img
                src={avatar}
                alt={`${name}`}
                title={`${name}`}
                className={styles.avatar}
              />
              <p className={styles.gender}>
                <span className={styles.genderLabel}>Gender:</span>
                <span className={styles.genderValue}>{gender}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`${styles.button} ${isMenuOpen ? styles.buttonActive : ""}`}
        onClick={(event) => {
          handleButtonClick(event);
          isMenuOpen ? closeMenu() : openMenu();
        }}
      >
        <GoKebabHorizontal />
      </button>
      <div className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}></div>
    </>
  );
}
