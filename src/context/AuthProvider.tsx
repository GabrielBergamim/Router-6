import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

export interface AuthContextData {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}

export interface Auth {
  user: string;
  pwd: string;
  roles: number[];
  accessToken: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [auth, setAuth] = useState<Auth | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
