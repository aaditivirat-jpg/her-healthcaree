import { differenceInDays, addDays, parseISO, isValid, format } from 'date-fns';
import { PeriodRecord, CycleStats } from '../types';

/**
 * Validates a period record date range
 */
export function validatePeriodDates(startDate: string, endDate?: string): { valid: boolean; error?: string } {
  if (!startDate) {
    return { valid: false, error: 'Start date is required.' };
  }

  const start = parseISO(startDate);
  if (!isValid(start)) {
    return { valid: false, error: 'Start date format is invalid.' };
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  if (start > today) {
    return { valid: false, error: 'Period start date cannot be set in the future.' };
  }

  if (endDate) {
    const end = parseISO(endDate);
    if (!isValid(end)) {
      return { valid: false, error: 'End date format is invalid.' };
    }
    if (end < start) {
      return { valid: false, error: 'Period end date cannot be earlier than start date.' };
    }
    const duration = differenceInDays(end, start) + 1;
    if (duration > 20) {
      return { valid: false, error: 'Period duration cannot exceed 20 days. If you are experiencing prolonged bleeding, please consult a healthcare professional immediately.' };
    }
  }

  return { valid: true };
}

/**
 * Sorts period records in chronological order (oldest to newest)
 */
export function sortRecordsChronologically(records: PeriodRecord[]): PeriodRecord[] {
  return [...records].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

/**
 * Calculates cycle lengths between consecutive period start dates
 */
export function calculateCycleLengths(records: PeriodRecord[]): PeriodRecord[] {
  const sorted = sortRecordsChronologically(records);
  
  return sorted.map((record, index) => {
    let cycleLength: number | undefined = undefined;
    let periodDuration: number | undefined = undefined;

    if (record.endDate) {
      const start = parseISO(record.startDate);
      const end = parseISO(record.endDate);
      if (isValid(start) && isValid(end)) {
        periodDuration = Math.max(1, differenceInDays(end, start) + 1);
      }
    }

    if (index > 0) {
      const prevStart = parseISO(sorted[index - 1].startDate);
      const currStart = parseISO(record.startDate);
      if (isValid(prevStart) && isValid(currStart)) {
        const diff = differenceInDays(currStart, prevStart);
        // Biological sanity: consecutive cycles are usually 15-90 days
        if (diff > 0) {
          cycleLength = diff;
        }
      }
    }

    return {
      ...record,
      cycleLength,
      periodDuration,
    };
  });
}

/**
 * Computes cycle statistics, moving averages, and estimated next period
 */
export function calculateCycleStats(records: PeriodRecord[]): CycleStats {
  if (!records || records.length === 0) {
    return {
      averageCycleLength: 28,
      averagePeriodDuration: 5,
      lastPeriodStartDate: null,
      lastPeriodEndDate: null,
      nextEstimatedPeriodDate: null,
      daysUntilNextPeriod: null,
      isRegular: true,
      totalRecordedCycles: 0,
      uncertaintyNotice: 'Log at least 2 consecutive period dates to enable personalized cycle insights and predictions.',
    };
  }

  const enrichedRecords = calculateCycleLengths(records);
  const latestRecord = enrichedRecords[enrichedRecords.length - 1];

  // Durations
  const validDurations = enrichedRecords
    .map(r => r.periodDuration)
    .filter((d): d is number => typeof d === 'number' && d >= 1 && d <= 14);

  const avgDuration = validDurations.length > 0
    ? Math.round(validDurations.reduce((sum, d) => sum + d, 0) / validDurations.length)
    : 5;

  // Cycle lengths
  const validCycleLengths = enrichedRecords
    .map(r => r.cycleLength)
    .filter((l): l is number => typeof l === 'number' && l >= 15 && l <= 90);

  const avgCycleLength = validCycleLengths.length > 0
    ? Math.round(validCycleLengths.reduce((sum, l) => sum + l, 0) / validCycleLengths.length)
    : 28;

  // Regularity check: standard deviation of cycle length <= 7 days
  let isRegular = true;
  if (validCycleLengths.length >= 2) {
    const variance = validCycleLengths.reduce((sum, len) => sum + Math.pow(len - avgCycleLength, 2), 0) / validCycleLengths.length;
    const stdDev = Math.sqrt(variance);
    isRegular = stdDev <= 7;
  }

  // Estimated next period
  let nextEstimatedPeriodDate: string | null = null;
  let daysUntilNextPeriod: number | null = null;
  let uncertaintyNotice = '';

  if (validCycleLengths.length >= 1) {
    const lastStart = parseISO(latestRecord.startDate);
    if (isValid(lastStart)) {
      const estimatedDate = addDays(lastStart, avgCycleLength);
      nextEstimatedPeriodDate = format(estimatedDate, 'yyyy-MM-dd');

      const today = new Date();
      daysUntilNextPeriod = differenceInDays(estimatedDate, today);

      uncertaintyNotice = isRegular
        ? `Estimated based on your historical average cycle length of ${avgCycleLength} days. Note: Stress, illness, travel, or hormonal variations may shift actual dates.`
        : `Your recorded cycles have varied over time (average ${avgCycleLength} days). Predictions are estimates only and should not be used as medical certainty.`;
    }
  } else {
    uncertaintyNotice = 'Record your next period start date to calculate personalized cycle length and estimated dates.';
  }

  return {
    averageCycleLength: avgCycleLength,
    averagePeriodDuration: avgDuration,
    lastPeriodStartDate: latestRecord.startDate,
    lastPeriodEndDate: latestRecord.endDate || null,
    nextEstimatedPeriodDate,
    daysUntilNextPeriod,
    isRegular,
    totalRecordedCycles: enrichedRecords.length,
    uncertaintyNotice,
  };
}
