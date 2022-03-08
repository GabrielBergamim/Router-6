import { api } from '../services/api';
import { useAuth } from './useAuth';

export function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await api.get('/auth/refresh', {
      withCredentials: true,
    });

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return refresh;
}
