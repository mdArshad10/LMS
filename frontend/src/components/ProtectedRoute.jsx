import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  return isAuthenticated ? (
    user?.role === "admin" ? (
      children
    ) : (
      <Navigate to={"/"} />
    )
  ) : (
    <Navigate to={"/login"} />
  );
};
