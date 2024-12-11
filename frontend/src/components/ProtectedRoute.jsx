import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((store) => store.auth);
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export const AuthenticatedUser = ({ children }) => {
  const location = useLocation();
  const from = location.state.from?.pathname || "/";

  const { isAuthenticated } = useSelector((store) => store.auth);
  return !isAuthenticated ? children : <Navigate to={from} replace={true} />;
};

export const AdminRoute = ({ children }) => {
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((store) => store.auth);

  return !isAuthenticated ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : user.role !== "instructor" ? (
    <Navigate to="/" />
  ) : (
    children
  );
};
