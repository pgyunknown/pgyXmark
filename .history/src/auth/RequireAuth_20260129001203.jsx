import { Navigate } from "react-router-dom";
import { authService } from "./authService";

export default function RequireAuth({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
