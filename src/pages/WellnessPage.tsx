import React from 'react';
import { DailyChecklistWidget } from '../components/wellness/DailyChecklistWidget';
import { CheckCircle2, Heart, Sparkles, Moon, Utensils, Activity, Smile } from 'lucide-react';

export const WellnessPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Title */}
      <div className="space-y-3 pb-6 border-b border-ivory-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage-800 bg-sage-100/70 px-2.5 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5 text-sage-700" />
          <span>Daily Wellness & Routine</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
          Daily Self-Care & Habit Journey
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Consistent self-care does not mean rigid perfection. Track your daily nourishing meals, hydration, and restorative sleep at your own natural pace.
        </p>
      </div>

      {/* Main Checklist */}
      <div className="max-w-4xl mx-auto">
        <DailyChecklistWidget />
      </div>

      {/* Philosophy of Gentle Habits */}
      <div className="max-w-4xl mx-auto bg-ivory-50 rounded-3xl border border-ivory-200 p-8 space-y-6">
        <h3 className="font-display text-xl font-bold text-stone-900 text-center">
          Our Philosophy on Daily Habits: Non-Judgmental Care
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-600">
          <div className="space-y-2 text-center">
            <div className="w-10 h-10 rounded-2xl bg-white border border-ivory-300 mx-auto flex items-center justify-center text-sage-600 shadow-xs">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Listen First</h4>
            <p className="leading-relaxed">
              If your energy is low during your period or high stress days, rest is the most productive choice you can make.
            </p>
          </div>

          <div className="space-y-2 text-center">
            <div className="w-10 h-10 rounded-2xl bg-white border border-ivory-300 mx-auto flex items-center justify-center text-rose-600 shadow-xs">
              <Smile className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-900 text-sm">No Medical Failure</h4>
            <p className="leading-relaxed">
              Unchecked boxes are never a medical failure. They simply indicate what your schedule allowed today.
            </p>
          </div>

          <div className="space-y-2 text-center">
            <div className="w-10 h-10 rounded-2xl bg-white border border-ivory-300 mx-auto flex items-center justify-center text-plum-600 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Compound Growth</h4>
            <p className="leading-relaxed">
              A single glass of warm water or 10 minutes of quiet breathing gently soothes your nervous system over time.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
