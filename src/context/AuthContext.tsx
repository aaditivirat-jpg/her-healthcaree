import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
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
  updateProfile: (displayName: string, timezone: string) => Promise<void>;
  switchRoleForTesting: (role: UserRole) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_USER = 'herhealth_auth_user';
const LOCAL_STORAGE_KEY_ALL_USERS = 'herhealth_registered_users';

// Seed demo users for local dev/testing
const DEMO_USERS: Record<string, UserProfile> = {
  'user@herhealth.org': {
    id: 'usr_ananya_01',
    email: 'user@herhealth.org',
    displayName: 'Ananya Sharma',
    timezone: 'Asia/Kolkata',
    role: 'registered_user',
    createdAt: '2026-01-01T00:00:00Z',
  },
  'admin@herhealth.org': {
    id: 'usr_admin_radhika_02',
    email: 'admin@herhealth.org',
    displayName: 'Dr. Radhika Sen (Admin)',
    timezone: 'Asia/Kolkata',
    role: 'admin',
    createdAt: '2026-01-01T00:00:00Z',
  },
};

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
          if (session?.user) {
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .maybeSingle();

            if (profile) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                displayName: profile.display_name || 'Valued User',
                timezone: profile.timezone || 'Asia/Kolkata',
                role: (profile.role as UserRole) || 'registered_user',
                createdAt: profile.created_at,
              });
            }
          }
        } else {
          // Check local stored session
          const saved = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
          if (saved) {
            const parsed = JSON.parse(saved);
            setUser(parsed);
          } else {
            // Default demo logged in user for immediate review
            const defaultUser = DEMO_USERS['user@herhealth.org'];
            setUser(defaultUser);
            localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(defaultUser));
          }
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
      const { data: { subscription } } = client.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const { data: profile } = await client
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (profile) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              displayName: profile.display_name,
              timezone: profile.timezone,
              role: (profile.role as UserRole) || 'registered_user',
              createdAt: profile.created_at,
            });
          }
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
      if (isSupabaseConfigured && supabase) {
        if (!password) {
          setError('Password is required.');
          return false;
        }
        const { data, error: sbError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
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
      }

      // Local / Offline authentication handling
      const registeredUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ALL_USERS) || '{}');
      let matchedUser = registeredUsers[email] || DEMO_USERS[email];

      if (!matchedUser) {
        // Auto-create for friendly demonstration if neither exists
        const role: UserRole = email.includes('admin') ? 'admin' : 'registered_user';
        matchedUser = {
          id: 'usr_' + Math.random().toString(36).substring(2, 9),
          email,
          displayName: email.split('@')[0],
          timezone: 'Asia/Kolkata',
          role,
          createdAt: new Date().toISOString(),
        };
        registeredUsers[email] = matchedUser;
        localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify(registeredUsers));
      }

      setUser(matchedUser);
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(matchedUser));

      await recordAuditEvent({
        actorUserId: matchedUser.id,
        actorEmail: matchedUser.email,
        action: 'USER_LOGIN',
        resourceType: 'auth_session',
        reason: 'Successful user authentication',
      });

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
      if (isSupabaseConfigured && supabase) {
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
      }

      // Local storage registration
      const registeredUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ALL_USERS) || '{}');
      const newUser: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email,
        displayName,
        timezone: 'Asia/Kolkata',
        role: email.includes('admin') ? 'admin' : 'registered_user',
        createdAt: new Date().toISOString(),
      };

      registeredUsers[email] = newUser;
      localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify(registeredUsers));
      setUser(newUser);
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(newUser));

      await recordAuditEvent({
        actorUserId: newUser.id,
        actorEmail: newUser.email,
        action: 'USER_SIGNUP',
        resourceType: 'auth_session',
        reason: 'New user registration',
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
        await supabase.auth.signOut();
      }

      setUser(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (resetErr) throw resetErr;
        return { success: true, message: 'Password recovery email sent. Please check your inbox.' };
      }
      return {
        success: true,
        message: 'Password recovery link generated. (In local demonstration mode, credentials can be reset directly).',
      };
    } catch (err: any) {
      return { success: false, message: err.message || 'Password reset request failed.' };
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
    localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(updated));
  };

  // Switch role for reviewing admin vs user permissions
  const switchRoleForTesting = (role: UserRole): void => {
    if (!user) return;
    const updated: UserProfile = { ...user, role };
    setUser(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(updated));
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
        updateProfile,
        switchRoleForTesting,
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
