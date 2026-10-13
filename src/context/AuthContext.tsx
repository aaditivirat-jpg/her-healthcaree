import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { UserProfile, UserRole } from '../types';
import type { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { signInAndVerifySession } from '../lib/authLifecycle';
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

function debugAuth(message: string): void {
  // Keep diagnostic output free of emails, access tokens, and other credentials.
  if (import.meta.env.DEV) {
    console.debug(`[auth] ${message}`);
  }
}

async function loadAuthenticatedUser(authUser: User): Promise<UserProfile> {
  const { data: profile, error } = await supabase!
    .from('profiles')
    .select('*')
    .eq('user_id', authUser.id)
    .maybeSingle();

  if (error) {
    console.error('Unable to load account profile:', error.message);
  }

  return {
    id: authUser.id,
    email: authUser.email || '',
    displayName: profile?.display_name || authUser.user_metadata?.display_name || 'Valued User',
    timezone: profile?.timezone || authUser.user_metadata?.timezone || 'Asia/Kolkata',
    role: profile?.role === 'admin' ? 'admin' : 'registered_user',
    createdAt: profile?.created_at || authUser.created_at,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const authRequestId = useRef(0);

  const hydrateAuthenticatedUser = async (authUser: User, source: string): Promise<boolean> => {
    const requestId = ++authRequestId.current;
    setIsLoading(true);
    debugAuth(`Hydrating authenticated user after ${source}.`);

    try {
      const profile = await loadAuthenticatedUser(authUser);
      if (requestId !== authRequestId.current) return false;

      setUser(profile);
      debugAuth(`Authenticated user hydration completed after ${source}.`);
      return true;
    } catch (err) {
      if (requestId === authRequestId.current) {
        setUser(null);
        console.error('Unable to initialize the authenticated user:', err);
      }
      return false;
    } finally {
      if (requestId === authRequestId.current) {
        setIsLoading(false);
      }
    }
  };

  const clearAuthenticatedUser = (source: string): void => {
    ++authRequestId.current;
    setUser(null);
    setIsLoading(false);
    debugAuth(`Cleared authenticated user after ${source}.`);
  };

  // Initialize Auth state
  useEffect(() => {
    let isActive = true;

    async function initAuth() {
      const initialRequestId = authRequestId.current;
      setIsLoading(true);
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          // Ignore a stale restore if a newer auth event has already started.
          if (!isActive || initialRequestId !== authRequestId.current) return;

          if (session?.user) {
            await hydrateAuthenticatedUser(session.user, 'initial session restore');
          } else if (isActive) {
            clearAuthenticatedUser('initial session check');
          }
        }
      } catch (err: any) {
        console.error('Auth initialization error:', err);
      } finally {
        if (isActive && initialRequestId === authRequestId.current) setIsLoading(false);
      }
    }

    // Supabase auth listener
    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
        if (event === 'INITIAL_SESSION') return;

        if (session?.user) {
          queueMicrotask(() => void hydrateAuthenticatedUser(session.user, `Supabase ${event}`));
        } else {
          clearAuthenticatedUser(`Supabase ${event}`);
        }
      });

      void initAuth();

      return () => {
        isActive = false;
        subscription.unsubscribe();
      };
    }

    void initAuth();
    return () => {
      isActive = false;
    };
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
      const result = await signInAndVerifySession(supabase.auth, email, password);
      if (!result.user) {
        setError(result.error);
        return false;
      }

      const didHydrate = await hydrateAuthenticatedUser(result.user, 'password sign-in');
      if (!didHydrate) {
        setError('Your session was created, but your account could not be initialized. Please try again.');
        return false;
      }

      // Audit logging must not block a valid session from reaching the dashboard.
      void recordAuditEvent({
        actorUserId: result.user.id,
        actorEmail: result.user.email || email,
        action: 'USER_LOGIN',
        resourceType: 'auth_session',
        reason: 'Successful user authentication',
      }).catch((auditError) => {
        console.error('Unable to record login audit event:', auditError);
      });

      debugAuth('Password sign-in verified and ready for navigation.');
      return true;
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
      if (!data.session?.user) {
        setError('Your account was created, but you must confirm your email before signing in.');
        return false;
      }

      const didHydrate = await hydrateAuthenticatedUser(data.session.user, 'account creation');
      if (!didHydrate) {
        setError('Your account was created, but your session could not be initialized. Please sign in again.');
        return false;
      }

      void recordAuditEvent({
        actorUserId: data.session.user.id,
        actorEmail: data.session.user.email || email,
        action: 'USER_SIGNUP',
        resourceType: 'auth_session',
        reason: 'User account created',
      }).catch((auditError) => {
        console.error('Unable to record signup audit event:', auditError);
      });

      return true;
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
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) throw signOutError;
      }

      clearAuthenticatedUser('user sign-out');
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
