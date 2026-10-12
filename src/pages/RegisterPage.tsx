import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Lock, Mail, User, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { signup, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consentStorage, setConsentStorage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentStorage) {
      alert('Consent for personal health record storage is required to create a persistent account.');
      return;
    }

    setIsSubmitting(true);
    clearError();

    const ok = await signup(email, password, displayName);
    setIsSubmitting(false);
    if (ok) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-ivory-200 shadow-xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center mx-auto shadow-md shadow-rose-200">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900">
            Join HerHealth
          </h2>
          <p className="text-xs text-stone-500">
            Create your confidential account to track your cycles and maintain long-term records
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Your Name or Preferred Alias</label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="E.g., Ananya S."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-ivory-300 bg-ivory-50/50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>
            <p className="text-[11px] text-stone-400 mt-1">You may choose a pseudonym to safeguard your privacy.</p>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-ivory-300 bg-ivory-50/50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-ivory-300 bg-ivory-50/50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 text-xs text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={consentStorage}
                onChange={e => setConsentStorage(e.target.checked)}
                className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="leading-relaxed">
                I give explicit consent to store my confidential menstrual dates and symptoms in an isolated, encrypted account database. I understand I can export or delete my records anytime.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-2xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 transition shadow-sm shadow-rose-200 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {isSubmitting ? (
              <span>Creating Sanctuary...</span>
            ) : (
              <>
                <span>Create My Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-ivory-200 text-center text-xs text-stone-600">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-rose-700 hover:underline">
            Sign in here
          </Link>
        </div>

      </div>
    </div>
  );
};
