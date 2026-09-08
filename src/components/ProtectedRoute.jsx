import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/auth/authHooks";
import { Error, Loading } from "../components/index";

function ProtectedRoute() {
  const { data: user, isLoading, error, refetch } = useCurrentUser();
 

  if (isLoading) {
    return <Loading text="Authentication" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (error) {
    return <Error onRetry={refetch} message={error.message} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
