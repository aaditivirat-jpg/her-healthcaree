import React from 'react';
import { useWellness } from '../../context/WellnessContext';
import { HabitType } from '../../types';
import { 
  CheckCircle2, 
  Circle, 
  Utensils, 
  Droplet, 
  Activity, 
  Moon, 
  Smile, 
  HeartHandshake,
  Calendar
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

const HABIT_CONFIG: {
  type: HabitType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}[] = [
  {
    type: 'balanced_meals',
    label: 'Nourishing Balanced Meals',
    description: 'Filled half my plate with vegetables/fiber, balanced with protein and whole grains.',
    icon: Utensils,
    color: 'text-terracotta-600 bg-terracotta-50',
  },
  {
    type: 'hydration',
    label: 'Mindful Hydration',
    description: 'Drank adequate water throughout the day (approx 2 to 2.5 litres or hydrating herbal chaas).',
    icon: Droplet,
    color: 'text-rose-600 bg-rose-50',
  },
  {
    type: 'physical_activity',
    label: 'Restorative Movement',
    description: 'Engaged in gentle movement suited to my energy (walking, stretching, yoga or workout).',
    icon: Activity,
    color: 'text-sage-600 bg-sage-50',
  },
  {
    type: 'sleep_routine',
    label: 'Quality Rest & Sleep',
    description: 'Aiming for 7-8 hours restful sleep and disconnected from screens before bed.',
    icon: Moon,
    color: 'text-plum-600 bg-plum-50',
  },
  {
    type: 'relaxation_stress',
    label: 'Stress Relief & Calming',
    description: 'Took a mindful pause for deep breathing, quiet time, or doing something joyful.',
    icon: Smile,
    color: 'text-rose-600 bg-rose-50',
  },
  {
    type: 'symptom_awareness',
    label: 'Body Listening & Check-In',
    description: 'Acknowledged my physical feelings without judgment and listened to what my body needed.',
    icon: HeartHandshake,
    color: 'text-sage-700 bg-sage-50',
  },
];

export const DailyChecklistWidget: React.FC = () => {
  const { selectedDate, setSelectedDate, entries, toggleHabit } = useWellness();

  const completedCount = entries.filter(e => e.completionStatus).length;
  const progressPercent = Math.round((completedCount / HABIT_CONFIG.length) * 100);

  const isCompleted = (type: HabitType) => {
    return Boolean(entries.find(e => e.habitType === type && e.completionStatus));
  };

  let formattedDate = selectedDate;
  try {
    formattedDate = format(parseISO(selectedDate), 'EEEE, MMMM d, yyyy');
  } catch {}

  return (
    <div className="bg-white rounded-3xl border border-ivory-200 shadow-sm p-6 space-y-6">
      
      {/* Header & Date Chooser */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-ivory-200 gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-sage-600" />
            Daily Wellness & Self-Care Checklist
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Small daily acts of care. Every step forward counts; no scorekeeping or judgment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-stone-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="text-xs font-semibold text-stone-800 border border-ivory-300 rounded-xl px-3 py-1.5 bg-ivory-50/50 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Progress & Encouragement banner */}
      <div className="bg-ivory-50 p-4 rounded-2xl border border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-800">
              {completedCount} of {HABIT_CONFIG.length} Habits Completed
            </span>
            <span className="text-xs font-semibold text-rose-800 bg-rose-100 px-2 py-0.2 rounded-full">
              {progressPercent}%
            </span>
          </div>
          <p className="text-[11px] text-stone-600 leading-relaxed">
            {progressPercent === 100
              ? '✨ Wonderful dedication to your self-care today!'
              : progressPercent >= 50
              ? '🌿 Balanced and steady progress. Celebrate what you have done.'
              : '🌸 Be gentle with yourself. Listen to your body’s rhythm today.'}
          </p>
        </div>

        {/* Mini progress bar */}
        <div className="w-full sm:w-48 bg-ivory-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-sage-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Habits List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {HABIT_CONFIG.map(item => {
          const done = isCompleted(item.type);
          const Icon = item.icon;

          return (
            <button
              key={item.type}
              type="button"
              onClick={() => toggleHabit(item.type)}
              className={`p-4 rounded-2xl border text-left transition flex items-start gap-3.5 group ${
                done
                  ? 'bg-sage-50/60 border-sage-300 text-stone-900 shadow-sm'
                  : 'bg-white border-ivory-200 hover:border-ivory-300 text-stone-700'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-sage-600 fill-sage-100" />
                ) : (
                  <Circle className="w-5 h-5 text-stone-300 group-hover:text-stone-400" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`p-1 rounded-lg ${item.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className={`text-xs font-bold ${done ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                    {item.label}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-stone-400 text-center italic">
        Your wellness logs are stored privately in your personal account database.
      </p>

    </div>
  );
};
