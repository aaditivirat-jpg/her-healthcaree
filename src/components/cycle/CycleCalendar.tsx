import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths, 
  parseISO, 
  isWithinInterval
} from 'date-fns';
import { PeriodRecord, CycleStats } from '../../types';
import { ChevronLeft, ChevronRight, Droplet, Sparkles, Calendar as CalendarIcon } from 'lucide-react';

interface CycleCalendarProps {
  records: PeriodRecord[];
  stats: CycleStats;
  onSelectDate?: (date: Date) => void;
}

export const CycleCalendar: React.FC<CycleCalendarProps> = ({ records, stats, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Helper to determine status for a date
  const getDayInfo = (day: Date) => {
    // 1. Is it a recorded period day?
    for (const record of records) {
      const recordStart = parseISO(record.startDate);
      const recordEnd = record.endDate ? parseISO(record.endDate) : recordStart;

      if (isWithinInterval(day, { start: recordStart, end: recordEnd })) {
        return {
          type: 'period',
          record,
          flow: record.flow,
          isStart: isSameDay(day, recordStart),
          isEnd: isSameDay(day, recordEnd),
        };
      }
    }

    // 2. Is it an estimated next period day?
    if (stats.nextEstimatedPeriodDate) {
      const estStart = parseISO(stats.nextEstimatedPeriodDate);
      const estDuration = stats.averagePeriodDuration || 5;
      const estEnd = new Date(estStart);
      estEnd.setDate(estEnd.getDate() + (estDuration - 1));

      if (isWithinInterval(day, { start: estStart, end: estEnd })) {
        return {
          type: 'estimated',
          isStart: isSameDay(day, estStart),
        };
      }
    }

    return null;
  };

  const selectedDayInfo = selectedDay ? getDayInfo(selectedDay) : null;

  return (
    <div className="bg-white rounded-3xl border border-ivory-200 shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="px-6 py-4 border-b border-ivory-200 flex items-center justify-between bg-ivory-50/50">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-rose-600" />
          <h3 className="font-display text-lg font-bold text-stone-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-xl text-stone-600 hover:bg-ivory-200 transition"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg text-stone-700 hover:bg-ivory-200 border border-ivory-300 transition"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-xl text-stone-600 hover:bg-ivory-200 transition"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-ivory-200 bg-ivory-50/30 text-center py-2.5 text-xs font-semibold text-stone-500">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 p-2 gap-1 sm:gap-2">
        {days.map(day => {
          const info = getDayInfo(day);
          const inCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDay && isSameDay(day, selectedDay);
          const isToday = isSameDay(day, new Date());

          let dayStyle = 'text-stone-700 hover:bg-ivory-100';

          if (!inCurrentMonth) {
            dayStyle = 'text-stone-300 opacity-60';
          }

          if (info?.type === 'period') {
            dayStyle = 'bg-rose-500 text-white font-semibold hover:bg-rose-600 shadow-sm';
          } else if (info?.type === 'estimated') {
            dayStyle = 'bg-rose-100 text-rose-900 border-2 border-dashed border-rose-300 hover:bg-rose-200 font-medium';
          }

          return (
            <button
              key={day.toISOString()}
              onClick={() => {
                setSelectedDay(day);
                if (onSelectDate) onSelectDate(day);
              }}
              className={`h-10 sm:h-12 rounded-2xl flex flex-col items-center justify-center relative transition text-xs ${dayStyle} ${
                isSelected ? 'ring-2 ring-stone-900 ring-offset-2' : ''
              }`}
            >
              <span className={`${isToday && !info ? 'font-bold text-rose-700 underline underline-offset-2' : ''}`}>
                {format(day, 'd')}
              </span>

              {/* Indicator dot */}
              {info?.type === 'period' && (
                <div className="w-1 h-1 rounded-full bg-white mt-0.5" />
              )}
              {info?.type === 'estimated' && (
                <div className="w-1 h-1 rounded-full bg-rose-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Calendar Legend */}
      <div className="px-6 py-3 border-t border-ivory-200 bg-ivory-50/50 flex flex-wrap items-center gap-4 text-xs text-stone-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-lg bg-rose-500" />
          <span>Recorded Period</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-lg bg-rose-100 border border-dashed border-rose-400" />
          <span>Estimated Window (Mathematical estimate)</span>
        </div>
      </div>

      {/* Selected Day Details Panel */}
      {selectedDay && (
        <div className="p-5 border-t border-ivory-200 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Selected Day: {format(selectedDay, 'EEEE, MMMM d, yyyy')}
            </span>
            {isSameDay(selectedDay, new Date()) && (
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Today
              </span>
            )}
          </div>

          {selectedDayInfo?.type === 'period' ? (
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-rose-800 font-semibold">
                <Droplet className="w-4 h-4 text-rose-600" />
                <span>Recorded Menstrual Day • Flow: {selectedDayInfo.flow || 'Recorded'}</span>
              </div>
              {selectedDayInfo.record?.symptoms && selectedDayInfo.record.symptoms.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedDayInfo.record.symptoms.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-ivory-100 text-stone-700 text-[11px] capitalize border border-ivory-300">
                      {s.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              )}
              {selectedDayInfo.record?.notes && (
                <p className="text-stone-600 bg-ivory-50 p-2.5 rounded-xl border border-ivory-200 italic">
                  "{selectedDayInfo.record.notes}"
                </p>
              )}
            </div>
          ) : selectedDayInfo?.type === 'estimated' ? (
            <div className="flex items-start gap-2 text-xs text-stone-700 bg-rose-50/70 p-3 rounded-2xl border border-rose-200">
              <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-900">Estimated Menstrual Window</p>
                <p className="text-stone-600 text-[11px] mt-0.5 leading-relaxed">
                  Calculated based on your recorded historical average cycle of {stats.averageCycleLength} days. Not a diagnostic guarantee.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-500">
              No period or symptoms logged on this date. Click "+ Log Period" to record symptoms or bleeding.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
