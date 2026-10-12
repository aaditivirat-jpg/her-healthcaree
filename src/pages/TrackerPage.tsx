import React, { useState } from 'react';
import { useCycle } from '../context/CycleContext';
import { CycleCalendar } from '../components/cycle/CycleCalendar';
import { CycleChart } from '../components/cycle/CycleChart';
import { PeriodModal } from '../components/cycle/PeriodModal';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  TrendingUp, 
  AlertCircle, 
  Droplet, 
  Sparkles,
  Info
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const TrackerPage: React.FC = () => {
  const { records, enrichedRecords, stats, addRecord, isLoading, error } = useCycle();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-ivory-200 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-100/60 px-2.5 py-1 rounded-full mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Cycle Tracking & Calendar</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            Menstrual Rhythm Tracker
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Track bleeding days, flow intensity, and hormonal symptoms. Never used to diagnose medical conditions automatically.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-rose-600 text-white font-semibold text-xs sm:text-sm hover:bg-rose-700 shadow-sm shadow-rose-200 transition flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log Period Dates</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid: Calendar on Left, Stats & Chart on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Calendar (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <CycleCalendar records={records} stats={stats} />

          {/* Clinical Safe Practice Callout */}
          <div className="bg-ivory-50 rounded-3xl border border-ivory-200 p-5 text-xs text-stone-600 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <Info className="w-4 h-4 text-rose-600" />
              <span>Diagnostic Safeguard Notice</span>
            </div>
            <p className="leading-relaxed">
              HerHealth does not diagnose PCOS, pregnancy, or infertility from cycle entries. Cycles can naturally fluctuate due to travel, exams, physical illness, or diet changes. Always discuss persistent irregularities with your doctor.
            </p>
          </div>
        </div>

        {/* Right Column: Chart & Cycle History Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <CycleChart records={records} />

          {/* Chronological Summary Cards */}
          <div className="bg-white rounded-3xl border border-ivory-200 p-6 shadow-sm space-y-4">
            <h3 className="font-display text-base font-bold text-stone-900">
              Recent Recorded Cycles
            </h3>

            {records.length === 0 ? (
              <p className="text-xs text-stone-500 py-4 text-center">
                No menstrual cycles recorded yet. Click "+ Log Period Dates" to start your log.
              </p>
            ) : (
              <div className="space-y-3">
                {enrichedRecords.slice(0, 4).map((rec, idx) => {
                  let startFormatted = rec.startDate;
                  try {
                    startFormatted = format(parseISO(rec.startDate), 'MMM dd, yyyy');
                  } catch {}

                  return (
                    <div
                      key={rec.id}
                      className="p-3.5 rounded-2xl bg-ivory-50/70 border border-ivory-200 flex items-center justify-between text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Droplet className="w-3.5 h-3.5 text-rose-600" />
                          <span className="font-semibold text-stone-900">{startFormatted}</span>
                          {rec.flow && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 capitalize">
                              {rec.flow.replace('_', ' ')}
                            </span>
                          )}
                        </div>
                        {rec.symptoms && rec.symptoms.length > 0 && (
                          <p className="text-[11px] text-stone-500">
                            Symptoms: {rec.symptoms.map(s => s.replace('_', ' ')).join(', ')}
                          </p>
                        )}
                      </div>

                      {rec.cycleLength && (
                        <div className="text-right">
                          <span className="font-bold text-rose-900 block">{rec.cycleLength}d</span>
                          <span className="text-[10px] text-stone-400">cycle span</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Modal dialog */}
      <PeriodModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addRecord}
      />

    </div>
  );
};
