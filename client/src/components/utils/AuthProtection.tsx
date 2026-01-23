import { useSelector } from "react-redux";
import { Navigate } from "react-router";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true = protect authenticated routes, false = guest-only routes
}

function AuthProtection({ children, requireAuth = false }: RouteGuardProps) {
  const { currentUser } = useSelector((state: any) => state.user);

  if (requireAuth && !currentUser) {
    return <Navigate to="/SignIn" replace />;
  } else if (!requireAuth && currentUser) {
    return <Navigate to="/dashboard?tab=dash" replace />;
  }
  return <>{children}</>;
}

export default AuthProtection;
