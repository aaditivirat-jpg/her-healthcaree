import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export const PrivacyTermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-ivory-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-900 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-sage-700" />
          <span>Privacy Charter & DPDP Framework</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
          Privacy Policy & Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Last Reviewed & Updated: April 2026 • Policy Version 1.0.0
        </p>
      </div>

      {/* Summary Box */}
      <div className="bg-white rounded-3xl border border-ivory-200 p-8 shadow-sm space-y-4">
        <h2 className="font-display text-xl font-bold text-stone-900">Our Core Privacy Commitment</h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          At <strong>HerHealth</strong>, we believe menstrual and hormonal data is among the most sensitive personal information a person possesses. We do not sell, license, or broker your personal health information to pharmaceutical marketers, data brokers, or advertisement networks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="bg-ivory-50 p-4 rounded-2xl border border-ivory-200 space-y-1">
            <span className="font-bold text-stone-900 block">Row-Level Security</span>
            <span className="text-stone-600">Database policies prevent cross-tenant data leaks.</span>
          </div>
          <div className="bg-ivory-50 p-4 rounded-2xl border border-ivory-200 space-y-1">
            <span className="font-bold text-stone-900 block">No Ad Trackers</span>
            <span className="text-stone-600">Zero third-party marketing pixels or tracking scripts.</span>
          </div>
          <div className="bg-ivory-50 p-4 rounded-2xl border border-ivory-200 space-y-1">
            <span className="font-bold text-stone-900 block">Complete Erasure</span>
            <span className="text-stone-600">Permanent one-click deletion of all your health records.</span>
          </div>
        </div>
      </div>

      {/* DPDP Alignment */}
      <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <h3 className="font-display text-lg font-bold text-stone-900">1. Digital Personal Data Protection (DPDP) Alignment</h3>
        <p>
          HerHealth follows the principles established under the Digital Personal Data Protection framework in India:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li><strong>Purpose Limitation:</strong> We process your cycle dates and symptom logs solely to calculate personalized cycle patterns and display your historical charts.</li>
          <li><strong>Data Minimisation:</strong> We do not mandate government IDs, physical addresses, or intimate relationship details. Pseudonyms and display aliases are explicitly supported.</li>
          <li><strong>Right to Access & Portability:</strong> You can download a complete CSV or JSON copy of your health records directly from your account page at any time.</li>
          <li><strong>Right to Correction & Erasure:</strong> You can edit any cycle entry or permanently delete your account and all associated data with immediate effect.</li>
        </ul>

        <h3 className="font-display text-lg font-bold text-stone-900 pt-4">2. Role of Administrators & Least-Privilege Access</h3>
        <p>
          Platform administrators possess permissions only to manage application infrastructure, publish educational health articles, and process data requests. Database Row Level Security (RLS) ensures that ordinary platform staff cannot inspect individual patient notes or private symptom histories.
        </p>

        <h3 className="font-display text-lg font-bold text-stone-900 pt-4" id="consent">3. Explicit Consent Mechanisms</h3>
        <p>
          Before any health record is persisted, explicit affirmative consent is obtained during onboarding. Users may toggle off wellness reminders or educational assistant features independently within their Account Settings without losing access to basic cycle tracking.
        </p>

        <h3 className="font-display text-lg font-bold text-stone-900 pt-4">4. Health Information Disclaimer</h3>
        <p>
          Content on HerHealth is reviewed by qualified medical professionals for general educational purposes. It does not constitute individual clinical diagnosis, medical prescriptions, or emergency healthcare. Always seek the advice of your gynaecologist, physician, or qualified healthcare provider with any questions regarding personal medical conditions.
        </p>
      </div>

    </div>
  );
};
