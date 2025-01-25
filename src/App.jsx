import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import RestrictedRoute from "components/RestrictedRoute";
import Layout from "components/Layout/Layout";
import Loader from "components/Loader/Loader";
import { selectIsRefreshing, selectToken } from "./redux/auth/selectors.js";
import { refreshUser } from "./redux/auth/operations.js";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const Statistics = lazy(() => import("./pages/Statistics/Statistics"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App = () => {
  const dispatch = useDispatch();
  const isRefresh = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) {
      // console.log("The token is missing. The request is not sent");
      return;   // Fixed 401 Unauthorized error in console
    }
    // console.log("Token found:", token);

    dispatch(refreshUser())
      .unwrap()
      .then(() => {
        // console.log("User successfully updated");
      })
      .catch(() => {});
  }, [dispatch, token]);

  return isRefresh ? (
    <Loader /> 
  ) : (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="register"
              element={
                <RestrictedRoute>
                  <RegistrationPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute>
                  <LoginPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="statistics"
              element={
                <PrivateRoute>
                  <Statistics />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
