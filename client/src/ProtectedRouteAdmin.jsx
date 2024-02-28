import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteadmin({
  isAllowed,
  redirectTo = "/Loginadmin",
  children,
}) {
  if (isAllowed === false) {
    return <Navigate to={redirectTo} />;
  } else {
    return children ? children : <Outlet />;
  }
}
