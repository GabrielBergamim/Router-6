import { createContext, PropsWithChildren, useState } from 'react';

export interface AuthContextData {
  auth: any;
  setAuth: Function;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
}
