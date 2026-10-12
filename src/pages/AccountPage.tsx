import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWellness } from '../context/WellnessContext';
import { useCycle } from '../context/CycleContext';
import { exportRecordsToCSV, exportDataToJSON } from '../lib/exportUtils';
import { 
  User, 
  ShieldCheck, 
  Download, 
  Trash2, 
  AlertTriangle, 
  Check, 
  Lock, 
  Clock, 
  Save 
} from 'lucide-react';
import { ConsentRecord } from '../types';

export const AccountPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { consents, updateUserConsent, purgeMyDataNow, requestDataExport } = useWellness();
  const { records, stats } = useCycle();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [timezone, setTimezone] = useState(user?.timezone || 'Asia/Kolkata');
  const [profileSaved, setProfileSaved] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');

  const hasConsent = (type: ConsentRecord['consentType']) => {
    const c = consents.find(item => item.consentType === type);
    return Boolean(c && !c.revokedAt);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(displayName, timezone);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleExportCSV = () => {
    if (!user) return;
    exportRecordsToCSV(records, user);
  };

  const handleExportJSON = () => {
    if (!user) return;
    exportDataToJSON({
      profile: user,
      periodRecords: records,
      cycleStats: stats,
    });
  };

  const handlePermanentDeletion = async () => {
    if (confirmDeleteText !== 'DELETE') return;
    await purgeMyDataNow();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Title */}
      <div className="space-y-2 pb-6 border-b border-ivory-200">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
          Account Settings & Privacy Rights
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Manage your personal display name, time zone, explicit consent choices, and data portability rights.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-3xl border border-ivory-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-ivory-200">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-stone-900">Profile Details</h2>
            <p className="text-xs text-stone-500">Your email remains your primary identity token</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
            <input
              type="text"
              disabled
              value={user?.email || ''}
              className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-100 text-stone-500 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Display Name / Preferred Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-stone-900 focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Timezone</label>
              <select
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-stone-900 focus:ring-2 focus:ring-rose-500"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC (Universal Coordinated Time)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {profileSaved && (
              <span className="text-xs text-sage-700 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4 text-sage-600" />
                Profile preferences updated
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-5 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700 transition flex items-center gap-1.5 shadow-sm shadow-rose-200"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>

      {/* Consent & Data Rights Section */}
      <div className="bg-white rounded-3xl border border-ivory-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-ivory-200">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-stone-900">Privacy & Consent Choices</h2>
            <p className="text-xs text-stone-500">You may grant or revoke individual processing consents at any time</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          
          {/* Consent 1: Health Data Storage */}
          <div className="p-4 rounded-2xl border border-ivory-200 bg-ivory-50/50 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-stone-900 block">Personal Period & Symptom Storage</span>
              <p className="text-stone-600 leading-relaxed">
                Allows HerHealth to persistently save your period dates and symptom logs in your isolated database record so you can view long-term trends across devices.
              </p>
            </div>
            <button
              onClick={() => updateUserConsent('health_data_storage', !hasConsent('health_data_storage'))}
              className={`px-3 py-1.5 rounded-xl font-semibold transition shrink-0 ${
                hasConsent('health_data_storage')
                  ? 'bg-sage-600 text-white'
                  : 'bg-stone-200 text-stone-700'
              }`}
            >
              {hasConsent('health_data_storage') ? 'Granted' : 'Revoked'}
            </button>
          </div>

          {/* Consent 2: Wellness Reminders */}
          <div className="p-4 rounded-2xl border border-ivory-200 bg-ivory-50/50 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-stone-900 block">Optional Wellness & Cycle Reminders</span>
              <p className="text-stone-600 leading-relaxed">
                Allows sending gentle, confidential cycle alerts (without revealing private health labels on lock screens).
              </p>
            </div>
            <button
              onClick={() => updateUserConsent('wellness_reminders', !hasConsent('wellness_reminders'))}
              className={`px-3 py-1.5 rounded-xl font-semibold transition shrink-0 ${
                hasConsent('wellness_reminders')
                  ? 'bg-sage-600 text-white'
                  : 'bg-stone-200 text-stone-700'
              }`}
            >
              {hasConsent('wellness_reminders') ? 'Granted' : 'Disabled'}
            </button>
          </div>

          {/* Consent 3: Educational Assistant */}
          <div className="p-4 rounded-2xl border border-ivory-200 bg-ivory-50/50 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-stone-900 block">Ask HerHealth Educational Assistant</span>
              <p className="text-stone-600 leading-relaxed">
                Permits educational question answering using vetted clinical guidelines. Queries are never permanently stored with your medical identity.
              </p>
            </div>
            <button
              onClick={() => updateUserConsent('educational_assistant', !hasConsent('educational_assistant'))}
              className={`px-3 py-1.5 rounded-xl font-semibold transition shrink-0 ${
                hasConsent('educational_assistant')
                  ? 'bg-sage-600 text-white'
                  : 'bg-stone-200 text-stone-700'
              }`}
            >
              {hasConsent('educational_assistant') ? 'Granted' : 'Disabled'}
            </button>
          </div>

        </div>
      </div>

      {/* Data Portability (Export) Section */}
      <div className="bg-white rounded-3xl border border-ivory-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-ivory-200">
          <div className="w-10 h-10 rounded-2xl bg-plum-100 text-plum-700 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-stone-900">Data Portability (Export Your Data)</h2>
            <p className="text-xs text-stone-500">Download a complete, machine-readable copy of your health records</p>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          In compliance with international data portability standards and the Indian DPDP Act, you have the right to receive your personal data in a structured, commonly used format.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 hover:bg-ivory-100 text-stone-800 text-xs font-semibold flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-sage-600" />
            Download Records as CSV (Spreadsheet)
          </button>

          <button
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 hover:bg-ivory-100 text-stone-800 text-xs font-semibold flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-plum-600" />
            Download Complete JSON Archive
          </button>
        </div>
      </div>

      {/* Right to Erasure (Account Deletion) */}
      <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-rose-100">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-base font-bold text-rose-950">Right to Erasure (Delete Account & Records)</h2>
            <p className="text-xs text-stone-500">Permanently purge all menstrual cycles, symptoms, and profile data</p>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          Requesting deletion will permanently purge all your period entries, symptoms, habits, and profile information from our database. This action cannot be reversed.
        </p>

        {!isDeleting ? (
          <button
            onClick={() => setIsDeleting(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-semibold transition"
          >
            Request Complete Account Deletion
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3 text-xs">
            <p className="font-bold text-rose-950">
              Please type <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-rose-300">DELETE</span> to confirm permanent erasure:
            </p>
            <input
              type="text"
              value={confirmDeleteText}
              onChange={e => setConfirmDeleteText(e.target.value)}
              placeholder="Type DELETE"
              className="w-full max-w-xs p-2 rounded-xl border border-rose-300 bg-white"
            />
            <div className="flex items-center gap-2">
              <button
                disabled={confirmDeleteText !== 'DELETE'}
                onClick={handlePermanentDeletion}
                className="px-4 py-2 rounded-xl bg-rose-700 text-white font-bold disabled:opacity-40 transition"
              >
                Permanently Purge All My Data
              </button>
              <button
                onClick={() => {
                  setIsDeleting(false);
                  setConfirmDeleteText('');
                }}
                className="px-3 py-2 rounded-xl text-stone-600 hover:bg-ivory-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
