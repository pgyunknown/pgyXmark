import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { firebaseAuth } from "./firebaseAuth";

export default function RequireAuth({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    return firebaseAuth.onAuthChange(setUser);
  }, []);

  if (user === undefined) return null;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
