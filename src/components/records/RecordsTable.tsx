import React, { useState } from 'react';
import { PeriodRecord } from '../../types';
import { format, parseISO } from 'date-fns';
import { 
  Calendar, 
  Trash2, 
  Edit3, 
  Search, 
  Download, 
  Printer, 
  FileSpreadsheet, 
  AlertTriangle,
  Droplet
} from 'lucide-react';
import { exportRecordsToCSV, exportDataToJSON, triggerPrintReport } from '../../lib/exportUtils';
import { useAuth } from '../../context/AuthContext';
import { useCycle } from '../../context/CycleContext';

interface RecordsTableProps {
  records: PeriodRecord[];
  onEdit: (record: PeriodRecord) => void;
  onDelete: (recordId: string) => void;
}

export const RecordsTable: React.FC<RecordsTableProps> = ({ records, onEdit, onDelete }) => {
  const { user } = useAuth();
  const { stats } = useCycle();
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Filter records
  const filtered = records.filter(r => {
    const sTerm = searchTerm.toLowerCase();
    const dateMatch = r.startDate.includes(sTerm) || (r.endDate && r.endDate.includes(sTerm));
    const notesMatch = r.notes?.toLowerCase().includes(sTerm);
    const symptomsMatch = r.symptoms?.some(s => s.toLowerCase().includes(sTerm));
    const flowMatch = r.flow?.toLowerCase().includes(sTerm);
    return dateMatch || notesMatch || symptomsMatch || flowMatch;
  });

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

  return (
    <div className="bg-white rounded-3xl border border-ivory-200 shadow-sm overflow-hidden">
      
      {/* Controls Bar */}
      <div className="p-6 border-b border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-ivory-50/40">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by date, symptom or notes..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-ivory-300 bg-white text-xs text-stone-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
          />
        </div>

        {/* Action buttons: Export CSV, JSON, Print */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 text-stone-700 text-xs font-semibold shadow-sm transition"
            title="Download CSV for spreadsheet review"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-sage-600" />
            Export CSV
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 text-stone-700 text-xs font-semibold shadow-sm transition"
            title="Download complete JSON export"
          >
            <Download className="w-3.5 h-3.5 text-plum-600" />
            JSON Backup
          </button>

          <button
            onClick={triggerPrintReport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 text-stone-700 text-xs font-semibold shadow-sm transition"
            title="Print doctor-ready summary"
          >
            <Printer className="w-3.5 h-3.5 text-stone-600" />
            Print Report
          </button>
        </div>
      </div>

      {/* Table view */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center text-stone-500">
          <Calendar className="w-10 h-10 mx-auto text-stone-300 mb-3" />
          <p className="text-sm font-medium text-stone-700">No records found</p>
          <p className="text-xs text-stone-500 mt-1">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Log your first period to start building your long-term health history.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-ivory-100/60 text-stone-600 border-b border-ivory-200">
                <th className="py-3.5 px-5 font-semibold">Start Date</th>
                <th className="py-3.5 px-5 font-semibold">End Date</th>
                <th className="py-3.5 px-5 font-semibold">Duration</th>
                <th className="py-3.5 px-5 font-semibold">Cycle Length</th>
                <th className="py-3.5 px-5 font-semibold">Flow</th>
                <th className="py-3.5 px-5 font-semibold">Logged Symptoms</th>
                <th className="py-3.5 px-5 font-semibold">Notes</th>
                <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {filtered.map(record => {
                let startFmt = record.startDate;
                let endFmt = record.endDate ? record.endDate : 'Ongoing';
                try {
                  startFmt = format(parseISO(record.startDate), 'MMM dd, yyyy');
                  if (record.endDate) {
                    endFmt = format(parseISO(record.endDate), 'MMM dd, yyyy');
                  }
                } catch {}

                return (
                  <tr key={record.id} className="hover:bg-ivory-50/60 transition">
                    <td className="py-4 px-5 font-semibold text-stone-900 whitespace-nowrap">
                      {startFmt}
                    </td>
                    <td className="py-4 px-5 text-stone-600 whitespace-nowrap">
                      {endFmt}
                    </td>
                    <td className="py-4 px-5 text-stone-700">
                      {record.periodDuration ? `${record.periodDuration} days` : '—'}
                    </td>
                    <td className="py-4 px-5 text-stone-700 font-medium">
                      {record.cycleLength ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                          {record.cycleLength} days
                        </span>
                      ) : (
                        <span className="text-stone-400">Initial cycle</span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      {record.flow ? (
                        <span className="capitalize px-2 py-0.5 rounded-md text-[11px] font-medium bg-ivory-200 text-stone-800 flex items-center gap-1 w-fit">
                          <Droplet className="w-2.5 h-2.5 text-rose-600" />
                          {record.flow.replace('_', ' ')}
                        </span>
                      ) : (
                        <span className="text-stone-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      {record.symptoms && record.symptoms.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {record.symptoms.map(s => (
                            <span key={s} className="px-2 py-0.5 rounded bg-ivory-100 text-stone-700 text-[10px] capitalize border border-ivory-300">
                              {s.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-stone-400">None logged</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-stone-600 max-w-xs truncate" title={record.notes}>
                      {record.notes || <span className="text-stone-400">—</span>}
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEdit(record)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-ivory-200 transition"
                          title="Edit record"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(record.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-ivory-200 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-display text-lg font-bold text-stone-900">Delete Period Record?</h3>
              <p className="text-xs text-stone-600 mt-1">
                Are you sure you want to permanently delete this cycle record from your personal database? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-xl text-stone-600 hover:bg-ivory-100 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white hover:bg-rose-700 text-xs font-semibold shadow-sm"
              >
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
