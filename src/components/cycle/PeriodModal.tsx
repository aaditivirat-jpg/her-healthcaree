import React, { useState, useEffect } from 'react';
import { PeriodRecord, FlowLevel, SymptomType } from '../../types';
import { X, Calendar, Droplets, AlertCircle } from 'lucide-react';
import { validatePeriodDates } from '../../lib/cycleCalculator';

interface PeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recordData: Omit<PeriodRecord, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  initialRecord?: PeriodRecord | null;
}

const FLOW_OPTIONS: { label: string; value: FlowLevel; color: string }[] = [
  { label: 'Spotting', value: 'spotting', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  { label: 'Light', value: 'light', color: 'bg-rose-200 text-rose-900 border-rose-300' },
  { label: 'Medium', value: 'medium', color: 'bg-rose-400 text-white border-rose-500' },
  { label: 'Heavy', value: 'heavy', color: 'bg-rose-600 text-white border-rose-700' },
  { label: 'Very Heavy', value: 'very_heavy', color: 'bg-rose-800 text-white border-rose-900' },
];

const SYMPTOM_OPTIONS: { label: string; value: SymptomType }[] = [
  { label: 'Pelvic Cramps', value: 'cramps' },
  { label: 'Headache', value: 'headache' },
  { label: 'Bloating', value: 'bloating' },
  { label: 'Fatigue & Low Energy', value: 'fatigue' },
  { label: 'Mood Fluctuations', value: 'mood_changes' },
  { label: 'Acne & Breakouts', value: 'acne' },
  { label: 'Breast Tenderness', value: 'breast_tenderness' },
  { label: 'Heavy Blood Flow', value: 'heavy_bleeding' },
  { label: 'Mild Nausea', value: 'nausea' },
  { label: 'Lower Back Pain', value: 'lower_back_pain' },
  { label: 'Sleep Disruption', value: 'insomnia' },
  { label: 'Sugar/Carb Cravings', value: 'cravings' },
];

export const PeriodModal: React.FC<PeriodModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialRecord,
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [flow, setFlow] = useState<FlowLevel | undefined>(undefined);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomType[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialRecord) {
      setStartDate(initialRecord.startDate);
      setEndDate(initialRecord.endDate || '');
      setFlow(initialRecord.flow);
      setSelectedSymptoms(initialRecord.symptoms || []);
      setNotes(initialRecord.notes || '');
    } else {
      const today = new Date().toISOString().split('T')[0];
      setStartDate(today);
      setEndDate('');
      setFlow('medium');
      setSelectedSymptoms([]);
      setNotes('');
    }
    setError(null);
  }, [initialRecord, isOpen]);

  if (!isOpen) return null;

  const toggleSymptom = (symptom: SymptomType) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validatePeriodDates(startDate, endDate || undefined);
    if (!validation.valid) {
      setError(validation.error || 'Please correct date errors.');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onSave({
        startDate,
        endDate: endDate ? endDate : undefined,
        flow,
        symptoms: selectedSymptoms,
        notes: notes.trim() ? notes.trim() : undefined,
      });

      if (success) {
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save record.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-ivory-200 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-ivory-200 flex items-center justify-between bg-ivory-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                {initialRecord ? 'Edit Period Record' : 'Log Period Record'}
              </h3>
              <p className="text-xs text-stone-500">
                Securely encrypted & private to your personal profile
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-ivory-200 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-sm">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span className="text-xs font-medium leading-relaxed">{error}</span>
            </div>
          )}

          {/* Date range pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Period Start Date <span className="text-rose-600">*</span>
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-stone-900 focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Period End Date <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                min={startDate}
                className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-stone-900 focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
              />
              <p className="text-[11px] text-stone-500 mt-1">Leave empty if period is still active.</p>
            </div>
          </div>

          {/* Flow Level Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-rose-600" />
              Flow Intensity
            </label>
            <div className="grid grid-cols-5 gap-2">
              {FLOW_OPTIONS.map(opt => {
                const isSelected = flow === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFlow(opt.value)}
                    className={`py-2 px-1 rounded-xl text-xs font-medium border text-center transition ${
                      isSelected
                        ? `${opt.color} font-semibold ring-2 ring-rose-600 ring-offset-1`
                        : 'border-ivory-300 bg-ivory-50 hover:bg-ivory-100 text-stone-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Associated Symptoms */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Experienced Symptoms <span className="text-stone-400 font-normal">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_OPTIONS.map(s => {
                const isSelected = selectedSymptoms.includes(s.value);
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => toggleSymptom(s.value)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-rose-100 border-rose-300 text-rose-900 font-medium'
                        : 'bg-white border-ivory-300 text-stone-600 hover:border-ivory-400'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-rose-600' : 'bg-stone-300'}`} />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Personal Notes & Observations
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="E.g., Used hot water bottle; mild headaches on day 2; work stress was high."
              className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-stone-900 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-ivory-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-ivory-200 font-medium text-xs transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700 transition shadow-sm shadow-rose-200 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                initialRecord ? 'Update Record' : 'Save Record'
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
