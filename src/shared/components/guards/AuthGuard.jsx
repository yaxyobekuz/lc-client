// Router
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const isLoading = false;
  const isError = false;
  const token = localStorage.getItem("authToken");

  if (!token) return <Navigate to="/login" replace />;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center fixed inset-0 z-50 size-full bg-gray-100">
        <div className="size-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isError) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default AuthGuard;
