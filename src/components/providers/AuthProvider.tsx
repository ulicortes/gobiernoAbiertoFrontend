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
      try {
        const userData = await servicio.verify();

        if (userData) {
          setUser(userData);
          // Aquí no hacemos nada, dejamos que el flujo siga al children
        } else {
          // Solo si explícitamente no hay usuario (401 o null)
          router.push('/login/');
        }
      } catch (error) {
        console.error("Error en la verificación:", error);
        router.push('/login/');
      } finally {
        setLoading(false); // RECIÉN ACÁ liberamos el renderizado
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5'
      }}>
        <p>Iniciando sesión...</p>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  else return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};