import { useId } from "react";
import { FaSistrix } from "react-icons/fa";
import styles from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNameFilter,
  selectNumberFilter,
} from "../../redux/filters/selectors.js";
import {
  changeNameFilter,
  changeNumberFilter,
} from "../../redux/filters/slice.js";
import { Formik, Form, Field } from "formik";

export default function SearchBox() {
  const dispatch = useDispatch();

  const filterByName = useSelector(selectNameFilter);
  const filterByNumber = useSelector(selectNumberFilter);

  const nameSearchId = useId();
  const numberSearchId = useId();

  return (
    <Formik
      initialValues={{
        searchName: filterByName,
        searchNumber: filterByNumber,
      }}
    >
      {({ values, handleChange }) => (
        <Form className={styles.searchWrapper}>
          <label htmlFor={nameSearchId}>
            <div className={styles.inputContainer}>
              <Field
                id={nameSearchId}
                type="search"
                name="searchName"
                placeholder="Search by name"
                autoComplete="off"
                className={styles.inputField}
                onChange={(e) => {
                  handleChange(e);
                  dispatch(changeNameFilter(e.target.value));
                }}
                value={values.searchName}
              />
              <FaSistrix className={styles.iconSearch} />
            </div>
            Find contacts by name
          </label>

          <label htmlFor={numberSearchId}>
            <div className={styles.inputContainer}>
              <Field
                id={numberSearchId}
                type="search"
                name="searchNumber"
                placeholder="Search by number"
                autoComplete="off"
                className={styles.inputField}
                onChange={(e) => {
                  handleChange(e);
                  dispatch(changeNumberFilter(e.target.value));
                }}
                value={values.searchNumber}
              />
              <FaSistrix className={styles.iconSearch} />
            </div>
            Find contacts by number
          </label>
        </Form>
      )}
    </Formik>
  );
}
