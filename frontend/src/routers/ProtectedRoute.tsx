import { Navigate, Outlet } from "react-router-dom";
import type { Role } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";

interface ProtectedRouteProps {
  role: Role;
}

export function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  console.log("hello", isAuthenticated, user);

  const isBlocked = user?.isBlocked ?? false;
  // const isVerified = user?.isVerified ?? false;
  // const currentPath = window.location.pathname;

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  // Redirect to blocked page if user is blocked
  if (isBlocked) {
    return <Navigate to="/blocked" replace />;
  }

  // // Redirect to dashboard if verified and on OTP page
  // if (isVerified && currentPath === `/${role}/otp`) {
  //   return (
  //     <Navigate to={role === "user" ? "/" : `/${role}/dashboard`} replace />
  //   );
  // }

  // // Redirect to OTP page if not verified and not on OTP page
  // if (!isVerified && currentPath !== `/${role}/otp`) {
  //   return <Navigate to={`/${role}/otp`} replace />;
  // }

  // Redirect to correct dashboard if role doesn't match
  if (user?.role && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // Render nested routes
  return <Outlet />;
}
