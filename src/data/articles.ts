import { HealthArticle } from '../types';

export const initialHealthArticles: HealthArticle[] = [
  {
    id: 'art_1',
    slug: 'menstrual-cycle-basics',
    title: 'Understanding Your Menstrual Cycle: Phases, Hormones & Changes',
    category: 'Menstrual Cycle Basics',
    summary: 'A clear guide to what happens in your body throughout the four menstrual phases: menstruation, follicular, ovulation, and luteal.',
    content: `
The menstrual cycle is a monthly sequence of hormonal events coordinated by the hypothalamus, pituitary gland, and ovaries. Understanding these phases helps demystify physical and emotional shifts.

### The Four Phases of the Cycle:
1. **Menstruation (Days 1–5 to 7):**
The shedding of the thickened uterine lining (endometrium) when pregnancy has not occurred. Estrogen and progesterone levels are at their lowest baseline.

2. **Follicular Phase (Days 1–13):**
Follicle-stimulating hormone (FSH) prompts the ovaries to mature ovarian follicles. Estrogen progressively rises, rebuilding the uterine lining and often enhancing energy.

3. **Ovulation (Approx. Day 14 in a 28-day cycle):**
A surge in luteinizing hormone (LH) triggers the release of a mature egg from the dominant follicle into the fallopian tube. Some women notice clear, slippery cervical mucus or mild lower pelvic twinges.

4. **Luteal Phase (Days 15–28):**
The ruptured follicle transforms into the corpus luteum, producing progesterone. Progesterone supports the uterine lining. If fertilization does not happen, the corpus luteum regresses, hormone levels fall, and the next cycle begins.

### Why Individual Variation is Normal
A healthy menstrual cycle typically ranges between **21 and 35 days**, with bleeding lasting between **2 and 7 days**. Slight variations caused by stress, travel, mild illness, or sleep changes are common.
    `,
    symptoms: ['Mild lower abdominal cramping', 'Breast sensitivity', 'Subtle shifts in energy and mood', 'Changes in cervical fluid'],
    possibleCauses: ['Natural hormonal fluctuations', 'Hormonal axis maturation in adolescence', 'Perimenopausal transitions'],
    selfCareTips: [
      'Track your period dates and symptoms consistently to understand personal patterns.',
      'Stay well-hydrated and maintain balanced meals rich in complex carbs and magnesium.',
      'Gentle walking, yoga, and warm compresses can ease pelvic discomfort.'
    ],
    clinicalEvaluation: [
      'Comprehensive menstrual history (length, flow volume, frequency).',
      'Pelvic ultrasound to inspect uterine and ovarian anatomy if abnormalities occur.',
      'Hormone panels (FSH, LH, Estradiol, Prolactin, Thyroid hormones).'
    ],
    medicalTreatments: [
      'Individualized depending on findings (e.g. cycle regulation with progestins or combined oral contraceptives when clinically indicated).',
      'Non-steroidal anti-inflammatory medications (NSAIDs) for discomfort.'
    ],
    warningSigns: [
      'Soaking through two or more heavy pads/tampons per hour for two consecutive hours.',
      'Bleeding lasting longer than 7 to 8 days.',
      'Cycle intervals shorter than 21 days or longer than 38 days consistently.',
      'Severe pelvic pain that interferes with basic daily activities.'
    ],
    references: [
      'American College of Obstetricians and Gynecologists (ACOG). Practice Bulletin No. 136: Menstrual Disorders in Adolescents.',
      'World Health Organization (WHO). Women’s health and hormonal physiology guidelines.',
      'The Endocrine Society. Clinical Guidelines on Hypothalamic-Pituitary-Ovarian Axis.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-01-15',
    publicationStatus: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'art_2',
    slug: 'pcos-pcod-complete-guide',
    title: 'PCOS & PCOD: Evidence-Informed Guide to Symptoms, Care & Management',
    category: 'PCOS & PCOD',
    summary: 'A supportive, clinically grounded overview of Polycystic Ovary Syndrome (PCOS) and PCOD, exploring root mechanisms, lifestyle habits, and doctor evaluations.',
    content: `
Polycystic Ovary Syndrome (PCOS) is one of the most common endocrine and metabolic conditions, affecting approximately 8–13% of women of reproductive age worldwide. In India and South Asia, the term **PCOD (Polycystic Ovarian Disease)** is often used conversationally, but medical consensus recognizes **PCOS** as the standardized clinical term.

### Rotterdam Diagnostic Criteria
Clinicians diagnose PCOS based on the presence of at least two of the following three features:
1. **Irregular or absent ovulation:** manifested as delayed periods, skipped cycles, or oligomenorrhea.
2. **Clinical or biochemical hyperandrogenism:** signs such as acne, hirsutism (excess facial or body hair), or elevated circulating testosterone levels.
3. **Polycystic ovarian morphology:** characteristic follicle distribution seen on a pelvic ultrasound (often described as a 'string of pearls').

### What Causes PCOS?
PCOS is a multifactorial condition influenced by genetics, neuroendocrine signalling, and insulin resistance. High circulating insulin can stimulate the ovaries to produce excess androgens and disrupt predictable ovulation.

### Important Medical Clarifications:
- **PCOS is not a personal failure:** It is a biological endocrine condition, not the result of lack of willpower.
- **There is no overnight cure:** Beware of extreme diets or herbal remedies promising permanent 'cures'. Management focuses on symptom relief, metabolic balance, and fertility support where desired.
- **Periods cannot be guaranteed regular by diet alone:** While balanced eating and physical activity are foundational pillars, medical therapy is often an essential and valid part of care.
    `,
    symptoms: ['Irregular or missing periods', 'Excess hair growth on face, chest or abdomen', 'Adult cystic acne', 'Scalp hair thinning', 'Difficulty with weight management'],
    possibleCauses: ['Genetic predisposition', 'Insulin resistance and hyperinsulinemia', 'Chronic low-grade inflammation', 'Imbalanced LH/FSH ratios'],
    selfCareTips: [
      'Focus on balanced meals pairing complex fiber-rich carbohydrates with proteins and healthy fats to stabilize insulin.',
      'Incorporate consistent movement: 150 minutes of moderate activity weekly (brisk walking, swimming, resistance exercises).',
      'Prioritize 7-8 hours of sound sleep; chronic sleep deprivation increases cortisol and insulin resistance.',
      'Avoid crash diets or severe caloric restriction which can increase metabolic stress.'
    ],
    clinicalEvaluation: [
      'Fasting glucose and insulin / Oral Glucose Tolerance Test (OGTT).',
      'Total & Free Testosterone, DHEA-S, and Sex Hormone Binding Globulin (SHBG).',
      'Serum LH, FSH, Prolactin, and Thyroid Stimulating Hormone (TSH) to rule out other causes.',
      'Pelvic ultrasound examination.'
    ],
    medicalTreatments: [
      'Combined oral contraceptive pills to regulate cycles, reduce acne, and protect endometrial lining.',
      'Metformin or insulin-sensitizing agents when insulin resistance is identified.',
      'Anti-androgenic medications (e.g. spironolactone) under close clinical supervision.',
      'Ovulation induction therapies (e.g. letrozole) for individuals actively planning pregnancy.'
    ],
    warningSigns: [
      'Absence of menstrual bleeding for more than 90 consecutive days (amenorrhea).',
      'Episodes of sudden, uncontrollable, extremely heavy bleeding.',
      'Symptoms of metabolic concerns (intense fatigue, excessive thirst, darkening skin in body folds).'
    ],
    references: [
      'International Evidence-based Guideline for the Assessment and Management of Polycystic Ovary Syndrome (PCOS) 2023.',
      'Monash University, CREPCOS, and ASRM Joint Consensus on PCOS Care.',
      'Indian Council of Medical Research (ICMR). Guidelines on Management of PCOS.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-01',
    publicationStatus: 'published',
    readTimeMinutes: 7,
    createdAt: '2026-01-12T09:00:00Z',
    updatedAt: '2026-02-01T11:00:00Z',
  },
  {
    id: 'art_3',
    slug: 'irregular-and-delayed-periods',
    title: 'Irregular or Delayed Periods: Causes, What to Note & Doctor Assessment',
    category: 'Irregular & Delayed Periods',
    summary: 'When is a late period normal, and when does it point to hormonal shifts, thyroid imbalance, or lifestyle factors? Here is what to track.',
    content: `
A menstrual cycle is generally counted from the first day of one bleed to the first day of the next bleed. An occasional delay of a few days is very common, but persistent irregularity warrants medical evaluation.

### Common Contributors to Irregular Cycles:
- **Acute or chronic stress:** Elevated cortisol suppresses GnRH release, delaying ovulation.
- **Substantial weight changes or extreme exercise:** Insufficient energy availability (Relative Energy Deficiency in Sport or RED-S).
- **Hormonal conditions:** PCOS, thyroid dysfunctions (hypothyroidism or hyperthyroidism), and hyperprolactinemia.
- **Medication side effects:** Emergency contraception, certain antidepressants, or hormonal treatments.
- **Life stage transitions:** The first 2–3 years after menarche and the perimenopause transition are naturally irregular.
    `,
    symptoms: ['Cycle lengths shorter than 21 days or longer than 38 days', 'Unpredictable spotting between cycles', 'Varying flow from very light to extremely heavy'],
    possibleCauses: ['Anovulatory cycles', 'High stress and hypothalamic suppression', 'Thyroid disorders', 'PCOS', 'Pregnancy'],
    selfCareTips: [
      'Keep a detailed cycle log noting start dates, flow, and symptoms.',
      'Evaluate recent changes in sleep, work stress, travel, or nutritional intake.',
      'Practice restorative stress management techniques.'
    ],
    clinicalEvaluation: [
      'Urine or serum beta-hCG (pregnancy test) if sexually active.',
      'Serum TSH and Free T4.',
      'Serum Prolactin and total Testosterone.',
      'Transvaginal or pelvic ultrasound.'
    ],
    medicalTreatments: [
      'Treatment strictly depends on identifying the root underlying cause.',
      'Cyclical progestogen therapy to induce withdrawal bleeds if endometrium is prolonged.',
      'Correction of thyroid dysfunction or hyperprolactinemia if present.'
    ],
    warningSigns: [
      'Period missing for 3 or more consecutive cycles with negative pregnancy tests.',
      'Unexplained weight loss or excessive hair loss.',
      'Pelvic pain accompanied by fever or foul-smelling discharge.'
    ],
    references: [
      'ACOG Committee Opinion No. 651: Menstruation in Girls and Adolescents.',
      'NICE Clinical Guidelines: Heavy and Irregular Menstrual Bleeding Assessment.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-01-20',
    publicationStatus: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-01-14T08:00:00Z',
    updatedAt: '2026-01-20T08:00:00Z',
  },
  {
    id: 'art_4',
    slug: 'menstrual-pain-cramps-dysmenorrhea',
    title: 'Managing Menstrual Cramps (Dysmenorrhea): Primary vs. Secondary Causes',
    category: 'Menstrual Pain & Cramps',
    summary: 'Differentiating normal prostaglandin cramping from conditions like endometriosis, and safe evidence-based relief strategies.',
    content: `
Menstrual pain (dysmenorrhea) is experienced by up to 80% of women at some point in their lives. However, pain so severe that it forces you to cancel school, college, or work is **not** something you simply have to endure in silence.

### Primary vs. Secondary Dysmenorrhea:
- **Primary Dysmenorrhea:** Cramping caused by prostaglandins produced by the endometrium as it breaks down. Prostaglandins cause uterine muscles to contract. It typically starts 1–2 days before or with bleeding and subsides in 48–72 hours.
- **Secondary Dysmenorrhea:** Pain arising from underlying structural or medical conditions, such as **endometriosis**, **adenomyosis**, **uterine fibroids**, or pelvic inflammatory disease. The pain often starts earlier in the cycle, lasts longer, and may worsen over time.
    `,
    symptoms: ['Aching or cramping lower abdominal pain', 'Pain radiating to lower back or inner thighs', 'Nausea, dizziness or loose stools during peak cramps'],
    possibleCauses: ['Elevated prostaglandin F2alpha production', 'Endometriosis', 'Adenomyosis', 'Uterine fibroids'],
    selfCareTips: [
      'Apply a warm heating pad (approx. 40°C) to the lower abdomen; research shows heat is as effective as OTC analgesics.',
      'Low-impact movement and stretches like child’s pose or cat-cow can relieve pelvic muscle tension.',
      'Consider ginger or chamomile tea, known for mild anti-inflammatory properties.'
    ],
    clinicalEvaluation: [
      'Detailed pain timeline and response to over-the-counter painkillers.',
      'Pelvic examination and high-resolution transvaginal ultrasound.',
      'MRI or diagnostic laparoscopy if deep infiltrating endometriosis is suspected.'
    ],
    medicalTreatments: [
      'Prostaglandin synthetase inhibitors (e.g. Mefenamic acid or Ibuprofen) initiated at the very onset of flow.',
      'Hormonal suppression (continuous combined oral contraceptives, levonorgestrel IUD) to reduce endometrial proliferation.',
      'Surgical intervention when anatomical lesions or endometriomas are identified.'
    ],
    warningSigns: [
      'Pain that does not respond to standard pain relief medications.',
      'Pain with urination, bowel movements, or sexual intercourse.',
      'Sudden onset of severe, one-sided pelvic pain (may indicate ovarian torsion or ruptured cyst).'
    ],
    references: [
      'ACOG Practice Bulletin No. 206: Chronic Pelvic Pain.',
      'World Endometriosis Society consensus guidelines on dysmenorrhea.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-05',
    publicationStatus: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-01-16T08:00:00Z',
    updatedAt: '2026-02-05T08:00:00Z',
  },
  {
    id: 'art_5',
    slug: 'anaemia-iron-deficiency-in-women',
    title: 'Anaemia & Iron Deficiency: Symptoms, Laboratory Tests & Dietary Support',
    category: 'Anaemia & Iron Deficiency',
    summary: 'Why monthly blood loss puts women at high risk for iron deficiency anaemia, how to interpret ferritin tests, and dietary essentials.',
    content: `
Iron deficiency anaemia is one of the most widespread nutritional health challenges among girls and women in India, affecting over 50% according to national health surveys. Each menstrual cycle results in iron loss; if intake or absorption does not replace it, ferritin (iron stores) becomes depleted.

### Symptoms of Iron Deficiency:
- Persistent, unexplained fatigue and low stamina.
- Paleness of inner eyelids, lips, or nail beds.
- Cold extremities (hands and feet).
- Shortness of breath when climbing stairs.
- Brittle nails or hair fall.

### Crucial Medical Notice on Iron Supplements:
Do not take high-dose oral iron supplements without a formal blood test. Excess iron can be toxic and cause serious gastrointestinal distress. Always confirm your status with a clinician.
    `,
    symptoms: ['Extreme fatigue', 'Brain fog', 'Dizziness on standing', 'Pale skin', 'Pica (craving ice or non-food items)'],
    possibleCauses: ['Heavy menstrual bleeding (menorrhagia)', 'Inadequate dietary bioavailable iron', 'Poor gut absorption (e.g. celiac disease)', 'High intake of iron absorption inhibitors like strong tea with meals'],
    selfCareTips: [
      'Consume iron-rich Indian foods: spinach (palak), fenugreek (methi), drumstick leaves (moringa), black chickpeas (kala chana), jaggery, and sesame seeds.',
      'Pair plant-based (non-heme) iron foods with Vitamin C (lemon juice, amla, guava) to increase absorption by up to 300%.',
      'Avoid drinking strong tea or coffee within one hour before or after your iron-rich meals, as tannins block absorption.'
    ],
    clinicalEvaluation: [
      'Complete Blood Count (CBC): evaluating Hemoglobin, Hematocrit, MCV, and MCH.',
      'Serum Ferritin: the most sensitive marker of total body iron reserves.',
      'Transferrin Saturation and Total Iron Binding Capacity (TIBC).'
    ],
    medicalTreatments: [
      'Targeted oral iron formulations (ferrous ascorbate, ferric carboxymaltose) prescribed at appropriate doses.',
      'Intravenous (IV) iron infusion for severe anaemia or intolerance to oral pills.',
      'Gynaecological treatment of underlying heavy menstrual bleeding.'
    ],
    warningSigns: [
      'Chest pain, rapid palpitations, or severe breathlessness.',
      'Fainting spells (syncope).',
      'Hemoglobin levels dropping below 8 g/dL.'
    ],
    references: [
      'Indian Council of Medical Research (ICMR) Anaemia Mukt Bharat Clinical Guidelines.',
      'World Health Organization (WHO). Guideline: Daily iron supplementation in adult women and adolescent girls.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-10',
    publicationStatus: 'published',
    readTimeMinutes: 6,
    createdAt: '2026-01-18T08:00:00Z',
    updatedAt: '2026-02-10T08:00:00Z',
  },
  {
    id: 'art_6',
    slug: 'thyroid-health-and-menstrual-cycles',
    title: 'Thyroid Health & Menstrual Wellness: Hypothyroidism vs. Hyperthyroidism',
    category: 'Thyroid Health',
    summary: 'How the thyroid gland regulates your metabolism, ovaries, and cycle rhythm, and which tests give accurate answers.',
    content: `
The thyroid gland, located at the base of your neck, produces hormones (T3 and T4) that govern metabolic rate throughout every cell, including the ovaries. Thyroid disorders are 5 to 8 times more common in women than men.

### Hypothyroidism (Underactive Thyroid):
- Slows cellular metabolism.
- Leads to heavy, prolonged periods (menorrhagia), fatigue, constipation, cold intolerance, and weight gain.
- Can impair ovulation and elevate prolactin levels.

### Hyperthyroidism (Overactive Thyroid):
- Accelerates metabolism.
- Leads to sparse, very light, or absent periods (oligomenorrhea), rapid heartbeat, heat intolerance, and anxiety.
    `,
    symptoms: ['Unexplained weight changes', 'Chronic lethargy or insomnia', 'Dry skin and brittle hair', 'Swelling in the lower neck', 'Cycle irregularities'],
    possibleCauses: ['Hashimoto’s thyroiditis (autoimmune)', 'Graves’ disease', 'Nutritional iodine or selenium imbalances'],
    selfCareTips: [
      'Prioritize balanced, nutrient-dense whole foods containing selenium (brazil nuts, eggs) and zinc.',
      'Manage stress actively, as chronic stress impacts the hypothalamic-pituitary-thyroid (HPT) axis.',
      'Never alter thyroid medication dosages without your doctor’s follow-up blood tests.'
    ],
    clinicalEvaluation: [
      'Serum TSH (Thyroid Stimulating Hormone) — first-line screening.',
      'Free T3 and Free T4.',
      'Anti-TPO (Thyroid Peroxidase Antibodies) to test for autoimmune thyroid disease.',
      'Thyroid ultrasound if nodules or enlargement are palpable.'
    ],
    medicalTreatments: [
      'Levothyroxine sodium replacement therapy for hypothyroidism.',
      'Antithyroid medications (e.g. methimazole) or beta-blockers for hyperthyroidism under an endocrinologist.'
    ],
    warningSigns: [
      'Sudden rapid irregular heartbeat (arrhythmia).',
      'Rapid severe swelling in neck creating difficulty swallowing or breathing.'
    ],
    references: [
      'American Thyroid Association (ATA) Guidelines for the Treatment of Hypothyroidism.',
      'The Endocrine Society Clinical Practice Guidelines on Thyroid and Reproductive Health.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-12',
    publicationStatus: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-02-12T08:00:00Z',
  },
  {
    id: 'art_7',
    slug: 'urinary-tract-infections-prevention',
    title: 'Urinary Tract Infections (UTIs): Symptoms, Hygiene & Treatment',
    category: 'Urinary Tract Infections',
    summary: 'Recognizing burning urination, pelvic pressure, and preventing recurrent infections with evidence-based habits.',
    content: `
Urinary Tract Infections (UTIs) are bacterial infections occurring in the urinary system, usually caused by uropathogenic Escherichia coli (E. coli). Because women have a shorter urethra situated closer to the anus, bacteria can enter the bladder more easily.

### Typical Symptoms:
- Burning sensation or sharp stinging when urinating (dysuria).
- An intense, frequent urge to urinate, even when passing only small drops.
- Cloudy, dark, or strong-smelling urine.
- A feeling of pressure or cramping in the lower pelvic region.
    `,
    symptoms: ['Dysuria (burning urination)', 'Frequent urge to urinate', 'Suprapubic discomfort', 'Cloudy or pink-tinged urine'],
    possibleCauses: ['Bacterial migration from perineum to urethra', 'Dehydration', 'Holding urine for long periods', 'Post-coital bacterial introduction'],
    selfCareTips: [
      'Drink plenty of plain water daily (2 to 2.5 litres) to flush bacteria through the urinary tract.',
      'Always wipe from front to back after using the toilet to avoid bringing bacteria forward.',
      'Urinate promptly after sexual intercourse.',
      'Avoid harsh perfumed soaps, vaginal douching, or synthetic non-breathable undergarments.'
    ],
    clinicalEvaluation: [
      'Urinalysis (dipstick test checking for nitrites and leukocyte esterase).',
      'Urine culture and antimicrobial sensitivity testing (essential for recurrent cases).'
    ],
    medicalTreatments: [
      'Appropriate course of targeted oral antibiotics prescribed by a physician.',
      'Urinary alkalinizers or analgesics for symptom comfort while antibiotics take effect.'
    ],
    warningSigns: [
      'High fever, chills, or shaking.',
      'Flank pain or pain in the mid-to-upper back (indicating upper tract kidney infection / pyelonephritis).',
      'Nausea and vomiting accompanied by painful urination.'
    ],
    references: [
      'European Association of Urology (EAU) Guidelines on Urological Infections.',
      'Centers for Disease Control and Prevention (CDC). Urinary Tract Infection Clinical Information.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-15',
    publicationStatus: 'published',
    readTimeMinutes: 4,
    createdAt: '2026-01-22T08:00:00Z',
    updatedAt: '2026-02-15T08:00:00Z',
  },
  {
    id: 'art_8',
    slug: 'menstrual-hygiene-best-practices',
    title: 'Safe Menstrual Hygiene: Products, Cleaning & Disposal Guide',
    category: 'Menstrual Hygiene',
    summary: 'A factual guide to sanitary pads, menstrual cups, period underwear, and keeping yourself comfortable and infection-free.',
    content: `
Menstrual hygiene is essential for comfort, dignity, and reproductive tract health. Poor menstrual hygiene increases the risk of fungal infections, bacterial vaginosis, and skin rashes.

### Choosing Your Product:
1. **Sanitary Pads:** Change every 4 to 6 hours, regardless of how light the flow appears, to prevent bacterial multiplication and odour.
2. **Menstrual Cups (Medical-grade silicone):** Reusable for years, eco-friendly, and safe for up to 8–10 hours depending on flow. Boil in water for 5–7 minutes before each cycle.
3. **Period Underwear & Reusable Cloth Pads:** Eco-friendly alternatives; wash thoroughly with soap and dry under direct sunlight (a natural disinfectant).

### Vaginal Cleansing: The Self-Cleaning Organ
The vagina is self-cleaning, maintained by beneficial Lactobacillus bacteria producing lactic acid (pH 3.8–4.5). **Never douche or use fragrant soaps inside the vagina.** Clean only the outer vulva using plain warm water.
    `,
    symptoms: ['Vulval itching', 'Unusual grey, green, or cottage-cheese-like discharge', 'Foul fishy odour', 'Rashes or friction burns from sanitary pads'],
    possibleCauses: ['Infrequent changing of menstrual products', 'Douching and disrupting vaginal microflora', 'Non-breathable synthetic underwear'],
    selfCareTips: [
      'Change disposable pads every 4 to 6 hours.',
      'Wash hands thoroughly with soap before and after changing any menstrual product.',
      'Wear breathable, 100% cotton underwear.',
      'Dispose of used pads wrapped neatly in paper; never flush down the toilet.'
    ],
    clinicalEvaluation: [
      'Visual vulval examination.',
      'Vaginal swab with wet mount or pH testing for bacterial vaginosis or candidiasis.'
    ],
    medicalTreatments: [
      'Antifungal creams or oral fluconazole for yeast infections.',
      'Metronidazole or clindamycin for bacterial vaginosis.'
    ],
    warningSigns: [
      'Sudden high fever, fainting, and sunburn-like rash during tampon or cup use (Toxic Shock Syndrome alert).',
      'Painful blisters or sores on the vulva.'
    ],
    references: [
      'UNICEF Menstrual Hygiene Management (MHM) Global Guide.',
      'ACOG Committee Opinion: Vaginal Douching and Reproductive Health.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-18',
    publicationStatus: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-01-24T08:00:00Z',
    updatedAt: '2026-02-18T08:00:00Z',
  },
  {
    id: 'art_9',
    slug: 'nutrition-and-healthy-food-for-women',
    title: 'Nourishing Women’s Health: Balanced Meals, Millets & Essential Nutrients',
    category: 'Nutrition & Healthy Food',
    summary: 'Practical dietary recommendations based on familiar Indian staples: lentils, millets, greens, and micronutrient balance.',
    content: `
Good nutrition during reproductive years forms the foundation for regular ovulation, steady energy, and strong bones. Rather than restrictive fad diets, focus on plate balance and nutrient density.

### The Balanced Indian Plate Model:
- **50% Vegetables & Fruits:** Local seasonal vegetables (gourd, bhindi, methi, palak, carrots).
- **25% Complex Carbohydrates:** Millets (ragi, jowar, bajra), brown or hand-pounded rice, whole wheat roti.
- **25% Protein:** Sattu, paneer, sprouts, lentils (dal, rajma, chana), curd, eggs, or fish.
- **Healthy Fats:** A spoonful of pure ghee, mustard/sesame oil, and a handful of nuts/seeds (flax, pumpkin, sunflower).
    `,
    symptoms: ['Energy crashes 2 hours after meals', 'Intense sugar cravings before menstruation', 'Slow recovery after physical activity'],
    possibleCauses: ['Refined carbohydrate spikes and crashes', 'Inadequate dietary protein', 'Low micronutrient intake'],
    selfCareTips: [
      'Include a protein source in every main meal to sustain satiety and balance blood glucose.',
      'Eat colourful vegetables daily to supply protective bioflavonoids and antioxidants.',
      'Stay hydrated with water, chaas (buttermilk), and coconut water instead of sugary beverages.'
    ],
    clinicalEvaluation: [
      'Serum Vitamin D3 and Vitamin B12 levels (frequently deficient in vegetarian diets).',
      'Lipid profile and fasting insulin.',
      'Evaluation by a qualified Clinical Dietitian.'
    ],
    medicalTreatments: [
      'High-potency Vitamin D3 and B12 supplementation as prescribed by a doctor.',
      'Individual medical nutrition therapy for specific health conditions.'
    ],
    warningSigns: [
      'Uncontrolled rapid weight loss or severe food restriction behaviours.',
      'Chronic gastrointestinal pain or malabsorption.'
    ],
    references: [
      'National Institute of Nutrition (ICMR-NIN). Dietary Guidelines for Indians 2024.',
      'WHO Healthy Diet Factsheet.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-20',
    publicationStatus: 'published',
    readTimeMinutes: 6,
    createdAt: '2026-01-26T08:00:00Z',
    updatedAt: '2026-02-20T08:00:00Z',
  },
  {
    id: 'art_10',
    slug: 'physical-activity-and-pelvic-health',
    title: 'Physical Activity & Cycle Syncing: Gentle Movement for Hormonal Health',
    category: 'Physical Activity',
    summary: 'How exercise supports insulin sensitivity, pelvic floor health, and mental wellness without overwhelming your adrenals.',
    content: `
Physical movement is one of the most effective non-pharmacological tools for managing PCOS, reducing menstrual cramps, and boosting mood through endorphin release.

### Moving with Your Cycle:
- **During Period (Days 1–3):** Prioritize restful movement: slow walks, light stretching, or restorative yoga.
- **Follicular Phase:** Rising estrogen often brings peak energy; great for strength training, brisk walking, or dance.
- **Ovulation:** Peak stamina; ideal for high-intensity or cardio workouts.
- **Luteal Phase:** Progesterone elevates body temperature; focus on steady-state cardio, Pilates, or moderate resistance training.
    `,
    symptoms: ['Sluggishness', 'Stiff pelvic joints', 'Pre-menstrual tension'],
    possibleCauses: ['Sedentary routine', 'Over-training without adequate nutritional intake'],
    selfCareTips: [
      'Aim for at least 150 minutes of moderate aerobic activity and 2 strength sessions weekly.',
      'Practice deep diaphragmatic breathing to release pelvic floor tightness.',
      'Listen to your body: rest when fatigued rather than forcing exhausting workouts.'
    ],
    clinicalEvaluation: [
      'Pelvic floor physiotherapy assessment if experiencing leakage or pain.',
      'Evaluation for athletic amenorrhea (RED-S).'
    ],
    medicalTreatments: [
      'Specialized pelvic rehabilitation physiotherapy.',
      'Supervised clinical exercise prescription for metabolic health.'
    ],
    warningSigns: [
      'Loss of menstruation following an abrupt increase in workout intensity.',
      'Incontinence or pelvic organ heaviness during exercise.'
    ],
    references: [
      'American College of Sports Medicine (ACSM). Physical Activity Guidelines.',
      'International Olympic Committee (IOC) Consensus Statement on RED-S.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-22',
    publicationStatus: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-01-28T08:00:00Z',
    updatedAt: '2026-02-22T08:00:00Z',
  },
  {
    id: 'art_11',
    slug: 'sleep-and-stress-management',
    title: 'Sleep Hygiene & Stress: Restoring the Hypothalamic-Pituitary-Adrenal Axis',
    category: 'Sleep & Stress Management',
    summary: 'The science behind how chronic stress disrupts ovulation and how quality sleep promotes hormone balance.',
    content: `
The hypothalamus in your brain orchestrates both your stress response and your reproductive cycle. When cortisol and adrenaline stay persistently high, the brain signals the ovaries to deprioritize ovulation, leading to late or missed periods.

### Building Sleep Hygiene:
- Aim for **7 to 8 hours** of continuous night sleep.
- Keep your bedroom cool, dark, and quiet.
- Disconnect from blue-light emitting screens at least 45 minutes before bedtime.
- Keep consistent sleep and wake times, even on weekends.
    `,
    symptoms: ['Difficulty falling or staying asleep', 'Waking up unrefreshed', 'Irritability and low stress tolerance', 'Delayed periods following high-stress events'],
    possibleCauses: ['Elevated nighttime cortisol', 'Late screen use suppressing melatonin', 'Excessive caffeine in afternoons'],
    selfCareTips: [
      'Establish a wind-down bedtime ritual (warm shower, reading a physical book, light herbal tea).',
      'Spend 10–15 minutes in morning natural sunlight to set your circadian clock.',
      'Try 4-7-8 breathing or guided meditation to calm your nervous system.'
    ],
    clinicalEvaluation: [
      'Evaluation for sleep apnea or chronic insomnia disorder.',
      'Screening for generalized anxiety or mood disorders.'
    ],
    medicalTreatments: [
      'Cognitive Behavioural Therapy for Insomnia (CBT-I).',
      'Clinical stress management and psychological counselling.'
    ],
    warningSigns: [
      'Persistent feelings of hopelessness, severe panic attacks, or clinical depression.'
    ],
    references: [
      'National Sleep Foundation Guidelines.',
      'ACOG Committee Opinion on Mental Health and Stress in Women.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-24',
    publicationStatus: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-01-30T08:00:00Z',
    updatedAt: '2026-02-24T08:00:00Z',
  },
  {
    id: 'art_12',
    slug: 'preventive-healthcare-screenings-for-women',
    title: 'Essential Preventive Health Screenings: Pap Smears, HPV, Breast & Blood Work',
    category: 'Preventive Healthcare',
    summary: 'A clear timeline of recommended clinical screenings every woman should know by age and life stage.',
    content: `
Preventive screenings detect cellular and metabolic changes long before symptoms appear, making treatment simpler and vastly more effective.

### Key Screenings by Age:
- **Ages 21–29:** Pap smear every 3 years to check cervical cytology.
- **Ages 30–65:** HPV DNA testing combined with Pap smear (co-testing) every 5 years, or Pap alone every 3 years.
- **Annual or Biennial:** Blood pressure, fasting glucose, lipid panel, and hemoglobin.
- **Clinical Breast Examination:** Regular self-awareness of breast changes and clinical checks during routine gynaecological visits. Mammograms starting at age 40 to 50 based on personal risk factors.
    `,
    symptoms: ['Asymptomatic in early stages — why screening is crucial'],
    possibleCauses: ['High-risk human papillomavirus (HPV) strains', 'Genetic predisposition (BRCA mutations)', 'Metabolic risk factors'],
    selfCareTips: [
      'Discuss HPV vaccination with your doctor (recommended for adolescents and young adults up to age 26, and individually up to 45).',
      'Learn your normal breast tissue texture and report any new lumps or nipple discharge.'
    ],
    clinicalEvaluation: [
      'Cervical liquid-based cytology and high-risk HPV PCR.',
      'Clinical breast examination and diagnostic mammography / ultrasound when indicated.'
    ],
    medicalTreatments: [
      'Colposcopy and cervical biopsy if screening shows high-grade epithelial lesions.',
      'Early outpatient interventions (LEEP or cryotherapy) prevent cervical malignancy.'
    ],
    warningSigns: [
      'Bleeding after intercourse (post-coital bleeding).',
      'Unexplained breast skin dimpling, nipple inversion, or bloody discharge.',
      'Bleeding after menopause (postmenopausal bleeding requires prompt investigation).'
    ],
    references: [
      'WHO Guidelines for Screening and Treatment of Cervical Pre-cancer Lesions.',
      'ACOG Guidelines on Well-Woman Annual Screenings.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-26',
    publicationStatus: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-02-01T08:00:00Z',
    updatedAt: '2026-02-26T08:00:00Z',
  },
  {
    id: 'art_13',
    slug: 'menstrual-health-myths-debunked',
    title: 'Common Menstrual Health Myths vs. Scientific Medical Facts',
    category: 'Myths & Facts',
    summary: 'Dispelling widespread cultural myths regarding exercise during periods, foods that affect flow, and pain normalisation.',
    content: `
Generations of misinformation and cultural silence around menstruation have left many women feeling anxious or guilty. Here is what modern medical science confirms:

### Myth 1: "You shouldn't exercise or wash your hair during your period."
**Scientific Fact:** Gentle exercise actually releases endorphins that reduce cramping and improve mood. Washing your hair and taking warm showers promotes cleanliness, relaxation, and eases muscle aches.

### Myth 2: "Severe, debilitating menstrual pain is just a woman's natural burden."
**Scientific Fact:** While mild discomfort is common, pain that stops you from working, studying, or causes vomiting is **not normal** and should be checked for conditions like endometriosis or adenomyosis.

### Myth 3: "Eating sour foods (like lemon or tamarind) stops or curdles your period."
**Scientific Fact:** The menstrual flow is determined by uterine hormones and vascular shedding, entirely separate from your digestive acidity. Vitamin C in citrus actually aids iron absorption.
    `,
    symptoms: ['Confusion due to conflicting advice from social media or folklore'],
    possibleCauses: ['Generational taboos and lack of evidence-based health education in schools'],
    selfCareTips: [
      'Rely on credible scientific sources (ACOG, NHS, WHO, ICMR) for medical knowledge.',
      'Talk openly with daughters, sisters, and friends to break cycles of shame.'
    ],
    clinicalEvaluation: ['Consult a licensed gynaecologist whenever symptoms cause distress.'],
    medicalTreatments: ['Evidence-based medical therapies.'],
    warningSigns: ['Relying on unregulated miracle cures that delay necessary medical care.'],
    references: [
      'UNFPA Menstrual Health Factsheet.',
      'Royal College of Obstetricians and Gynaecologists (RCOG) Patient Information.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-02-28',
    publicationStatus: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-02-03T08:00:00Z',
    updatedAt: '2026-02-28T08:00:00Z',
  },
  {
    id: 'art_14',
    slug: 'when-to-consult-a-doctor-red-flags',
    title: 'When to Consult a Healthcare Professional: Red Flags & Doctor Checklist',
    category: 'When to See a Doctor',
    summary: 'A clear guide on symptoms that should prompt an appointment with a gynaecologist and what to prepare before your visit.',
    content: `
While menstrual tracking helps you notice patterns, knowing when to transition from home observation to a clinical consultation is critical for your safety.

### Gynaecological Red Flags (Seek Prompt Care):
1. **Severe, Sudden Pelvic Pain:** Especially if accompanied by dizziness, fainting, or fever.
2. **Flooding Bleeding:** Soaking through two heavy pads/tampons per hour for two consecutive hours.
3. **Prolonged Bleeding:** Bleeding that continues without stopping for more than 7–8 days.
4. **Postmenopausal Bleeding:** Any vaginal bleeding or spotting occurring after 12 months without a period.
5. **Post-Coital Bleeding:** Bleeding after sexual intercourse.
6. **Severe Foul-Smelling Discharge:** Accompanied by pelvic tenderness, fever, or painful urination.

### What to Prepare for Your Doctor Appointment:
- Have your **HerHealth period record history** ready (cycle lengths, start dates, symptoms).
- Note down any medications, vitamins, or supplements you take.
- Write down your top three questions so you don't forget them during the consultation.
    `,
    symptoms: ['Acute sharp pelvic pain', 'Heavy hemorrhaging', 'Unexplained fever with pelvic signs'],
    possibleCauses: ['Ectopic pregnancy', 'Ovarian cyst rupture or torsion', 'Pelvic inflammatory disease (PID)', 'Endometrial pathology'],
    selfCareTips: [
      'Keep your health tracker logs updated so your clinician has objective data to review.',
      'Do not delay emergency care when red flags are present.'
    ],
    clinicalEvaluation: [
      'Immediate emergency triage if hemodynamically unstable.',
      'Physical pelvic exam, pelvic ultrasound, and urgent blood counts.'
    ],
    medicalTreatments: [
      'Urgent medical or surgical intervention according to clinical findings.'
    ],
    warningSigns: [
      'Fainting, cold clammy skin, or dizziness indicates possible severe internal bleeding or shock.'
    ],
    references: [
      'ACOG Emergency Obstetric and Gynecologic Care.',
      'NHS When to see a GP about period problems.'
    ],
    reviewerName: 'Dr. Radhika Sen',
    reviewerTitle: 'Consultant Obstetrician & Gynaecologist, MBBS, MD (Obs & Gynae)',
    reviewedAt: '2026-03-01',
    publicationStatus: 'published',
    readTimeMinutes: 5,
    createdAt: '2026-02-05T08:00:00Z',
    updatedAt: '2026-03-01T08:00:00Z',
  }
];
