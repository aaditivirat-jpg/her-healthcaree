import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Stethoscope, 
  Apple, 
  Activity, 
  Moon, 
  FileQuestion,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PcosHubPage: React.FC = () => {
  const doctorQuestions = [
    'Which of the three Rotterdam criteria led to my specific PCOS diagnosis?',
    'Should we evaluate my fasting insulin, HbA1c, or glucose tolerance to check for insulin resistance?',
    'What are my options for cycle regulation if I am not currently trying to conceive vs. if I plan to in the future?',
    'Are my symptoms being compounded by thyroid issues, Vitamin D deficiency, or high prolactin?',
    'How often should we monitor my blood pressure, lipid profile, and endometrial lining thickness?'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-plum-900 to-rose-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-semibold backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clinical & Supportive Guide</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
          PCOS & PCOD Knowledge & Support Center
        </h1>
        <p className="text-sm sm:text-base text-rose-100/90 max-w-2xl leading-relaxed">
          Understanding Polycystic Ovary Syndrome with medical honesty, compassion, and practical lifestyle habits.
        </p>
      </div>

      {/* Critical Medical Boundaries Banner */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-xs text-rose-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
          <ShieldAlert className="w-5 h-5 text-rose-700" />
          <span>Essential Medical Principles on PCOS Care:</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-stone-700 leading-relaxed">
          <li><strong>No "Overnight Cure":</strong> PCOS is a chronic neuro-endocrine and metabolic condition. Beware of unregulated social media supplements or extreme cleanses promising permanent cures.</li>
          <li><strong>Diet is Supportive, Not a Sole Guarantee:</strong> While balanced eating and physical activity improve insulin sensitivity and well-being, lifestyle changes alone cannot guarantee regular periods for every individual. Medical therapy is a valid and often essential pillar.</li>
          <li><strong>Never Stop Prescribed Medicines:</strong> Always discuss any medication adjustments (such as metformin, thyroid pills, or oral contraceptives) directly with your prescribing physician.</li>
        </ul>
      </div>

      {/* Rotterdam Criteria Explanation */}
      <div className="bg-white rounded-3xl border border-ivory-200 p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-stone-900">
            What is PCOS? (and Why the Term PCOD is Used)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            In India and South Asia, the term <strong>PCOD (Polycystic Ovarian Disease)</strong> is widely used in conversation. However, international medical consensus (ACOG, ESHRE, ASRM) recognizes <strong>PCOS (Polycystic Ovary Syndrome)</strong> as the accurate clinical terminology because it is a systemic hormonal and metabolic syndrome affecting whole-body physiology, not merely an isolated ovarian disease.
          </p>
        </div>

        {/* 3 Rotterdam criteria cards */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            The Rotterdam Diagnostic Criteria (At least 2 of 3 required for diagnosis)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-ivory-50 p-5 rounded-2xl border border-ivory-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center justify-center">1</span>
              <h4 className="font-display text-sm font-bold text-stone-900">Ovulatory Dysfunction</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Irregular, delayed, or absent periods (oligomenorrhea or amenorrhea), indicating that ovulation is inconsistent or delayed.
              </p>
            </div>

            <div className="bg-ivory-50 p-5 rounded-2xl border border-ivory-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center justify-center">2</span>
              <h4 className="font-display text-sm font-bold text-stone-900">Hyperandrogenism</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clinical signs (cystic adult acne, excess facial/body hair, scalp thinning) or blood tests revealing elevated free/total testosterone or DHEA-S.
              </p>
            </div>

            <div className="bg-ivory-50 p-5 rounded-2xl border border-ivory-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center justify-center">3</span>
              <h4 className="font-display text-sm font-bold text-stone-900">Polycystic Ovaries on Scan</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pelvic ultrasound showing 20+ small follicles (2–9 mm) or increased ovarian volume (&gt;10 ml), often described as a 'string of pearls'.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Pillars of Evidence-Based Self Care */}
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-stone-900">
          Evidence-Informed Pillars of Sustainable Self-Care
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
              <Apple className="w-5 h-5" />
            </div>
            <h3 className="font-display text-sm font-bold text-stone-900">Glucose-Steady Nutrition</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Pair carbohydrates with protein and fiber (e.g. jowar or ragi with dal and greens). Avoid extreme starvation diets that spike stress cortisol.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-display text-sm font-bold text-stone-900">Consistent Movement</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Aim for 150 minutes of moderate activity weekly (brisk walking, swimming, light weights). Builds skeletal muscle insulin sensitivity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-plum-100 text-plum-700 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            <h3 className="font-display text-sm font-bold text-stone-900">Circadian Sleep Rest</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              7–8 hours of consistent night sleep. Sleep deprivation directly increases insulin resistance and elevates evening cortisol levels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="font-display text-sm font-bold text-stone-900">Clinical Partnership</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Work with a supportive gynaecologist or endocrinologist. Regular follow-ups prevent long-term metabolic or endometrial risks.
            </p>
          </div>

        </div>
      </div>

      {/* Doctor Checklist: Questions to bring to your consultation */}
      <div className="bg-ivory-100 rounded-3xl border border-ivory-300 p-8 space-y-4">
        <div className="flex items-center gap-2">
          <FileQuestion className="w-5 h-5 text-plum-700" />
          <h3 className="font-display text-lg font-bold text-stone-900">
            Questions to Ask Your Doctor During Your Appointment
          </h3>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          It is completely normal to feel overwhelmed during a doctor's consultation. Feel free to copy or screenshot these questions to bring along:
        </p>

        <div className="space-y-2.5 pt-2">
          {doctorQuestions.map((q, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-2xl border border-ivory-200 text-xs text-stone-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-plum-600 shrink-0 mt-0.5" />
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Link to nutrition page */}
      <div className="text-center pt-4">
        <Link
          to="/nutrition"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 text-white font-semibold text-xs sm:text-sm hover:bg-rose-700 shadow-sm shadow-rose-200"
        >
          <span>Explore Indian Nutrition & Meal Ideas for PCOS</span>
          <Apple className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
