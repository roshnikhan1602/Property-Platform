import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  try {
    JSON.parse(user);
    return children;
  } catch {
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;