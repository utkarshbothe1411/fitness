import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  user: any; // Replace 'any' with your User type
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  googleLogin: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on initial load
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Verify token with backend
          const response = await fetch('/api/auth/verify', {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          if (response.ok) {
            setToken(storedToken);
            const userData = await response.json();
            setUser(userData);
          }
        } catch (err) {
          console.error('Token verification failed', err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
    } else {
      throw new Error(data.message || 'Login failed');
    }
  };

  // Add other auth methods (register, logout, etc.)

  return (
    <AuthContext.Provider value={{ user, token, login, /* other methods */, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};