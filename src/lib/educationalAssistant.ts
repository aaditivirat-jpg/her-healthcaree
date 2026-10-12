export interface AssistantResponse {
  answer: string;
  isEmergencyAlert: boolean;
  emergencyGuidance?: string;
  relatedCategory?: string;
  references: string[];
  disclaimer: string;
}

// Emergency red flag detector
const EMERGENCY_KEYWORDS = [
  'fainted', 'fainting', 'blacked out',
  'soaking pads', 'soaking two pads', 'hemorrhage', 'hemorrhaging',
  'severe sudden pain', 'worst pain of my life', 'unbearable agony',
  'pregnant and bleeding', 'miscarriage', 'ectopic',
  'fever and foul', 'toxic shock'
];

export function evaluateUserQuestion(question: string): AssistantResponse {
  const normalized = question.toLowerCase().trim();

  // 1. Red Flag Emergency Check
  const hasEmergency = EMERGENCY_KEYWORDS.some(kw => normalized.includes(kw));
  if (hasEmergency) {
    return {
      answer: `We detected symptoms that could indicate an urgent medical emergency. Please do not wait or rely on online answers.`,
      isEmergencyAlert: true,
      emergencyGuidance: `🚨 SEEK IMMEDIATE MEDICAL ATTENTION:
- If experiencing heavy flooding (soaking 2+ pads/tampons per hour), severe sudden abdominal pain, fainting, or acute symptoms during pregnancy, please proceed immediately to an emergency department or call 112 (National Emergency) or 1091 (Women Helpline).
- Have someone accompany you if feeling faint or lightheaded.`,
      references: [
        'ACOG Committee on Emergency Obstetric & Gynecologic Care',
        'National Health Mission (NHM) Emergency Triage Protocols'
      ],
      disclaimer: `HerHealth is strictly an educational system and cannot provide emergency diagnosis or clinical triage.`
    };
  }

  // 2. Specific Topic Matching based on vetted guidelines
  if (normalized.includes('pcos') || normalized.includes('pcod')) {
    return {
      answer: `Polycystic Ovary Syndrome (PCOS) is a common hormonal and metabolic condition characterized by irregular ovulation, androgen symptoms (like acne or hirsutism), and polycystic ovarian appearance on ultrasound.
      
Key evidence-informed approaches include:
1. **Nutrition:** Pairing fiber-rich whole grains (like millets) with protein (dal, sprouts, paneer) and healthy fats to stabilize insulin response.
2. **Physical Activity:** 150 minutes of weekly movement (brisk walking, strength training) improves muscle insulin sensitivity.
3. **Medical Assessment:** Clinicians may prescribe oral contraceptives to protect the endometrium or metformin for metabolic balance.
      
*Important Note:* PCOS cannot be cured overnight with diet alone; it requires consistent, supportive self-care alongside qualified medical guidance.`,
      isEmergencyAlert: false,
      relatedCategory: 'PCOS & PCOD',
      references: [
        'International Evidence-based Guideline for PCOS 2023',
        'Indian Council of Medical Research (ICMR) Consensus Guidelines'
      ],
      disclaimer: `Educational information only. Please consult a gynaecologist or endocrinologist for personalized diagnostic evaluation.`
    };
  }

  if (normalized.includes('cramp') || normalized.includes('pain') || normalized.includes('dysmenorrhea')) {
    return {
      answer: `Menstrual cramps (dysmenorrhea) are caused by prostaglandins prompting the uterine muscles to contract.
      
Evidence-informed self-care strategies:
1. **Continuous Local Heat:** Applying a heating pad or hot water bottle to the lower abdomen has been proven in clinical trials to be as effective as standard OTC painkillers.
2. **Anti-inflammatory Support:** Over-the-counter NSAIDs (like mefenamic acid or ibuprofen) taken right as bleeding begins block excess prostaglandin synthesis.
3. **Gentle Movement:** Restorative yoga poses (such as child's pose) and warm chamomile or ginger tea help relax pelvic tension.
      
*When to see a doctor:* Cramping so severe that it prevents daily activities or does not respond to painkillers could indicate endometriosis or adenomyosis and should be assessed by a clinician.`,
      isEmergencyAlert: false,
      relatedCategory: 'Menstrual Pain & Cramps',
      references: [
        'American College of Obstetricians and Gynecologists (ACOG) Dysmenorrhea Practice Bulletin',
        'World Endometriosis Society Guidelines'
      ],
      disclaimer: `Not clinical advice. Persistent or debilitating pain requires a specialist gynaecological evaluation.`
    };
  }

  if (normalized.includes('iron') || normalized.includes('anemia') || normalized.includes('anaemia') || normalized.includes('fatigue')) {
    return {
      answer: `Monthly blood loss places menstruating women at elevated risk for iron deficiency anaemia, leading to fatigue, dizziness, and pale skin.
      
Key nutritional and medical principles:
1. **Dietary Iron:** Eat dark leafy greens (spinach, moringa), black chickpeas (kala chana), jaggery, and lentils.
2. **Vitamin C Synergy:** Plant iron is better absorbed when paired with Vitamin C (lemon juice, amla, tomatoes).
3. **Avoid Inhibitors:** Avoid tea or coffee within 1 hour of meals, as tannins hinder iron uptake.
      
*Medical caution:* Do not take therapeutic iron supplements without a confirmed Serum Ferritin and Hemoglobin blood test.`,
      isEmergencyAlert: false,
      relatedCategory: 'Anaemia & Iron Deficiency',
      references: [
        'National Institute of Nutrition (ICMR-NIN) 2024 Guidelines',
        'WHO Daily Iron Supplementation Guidance'
      ],
      disclaimer: `Blood testing through a qualified healthcare provider is necessary before beginning any high-dose iron therapy.`
    };
  }

  if (normalized.includes('late') || normalized.includes('delayed') || normalized.includes('irregular') || normalized.includes('missed')) {
    return {
      answer: `Occasional cycle variation of a few days is very common and can occur due to acute stress, sleep disruption, travel, or mild illnesses.
      
Potential clinical contributors:
1. **Hypothalamic Stress Response:** Elevated cortisol delays the LH surge required for ovulation.
2. **Endocrine Conditions:** PCOS, thyroid dysfunctions (TSH imbalance), or elevated prolactin.
3. **Pregnancy:** If sexually active, a home urine pregnancy test is the recommended first step.
      
If your period is missed for more than 3 consecutive months or cycles are consistently longer than 38 days, please schedule a visit with a gynaecologist.`,
      isEmergencyAlert: false,
      relatedCategory: 'Irregular & Delayed Periods',
      references: [
        'ACOG Menstrual Disorders in Reproductive-Aged Women',
        'NICE Clinical Guidance on Irregular Bleeding'
      ],
      disclaimer: `Cycle variations require medical history and hormone testing for precise diagnosis.`
    };
  }

  // General helpful response
  return {
    answer: `Thank you for your question. Maintaining menstrual and hormonal wellness involves a balance of regular sleep, stress management, nutrient-dense nutrition (millets, proteins, seasonal greens), and consistent cycle tracking.
    
For detailed, evidence-informed guidance on your specific concern, please explore our curated Health Education Library or speak directly with a healthcare provider.`,
    isEmergencyAlert: false,
    relatedCategory: 'Menstrual Cycle Basics',
    references: [
      'ACOG Well-Woman Care Clinical Recommendations',
      'National Institute of Nutrition (ICMR-NIN)'
    ],
    disclaimer: `I am an educational AI assistant and not a medical doctor. I do not provide clinical diagnosis, prescriptions, or treatment plans.`
  };
}
