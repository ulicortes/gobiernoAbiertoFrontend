'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { servicio } from '@/services/service';

interface AuthContextType {
  user: any;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const userData = await servicio.verify();
      if (userData) {
        setUser(userData);
      } else {
        router.push('/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};