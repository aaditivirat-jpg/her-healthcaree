import React, { useState } from 'react';
import { useCycle } from '../context/CycleContext';
import { RecordsTable } from '../components/records/RecordsTable';
import { PeriodModal } from '../components/cycle/PeriodModal';
import { PeriodRecord } from '../types';
import { FileText, Plus, Shield, Lock } from 'lucide-react';

export const RecordsPage: React.FC = () => {
  const { records, updateRecord, removeRecord, addRecord } = useCycle();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PeriodRecord | null>(null);

  const handleEdit = (record: PeriodRecord) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const handleSaveModal = async (
    recordData: Omit<PeriodRecord, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ) => {
    if (editingRecord) {
      return await updateRecord(editingRecord.id, recordData);
    } else {
      return await addRecord(recordData);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-ivory-200 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-100/60 px-2.5 py-1 rounded-full mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Personal Health Records</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            My Health Records
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            View, filter, edit, and export your historical menstrual data. Stored with persistent user isolation.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingRecord(null);
            setModalOpen(true);
          }}
          className="px-5 py-3 rounded-2xl bg-rose-600 text-white font-semibold text-xs sm:text-sm hover:bg-rose-700 shadow-sm shadow-rose-200 transition flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Record</span>
        </button>
      </div>

      {/* Security notice */}
      <div className="bg-sage-50/70 border border-sage-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-sage-900">
        <Lock className="w-4 h-4 text-sage-700 shrink-0" />
        <span>
          <strong>Encrypted & Isolated:</strong> Only your authenticated account can retrieve these records. Neither other platform members nor unauthorized staff have access.
        </span>
      </div>

      {/* Main Records Table */}
      <RecordsTable
        records={records}
        onEdit={handleEdit}
        onDelete={removeRecord}
      />

      {/* Modal */}
      <PeriodModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingRecord(null);
        }}
        onSave={handleSaveModal}
        initialRecord={editingRecord}
      />

    </div>
  );
};
