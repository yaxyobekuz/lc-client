// Router
import { Navigate, Outlet } from "react-router-dom";

// Hooks
import useAuth from "@/shared/hooks/useAuth";

// Constants
import { ROLE_HOME } from "@/shared/constants/roles";

// Guests only; redirects authenticated users to their role's home
const GuestGuard = () => {
  const token = localStorage.getItem("authToken");
  const { role, isLoading } = useAuth();

  if (token && isLoading) return null;
  if (token && role) return <Navigate to={ROLE_HOME[role] || "/"} replace />;

  return <Outlet />;
};

export default GuestGuard;
