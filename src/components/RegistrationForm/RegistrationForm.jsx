import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { schemaRegistration } from "../../shared/helpers/registrationSchema.js";
import { register } from "../../redux/auth/operations.js";
import styles from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    dispatch(register(values));
    options.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schemaRegistration}
      >
        <Form className={styles.form}>
          <label className={styles.label}>
            Username
            <Field
              type="text"
              name="name"
              id="name"
              autoComplete="on"
              autoFocus
              className={styles.input}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.message}
            />
          </label>
          <label className={styles.label}>
            Email
            <Field
              type="email"
              name="email"
              id="email"
              autoComplete="on"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.message}
            />
          </label>
          <label className={styles.label}>
            Password
            <Field
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              className={styles.input}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={styles.message}
            />
          </label>
          <label className={styles.label}>
            Confirm Password
            <Field
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="off"
              className={styles.input}
            />
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className={styles.message}
            />
          </label>
          <button type="submit" className={styles.button}>
            Register
          </button>
        </Form>
      </Formik>
      <div className={styles.boxRegister}>
        <p>
          Do you have an account?
          <Link to="/login" className={styles.link}>
            Log In
          </Link>
        </p>
      </div>
    </>
  );
}
