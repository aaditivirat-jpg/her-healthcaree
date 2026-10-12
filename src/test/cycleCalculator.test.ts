import { describe, it, expect } from 'vitest';
import { 
  validatePeriodDates, 
  calculateCycleLengths, 
  calculateCycleStats, 
  sortRecordsChronologically 
} from '../lib/cycleCalculator';
import { PeriodRecord } from '../types';

describe('Menstrual Cycle Calculator & Validation Engine', () => {

  describe('validatePeriodDates', () => {
    it('requires a start date', () => {
      const res = validatePeriodDates('');
      expect(res.valid).toBe(false);
      expect(res.error).toContain('Start date is required');
    });

    it('rejects a start date set in the future', () => {
      const futureDate = '2099-01-01';
      const res = validatePeriodDates(futureDate);
      expect(res.valid).toBe(false);
      expect(res.error).toContain('cannot be set in the future');
    });

    it('rejects an end date earlier than start date', () => {
      const res = validatePeriodDates('2026-03-10', '2026-03-05');
      expect(res.valid).toBe(false);
      expect(res.error).toContain('cannot be earlier than start date');
    });

    it('flags bleeding durations exceeding 20 days for clinical alert', () => {
      const res = validatePeriodDates('2026-03-01', '2026-03-25');
      expect(res.valid).toBe(false);
      expect(res.error).toContain('consult a healthcare professional');
    });

    it('accepts valid date ranges within normal physiology', () => {
      const res = validatePeriodDates('2026-03-01', '2026-03-06');
      expect(res.valid).toBe(true);
      expect(res.error).toBeUndefined();
    });
  });

  describe('sortRecordsChronologically', () => {
    it('sorts records from oldest to newest by start date', () => {
      const records: PeriodRecord[] = [
        {
          id: '1',
          userId: 'usr_1',
          startDate: '2026-03-01',
          symptoms: [],
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '2',
          userId: 'usr_1',
          startDate: '2026-01-01',
          symptoms: [],
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '3',
          userId: 'usr_1',
          startDate: '2026-02-01',
          symptoms: [],
          createdAt: '',
          updatedAt: '',
        },
      ];

      const sorted = sortRecordsChronologically(records);
      expect(sorted[0].startDate).toBe('2026-01-01');
      expect(sorted[1].startDate).toBe('2026-02-01');
      expect(sorted[2].startDate).toBe('2026-03-01');
    });
  });

  describe('calculateCycleLengths', () => {
    it('accurately calculates cycle length between consecutive starts and bleeding duration', () => {
      const records: PeriodRecord[] = [
        {
          id: '1',
          userId: 'usr_1',
          startDate: '2026-01-01',
          endDate: '2026-01-06',
          symptoms: [],
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '2',
          userId: 'usr_1',
          startDate: '2026-01-29', // 28 days later
          endDate: '2026-02-03',
          symptoms: [],
          createdAt: '',
          updatedAt: '',
        },
      ];

      const enriched = calculateCycleLengths(records);
      expect(enriched[0].periodDuration).toBe(6);
      expect(enriched[0].cycleLength).toBeUndefined(); // First cycle has no prior

      expect(enriched[1].cycleLength).toBe(28);
      expect(enriched[1].periodDuration).toBe(6);
    });
  });

  describe('calculateCycleStats', () => {
    it('reports insufficient data when 0 or 1 records exist', () => {
      const statsZero = calculateCycleStats([]);
      expect(statsZero.totalRecordedCycles).toBe(0);
      expect(statsZero.nextEstimatedPeriodDate).toBeNull();
      expect(statsZero.uncertaintyNotice).toContain('Log at least 2 consecutive period dates');

      const singleRecord: PeriodRecord[] = [{
        id: '1',
        userId: 'usr_1',
        startDate: '2026-03-01',
        symptoms: [],
        createdAt: '',
        updatedAt: '',
      }];
      const statsOne = calculateCycleStats(singleRecord);
      expect(statsOne.totalRecordedCycles).toBe(1);
      expect(statsOne.nextEstimatedPeriodDate).toBeNull();
    });

    it('calculates average length and estimated next date for multiple cycles', () => {
      const records: PeriodRecord[] = [
        {
          id: '1',
          userId: 'usr_1',
          startDate: '2026-01-01',
          endDate: '2026-01-05',
          symptoms: [],
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '2',
          userId: 'usr_1',
          startDate: '2026-01-29', // 28 days
          endDate: '2026-02-02',
          symptoms: [],
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '3',
          userId: 'usr_1',
          startDate: '2026-02-26', // 28 days
          endDate: '2026-03-02',
          symptoms: [],
          createdAt: '',
          updatedAt: '',
        },
      ];

      const stats = calculateCycleStats(records);
      expect(stats.averageCycleLength).toBe(28);
      expect(stats.averagePeriodDuration).toBe(5);
      expect(stats.isRegular).toBe(true);
      expect(stats.nextEstimatedPeriodDate).toBe('2026-03-26');
      expect(stats.uncertaintyNotice).toContain('average cycle length of 28 days');
    });
  });

});
