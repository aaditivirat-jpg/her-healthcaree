import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, Heart, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ResetPasswordPage: React.FC = () => {
  const { updatePassword, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearError();
    setSuccess(false);
    if (password !== confirmPassword) return;

    setIsSubmitting(true);
    const updated = await updatePassword(password);
    setIsSubmitting(false);
    if (updated) {
      setSuccess(true);
      window.setTimeout(() => navigate('/dashboard', { replace: true }), 1200);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-ivory-200 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center mx-auto shadow-md shadow-rose-200">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-stone-900">Choose a new password</h1>
          <p className="text-xs text-stone-500">Use the secure link sent to your email to update your account password.</p>
        </div>

        {error && (
          <div role="alert" className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div role="status" className="p-3.5 rounded-2xl bg-sage-50 border border-sage-200 text-sage-900 text-xs">
            Password updated. Redirecting to your account…
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <label className="block font-semibold text-stone-700">
            New password
            <span className="relative block mt-1">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-ivory-300 bg-ivory-50/50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </span>
          </label>
          <label className="block font-semibold text-stone-700">
            Confirm new password
            <span className="relative block mt-1">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-ivory-300 bg-ivory-50/50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </span>
          </label>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-rose-700" role="alert">Passwords do not match.</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting || success || password !== confirmPassword}
            className="w-full py-3 rounded-2xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 transition shadow-sm shadow-rose-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Updating Password…' : 'Update Password'}</span>
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="pt-4 border-t border-ivory-200 text-center text-xs text-stone-600">
          <Link to="/login" className="font-semibold text-rose-700 hover:underline">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
};
