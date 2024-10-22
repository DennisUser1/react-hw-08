import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "../../redux/auth/operations.js";
import { schemaLogin } from "../../shared/helpers/loginSchema.js";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    dispatch(logIn(values));
    options.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schemaLogin}
      >
        <Form className={styles.form}>
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

          <button type="submit" className={styles.button}>
            Log In
          </button>
        </Form>
      </Formik>
      <div className={styles.boxLogIn}>
        <p>
          Do not have an account?
          <Link to="/register" className={styles.link}>
            Sign up now
          </Link>
        </p>
      </div>
    </>
  );
}
