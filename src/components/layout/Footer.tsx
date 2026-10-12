import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, AlertTriangle, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ivory-100 border-t border-ivory-200 text-stone-700 mt-auto">
      {/* Critical Medical Disclaimer Banner */}
      <div className="bg-rose-50/70 border-b border-rose-100 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
            <strong className="font-semibold text-rose-900">Important Medical Disclaimer:</strong> HerHealth is an educational wellness and cycle tracking platform. Information provided is for personal awareness and education only, not clinical advice, medical diagnosis, or prescription. Always consult a licensed healthcare professional for personal medical questions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-display text-xl font-bold text-stone-900">HerHealth</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Empowering women with evidence-informed menstrual cycle tracking, hormonal wellness education, and strictly private personal health records.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-sage-700 bg-sage-50 px-2.5 py-1.5 rounded-lg border border-sage-200 w-fit">
              <Shield className="w-3.5 h-3.5" />
              <span>Strict Private Records (RLS Enforced)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">Healthcare Hubs</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/tracker" className="hover:text-rose-800 transition">Menstrual Cycle Tracker</Link>
              </li>
              <li>
                <Link to="/pcos-hub" className="hover:text-rose-800 transition">PCOS & PCOD Resource Center</Link>
              </li>
              <li>
                <Link to="/nutrition" className="hover:text-rose-800 transition">Indian Diet & Nutrition Module</Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-rose-800 transition">Health Education Library</Link>
              </li>
              <li>
                <Link to="/wellness" className="hover:text-rose-800 transition">Daily Wellness Checklist</Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">Privacy & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy-terms" className="hover:text-rose-800 transition">Privacy Notice & DPDP Principles</Link>
              </li>
              <li>
                <Link to="/privacy-terms" className="hover:text-rose-800 transition">Terms of Service</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-rose-800 transition">Data Export & Erasure Rights</Link>
              </li>
              <li>
                <Link to="/privacy-terms#consent" className="hover:text-rose-800 transition">Explicit Consent Policies</Link>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines & Contact */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">Urgent Care Helplines</h4>
            <p className="text-xs text-stone-600">If you experience severe sudden pain or extreme hemorrhage, contact emergency support immediately:</p>
            <div className="bg-white p-3 rounded-xl border border-ivory-300 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-stone-800 font-semibold">
                <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                <span>National Emergency: 112</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-100 text-rose-700 text-[10px] flex items-center justify-center font-bold">W</span>
                <span>Women's Helpline: 1091</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <span className="w-3.5 h-3.5 rounded-full bg-sage-100 text-sage-700 text-[10px] flex items-center justify-center font-bold">M</span>
                <span>Mental Health (Tele-MANAS): 14416</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-ivory-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} HerHealth Platform. Built with care for women's well-being.</p>
          <p className="text-stone-400">Strict Patient Confidentiality • Zero Third-Party Advertising Trackers</p>
        </div>
      </div>
    </footer>
  );
};
