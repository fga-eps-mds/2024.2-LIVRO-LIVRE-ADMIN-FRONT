'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

import useApi from './useApi';
import { toaster } from '../components/ui/toaster';

interface SignInParams {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  signOut: () => void;
  signIn: (userToSignIn: SignInParams) => Promise<boolean>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    signIn: authSignIn,
  } = useApi();

  const localToken =
    typeof window !== 'undefined'
      ? localStorage.getItem('@livrolivre:token')
      : null;
  const [token, setToken] = useState<string | null>(
    localToken ? localToken : null,
  );

  async function signIn(userToSignIn: SignInParams): Promise<boolean> {
    const { data } = await authSignIn(userToSignIn);
    if (!data.accessToken) {
      toaster.create({
        title: 'Erro ao realizar login',
        description: 'Verifique os campos e tente novamente.',
        type: 'error',
      })
      return false;
    };
    setToken(data.accessToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('@livrolivre:token', data.accessToken);
    }
    return true;
  }

  function signOut(): void {
    typeof window !== 'undefined'
      ? localStorage.removeItem('@livrolivre:token')
      : null;
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}