# HerHealth — Women's Healthcare, Menstrual Wellness & Health Awareness Platform

HerHealth is a production-grade, secure, database-driven web application for women's healthcare, menstrual cycle tracking, and evidence-informed health education.

---

## 🌟 Key Features

1. **Menstrual Cycle Tracker & Calendar**
   - Log period start dates, optional end dates, flow volume (`spotting`, `light`, `medium`, `heavy`, `very_heavy`), and 12+ symptoms.
   - Interactive monthly calendar with recorded bleeding spans and estimated next period windows.
   - Cycle length calculation between consecutive start dates with rolling averages and regularity detection.
   - Transparent clinical uncertainty notices explaining that predictions are mathematical estimates, never diagnostic guarantees.

2. **Personal Health Records ("My Records")**
   - Searchable, filterable, chronological table of all personal cycle records.
   - In-place editing and deletion with double-confirmation dialogs.
   - Data portability: Instant **CSV Export**, full **JSON Backup Archive**, and **Printable Doctor Report**.

3. **PCOS & PCOD Knowledge & Support Center**
   - In-depth guide explaining the difference between conversational PCOD and clinical PCOS terminology.
   - Complete breakdown of Rotterdam Diagnostic Criteria.
   - Insulin-sensitizing lifestyle guidance, sleep hygiene, and gentle movement.
   - Curated list of questions to bring to a doctor's consultation.

4. **Familiar Indian Whole Foods & Nutrition Module**
   - Highlights familiar Indian staples: Millets (Ragi, Jowar), Drumstick leaves (Moringa), Kala Chana, Sprouted Moong, Amla, and Sattu.
   - Balanced Plate architecture (50% vegetables, 25% protein, 25% millets).
   - Practical meal ideas for Breakfast, Lunch, Snacks, and Dinner with dietary tags (Vegetarian, Vegan, Gluten-Free).

5. **Evidence-Informed Health Education Library**
   - 14 comprehensive categories (Menstrual basics, PCOS, dysmenorrhea, anaemia, thyroid, UTIs, hygiene, nutrition, exercise, sleep, screenings, myths, and doctor red flags).
   - Clinically reviewed summaries, warning signs, and citations from ACOG, WHO, ICMR, and NHS.

6. **Ask HerHealth Educational Assistant**
   - Carefully controlled educational Q&A system.
   - Automated emergency red-flag detection (acute pain, fainting, extreme hemorrhage) triggering immediate urgent care guidance (112, 1091).
   - Strict medical disclaimer: Not a substitute for a licensed physician.

7. **Daily Self-Care & Habit Journey**
   - Supportive daily checklist for balanced meals, hydration, physical movement, rest, and body listening.
   - Supportive, non-judgmental philosophy (unmarked items are never treated as failure).

8. **Privacy, Consent & Security (DPDP Aligned)**
   - Row-Level Security (RLS) enforcement at the PostgreSQL database level (`auth.uid() = user_id`).
   - Granular consent management for storage, reminders, and assistant features.
   - Self-service account deletion and complete personal data erasure.
   - Zero third-party ad tracking or health data brokering.

9. **Role-Based Administration Portal**
   - Least-privilege administrative access: Administrators manage content publication, review consent and data deletion requests, and monitor audit trails.
   - Strict restriction: Administrators cannot access individual patient medical notes or symptom histories without audited justification.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript (Strict), Vite, Tailwind CSS, Lucide Icons, Recharts, Date-fns
- **Backend & Database:** Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS), SQL Migrations
- **Testing:** Vitest (unit testing & security tenant isolation verification)
- **Local Fallback:** Isolated browser storage engine ensuring full out-of-the-box functionality in offline/evaluation environments.

---

## 🚀 Quick Start & Local Development

### 1. Prerequisites
- Node.js (v18+)
- npm (v9+)

### 2. Installation
```bash
# Navigate to project directory
cd herhealth

# Install dependencies
npm install
```

### 3. Environment Configuration
Copy the template configuration:
```bash
cp .env.example .env
```
Fill in your Supabase credentials (optional for local standalone mode):
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
*Note: If left blank, HerHealth automatically runs in an isolated local storage mode with full interactive features and sample records.*

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 5. Instant Test Logins
- **Registered Member:** `user@herhealth.org` (One-click login button available on login page)
- **Platform Administrator:** `admin@herhealth.org` (One-click login button available on login page)
- Or create a new free account on the Register page.

---

## 🧪 Testing & Verification

Run the automated test suite:
```bash
npm test
```
The suite verifies:
- Start date validation and future date rejection
- Duration validation (flagging bleeds >20 days)
- Cycle length calculations and regularity detection
- Mathematical prediction safety and uncertainty disclaimers
- Multi-tenant database isolation (User A cannot view, edit, or delete User B's records)
- Complete user data purging on deletion request

Run the production build:
```bash
npm run build
```

---

## 🗄️ Database Schema & Migrations

The full PostgreSQL migration file is located at:
`supabase/migrations/20260401000000_herhealth_schema_and_rls.sql`

Entities:
- `public.profiles`
- `public.period_records`
- `public.symptom_entries`
- `public.wellness_entries`
- `public.consent_records`
- `public.health_articles`
- `public.audit_events`
- `public.data_requests`

Every table has `ROW LEVEL SECURITY` enabled with policies enforcing `auth.uid() = user_id`.

---

## ⚖️ Medical Disclaimer
HerHealth provides educational wellness and cycle tracking tools. It does not provide medical diagnosis, clinical treatment plans, or emergency triage. For emergency health concerns, call 112 (National Emergency), 1091 (Women Helpline), or visit your nearest medical facility.
