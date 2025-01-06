import { FaRegUser, FaIdCard, FaTelegram } from "react-icons/fa";
import { MdPhoneIphone, MdMarkunread } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go";
import styles from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { setCurrentEditingContact } from "../../redux/contacts/slice.js";
import {
  generateAvatarUrl,
  determineGender,
} from "../../redux/contacts/operations.js";
import { stringAvatar } from "../../shared/utils/avatarUtils.js";
import { formatPhoneNumber } from "../../shared/utils/phoneUtils.js";
import ConfirmDeleteModal from "../ConfirmDeleteContactModal/ConfirmDeleteContactModal";
import { useToggle } from "../../shared/hooks/useToggleState";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";

export default function Contact({ id, name, number, nameRef }) {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState("Unknown");
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

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
      <div
        className={`${styles.contactCardWrapperGeneral} ${
          isOpen ? styles.open : ""
        }`}
        style={{ zIndex: isOpen ? -2 : 0 }}
      >
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
            <ConfirmDeleteModal
              id={id}
              name={name}
              onClose={closeDeleteModal}
            />
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
        <div className={styles.contactCardWrapperBack}>
          <div className={styles.backSide}>
            <div className={styles.wrapperTitleCard}>
              <FaIdCard className={styles.iconIdCard} />
              <p className={styles.textBackSide}>Back Side</p>
            </div>
            <div className={styles.socialMedia}>
              <a
                href="#"
                className={styles.emailButton}
                onClick={handleAnchorClick}
              >
                <MdMarkunread className={styles.emailIcon} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.telegramButton}
                onClick={handleAnchorClick}
              >
                <FaTelegram className={styles.telegramIcon} />
              </a>
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
              <Avatar
                {...stringAvatar(name)}
                className={styles.avatarBasic}
                sx={{
                  width: 62,
                  height: 62,
                  fontSize: 20,
                  ...stringAvatar(name).sx,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className={`${styles.kebabButton} ${
          isMenuOpen ? styles.kebabButtonActive : ""
        }`}
        onClick={(event) => {
          handleButtonClick(event);
          toggleMenu(event);
          isMenuOpen ? closeMenu() : openMenu();
        }}
      >
        <GoKebabHorizontal />
      </button>
      <div className={`${styles.menuWrapper} ${isMenuOpen ? styles.open : ""}`}>
        <div className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
          <button
            className={styles.favoriteButton}
            title="Favorites"
            onClick={(event) => {
              handleButtonClick(event);
            }}
          >
            Favorites
          </button>

          <button
            className={styles.detailButton}
            title="Contact Detail"
            onClick={(event) => {
              handleButtonClick(event);
            }}
          >
            Detail
          </button>
        </div>
      </div>
    </>
  );
}
