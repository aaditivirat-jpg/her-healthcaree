import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PeriodRecord, CycleStats } from '../types';
import { useAuth } from './AuthContext';
import { fetchPeriodRecords, savePeriodRecord, deletePeriodRecord } from '../lib/storage';
import { calculateCycleStats, calculateCycleLengths, validatePeriodDates } from '../lib/cycleCalculator';

interface CycleContextType {
  records: PeriodRecord[];
  enrichedRecords: PeriodRecord[];
  stats: CycleStats;
  isLoading: boolean;
  error: string | null;
  addRecord: (record: Omit<PeriodRecord, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateRecord: (id: string, record: Omit<PeriodRecord, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  removeRecord: (id: string) => Promise<boolean>;
  clearError: () => void;
  refreshRecords: () => Promise<void>;
}

const CycleContext = createContext<CycleContextType | undefined>(undefined);

// Initial sample cycles for Ananya to showcase full analytics upon launch
const SEED_DEMO_RECORDS: Omit<PeriodRecord, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    userId: 'usr_ananya_01',
    startDate: '2026-01-05',
    endDate: '2026-01-10',
    flow: 'medium',
    symptoms: ['cramps', 'bloating', 'fatigue'],
    notes: 'Mild lower abdominal cramps on day 1 and 2. Rest and warm tea helped.',
  },
  {
    userId: 'usr_ananya_01',
    startDate: '2026-02-03',
    endDate: '2026-02-08',
    flow: 'heavy',
    symptoms: ['cramps', 'headache', 'mood_changes'],
    notes: 'Heavier flow on day 2. Used heating pad.',
  },
  {
    userId: 'usr_ananya_01',
    startDate: '2026-03-03',
    endDate: '2026-03-07',
    flow: 'medium',
    symptoms: ['fatigue', 'breast_tenderness'],
    notes: '28-day cycle length. Normal flow and mild fatigue.',
  },
  {
    userId: 'usr_ananya_01',
    startDate: '2026-03-31',
    endDate: '2026-04-04',
    flow: 'light',
    symptoms: ['bloating'],
    notes: 'Slightly lighter flow this month.',
  }
];

export const CycleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [records, setRecords] = useState<PeriodRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserRecords = async () => {
    if (!user) {
      setRecords([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      let data = await fetchPeriodRecords(user.id);

      // Seed initial demo cycles for the demo user if empty
      if (data.length === 0 && user.id === 'usr_ananya_01') {
        for (const seed of SEED_DEMO_RECORDS) {
          await savePeriodRecord(seed);
        }
        data = await fetchPeriodRecords(user.id);
      }

      setRecords(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load menstrual records');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserRecords();
  }, [user?.id]);

  const enrichedRecords = useMemo(() => {
    return calculateCycleLengths(records);
  }, [records]);

  const stats = useMemo(() => {
    return calculateCycleStats(records);
  }, [records]);

  const addRecord = async (
    recordData: Omit<PeriodRecord, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<boolean> => {
    if (!user) {
      setError('You must be signed in to record a period.');
      return false;
    }

    const validation = validatePeriodDates(recordData.startDate, recordData.endDate);
    if (!validation.valid) {
      setError(validation.error || 'Invalid period dates.');
      return false;
    }

    // Check duplicate start date
    const duplicate = records.find(r => r.startDate === recordData.startDate);
    if (duplicate) {
      setError('A period record with this exact start date already exists.');
      return false;
    }

    try {
      const saved = await savePeriodRecord({
        ...recordData,
        userId: user.id,
      });

      setRecords(prev => [saved, ...prev]);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to save period record.');
      return false;
    }
  };

  const updateRecord = async (
    id: string,
    recordData: Omit<PeriodRecord, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<boolean> => {
    if (!user) return false;

    const validation = validatePeriodDates(recordData.startDate, recordData.endDate);
    if (!validation.valid) {
      setError(validation.error || 'Invalid period dates.');
      return false;
    }

    try {
      const updated = await savePeriodRecord({
        ...recordData,
        userId: user.id,
      }, id);

      setRecords(prev => prev.map(r => (r.id === id ? updated : r)));
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update record.');
      return false;
    }
  };

  const removeRecord = async (id: string): Promise<boolean> => {
    if (!user) return false;

    try {
      await deletePeriodRecord(user.id, id);
      setRecords(prev => prev.filter(r => r.id !== id));
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete record.');
      return false;
    }
  };

  return (
    <CycleContext.Provider
      value={{
        records,
        enrichedRecords,
        stats,
        isLoading,
        error,
        addRecord,
        updateRecord,
        removeRecord,
        clearError: () => setError(null),
        refreshRecords: loadUserRecords,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export function useCycle(): CycleContextType {
  const context = useContext(CycleContext);
  if (!context) {
    throw new Error('useCycle must be used within a CycleProvider');
  }
  return context;
}
