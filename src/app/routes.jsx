// Guards
import AuthGuard from "@/shared/components/guards/AuthGuard";
import GuestGuard from "@/shared/components/guards/GuestGuard";

// Router
import { Routes as RoutesWrapper, Route, Navigate } from "react-router-dom";

const Routes = () => {
  return (
    <RoutesWrapper>
      {/* Mehmon */}
      <Route element={<GuestGuard />}>
        <Route path="/login" element={<div />} />
      </Route>

      {/* Himoyalangan */}
      <Route element={<AuthGuard />}>
        <Route path="/" element={<div />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RoutesWrapper>
  );
};

export default Routes;
