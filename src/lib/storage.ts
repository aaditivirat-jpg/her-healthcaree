import { supabase, isSupabaseConfigured } from './supabase';
import { 
  UserProfile, 
  PeriodRecord, 
  SymptomEntry, 
  WellnessEntry, 
  ConsentRecord, 
  HealthArticle, 
  AuditEvent, 
  DataRequest,
  HabitType
} from '../types';
import { initialHealthArticles } from '../data/articles';

const STORAGE_KEYS = {
  USERS: 'herhealth_users_db',
  ACTIVE_SESSION: 'herhealth_active_session',
  PERIOD_RECORDS: 'herhealth_period_records',
  SYMPTOMS: 'herhealth_symptoms',
  WELLNESS: 'herhealth_wellness',
  CONSENT: 'herhealth_consent',
  ARTICLES: 'herhealth_articles',
  AUDIT: 'herhealth_audit_events',
  DATA_REQUESTS: 'herhealth_data_requests',
};

// Safe storage helpers
function getLocalItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

// Ensure articles exist
export function initSeedArticles(): HealthArticle[] {
  const existing = getLocalItem<HealthArticle[]>(STORAGE_KEYS.ARTICLES, []);
  if (existing.length === 0) {
    setLocalItem(STORAGE_KEYS.ARTICLES, initialHealthArticles);
    return initialHealthArticles;
  }
  return existing;
}

// ----------------------------------------------------
// Period Records Storage & Operations
// ----------------------------------------------------

export async function fetchPeriodRecords(userId: string): Promise<PeriodRecord[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('period_records')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(r => ({
      id: r.id,
      userId: r.user_id,
      startDate: r.start_date,
      endDate: r.end_date || undefined,
      flow: r.flow || undefined,
      symptoms: r.symptoms || [],
      notes: r.notes || undefined,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  }

  // Local fallback with user isolation
  const allRecords = getLocalItem<PeriodRecord[]>(STORAGE_KEYS.PERIOD_RECORDS, []);
  return allRecords
    .filter(r => r.userId === userId)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export async function savePeriodRecord(record: Omit<PeriodRecord, 'id' | 'createdAt' | 'updatedAt'>, existingId?: string): Promise<PeriodRecord> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    if (existingId) {
      const { data, error } = await supabase
        .from('period_records')
        .update({
          start_date: record.startDate,
          end_date: record.endDate || null,
          flow: record.flow || null,
          symptoms: record.symptoms || [],
          notes: record.notes || null,
          updated_at: now,
        })
        .eq('id', existingId)
        .eq('user_id', record.userId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return {
        id: data.id,
        userId: data.user_id,
        startDate: data.start_date,
        endDate: data.end_date || undefined,
        flow: data.flow || undefined,
        symptoms: data.symptoms || [],
        notes: data.notes || undefined,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } else {
      const { data, error } = await supabase
        .from('period_records')
        .insert({
          user_id: record.userId,
          start_date: record.startDate,
          end_date: record.endDate || null,
          flow: record.flow || null,
          symptoms: record.symptoms || [],
          notes: record.notes || null,
          created_at: now,
          updated_at: now,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return {
        id: data.id,
        userId: data.user_id,
        startDate: data.start_date,
        endDate: data.end_date || undefined,
        flow: data.flow || undefined,
        symptoms: data.symptoms || [],
        notes: data.notes || undefined,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    }
  }

  // Local fallback
  const allRecords = getLocalItem<PeriodRecord[]>(STORAGE_KEYS.PERIOD_RECORDS, []);
  if (existingId) {
    const index = allRecords.findIndex(r => r.id === existingId && r.userId === record.userId);
    if (index === -1) throw new Error('Record not found or access denied');
    const updated: PeriodRecord = {
      ...allRecords[index],
      ...record,
      updatedAt: now,
    };
    allRecords[index] = updated;
    setLocalItem(STORAGE_KEYS.PERIOD_RECORDS, allRecords);
    return updated;
  } else {
    const newRecord: PeriodRecord = {
      ...record,
      id: 'rec_' + Math.random().toString(36).substring(2, 11),
      createdAt: now,
      updatedAt: now,
    };
    allRecords.push(newRecord);
    setLocalItem(STORAGE_KEYS.PERIOD_RECORDS, allRecords);
    return newRecord;
  }
}

export async function deletePeriodRecord(userId: string, recordId: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('period_records')
      .delete()
      .eq('id', recordId)
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return;
  }

  // Local fallback
  const allRecords = getLocalItem<PeriodRecord[]>(STORAGE_KEYS.PERIOD_RECORDS, []);
  const filtered = allRecords.filter(r => !(r.id === recordId && r.userId === userId));
  setLocalItem(STORAGE_KEYS.PERIOD_RECORDS, filtered);
}

// ----------------------------------------------------
// Wellness Entries Operations
// ----------------------------------------------------

export async function fetchWellnessEntries(userId: string, date: string): Promise<WellnessEntry[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('wellness_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('entry_date', date);

    if (error) throw new Error(error.message);
    return (data || []).map(w => ({
      id: w.id,
      userId: w.user_id,
      entryDate: w.entry_date,
      habitType: w.habit_type,
      completionStatus: w.completion_status,
      notes: w.notes,
      createdAt: w.created_at,
    }));
  }

  const allWellness = getLocalItem<WellnessEntry[]>(STORAGE_KEYS.WELLNESS, []);
  return allWellness.filter(w => w.userId === userId && w.entryDate === date);
}

export async function toggleWellnessEntry(userId: string, date: string, habitType: HabitType): Promise<WellnessEntry> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    // Check existing
    const { data: existing } = await supabase
      .from('wellness_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('entry_date', date)
      .eq('habit_type', habitType)
      .maybeSingle();

    if (existing) {
      const nextStatus = !existing.completion_status;
      const { data, error } = await supabase
        .from('wellness_entries')
        .update({ completion_status: nextStatus })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return {
        id: data.id,
        userId: data.user_id,
        entryDate: data.entry_date,
        habitType: data.habit_type,
        completionStatus: data.completion_status,
        notes: data.notes,
        createdAt: data.created_at,
      };
    } else {
      const { data, error } = await supabase
        .from('wellness_entries')
        .insert({
          user_id: userId,
          entry_date: date,
          habit_type: habitType,
          completion_status: true,
          created_at: now,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return {
        id: data.id,
        userId: data.user_id,
        entryDate: data.entry_date,
        habitType: data.habit_type,
        completionStatus: data.completion_status,
        notes: data.notes,
        createdAt: data.created_at,
      };
    }
  }

  const all = getLocalItem<WellnessEntry[]>(STORAGE_KEYS.WELLNESS, []);
  const idx = all.findIndex(w => w.userId === userId && w.entryDate === date && w.habitType === habitType);

  if (idx > -1) {
    all[idx].completionStatus = !all[idx].completionStatus;
    setLocalItem(STORAGE_KEYS.WELLNESS, all);
    return all[idx];
  } else {
    const entry: WellnessEntry = {
      id: 'wel_' + Math.random().toString(36).substring(2, 9),
      userId,
      entryDate: date,
      habitType,
      completionStatus: true,
      createdAt: now,
    };
    all.push(entry);
    setLocalItem(STORAGE_KEYS.WELLNESS, all);
    return entry;
  }
}

// ----------------------------------------------------
// Health Articles Storage
// ----------------------------------------------------

export async function fetchHealthArticles(): Promise<HealthArticle[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('health_articles')
      .select('*')
      .eq('publication_status', 'published')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map(a => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        category: a.category,
        summary: a.summary,
        content: a.content,
        symptoms: a.symptoms || [],
        possibleCauses: a.possible_causes || [],
        selfCareTips: a.self_care_tips || [],
        clinicalEvaluation: a.clinical_evaluation || [],
        medicalTreatments: a.medical_treatments || [],
        warningSigns: a.warning_signs || [],
        references: a.reference_sources || [],
        reviewerName: a.reviewer_name,
        reviewerTitle: a.reviewer_title,
        reviewedAt: a.reviewed_at,
        publicationStatus: a.publication_status,
        readTimeMinutes: 4,
        createdAt: a.created_at,
        updatedAt: a.updated_at,
      }));
    }
  }

  return initSeedArticles();
}

export async function saveHealthArticle(article: HealthArticle): Promise<void> {
  const all = initSeedArticles();
  const idx = all.findIndex(a => a.id === article.id);
  if (idx > -1) {
    all[idx] = article;
  } else {
    all.unshift(article);
  }
  setLocalItem(STORAGE_KEYS.ARTICLES, all);
}

// ----------------------------------------------------
// Consent & Privacy Rights Operations
// ----------------------------------------------------

export async function fetchConsentRecords(userId: string): Promise<ConsentRecord[]> {
  const all = getLocalItem<ConsentRecord[]>(STORAGE_KEYS.CONSENT, []);
  return all.filter(c => c.userId === userId);
}

export async function updateConsent(
  userId: string, 
  consentType: ConsentRecord['consentType'], 
  granted: boolean
): Promise<void> {
  const all = getLocalItem<ConsentRecord[]>(STORAGE_KEYS.CONSENT, []);
  const idx = all.findIndex(c => c.userId === userId && c.consentType === consentType);

  const now = new Date().toISOString();
  if (idx > -1) {
    if (granted) {
      all[idx].grantedAt = now;
      all[idx].revokedAt = null;
    } else {
      all[idx].revokedAt = now;
    }
  } else if (granted) {
    all.push({
      id: 'con_' + Math.random().toString(36).substring(2, 9),
      userId,
      consentType,
      policyVersion: '1.0.0 (2026)',
      grantedAt: now,
      revokedAt: null,
    });
  }
  setLocalItem(STORAGE_KEYS.CONSENT, all);
}

// ----------------------------------------------------
// Data Requests (Export & Deletion)
// ----------------------------------------------------

export async function submitDataRequest(userId: string, userEmail: string, type: 'export' | 'deletion', notes?: string): Promise<DataRequest> {
  const req: DataRequest = {
    id: 'req_' + Math.random().toString(36).substring(2, 9),
    userId,
    userEmail,
    requestType: type,
    status: 'pending',
    requestedAt: new Date().toISOString(),
    notes,
  };

  const all = getLocalItem<DataRequest[]>(STORAGE_KEYS.DATA_REQUESTS, []);
  all.unshift(req);
  setLocalItem(STORAGE_KEYS.DATA_REQUESTS, all);

  await recordAuditEvent({
    actorUserId: userId,
    actorEmail: userEmail,
    action: `SUBMIT_${type.toUpperCase()}_REQUEST`,
    resourceType: 'data_request',
    resourceId: req.id,
    reason: notes || `User requested ${type}`,
  });

  return req;
}

export async function fetchDataRequests(): Promise<DataRequest[]> {
  return getLocalItem<DataRequest[]>(STORAGE_KEYS.DATA_REQUESTS, []);
}

export async function updateDataRequestStatus(requestId: string, status: DataRequest['status']): Promise<void> {
  const all = getLocalItem<DataRequest[]>(STORAGE_KEYS.DATA_REQUESTS, []);
  const idx = all.findIndex(r => r.id === requestId);
  if (idx > -1) {
    all[idx].status = status;
    all[idx].processedAt = new Date().toISOString();
    setLocalItem(STORAGE_KEYS.DATA_REQUESTS, all);
  }
}

// ----------------------------------------------------
// Audit Logging (Privilege, Security & Integrity)
// ----------------------------------------------------

export async function recordAuditEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>): Promise<void> {
  const newEvent: AuditEvent = {
    ...event,
    id: 'aud_' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toISOString(),
  };

  const all = getLocalItem<AuditEvent[]>(STORAGE_KEYS.AUDIT, []);
  all.unshift(newEvent);
  // Keep last 100 audit entries
  if (all.length > 100) all.pop();
  setLocalItem(STORAGE_KEYS.AUDIT, all);
}

export async function fetchAuditEvents(): Promise<AuditEvent[]> {
  return getLocalItem<AuditEvent[]>(STORAGE_KEYS.AUDIT, []);
}

// Complete Account & Personal Data Deletion
export async function deleteUserData(userId: string): Promise<void> {
  // Clear period records
  const allRecords = getLocalItem<PeriodRecord[]>(STORAGE_KEYS.PERIOD_RECORDS, []);
  setLocalItem(STORAGE_KEYS.PERIOD_RECORDS, allRecords.filter(r => r.userId !== userId));

  // Clear wellness
  const allWellness = getLocalItem<WellnessEntry[]>(STORAGE_KEYS.WELLNESS, []);
  setLocalItem(STORAGE_KEYS.WELLNESS, allWellness.filter(w => w.userId !== userId));

  // Clear consent
  const allConsent = getLocalItem<ConsentRecord[]>(STORAGE_KEYS.CONSENT, []);
  setLocalItem(STORAGE_KEYS.CONSENT, allConsent.filter(c => c.userId !== userId));

  // Record audit of deletion
  await recordAuditEvent({
    action: 'USER_SELF_DATA_PURGED',
    resourceType: 'user_records',
    resourceId: userId,
    reason: 'Account and personal health data purged per user deletion right',
  });
}
