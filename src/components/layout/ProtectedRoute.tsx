import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-stone-600">
        <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium">Verifying secure session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 bg-white border border-rose-200 rounded-3xl shadow-sm text-center">
        <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-lg">
          !
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">Access Restricted</h2>
        <p className="text-sm text-stone-600 mb-6">
          This portal requires verified administrative privileges. Individual medical records remain strictly private and cannot be accessed here.
        </p>
        <Navigate to="/dashboard" replace />
      </div>
    );
  }

  return <>{children}</>;
};
