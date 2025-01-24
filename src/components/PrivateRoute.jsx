import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors.js";
import Loader from "components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();

  if (isRefreshing) {
    return <Loader />;
  }

  return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;