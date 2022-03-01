import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

export interface Auth {
  user: string;
  pwd: string;
}

export interface LoginResponse {
  accessToken: string;
  roles: number[];
}

const LOGIN_URL = '/auth'
import styles from './style.module.css';

export function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from: Location };
  const from = state?.from?.pathname || "/";

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [user, setUser] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data: { accessToken, roles } } = await api.post<LoginResponse>(LOGIN_URL,
        { user, pwd },
        { withCredentials: true }
      );

      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400 || err.response?.status === 401) {
        setErrMsg('Username or password invalid');
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus();
    }
  }

  return (
    <section>
      <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">{errMsg}</p>
      <h1>Sing In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign in</button>
      </form>
      <p>
        Need an Account?<br />
        <span className={styles.line}>
          {/*put router link here*/}
          <Link to='/register'>Sign Up</Link>
        </span>
      </p>
    </section>
  );
}