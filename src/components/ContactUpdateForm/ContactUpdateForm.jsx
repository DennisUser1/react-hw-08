import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, useState } from "react";
import clsx from "clsx";
import { FaRegUser } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";
import { GrEdit } from "react-icons/gr";
import Tippy from "@tippyjs/react";
import { validationContactSchema } from "../../shared/helpers/contactSchema.js";
import styles from "./ContactUpdateForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateContact } from "../../redux/contacts/operations.js";
import { selectContacts } from "../../redux/contacts/selectors.js";
import { setCurrentEditingContact } from "../../redux/contacts/slice.js";
import { toastInfoDuplicate } from "../../shared/helpers/toastConfig.js";
import { formatPhoneNumber } from "../../shared/utils/phoneUtils.js";

export default function ContactUpdateForm({ name, number, id }) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const updatedContact = contacts.find((contact) => contact.id === id);
  const [localContact, setLocalContact] = useState({
    name: updatedContact ? updatedContact.name : name,
    number: updatedContact ? updatedContact.number : number,
  });

  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, options) => {
    const existingContactByNameAndNumber = contacts.find(
      (contact) =>
        contact.name === values.name &&
        contact.number === values.number &&
        contact.id !== id
    );

    const existingContactByNumber = contacts.find(
      (contact) =>
        contact.number === values.number &&
        contact.name !== values.name &&
        contact.id !== id
    );

    if (existingContactByNameAndNumber) {
      toastInfoDuplicate(
        `The contact already exists with this name: <strong>${values.name}</strong> and number: <strong>${values.number}</strong>.`
      );
    } else if (existingContactByNumber) {
      toastInfoDuplicate(
        `This number: <strong>${values.number}</strong> is already in the system.`
      );
    } else {
      setLocalContact({ name: values.name, number: values.number });
      dispatch(updateContact({ name: values.name, number: values.number, id }));
      options.resetForm();
    }
  };

  const handleNumberChange = (event, setFieldValue) => {
    let value = event.target.value;

    if (value === "") {
      setFieldValue("number", "");
      return;
    }
    if (!value.startsWith("+")) {
      value = "+" + value.replace(/[^\d]/g, "");
    }

    const formatted = formatPhoneNumber(value);
    setFieldValue("number", formatted);
  };

  return (
    <Formik
      initialValues={{
        name: localContact.name,
        number: localContact.number,
      }}
      validationSchema={validationContactSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <h2 className={styles.editTitle}>
            <GrEdit className={styles.editIcon} />
            Edit Contact
          </h2>
          <label
            className={clsx(styles.label, styles.labelName)}
            htmlFor={nameFieldId}
          >
            Name
          </label>
          <div className={styles.inputWrapper}>
            <Field
              type="text"
              name="name"
              id={nameFieldId}
              className={styles.input}
              autoComplete="off"
              autoFocus
              placeholder="Enter full name"
            />
            <FaRegUser className={styles.iconName} />
          </div>
          <ErrorMessage name="name" component="span" className={styles.error} />

          <div className={styles.numberLabelWrapper}>
            <label className={styles.label} htmlFor={numberFieldId}>
              Number
            </label>

            <Tippy
              content={
                <div>
                  <div className="marginTitleInfoTippy">
                    <strong className="titleInfoTippy">
                      Supported Countries:
                    </strong>
                    <ul className="listTippyCountry">
                      <li className="itemTippyCountry">
                        <span className="flag-icon flag-icon-ua"></span>
                        <span className="boldCountryInfo">Ukraine:</span> +38
                        (xxx)-xxx-xx-xx
                      </li>
                      <li className="itemTippyCountry">
                        <span className="flag-icon flag-icon-us"></span>
                        <span className="boldCountryInfo">USA:</span> +1
                        (xxx)-xxx-xxxx
                      </li>
                      <li className="itemTippyCountry">
                        <span className="flag-icon flag-icon-de"></span>
                        <span className="boldCountryInfo">Germany:</span> +49
                        (xxx)-xxx-xxxx
                      </li>
                      <li className="itemTippyCountry">
                        <span className="flag-icon flag-icon-pl"></span>
                        <span className="boldCountryInfo">Poland:</span> +48
                        (xxx)-xxx-xxx
                      </li>
                      <li className="itemTippyCountry">
                        <span className="flag-icon flag-icon-fr"></span>
                        <span className="boldCountryInfo">France:</span> +33
                        (xx)-xx-xx-xx-xx
                      </li>
                    </ul>
                  </div>
                  <strong className="titleInfoTippy">Input Format:</strong>
                  <p className="textInfoTippy">
                    Just type the numbers, the “+” symbol, spaces, and other
                    characters will be added automatically. For example,
                    14155551234.
                  </p>
                </div>
              }
              arrow
              placement="top"
            >
              <span className={styles.spanWrapper}>
                <HiInformationCircle
                  className={styles.infoIcon}
                  aria-label="Help information for phone input"
                />
              </span>
            </Tippy>
          </div>

          <div className={styles.inputWrapper}>
            <Field
              type="tel"
              name="number"
              id={numberFieldId}
              className={styles.input}
              autoComplete="off"
              placeholder="Enter number phone"
              onChange={(event) => handleNumberChange(event, setFieldValue)}
            />
            <MdPhoneIphone className={styles.iconNumber} />
          </div>
          <ErrorMessage
            name="number"
            component="span"
            className={styles.error}
          />

          <button type="submit" className={styles.updateButton}>
            Update Contact
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => dispatch(setCurrentEditingContact(null))}
          >
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
}
