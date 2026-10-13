import type { SupabaseClient, User } from '@supabase/supabase-js';

type SupabaseAuthClient = Pick<
  SupabaseClient['auth'],
  'signInWithPassword' | 'getSession' | 'getUser'
>;

export type PasswordSignInResult =
  | { user: User; error: null }
  | { user: null; error: string };

/**
 * A password sign-in is ready for navigation only after the session is persisted
 * and its server-validated identity matches the stored session.
 */
export async function signInAndVerifySession(
  auth: SupabaseAuthClient,
  email: string,
  password: string,
): Promise<PasswordSignInResult> {
  const { data, error: signInError } = await auth.signInWithPassword({ email, password });
  if (signInError) {
    return { user: null, error: signInError.message };
  }

  if (!data.session?.user) {
    return { user: null, error: 'Sign-in did not create an active session. Please try again.' };
  }

  const { data: sessionData, error: sessionError } = await auth.getSession();
  if (sessionError || !sessionData.session?.user) {
    return { user: null, error: 'Your sign-in could not be persisted. Please try again.' };
  }

  const { data: identityData, error: identityError } = await auth.getUser();
  if (identityError || !identityData.user || identityData.user.id !== sessionData.session.user.id) {
    return { user: null, error: 'Your identity could not be verified. Please try again.' };
  }

  return { user: identityData.user, error: null };
}
