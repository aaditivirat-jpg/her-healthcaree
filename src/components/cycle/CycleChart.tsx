import React from 'react';
import { PeriodRecord } from '../../types';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { TrendingUp, Info } from 'lucide-react';

interface CycleChartProps {
  records: PeriodRecord[];
}

export const CycleChart: React.FC<CycleChartProps> = ({ records }) => {
  // We need cycles that have a calculated cycleLength or periodDuration
  const chartData = records
    .filter(r => r.cycleLength || r.periodDuration)
    .slice(-6) // Last 6 recorded cycles
    .map(r => {
      let label = r.startDate;
      try {
        label = format(parseISO(r.startDate), 'MMM dd');
      } catch {}

      return {
        date: label,
        cycleLength: r.cycleLength || 0,
        periodDuration: r.periodDuration || 5,
      };
    });

  if (chartData.length < 2) {
    return (
      <div className="bg-white rounded-3xl border border-ivory-200 p-8 text-center shadow-sm">
        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <TrendingUp className="w-6 h-6" />
        </div>
        <h4 className="font-display text-base font-bold text-stone-900 mb-1">
          Cycle Length Trends
        </h4>
        <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
          Log at least 2 consecutive period records to see your cycle length trend chart, regularity patterns, and variation history.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-ivory-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-ivory-200 gap-2">
        <div>
          <h4 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-600" />
            Cycle Length Variation
          </h4>
          <p className="text-xs text-stone-500">
            Consecutive cycle intervals in days (normal medical range: 21–35 days)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-600 inline-block" />
            <span className="text-stone-600 font-medium">Cycle Length</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-300 inline-block" />
            <span className="text-stone-600 font-medium">Bleeding Days</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFE7E0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#78716C' }} />
            <YAxis domain={[0, 45]} tick={{ fontSize: 11, fill: '#78716C' }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-2xl shadow-lg border border-ivory-200 text-xs space-y-1">
                      <p className="font-bold text-stone-900">{payload[0].payload.date}</p>
                      <p className="text-rose-700">
                        Cycle Length: <strong className="font-semibold">{payload[0].value} days</strong>
                      </p>
                      {payload[1] && (
                        <p className="text-rose-500">
                          Bleeding Duration: <strong className="font-semibold">{payload[1].value} days</strong>
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Clinical guideline reference lines */}
            <ReferenceLine y={28} stroke="#9E2651" strokeDasharray="4 4" label={{ value: '28d standard', position: 'insideTopRight', fill: '#9E2651', fontSize: 10 }} />
            <Bar dataKey="cycleLength" fill="#BC3464" radius={[6, 6, 0, 0]} maxBarSize={36} />
            <Bar dataKey="periodDuration" fill="#F2ADC0" radius={[6, 6, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-ivory-200 flex items-center gap-2 text-[11px] text-stone-500">
        <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span>Cycle length measures days from Day 1 of one period to Day 1 of the following period.</span>
      </div>
    </div>
  );
};
