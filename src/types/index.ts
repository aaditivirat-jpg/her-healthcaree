export type UserRole = 'registered_user' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  timezone: string;
  role: UserRole;
  createdAt: string;
}

export type FlowLevel = 'spotting' | 'light' | 'medium' | 'heavy' | 'very_heavy';

export type SymptomType = 
  | 'cramps'
  | 'headache'
  | 'bloating'
  | 'fatigue'
  | 'mood_changes'
  | 'acne'
  | 'breast_tenderness'
  | 'heavy_bleeding'
  | 'nausea'
  | 'lower_back_pain'
  | 'insomnia'
  | 'cravings';

export type SymptomSeverity = 'mild' | 'moderate' | 'severe';

export interface SymptomEntry {
  id: string;
  periodRecordId?: string;
  userId: string;
  symptomType: SymptomType;
  severity: SymptomSeverity;
  entryDate: string; // YYYY-MM-DD
  notes?: string;
  createdAt: string;
}

export interface PeriodRecord {
  id: string;
  userId: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  flow?: FlowLevel;
  symptoms: SymptomType[];
  notes?: string;
  cycleLength?: number; // Calculated relative to previous period start
  periodDuration?: number; // Days between start and end
  createdAt: string;
  updatedAt: string;
}

export interface CycleStats {
  averageCycleLength: number;
  averagePeriodDuration: number;
  lastPeriodStartDate: string | null;
  lastPeriodEndDate: string | null;
  nextEstimatedPeriodDate: string | null;
  daysUntilNextPeriod: number | null;
  isRegular: boolean;
  totalRecordedCycles: number;
  uncertaintyNotice: string;
}

export type HabitType = 
  | 'balanced_meals'
  | 'hydration'
  | 'physical_activity'
  | 'sleep_routine'
  | 'relaxation_stress'
  | 'symptom_awareness';

export interface WellnessEntry {
  id: string;
  userId: string;
  entryDate: string; // YYYY-MM-DD
  habitType: HabitType;
  completionStatus: boolean;
  notes?: string;
  createdAt: string;
}

export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  category: 
    | 'Menstrual Cycle Basics'
    | 'PCOS & PCOD'
    | 'Irregular & Delayed Periods'
    | 'Menstrual Pain & Cramps'
    | 'Anaemia & Iron Deficiency'
    | 'Thyroid Health'
    | 'Urinary Tract Infections'
    | 'Menstrual Hygiene'
    | 'Nutrition & Healthy Food'
    | 'Physical Activity'
    | 'Sleep & Stress Management'
    | 'Preventive Healthcare'
    | 'Myths & Facts'
    | 'When to See a Doctor';
  summary: string;
  content: string; // Markdown or rich content
  symptoms?: string[];
  possibleCauses?: string[];
  selfCareTips?: string[];
  clinicalEvaluation?: string[];
  medicalTreatments?: string[];
  warningSigns?: string[];
  references: string[];
  reviewerName?: string;
  reviewerTitle?: string;
  reviewedAt?: string;
  publicationStatus: 'draft' | 'published' | 'archived';
  readTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConsentRecord {
  id: string;
  userId: string;
  consentType: 'health_data_storage' | 'wellness_reminders' | 'educational_assistant' | 'anonymized_analytics';
  policyVersion: string;
  grantedAt: string;
  revokedAt?: string | null;
}

export interface AuditEvent {
  id: string;
  actorUserId?: string;
  actorEmail?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  reason?: string;
  timestamp: string;
}

export interface DataRequest {
  id: string;
  userId: string;
  userEmail: string;
  requestType: 'export' | 'deletion';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  requestedAt: string;
  processedAt?: string;
  notes?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  regionalName?: string;
  category: 'vegetable' | 'fruit' | 'grain' | 'dal_protein' | 'dairy_substitute' | 'nuts_seeds';
  nutrientFocus: ('iron' | 'calcium' | 'vitamin_c' | 'fiber' | 'protein' | 'healthy_fats' | 'zinc')[];
  benefits: string;
  servingIdea: string;
  dietarySuitability: ('vegetarian' | 'vegan' | 'gluten_free')[];
}
