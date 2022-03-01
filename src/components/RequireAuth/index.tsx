import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

interface RequireAuthProps {
  allowedRoles: number[];
}

export function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.user
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}