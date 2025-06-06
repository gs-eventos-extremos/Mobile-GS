import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import authService from '../services/auth.service';
import { UserResponseDto } from '../types/auth.types';

interface AuthContextData {
  user: UserResponseDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const authenticated = await authService.isAuthenticated();
      
      if (authenticated) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
        console.log('Usuário autenticado:', currentUser?.name);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao verificar status de autenticação:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);
      console.log('Login realizado no contexto:', response.user.name);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      console.log('Logout realizado');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo se der erro, limpar o estado local
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};