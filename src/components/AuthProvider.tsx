'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

interface AuthContextType {
  user: any; // O el tipo de tu objeto usuario { name: string, etc }
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('data');
    if (data) {
      setUser(JSON.parse(data));
    } else {
      redirect('/login');
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};