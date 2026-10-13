import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import type { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { recordAuditEvent } from '../lib/storage';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (email: string, password: string, displayName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updatePassword: (password: string) => Promise<boolean>;
  updateProfile: (displayName: string, timezone: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function loadAuthenticatedUser(
  authUser: User,
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>,
): Promise<void> {
  const { data: profile, error } = await supabase!
    .from('profiles')
    .select('*')
    .eq('user_id', authUser.id)
    .maybeSingle();

  if (error) {
    console.error('Unable to load account profile:', error.message);
  }

  setUser({
    id: authUser.id,
    email: authUser.email || '',
    displayName: profile?.display_name || authUser.user_metadata?.display_name || 'Valued User',
    timezone: profile?.timezone || authUser.user_metadata?.timezone || 'Asia/Kolkata',
    role: profile?.role === 'admin' ? 'admin' : 'registered_user',
    createdAt: profile?.created_at || authUser.created_at,
  });
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize Auth state
  useEffect(() => {
    async function initAuth() {
      setIsLoading(true);
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) await loadAuthenticatedUser(session.user, setUser);
        }
      } catch (err: any) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();

    // Supabase auth listener
    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          queueMicrotask(() => void loadAuthenticatedUser(session.user, setUser));
        } else {
          setUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    try {
      if (!isSupabaseConfigured || !supabase) {
        setError('Sign-in is temporarily unavailable because authentication is not configured. Please try again later.');
        return false;
      }
      if (!password) {
        setError('Password is required.');
        return false;
      }
      const { data, error: sbError } = await supabase.auth.signInWithPassword({ email, password });
      if (sbError) {
        setError(sbError.message);
        return false;
      }
      if (data.user) {
        await recordAuditEvent({
          actorUserId: data.user.id,
          actorEmail: email,
          action: 'USER_LOGIN',
          resourceType: 'auth_session',
          reason: 'Successful user authentication',
        });
        return true;
      }
      setError('Sign-in could not be completed. Please try again.');
      return false;
    } catch (err: any) {
      setError(err.message || 'Login failed.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, displayName: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    try {
      if (!isSupabaseConfigured || !supabase) {
        setError('Account creation is temporarily unavailable because authentication is not configured. Please try again later.');
        return false;
      }
      const { data, error: sbError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            timezone: 'Asia/Kolkata',
          },
        },
      });
      if (sbError) {
        setError(sbError.message);
        return false;
      }
      if (data.user) {
        await recordAuditEvent({
          actorUserId: data.user.id,
          actorEmail: email,
          action: 'USER_SIGNUP',
          resourceType: 'auth_session',
          reason: 'User account created',
        });
        return true;
      }

      setError('Account creation could not be completed. Please try again.');
      return false;
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (user) {
        await recordAuditEvent({
          actorUserId: user.id,
          actorEmail: user.email,
          action: 'USER_LOGOUT',
          resourceType: 'auth_session',
          reason: 'User initiated sign-out',
        });
      }

      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }

      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        return {
          success: false,
          message: 'Password recovery is temporarily unavailable because authentication is not configured. Please try again later.',
        };
      }
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetErr) throw resetErr;
      return { success: true, message: 'Password recovery email sent. Please check your inbox.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Password reset request failed.' };
    }
  };

  const updatePassword = async (password: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);
    try {
      if (!isSupabaseConfigured || !supabase) {
        setError('Password updates are unavailable because authentication is not configured.');
        return false;
      }
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      return true;
    } catch (err: any) {
      setError(err.message || 'Password update failed. Please request a new recovery link.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (displayName: string, timezone: string): Promise<void> => {
    if (!user) return;
    const updated: UserProfile = { ...user, displayName, timezone };

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from('profiles')
        .update({ display_name: displayName, timezone })
        .eq('user_id', user.id);
    }

    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'registered_user',
        isAuthenticated: Boolean(user),
        isLoading,
        error,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword,
        updateProfile,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
