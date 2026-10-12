import React from 'react';
import { AskAssistantWidget } from '../components/assistant/AskAssistantWidget';
import { Sparkles, ShieldCheck, AlertTriangle, Stethoscope } from 'lucide-react';

export const AskHealthPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="space-y-3 pb-6 border-b border-ivory-200 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-100/70 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Carefully Controlled Health Assistant</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
          Ask HerHealth Educational Assistant
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Ask general women’s healthcare, menstrual cycle, PCOS, or nutrition questions. All answers are grounded in reviewed clinical sources and explicitly bounded by medical safety rules.
        </p>
      </div>

      {/* Safety Notice Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-rose-950">
          <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block text-rose-900">Educational Boundary:</strong>
            This assistant is not a doctor. It cannot diagnose illnesses, interpret medical scans, or suggest drug dosages.
          </div>
        </div>

        <div className="bg-sage-50 border border-sage-200 rounded-2xl p-4 flex items-start gap-3 text-sage-950">
          <ShieldCheck className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block text-sage-900">Privacy Protection:</strong>
            Queries do not require your medical identity and are not permanently logged or sold to external advertisers.
          </div>
        </div>
      </div>

      {/* The Assistant Widget */}
      <AskAssistantWidget />

    </div>
  );
};
