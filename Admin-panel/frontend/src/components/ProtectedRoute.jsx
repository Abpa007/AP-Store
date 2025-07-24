import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If user is logged in and trying to access root '/', redirect to /products
  if (token && window.location.pathname === "/") {
    return <Navigate to="/products" />;
  }

  // If token exists, allow access to protected route, else redirect to /login
  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
