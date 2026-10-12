import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCycle } from '../context/CycleContext';
import { PeriodModal } from '../components/cycle/PeriodModal';
import { CycleChart } from '../components/cycle/CycleChart';
import { DailyChecklistWidget } from '../components/wellness/DailyChecklistWidget';
import { 
  Calendar, 
  Plus, 
  TrendingUp, 
  Sparkles, 
  AlertCircle, 
  FileText, 
  BookOpen, 
  Apple, 
  ArrowRight,
  Droplet
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { records, enrichedRecords, stats, isLoading, error, addRecord } = useCycle();
  const [modalOpen, setModalOpen] = useState(false);

  let lastStartFormatted = stats.lastPeriodStartDate;
  try {
    if (stats.lastPeriodStartDate) {
      lastStartFormatted = format(parseISO(stats.lastPeriodStartDate), 'MMMM dd, yyyy');
    }
  } catch {}

  let nextEstFormatted = stats.nextEstimatedPeriodDate;
  try {
    if (stats.nextEstimatedPeriodDate) {
      nextEstFormatted = format(parseISO(stats.nextEstimatedPeriodDate), 'MMMM dd, yyyy');
    }
  } catch {}

  // Latest symptoms logged
  const latestRecord = enrichedRecords[enrichedRecords.length - 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner & Quick Action */}
      <div className="bg-gradient-to-r from-rose-50 via-white to-ivory-100 rounded-3xl border border-ivory-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-100/60 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personal Health Sanctuary</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            Welcome back, {user?.displayName || 'Friend'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
            Here is your current menstrual cycle snapshot and personalized health recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-rose-600 text-white font-semibold text-xs sm:text-sm hover:bg-rose-700 shadow-sm shadow-rose-200 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Log Period / Symptoms</span>
          </button>
          <Link
            to="/records"
            className="px-4 py-3 rounded-2xl border border-ivory-300 bg-white hover:bg-ivory-100 text-stone-700 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-stone-500" />
            <span>My Records</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Cycle Status Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Last Period */}
        <div className="bg-white rounded-3xl border border-ivory-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Last Recorded Period</span>
            <Calendar className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-lg font-bold text-stone-900 font-display">
            {lastStartFormatted || 'No records yet'}
          </p>
          <p className="text-[11px] text-stone-500">
            {stats.lastPeriodEndDate ? `Ended on ${format(parseISO(stats.lastPeriodEndDate), 'MMM dd')}` : 'Start date logged'}
          </p>
        </div>

        {/* Metric 2: Estimated Next Period */}
        <div className="bg-white rounded-3xl border border-ivory-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Next Estimated Period</span>
            <Sparkles className="w-4 h-4 text-plum-600" />
          </div>
          <p className="text-lg font-bold text-rose-900 font-display">
            {nextEstFormatted ? nextEstFormatted : 'Insufficient Data'}
          </p>
          <p className="text-[11px] text-stone-500">
            {stats.daysUntilNextPeriod !== null
              ? stats.daysUntilNextPeriod >= 0
                ? `Expected in approx. ${stats.daysUntilNextPeriod} days`
                : `${Math.abs(stats.daysUntilNextPeriod)} days past estimated date`
              : 'Log 2 cycles for predictions'}
          </p>
        </div>

        {/* Metric 3: Average Cycle Length */}
        <div className="bg-white rounded-3xl border border-ivory-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Average Cycle Length</span>
            <TrendingUp className="w-4 h-4 text-sage-600" />
          </div>
          <p className="text-lg font-bold text-stone-900 font-display">
            {stats.totalRecordedCycles > 0 ? `${stats.averageCycleLength} days` : '—'}
          </p>
          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            stats.isRegular ? 'bg-sage-100 text-sage-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {stats.isRegular ? 'Consistent rhythm' : 'Varied cycle intervals'}
          </span>
        </div>

        {/* Metric 4: Average Bleeding Duration */}
        <div className="bg-white rounded-3xl border border-ivory-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Bleeding Span</span>
            <Droplet className="w-4 h-4 text-terracotta-600" />
          </div>
          <p className="text-lg font-bold text-stone-900 font-display">
            {stats.totalRecordedCycles > 0 ? `${stats.averagePeriodDuration} days` : '—'}
          </p>
          <p className="text-[11px] text-stone-500">
            Typical duration per period
          </p>
        </div>

      </div>

      {/* Uncertainty Disclaimer Banner */}
      <div className="bg-ivory-50 rounded-2xl border border-ivory-200 p-4 text-xs text-stone-600 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-stone-800">Note on Mathematical Estimates:</strong> {stats.uncertaintyNotice}
        </p>
      </div>

      {/* Two-Column Layout: Visual Chart & Recent Symptoms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cycle Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <CycleChart records={records} />

          {/* Quick links to health hubs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/pcos-hub"
              className="bg-white p-5 rounded-3xl border border-ivory-200 hover:border-plum-300 shadow-sm transition space-y-2 group"
            >
              <div className="w-8 h-8 rounded-xl bg-plum-100 text-plum-700 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-display text-sm font-bold text-stone-900 group-hover:text-plum-800 transition">
                PCOS & Hormonal Guide
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Learn how insulin and hormones impact cycle regularities and what questions to ask your doctor.
              </p>
              <span className="text-xs font-semibold text-plum-700 inline-flex items-center gap-1 pt-1">
                Explore hub <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </span>
            </Link>

            <Link
              to="/nutrition"
              className="bg-white p-5 rounded-3xl border border-ivory-200 hover:border-terracotta-300 shadow-sm transition space-y-2 group"
            >
              <div className="w-8 h-8 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold">
                <Apple className="w-4 h-4" />
              </div>
              <h4 className="font-display text-sm font-bold text-stone-900 group-hover:text-terracotta-800 transition">
                Indian Food & Nutrition
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Discover balanced meal combinations featuring millets, moringa, dal, and iron-dense staples.
              </p>
              <span className="text-xs font-semibold text-terracotta-700 inline-flex items-center gap-1 pt-1">
                View meal plans <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Column: Daily Checklist & Recent Symptoms (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <DailyChecklistWidget />

          {/* Recent Symptoms Summary Box */}
          <div className="bg-white rounded-3xl border border-ivory-200 p-6 shadow-sm space-y-3">
            <h4 className="font-display text-sm font-bold text-stone-900">
              Latest Cycle Symptoms Logged
            </h4>
            {latestRecord && latestRecord.symptoms && latestRecord.symptoms.length > 0 ? (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {latestRecord.symptoms.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-ivory-100 text-stone-700 text-xs capitalize border border-ivory-300">
                      {s.replace('_', ' ')}
                    </span>
                  ))}
                </div>
                {latestRecord.notes && (
                  <p className="text-xs text-stone-600 bg-ivory-50 p-3 rounded-2xl border border-ivory-200 italic">
                    "{latestRecord.notes}"
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                No symptoms recorded for your latest cycle. When you log your next period, you can note cramps, mood, or fatigue to track correlations.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Modal for adding/editing record */}
      <PeriodModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addRecord}
      />

    </div>
  );
};
