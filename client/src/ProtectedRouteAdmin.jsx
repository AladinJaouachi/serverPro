import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteadmin({
  isAllowed,
  redirectTo = "/Loginadmin",
  children,
}) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}
