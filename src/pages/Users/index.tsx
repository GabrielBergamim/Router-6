import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export interface User {
  username: string
}

export function Users() {
  const [users, setUsersers] = useState<User[]>();
  const api = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    api.get('/users', { signal: controller.signal, withCredentials: true })
      .then(response => {
        isMounted && setUsersers(response.data);
      }).catch(err => {
        navigate('/login', { state: { from: location }, replace: true });
      });

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);

  return (
    <article>
      <h2>User List</h2>
      {
        users?.length ? (
          <ul>
            {users.map((user, i) => <li key={i}>{user?.username}</li>)}
          </ul>
        ) : <p>No users to display.</p>
      }
    </article>
  );
}