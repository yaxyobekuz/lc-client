// Router
import { Navigate, Outlet } from "react-router-dom";

// Constants
import { ROLE_HOME } from "@/shared/constants/roles";

const GuestGuard = () => {
  const token = localStorage.getItem("authToken");
  if (token) return <Navigate to={ROLE_HOME[role] || "/"} replace />;
  return <Outlet />;
};

export default GuestGuard;
