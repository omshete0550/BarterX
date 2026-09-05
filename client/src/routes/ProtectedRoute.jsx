import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const location = useLocation();
  const { user, token, checking } = useSelector((state) => state.auth);

  if (checking) return <div className="page-loader">Restoring your session...</div>;

  // A user and JWT are both required for protected screens.
  if (!user || !token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
