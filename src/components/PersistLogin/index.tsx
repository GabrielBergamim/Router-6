import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRefreshToken } from '../../hooks/useRefreshToken';

export function PersistLogin() {
  const [isLoading, setIsloading] = useState(true);
  const refreseh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refreseh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsloading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsloading(false);

    return () => {
      isMounted = false;
    }
  }, []);

  return (
    <>
      {isLoading
        ? <p>Loading...</p>
        : <Outlet />
      }
    </>
  )
}