import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Heart, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Apple, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Activity,
  Users,
  Compass
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/70 border border-rose-200 text-rose-900 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Evidence-Informed Women's Healthcare & Wellness</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
                Your cycle, your rhythm, <br />
                <span className="text-rose-700 italic font-normal">your private health sanctuary.</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                HerHealth combines compassionate menstrual tracking with clinically vetted education on PCOS, anaemia, nutrition, and hormones. Stored in a strictly private, encrypted database accessible only by you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 shadow-md shadow-rose-200 transition flex items-center justify-center gap-2 group"
                  >
                    <span>Open My Dashboard</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 shadow-md shadow-rose-200 transition flex items-center justify-center gap-2 group"
                    >
                      <span>Create Free Account</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </Link>
                    <Link
                      to="/login"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-ivory-300 bg-white hover:bg-ivory-100 text-stone-800 font-semibold text-sm shadow-sm transition flex items-center justify-center"
                    >
                      Sign In to Records
                    </Link>
                  </>
                )}

                <Link
                  to="/education"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-ivory-100 hover:bg-ivory-200 text-stone-700 font-semibold text-sm transition flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-plum-700" />
                  Browse Health Library
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-sage-600" />
                  <span>Row Level Security (RLS) Isolation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>Zero Ads & No Health Data Reselling</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative blob */}
                <div className="absolute -inset-2 bg-gradient-to-r from-rose-200/50 to-plum-200/50 rounded-3xl blur-xl -z-10" />

                <div className="bg-white rounded-3xl border border-ivory-200 p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">Cycle Overview</h4>
                        <p className="text-[11px] text-stone-500">Real-time physiological insights</p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-sage-50 text-sage-800 border border-sage-200 font-medium">
                      Normal Variation
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-ivory-50 p-3.5 rounded-2xl border border-ivory-200">
                      <span className="text-[11px] text-stone-500 font-medium block">Average Cycle</span>
                      <span className="text-2xl font-bold font-display text-rose-900">28 days</span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">Based on 4 logged cycles</span>
                    </div>
                    <div className="bg-ivory-50 p-3.5 rounded-2xl border border-ivory-200">
                      <span className="text-[11px] text-stone-500 font-medium block">Period Duration</span>
                      <span className="text-2xl font-bold font-display text-stone-800">5 days</span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">Typical bleeding span</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-rose-900">
                      <span>Next Estimated Period</span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded-md border border-rose-200">In 18 days</span>
                    </div>
                    <p className="text-[11px] text-rose-950/80 leading-relaxed">
                      Calculated from historical patterns. Explicitly marked as an estimate, never presented as a medical guarantee.
                    </p>
                  </div>

                  {/* Sample Recent Symptoms */}
                  <div>
                    <span className="text-[11px] font-semibold text-stone-500 block mb-2 uppercase tracking-wide">
                      Recently Logged Check-Ins:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-ivory-100 text-stone-700 font-medium">
                        Mild Cramps (Day 1)
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-ivory-100 text-stone-700 font-medium">
                        Hydration Goal Met
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-ivory-100 text-stone-700 font-medium">
                        Ragi & Dal Lunch
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PILLARS OF HERHEALTH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="font-display text-3xl font-bold text-stone-900">
            Thoughtfully Crafted for Women’s Real Health Needs
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Move beyond generic tracking apps filled with ads. Experience dignified healthcare education, Indian nutritional staples, and zero-compromise privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl border border-ivory-200 p-7 shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-stone-900">
              Menstrual Cycle Tracker
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Record start dates, end dates, flow volume, and 12+ common symptoms. Calculate cycle averages, view trends over time, and export records for your gynaecologist.
            </p>
            <Link
              to="/tracker"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900"
            >
              Explore cycle tracker →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl border border-ivory-200 p-7 shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-plum-100 text-plum-700 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-stone-900">
              PCOS / PCOD & Health Library
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Comprehensive clinical education on Rotterdam diagnostic criteria, insulin resistance, thyroid, anaemia, and red-flag warning signs backed by ACOG and ICMR.
            </p>
            <Link
              to="/pcos-hub"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-plum-700 hover:text-plum-900"
            >
              Learn about PCOS & PCOD →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl border border-ivory-200 p-7 shadow-sm space-y-4 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
              <Apple className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-stone-900">
              Familiar Indian Nutrition
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Practical meal ideas celebrating millets (ragi, jowar), black chickpeas, drumstick leaves (moringa), sprouts, and seasonal produce for natural hormone balance.
            </p>
            <Link
              to="/nutrition"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta-700 hover:text-terracotta-900"
            >
              Discover Indian nutrition →
            </Link>
          </div>

        </div>
      </section>

      {/* PRIVACY & DATA ETHICS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-ivory-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-900 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5 text-sage-700" />
                <span>Our Privacy Promise</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
                Your Health Data Belongs Exclusively to You
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Health information is intimately personal. In HerHealth, every single record is protected by database Row-Level Security (RLS). You can download your data at any time or permanently delete your account with one click.
              </p>
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>No data sharing with advertising or insurance networks.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>Compliant with Indian DPDP digital data privacy principles.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>Instant data export (CSV/JSON) and complete self-service account deletion.</span>
                </li>
              </ul>
            </div>

            <div className="bg-ivory-50 p-6 rounded-2xl border border-ivory-200 space-y-4 text-xs">
              <div className="flex items-center justify-between font-bold text-stone-900 pb-2 border-b border-ivory-200">
                <span>Data Isolation Architecture</span>
                <span className="text-[11px] font-mono text-sage-700">auth.uid() = user_id</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Our database enforces strict Row Level Security policies at the PostgreSQL kernel level. Even platform administrators cannot view your intimate period notes or symptom diaries without explicit, recorded consent.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <Link
                  to="/privacy-terms"
                  className="text-xs font-semibold text-rose-700 hover:text-rose-900 underline"
                >
                  Read our full privacy charter →
                </Link>
                <span className="text-[11px] text-stone-400">Version 1.0 (2026)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-rose-900 to-plum-900 rounded-3xl p-10 sm:p-14 text-white shadow-xl space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Take Charge of Your Menstrual Health Today
          </h2>
          <p className="text-sm sm:text-base text-rose-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of women who track with confidence, learn with credible medical science, and protect their personal privacy.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-rose-900 font-bold text-sm hover:bg-ivory-100 shadow-md transition"
            >
              Get Started for Free
            </Link>
            <Link
              to="/pcos-hub"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl border border-rose-300 text-white font-semibold text-sm hover:bg-white/10 transition"
            >
              Learn About PCOS Care
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
