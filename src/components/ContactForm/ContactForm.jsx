import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import clsx from "clsx";
import { FaRegUser } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";
import Tippy from "@tippyjs/react";
import { validationContactSchema } from "../../shared/helpers/contactSchema.js";
import styles from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations.js";
import { selectContacts } from "../../redux/contacts/selectors.js";
import { toastInfoDuplicate } from "../../shared/helpers/toastConfig.js";

const formatPhoneNumber = (value) => {
  const allowedCodes = ["+38", "+1", "+49", "+48", "+33"];
  const cleaned = value.replace(/[^\d+]/g, "");
  const countryCode = allowedCodes.find((code) => cleaned.startsWith(code));

  if (countryCode) {
    const withoutCode = cleaned.slice(countryCode.length);
    let formatted = "";

    switch (countryCode) {
      case "+38": // Ukraine
        const matchUA = withoutCode.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (matchUA) {
          formatted = `+38 (${matchUA[1]})-${matchUA[2]}-${matchUA[3]}-${matchUA[4]}`;
        }
        break;

      case "+1": // USA
        const matchUS = withoutCode.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (matchUS) {
          formatted = `+1 (${matchUS[1]})-${matchUS[2]}-${matchUS[3]}`;
        }
        break;

      case "+49": // Germany
        const matchDE = withoutCode.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (matchDE) {
          formatted = `+49 (${matchDE[1]})-${matchDE[2]}-${matchDE[3]}`;
        }
        break;

      case "+48": // Poland
        const matchPL = withoutCode.match(/^(\d{3})(\d{3})(\d{3})$/);
        if (matchPL) {
          formatted = `+48 (${matchPL[1]})-${matchPL[2]}-${matchPL[3]}`;
        }
        break;

      case "+33": // France
        const matchFR = withoutCode.match(
          /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/
        );
        if (matchFR) {
          formatted = `+33 (${matchFR[1]})-${matchFR[2]}-${matchFR[3]}-${matchFR[4]}-${matchFR[5]}`;
        }
        break;

      default:
        return value;
    }
    return formatted || value;
  }
  return value;
};

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const existingContactByNameAndNumber = contacts.find(
      (contact) =>
        contact.name === values.name && contact.number === values.number
    );
    const existingContactByNumber = contacts.find(
      (contact) =>
        contact.number === values.number && contact.name !== values.name
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
      dispatch(
        addContact({
          name: values.name,
          number: values.number,
        })
      );
      actions.resetForm();
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
      initialValues={{ name: "", number: "" }}
      validationSchema={validationContactSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <label
            className={`${styles.label} ${styles.labelName}`}
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
            <FaRegUser className={clsx(styles.iconName)} />
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
              appendTo={document.body}
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
            <MdPhoneIphone className={clsx(styles.iconNumber)} />
          </div>
          <ErrorMessage
            name="number"
            component="span"
            className={styles.error}
          />

          <button type="submit" className={clsx(styles.addButton)}>
            Add Contact
          </button>
          <button type="reset" className={clsx(styles.resetButton)}>
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
}
