import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Heart, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  Apple, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  User, 
  LogOut, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, isAuthenticated, logout, switchRoleForTesting } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory-50/90 backdrop-blur-md border-b border-ivory-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:bg-rose-700 transition">
              <Heart className="w-5 h-5 fill-white stroke-white" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-stone-900 group-hover:text-rose-800 transition">
                HerHealth
              </span>
              <span className="hidden sm:block text-[11px] font-medium tracking-wide text-rose-700 uppercase -mt-1">
                Women's Wellness & Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive('/dashboard')
                      ? 'bg-rose-100 text-rose-900 font-semibold'
                      : 'text-stone-700 hover:text-rose-800 hover:bg-ivory-100'
                  }`}
                >
                  Dashboard
                </Link>

                <Link
                  to="/tracker"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    isActive('/tracker')
                      ? 'bg-rose-100 text-rose-900 font-semibold'
                      : 'text-stone-700 hover:text-rose-800 hover:bg-ivory-100'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-rose-600" />
                  Cycle Tracker
                </Link>

                <Link
                  to="/records"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    isActive('/records')
                      ? 'bg-rose-100 text-rose-900 font-semibold'
                      : 'text-stone-700 hover:text-rose-800 hover:bg-ivory-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-stone-500" />
                  My Records
                </Link>

                <Link
                  to="/wellness"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    isActive('/wellness')
                      ? 'bg-rose-100 text-rose-900 font-semibold'
                      : 'text-stone-700 hover:text-rose-800 hover:bg-ivory-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-sage-600" />
                  Wellness
                </Link>
              </>
            ) : null}

            {/* Educational modules available for both visitors and authenticated users */}
            <Link
              to="/education"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                isActive('/education')
                  ? 'bg-rose-100 text-rose-900 font-semibold'
                  : 'text-stone-700 hover:text-rose-800 hover:bg-ivory-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-plum-600" />
              Health Library
            </Link>

            <Link
              to="/pcos-hub"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/pcos-hub')
                  ? 'bg-rose-100 text-rose-900 font-semibold'
                  : 'text-stone-700 hover:text-rose-800 hover:bg-ivory-100'
              }`}
            >
              PCOS / PCOD
            </Link>

            <Link
              to="/nutrition"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                isActive('/nutrition')
                  ? 'bg-rose-100 text-rose-900 font-semibold'
                  : 'text-stone-700 hover:text-rose-800 hover:bg-ivory-100'
              }`}
            >
              <Apple className="w-4 h-4 text-terracotta-600" />
              Food & Nutrition
            </Link>

            <Link
              to="/ask-assistant"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                isActive('/ask-assistant')
                  ? 'bg-rose-100 text-rose-900 font-semibold'
                  : 'text-stone-700 hover:text-rose-800 hover:bg-ivory-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-rose-500" />
              Ask HerHealth
            </Link>

            {role === 'admin' && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                  isActive('/admin')
                    ? 'bg-plum-200 text-plum-900'
                    : 'text-plum-800 hover:bg-plum-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-plum-700" />
                Admin
              </Link>
            )}
          </nav>

          {/* User / Auth Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-ivory-300 bg-white hover:bg-ivory-100 transition shadow-sm text-sm"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">
                    {user?.displayName.charAt(0) || 'U'}
                  </div>
                  <span className="font-medium text-stone-800 max-w-[120px] truncate">
                    {user?.displayName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-stone-500" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-ivory-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-ivory-200">
                      <p className="text-xs text-stone-500 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-stone-900 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        {role === 'admin' ? 'Administrator' : 'Registered Member'}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-ivory-100"
                      >
                        <User className="w-4 h-4 text-stone-500" />
                        Account Settings & Privacy
                      </Link>

                      {/* Demo Role Switcher helper */}
                      <div className="px-4 py-2 bg-ivory-50 my-1">
                        <span className="text-[11px] text-stone-500 block mb-1 font-medium">Evaluate Role View:</span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => switchRoleForTesting('registered_user')}
                            className={`text-xs px-2 py-1 rounded ${
                              role === 'registered_user' ? 'bg-rose-600 text-white font-medium' : 'bg-white border text-stone-600'
                            }`}
                          >
                            Member
                          </button>
                          <button
                            onClick={() => switchRoleForTesting('admin')}
                            className={`text-xs px-2 py-1 rounded ${
                              role === 'admin' ? 'bg-plum-800 text-white font-medium' : 'bg-white border text-stone-600'
                            }`}
                          >
                            Admin
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 font-medium"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-ivory-200 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-200 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-ivory-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ivory-200 bg-ivory-50 px-4 pt-3 pb-6 space-y-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-ivory-200"
              >
                Dashboard
              </Link>
              <Link
                to="/tracker"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-ivory-200"
              >
                Cycle Tracker
              </Link>
              <Link
                to="/records"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-ivory-200"
              >
                My Records
              </Link>
              <Link
                to="/wellness"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-ivory-200"
              >
                Wellness Habits
              </Link>
            </>
          ) : null}

          <Link
            to="/education"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-ivory-200"
          >
            Health Library
          </Link>
          <Link
            to="/pcos-hub"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-ivory-200"
          >
            PCOS & PCOD Hub
          </Link>
          <Link
            to="/nutrition"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-ivory-200"
          >
            Healthy Food & Nutrition
          </Link>
          <Link
            to="/ask-assistant"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-stone-800 hover:bg-ivory-200"
          >
            Ask HerHealth (Educational AI)
          </Link>

          {role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-plum-800 hover:bg-plum-100"
            >
              Admin Portal
            </Link>
          )}

          <div className="pt-4 border-t border-ivory-200">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-stone-700 hover:bg-ivory-200"
                >
                  Account & Privacy Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-rose-700 hover:bg-rose-50"
                >
                  Sign Out ({user?.displayName})
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl border border-stone-300 text-stone-800 font-semibold"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl bg-rose-600 text-white font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
