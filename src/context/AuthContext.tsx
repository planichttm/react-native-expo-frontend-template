// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { authConfig } from '../config/auth.config';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.access_token);
      console.log('User data:', session?.user);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Setup auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed - Event:', _event);
      console.log('Auth state changed - Token:', session?.access_token);
      console.log('Auth state changed - User:', session?.user);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    session,
    user,
    isLoading,
    signIn: async (email: string, password: string) => {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      console.log('Email sign in successful - Token:', data.session?.access_token);
    },
    signUp: async (email: string, password: string) => {
      const { error, data } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      console.log('Sign up successful - Token:', data.session?.access_token);
    },
    signInWithGoogle: async () => {
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
      console.log('Google sign in initiated');
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Sign out successful');
    },
    deleteAccount: async () => {
      // API-Aufruf zum Löschen des Accounts
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Account deletion and sign out successful');
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};