import { FaRegUser, FaIdCard, FaTelegram } from "react-icons/fa";
import { MdPhoneIphone, MdMarkunread } from "react-icons/md";
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
import KebabMenuHorizontal from "../KebabMenuHorizontal/KebabMenuHorizontal";
import { useToggle } from "../../shared/hooks/useToggleState";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";

export default function Contact({ id, name, number, nameRef }) {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState("Unknown");
  const [isOpen, setIsOpen] = useState(false);
  const [isFrontOpen, setIsFrontOpen] = useState(false);
  const [isBackOpen, setIsBackOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);


  const frontButtonZIndex = isFrontOpen ? 0 : 1;

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
      <div
        className={`${styles.contactCardWrapperGeneral} ${
          isOpen ? styles.open : ""
        }`}
        style={{ zIndex: isOpen ? -2 : 0 }}
      >
        <div className={styles.frontSide}>
          <KebabMenuHorizontal
            isOpen={isFrontOpen}
            setIsOpen={setIsFrontOpen}
            title="On Front" 
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />
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
                  style={{ zIndex: frontButtonZIndex }}
                  title="Click on number"
                >
                  {formatPhoneNumber(number)}
                </a>
              </p>
            </div>
          </div>

          <button
            className={styles.deleteButton}
            style={{ zIndex: frontButtonZIndex }}
            onClick={(event) => {
              handleButtonClick(event);
              openDeleteModal();
            }}
            title="Delete"
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
            style={{ zIndex: frontButtonZIndex }}
            onClick={(event) => {
              handleButtonClick(event);
              dispatch(setCurrentEditingContact({ id, name, number }));
            }}
            title="Update"
          >
            Update
          </button>
        </div>
        <div className={styles.contactCardWrapperBack}>
          <div className={styles.backSide}>
            <KebabMenuHorizontal
              isOpen={isBackOpen}
              setIsOpen={setIsBackOpen}
              title="On Back" 
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
            />
            <div className={styles.wrapperBoxSide}>
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
  );
}
