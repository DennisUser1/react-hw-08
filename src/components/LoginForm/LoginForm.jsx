import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logIn } from "../../redux/auth/operations.js";
import { schemaLogin } from "../../shared/helpers/loginSchema.js";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  
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
            <div className={styles.passwordWrapper}>
              <Field
                type={showPassword ? "password" : "text"}
                name="password"
                id="password"
                autoComplete="off"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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
