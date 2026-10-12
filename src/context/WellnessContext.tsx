import React, { createContext, useContext, useState, useEffect } from 'react';
import { WellnessEntry, HabitType, ConsentRecord } from '../types';
import { useAuth } from './AuthContext';
import { 
  fetchWellnessEntries, 
  toggleWellnessEntry, 
  fetchConsentRecords, 
  updateConsent,
  submitDataRequest,
  deleteUserData
} from '../lib/storage';
import { format } from 'date-fns';

interface WellnessContextType {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  entries: WellnessEntry[];
  consents: ConsentRecord[];
  isLoading: boolean;
  toggleHabit: (habit: HabitType) => Promise<void>;
  updateUserConsent: (consentType: ConsentRecord['consentType'], granted: boolean) => Promise<void>;
  requestDataExport: (notes?: string) => Promise<boolean>;
  requestAccountDeletion: (reason?: string) => Promise<boolean>;
  purgeMyDataNow: () => Promise<void>;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const WellnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [entries, setEntries] = useState<WellnessEntry[]>([]);
  const [consents, setConsents] = useState<ConsentRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      if (!user) {
        setEntries([]);
        setConsents([]);
        return;
      }
      setIsLoading(true);
      try {
        const [wellnessData, consentData] = await Promise.all([
          fetchWellnessEntries(user.id, selectedDate),
          fetchConsentRecords(user.id),
        ]);
        setEntries(wellnessData);
        setConsents(consentData);
      } catch (err) {
        console.error('Failed to load wellness/consent records:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [user?.id, selectedDate]);

  const toggleHabit = async (habit: HabitType) => {
    if (!user) return;
    try {
      const updated = await toggleWellnessEntry(user.id, selectedDate, habit);
      setEntries(prev => {
        const idx = prev.findIndex(e => e.habitType === habit);
        if (idx > -1) {
          const clone = [...prev];
          clone[idx] = updated;
          return clone;
        }
        return [...prev, updated];
      });
    } catch (err) {
      console.error('Failed to toggle habit:', err);
    }
  };

  const updateUserConsent = async (consentType: ConsentRecord['consentType'], granted: boolean) => {
    if (!user) return;
    try {
      await updateConsent(user.id, consentType, granted);
      const updated = await fetchConsentRecords(user.id);
      setConsents(updated);
    } catch (err) {
      console.error('Failed to update consent:', err);
    }
  };

  const requestDataExport = async (notes?: string): Promise<boolean> => {
    if (!user) return false;
    try {
      await submitDataRequest(user.id, user.email, 'export', notes);
      return true;
    } catch {
      return false;
    }
  };

  const requestAccountDeletion = async (reason?: string): Promise<boolean> => {
    if (!user) return false;
    try {
      await submitDataRequest(user.id, user.email, 'deletion', reason);
      return true;
    } catch {
      return false;
    }
  };

  const purgeMyDataNow = async (): Promise<void> => {
    if (!user) return;
    await deleteUserData(user.id);
    await logout();
  };

  return (
    <WellnessContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        entries,
        consents,
        isLoading,
        toggleHabit,
        updateUserConsent,
        requestDataExport,
        requestAccountDeletion,
        purgeMyDataNow,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};

export function useWellness(): WellnessContextType {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
}
