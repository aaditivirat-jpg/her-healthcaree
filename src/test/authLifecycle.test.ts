import { describe, expect, it, vi } from 'vitest';
import type { User } from '@supabase/supabase-js';
import { signInAndVerifySession } from '../lib/authLifecycle';

const authenticatedUser = {
  id: 'user-123',
  email: 'member@example.com',
} as User;

function createAuthClient(overrides: Record<string, unknown> = {}) {
  return {
    signInWithPassword: vi.fn().mockResolvedValue({
      data: { session: { user: authenticatedUser } },
      error: null,
    }),
    getSession: vi.fn().mockResolvedValue({
      data: { session: { user: authenticatedUser } },
      error: null,
    }),
    getUser: vi.fn().mockResolvedValue({
      data: { user: authenticatedUser },
      error: null,
    }),
    ...overrides,
  };
}

describe('password sign-in lifecycle', () => {
  it('requires a persisted session and matching verified identity before navigation', async () => {
    const auth = createAuthClient();

    const result = await signInAndVerifySession(auth as never, 'member@example.com', 'correct-password');

    expect(result).toEqual({ user: authenticatedUser, error: null });
    expect(auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'member@example.com',
      password: 'correct-password',
    });
    expect(auth.getSession).toHaveBeenCalledOnce();
    expect(auth.getUser).toHaveBeenCalledOnce();
  });

  it('does not report success when Supabase returns no active session', async () => {
    const auth = createAuthClient({
      signInWithPassword: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    });

    const result = await signInAndVerifySession(auth as never, 'member@example.com', 'correct-password');

    expect(result).toEqual({
      user: null,
      error: 'Sign-in did not create an active session. Please try again.',
    });
    expect(auth.getSession).not.toHaveBeenCalled();
    expect(auth.getUser).not.toHaveBeenCalled();
  });

  it('returns Supabase credential errors without starting session initialization', async () => {
    const auth = createAuthClient({
      signInWithPassword: vi.fn().mockResolvedValue({
        data: { session: null },
        error: { message: 'Invalid login credentials' },
      }),
    });

    const result = await signInAndVerifySession(auth as never, 'member@example.com', 'wrong-password');

    expect(result).toEqual({ user: null, error: 'Invalid login credentials' });
    expect(auth.getSession).not.toHaveBeenCalled();
    expect(auth.getUser).not.toHaveBeenCalled();
  });

  it('does not report success when the session is not persisted', async () => {
    const auth = createAuthClient({
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    });

    const result = await signInAndVerifySession(auth as never, 'member@example.com', 'correct-password');

    expect(result).toEqual({
      user: null,
      error: 'Your sign-in could not be persisted. Please try again.',
    });
    expect(auth.getUser).not.toHaveBeenCalled();
  });

  it('does not report success when the verified identity differs from the session', async () => {
    const auth = createAuthClient({
      getUser: vi.fn().mockResolvedValue({
        data: { user: { ...authenticatedUser, id: 'different-user' } },
        error: null,
      }),
    });

    const result = await signInAndVerifySession(auth as never, 'member@example.com', 'correct-password');

    expect(result).toEqual({
      user: null,
      error: 'Your identity could not be verified. Please try again.',
    });
  });
});
