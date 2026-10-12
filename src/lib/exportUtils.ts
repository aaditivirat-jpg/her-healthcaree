import { PeriodRecord, CycleStats, UserProfile } from '../types';

/**
 * Generates and triggers download of CSV formatted period records
 */
export function exportRecordsToCSV(records: PeriodRecord[], profile: UserProfile): void {
  const headers = [
    'Record_ID',
    'Start_Date',
    'End_Date',
    'Flow_Level',
    'Duration_Days',
    'Cycle_Length_Days',
    'Symptoms',
    'Notes',
    'Created_At',
  ];

  const rows = records.map(r => [
    `"${r.id}"`,
    `"${r.startDate}"`,
    `"${r.endDate || ''}"`,
    `"${r.flow || ''}"`,
    `"${r.periodDuration || ''}"`,
    `"${r.cycleLength || ''}"`,
    `"${(r.symptoms || []).join('; ')}"`,
    `"${(r.notes || '').replace(/"/g, '""')}"`,
    `"${r.createdAt}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `HerHealth_Records_${profile.displayName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and triggers download of full JSON export
 */
export function exportDataToJSON(data: {
  profile: UserProfile;
  periodRecords: PeriodRecord[];
  cycleStats: CycleStats;
}): void {
  const payload = {
    exportMetadata: {
      platform: 'HerHealth Women\'s Health Platform',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      disclaimer: 'This file contains personal health records exported securely. Store safely to protect your privacy.',
    },
    ...data,
  };

  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `HerHealth_DataExport_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Triggers a doctor-ready print layout
 */
export function triggerPrintReport(): void {
  window.print();
}
