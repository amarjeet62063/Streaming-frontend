import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/auth/authHooks";

function ProtectedRoute() {
  const { data: user, isLoading, error } = useCurrentUser();

  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
