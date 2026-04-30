import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
