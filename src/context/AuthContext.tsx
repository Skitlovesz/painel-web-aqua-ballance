import React, { createContext, useContext, useState, useEffect } from 'react';

interface Admin {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  admin: Admin | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('aquaAdmin');
    if (storedAuth) {
      try {
        const parsedAdmin = JSON.parse(storedAuth);
        setAdmin(parsedAdmin);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Falha ao analisar dados de autenticação');
        localStorage.removeItem('aquaAdmin');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (username === 'admin' && password === 'admin') {
      const adminData: Admin = {
        id: '1',
        username: 'admin',
        role: 'administrador'
      };
      
      setAdmin(adminData);
      setIsAuthenticated(true);
      localStorage.setItem('aquaAdmin', JSON.stringify(adminData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('aquaAdmin');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};