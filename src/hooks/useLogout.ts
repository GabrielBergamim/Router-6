import { api } from '../services/api';
import { useAuth } from './useAuth';

export function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth(null);
    try {
      await api.get('/auth/logout', { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
}
