import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CycleProvider } from './context/CycleContext';
import { WellnessProvider } from './context/WellnessContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TrackerPage } from './pages/TrackerPage';
import { RecordsPage } from './pages/RecordsPage';
import { EducationPage } from './pages/EducationPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { PcosHubPage } from './pages/PcosHubPage';
import { NutritionPage } from './pages/NutritionPage';
import { WellnessPage } from './pages/WellnessPage';
import { AskHealthPage } from './pages/AskHealthPage';
import { AdminPage } from './pages/AdminPage';
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PrivacyTermsPage } from './pages/PrivacyTermsPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CycleProvider>
          <WellnessProvider>
            <div className="flex flex-col min-h-screen bg-ivory-50 text-stone-800">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/education" element={<EducationPage />} />
                  <Route path="/education/:slug" element={<ArticleDetailPage />} />
                  <Route path="/pcos-hub" element={<PcosHubPage />} />
                  <Route path="/nutrition" element={<NutritionPage />} />
                  <Route path="/ask-assistant" element={<AskHealthPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/privacy-terms" element={<PrivacyTermsPage />} />

                  {/* Protected member routes */}

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/tracker"
                    element={
                      <ProtectedRoute>
                        <TrackerPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/records"
                    element={
                      <ProtectedRoute>
                        <RecordsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/wellness"
                    element={
                      <ProtectedRoute>
                        <WellnessPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <ProtectedRoute>
                        <AccountPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected administrator routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </WellnessProvider>
        </CycleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
