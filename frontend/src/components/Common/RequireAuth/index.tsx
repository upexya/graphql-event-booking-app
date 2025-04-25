import { useLocation, Navigate } from "react-router-dom";

import isTokenValid from "@utils/isTokenValid";

import routes from "@constants/routes";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  const is_logged_in = isTokenValid();

  return is_logged_in ? (
    children
  ) : (
    <Navigate to={routes.LOGIN} replace state={{ path: location.pathname }} />
  );
}
