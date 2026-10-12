import { FoodItem } from '../types';

export interface MealIdea {
  id: string;
  title: string;
  timeOfDay: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  dietType: 'Vegetarian' | 'Vegan' | 'Eggitarian';
  description: string;
  nutritionalHighlights: string[];
  tips: string;
}

export const indianFoodDatabase: FoodItem[] = [
  {
    id: 'food_1',
    name: 'Drumstick Leaves / Moringa',
    regionalName: 'Sahjan / Murungai Keerai',
    category: 'vegetable',
    nutrientFocus: ['iron', 'calcium', 'vitamin_c', 'fiber'],
    benefits: 'Exceptional natural source of plant iron and bioavailable calcium; helps replenish red blood cell reserves.',
    servingIdea: 'Lightly sauté with mustard seeds, grated coconut, and a pinch of turmeric, or add to dal/rasam.',
    dietarySuitability: ['vegetarian', 'vegan', 'gluten_free'],
  },
  {
    id: 'food_2',
    name: 'Sprouted Green Moong Dal',
    regionalName: 'Ankurit Moong',
    category: 'dal_protein',
    nutrientFocus: ['protein', 'fiber', 'vitamin_c', 'zinc'],
    benefits: 'Sprouting triples the Vitamin C content and lowers phytates, improving mineral bioavailability and digestion.',
    servingIdea: 'Toss with diced cucumbers, tomatoes, chaat masala, and fresh lemon juice for a gut-friendly snack.',
    dietarySuitability: ['vegetarian', 'vegan', 'gluten_free'],
  },
  {
    id: 'food_3',
    name: 'Finger Millet (Ragi)',
    regionalName: 'Nachni / Mandua',
    category: 'grain',
    nutrientFocus: ['calcium', 'fiber', 'iron'],
    benefits: 'One of the richest plant sources of calcium (approx 340mg per 100g); low glycemic index stabilizes blood sugar.',
    servingIdea: 'Make ragi mudde, savoury ragi dosa, or warm porridge with roasted almonds and seeds.',
    dietarySuitability: ['vegetarian', 'vegan', 'gluten_free'],
  },
  {
    id: 'food_4',
    name: 'Black Chickpeas',
    regionalName: 'Kala Chana',
    category: 'dal_protein',
    nutrientFocus: ['protein', 'iron', 'fiber', 'zinc'],
    benefits: 'High dietary fiber slows carbohydrate absorption, providing sustained energy and supporting insulin resistance.',
    servingIdea: 'Boil and temper with cumin, ginger, coriander, and lemon, or simmer in a light tomato-curry.',
    dietarySuitability: ['vegetarian', 'vegan', 'gluten_free'],
  },
  {
    id: 'food_5',
    name: 'Indian Gooseberry (Amla)',
    regionalName: 'Amla / Nellikai',
    category: 'fruit',
    nutrientFocus: ['vitamin_c', 'fiber'],
    benefits: 'Potent source of Vitamin C (20x that of orange juice), critical for converting non-heme plant iron into absorbable forms.',
    servingIdea: 'Grate fresh into salads, drink as amla-ginger warm infusion, or consume fresh slices.',
    dietarySuitability: ['vegetarian', 'vegan', 'gluten_free'],
  },
  {
    id: 'food_6',
    name: 'Sorghum (Jowar)',
    regionalName: 'Jowar',
    category: 'grain',
    nutrientFocus: ['fiber', 'iron', 'protein'],
    benefits: 'Gluten-free whole grain rich in complex polyphenols that support cardiovascular and metabolic health in PCOS.',
    servingIdea: 'Warm handmade jowar rotis served with leafy green vegetables and plain curd.',
    dietarySuitability: ['vegetarian', 'vegan', 'gluten_free'],
  },
  {
    id: 'food_7',
    name: 'Fenugreek Leaves & Seeds',
    regionalName: 'Methi',
    category: 'vegetable',
    nutrientFocus: ['iron', 'fiber', 'zinc'],
    benefits: 'Methi seeds contain 4-hydroxyisoleucine, shown in research to assist pancreatic insulin sensitivity.',
    servingIdea: 'Add fresh methi leaves to dal, theplas, or soak 1 tsp seeds overnight in warm water.',
    dietarySuitability: ['vegetarian', 'vegan', 'gluten_free'],
  },
  {
    id: 'food_8',
    name: 'Roasted Chickpea Flour (Sattu)',
    regionalName: 'Sattu',
    category: 'dal_protein',
    nutrientFocus: ['protein', 'fiber', 'iron'],
    benefits: 'High protein, cooling Indian superfood that keeps you satisfied without spiking insulin levels.',
    servingIdea: 'Whisk 2 tablespoons into cold water with roasted jeera powder, black salt, and lemon juice.',
    dietarySuitability: ['vegetarian', 'vegan', 'gluten_free'],
  },
  {
    id: 'food_9',
    name: 'Sesame Seeds (Til) & Flaxseeds (Alsi)',
    regionalName: 'Til & Alsi',
    category: 'nuts_seeds',
    nutrientFocus: ['calcium', 'healthy_fats', 'zinc', 'iron'],
    benefits: 'High in lignans and alpha-linolenic acid (plant omega-3s), supporting gentle hormone metabolism and joint health.',
    servingIdea: 'Lightly roast and sprinkle 1 tablespoon over your daily porridge, curd, or roti dough.',
    dietarySuitability: ['vegetarian', 'vegan', 'gluten_free'],
  },
  {
    id: 'food_10',
    name: 'Fresh Curd & Spiced Buttermilk',
    regionalName: 'Dahi / Chaas',
    category: 'dairy_substitute',
    nutrientFocus: ['protein', 'calcium'],
    benefits: 'Fermented live probiotics strengthen gut microbiome, improving estrogen excretion and reducing bloating.',
    servingIdea: 'Chilled chaas tempered with roasted cumin, mint leaves, and rock salt after lunch.',
    dietarySuitability: ['vegetarian', 'gluten_free'],
  }
];

export const sampleMealPlans: MealIdea[] = [
  {
    id: 'meal_1',
    title: 'Moong Chilla with Mint Chutney & Boiled Egg / Tofu',
    timeOfDay: 'Breakfast',
    dietType: 'Vegetarian',
    description: 'Protein-packed savory pancake made from ground green moong batter filled with grated paneer or tofu and vegetables.',
    nutritionalHighlights: ['18g Protein', 'High Complex Fiber', 'Low Glycemic Index'],
    tips: 'Pair with fresh amla-mint chutney for natural Vitamin C to boost iron uptake.',
  },
  {
    id: 'meal_2',
    title: 'Ragi Roti with Mixed Dal Tadka & Palak Saag',
    timeOfDay: 'Lunch',
    dietType: 'Vegetarian',
    description: 'Warm finger-millet flatbread served with tempered yellow lentils, stewed spinach, and a fresh cucumber-carrot kachumber salad.',
    nutritionalHighlights: ['300mg Calcium', 'High Plant Iron', 'Probiotic Curd on side'],
    tips: 'Squeeze half a lemon over the spinach to maximize iron absorption.',
  },
  {
    id: 'meal_3',
    title: 'Roasted Kala Chana Chaat & Coconut Water',
    timeOfDay: 'Snacks',
    dietType: 'Vegan',
    description: 'Boiled black chickpeas tossed with chopped onions, tomatoes, coriander, green chilies, and roasted cumin.',
    nutritionalHighlights: ['8g Fiber', 'Slow-burning energy', 'Electrolytes'],
    tips: 'A far better mid-evening snack than packaged biscuits; prevents pre-dinner insulin spikes.',
  },
  {
    id: 'meal_4',
    title: 'Grilled Paneer / Chicken with Vegetable Pulao & Mint Chaas',
    timeOfDay: 'Dinner',
    dietType: 'Vegetarian',
    description: 'Light spiced paneer or chicken breast with fragrant vegetable and brown rice pulao, paired with cooling mint buttermilk.',
    nutritionalHighlights: ['22g Protein', 'Easy on digestion before bedtime'],
    tips: 'Eat dinner at least 2 to 3 hours before going to bed to ensure deep sleep quality.',
  }
];
