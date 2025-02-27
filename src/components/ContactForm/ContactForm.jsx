import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, useState } from "react";
import clsx from "clsx";
import { FaRegUser } from "react-icons/fa";
import { MdPhoneIphone, MdAddIcCall } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";
import Tippy from "@tippyjs/react";
import { validationContactSchema } from "../../shared/helpers/contactSchema.js";
import styles from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations.js";
import { selectContacts } from "../../redux/contacts/selectors.js";
import { toastInfoDuplicate } from "../../shared/helpers/toastConfig.js";
import { formatPhoneNumber } from "../../shared/utils/phoneUtils.js";
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary as MuiAccordionSummary,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Accordion = styled(MuiAccordion)(() => ({
  boxShadow:
    "0px 1px 0.5px -0.5px rgba(0, 0, 0, 0.1), 0px 0.5px 0.5px 0px rgba(0, 0, 0, 0.07), 0px 0.5px 1.5px 0px rgba(0, 0, 0, 0.06)",
  "&.Mui-expanded": {
    margin: 0,
  },
  "&:first-of-type": {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  "& .MuiAccordionSummary-root .MuiAccordionSummary-expandIconWrapper": {
    position: "absolute",
    top: "53px",
    right: "0",
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(() => ({
  padding: "0 16px",
  [`@media screen and (min-width: 320px) and (max-width: 359px)`]: {
    "&[aria-expanded='true']": {
      padding: "0 12px 0 4px",
    },
  },
}));

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [showCategories, setShowCategories] = useState(false);

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
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("scrollToContact", {
            detail: { contactId: existingContactByNameAndNumber.id },
          })
        );
      }, 300);
    } else if (existingContactByNumber) {
      toastInfoDuplicate(
        `This number: <strong>${values.number}</strong> is already in the system.`
      );
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("scrollToContact", {
            detail: { contactId: existingContactByNumber.id },
          })
        );
      }, 300);
    } else {
      dispatch(
        addContact({
          name: values.name,
          number: values.number,
          categories: values.categories,
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
    <Accordion className={styles.accordion} defaultExpanded>
      <AccordionSummary
        expandIcon={<FiChevronDown style={{ color: "#000" }} />}
        aria-controls="panel-content"
        id="panel-accordion"
        className={styles.accordionSummary}
      >
        <div className={styles.iconWithText}>
          <MdAddIcCall className={styles.iconAdded} />
          <h2 className={styles.accordionText}>Add new contact</h2>
        </div>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        <Formik
          initialValues={{
            name: "",
            number: "",
            categories: [],
          }}
          validationSchema={validationContactSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className={styles.form}>
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
              <ErrorMessage
                name="name"
                component="span"
                className={styles.error}
              />
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
                            <span className="boldCountryInfo">
                              Ukraine:
                            </span>{" "}
                            +38 (xxx)-xxx-xx-xx
                          </li>
                          <li className="itemTippyCountry">
                            <span className="flag-icon flag-icon-us"></span>
                            <span className="boldCountryInfo">USA:</span> +1
                            (xxx)-xxx-xxxx
                          </li>
                          <li className="itemTippyCountry">
                            <span className="flag-icon flag-icon-de"></span>
                            <span className="boldCountryInfo">
                              Germany:
                            </span>{" "}
                            +49 (xxx)-xxx-xxxx
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
                  aria-labelledby="phone-input-label"
                />
                <MdPhoneIphone className={styles.iconNumber} />
              </div>
              <ErrorMessage
                name="number"
                component="span"
                className={styles.error}
              />

              <div className={styles.toggleGroup}>
                <label htmlFor="categorySwitch" className={styles.switchLabel}>
                  <Field
                    type="checkbox"
                    id="categorySwitch"
                    className={styles.switchInput}
                    checked={showCategories}
                    onChange={() => setShowCategories(!showCategories)}
                  />
                  <span className={styles.switchSlider}></span>
                </label>
                <span className={styles.toggleButtonText}>
                  {showCategories ? "Hide categories" : "Select categories"}
                </span>
              </div>

              {showCategories && (
                 <div className={styles.checkboxWrapper}>
                  <div className={styles.checkboxGroup}>
                  <label className={styles.labelCheck}>
                    <span
                      className={styles.colorIndicatorLeft}
                      style={{ backgroundColor: "#FF6384" }}
                    ></span>
                    <Field
                      type="checkbox"
                      name="categories"
                      value="family"
                      className={styles.categoryCheck}
                    />
                    Family
                  </label>
                  <label className={styles.labelCheck}>
                    <span
                      className={styles.colorIndicatorRight}
                      style={{ backgroundColor: "#36A2EB" }}
                    ></span>
                    <Field
                      type="checkbox"
                      name="categories"
                      value="work"
                      className={styles.categoryCheck}
                    />
                    Work
                  </label>
                  <label className={styles.labelCheck}>
                    <span
                      className={styles.colorIndicatorLeft}
                      style={{ backgroundColor: "#FFCE56" }}
                    ></span>
                    <Field
                      type="checkbox"
                      name="categories"
                      value="friends"
                      className={styles.categoryCheckTop}
                    />
                    <span className={styles.categoryTextTop}>Friends</span>
                  </label>
                  <label className={styles.labelCheck}>
                    <span
                      className={styles.colorIndicatorRight}
                      style={{ backgroundColor: "#2C8A7C" }}
                    ></span>
                    <Field
                      type="checkbox"
                      name="categories"
                      value="acquaintances"
                      className={styles.categoryCheck}
                    />
                    Acquaintan-
                    <br />
                    ces
                  </label>
                  <label className={styles.labelCheck}>
                    <span
                      className={styles.colorIndicatorLeft}
                      style={{ backgroundColor: "#9966FF" }}
                    ></span>
                    <Field
                      type="checkbox"
                      name="categories"
                      value="business"
                      className={styles.categoryCheck}
                    />
                    Business
                  </label>
                  <label className={styles.labelCheck}>
                    <span
                      className={styles.colorIndicatorRight}
                      style={{ backgroundColor: "#B0B0B0" }}
                    ></span>
                    <Field
                      type="checkbox"
                      name="categories"
                      value="others"
                      className={styles.categoryCheck}
                    />
                    Others
                  </label>
                </div>    
                </div>
              )}

              <button type="submit" className={styles.addButton}>
                Add Contact
              </button>
              <button type="reset" className={styles.resetButton}>
                Reset
              </button>
            </Form>
          )}
        </Formik>
      </AccordionDetails>
    </Accordion>
  );
}
