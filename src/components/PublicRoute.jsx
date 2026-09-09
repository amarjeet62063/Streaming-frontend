import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../features/auth/authHooks";
import { Loading } from "./index";

function PublicRoute() {
  const location = useLocation();

  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loading text="Checking authentication..." />;
  }

  
  if (user) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
