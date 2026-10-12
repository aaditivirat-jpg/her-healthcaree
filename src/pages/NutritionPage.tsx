import React, { useState } from 'react';
import { indianFoodDatabase, sampleMealPlans, MealIdea } from '../data/nutrition';
import { FoodItem } from '../types';
import { 
  Apple, 
  Search, 
  Utensils, 
  AlertCircle, 
  Droplet, 
  ShieldCheck, 
  Sparkles, 
  Leaf, 
  Coffee 
} from 'lucide-react';

export const NutritionPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredFoods = indianFoodDatabase.filter(f => {
    const matchCat = selectedCategory === 'all' || f.category === selectedCategory;
    const matchDiet = dietFilter === 'all' || f.dietarySuitability.includes(dietFilter as any);
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                        (f.regionalName && f.regionalName.toLowerCase().includes(search.toLowerCase())) ||
                        f.benefits.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDiet && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-terracotta-50 via-white to-ivory-100 rounded-3xl border border-ivory-200 p-8 sm:p-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-900 text-xs font-semibold">
          <Apple className="w-3.5 h-3.5 text-terracotta-700" />
          <span>Familiar Indian Whole Foods & Nourishment</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
          Nourishing Women’s Health
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Celebrating local millets, seasonal greens, lentils, and spices. Evidence-informed eating without restrictive calorie counting or false "miracle cure" claims.
        </p>
      </div>

      {/* Medical disclaimer banner */}
      <div className="bg-ivory-100 border border-ivory-300 rounded-2xl p-4 text-xs text-stone-700 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-terracotta-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-stone-900">Nutritional Disclaimer:</strong> Individual dietary needs differ based on personal health, allergies, and clinical conditions. Whole foods support overall hormone and metabolic health, but no individual food cures PCOS, endometriosis, or anaemia. Consult a registered dietitian or physician for individualized therapeutic diets.
        </p>
      </div>

      {/* Balanced Indian Plate Model */}
      <div className="bg-white rounded-3xl border border-ivory-200 p-8 shadow-sm space-y-6">
        <h2 className="font-display text-2xl font-bold text-stone-900">
          The Balanced Indian Plate Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-sage-50 p-5 rounded-2xl border border-sage-200 space-y-2">
            <span className="text-xs font-bold text-sage-900 uppercase tracking-wider block">50% Half Plate</span>
            <h3 className="font-display text-base font-bold text-stone-900">Fiber & Vegetables</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Palak, methi, moringa, gourd, bhindi, raw salads with lemon and cucumbers. Slows glucose spikes and feeds the gut microbiome.
            </p>
          </div>

          <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 space-y-2">
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block">25% Quarter Plate</span>
            <h3 className="font-display text-base font-bold text-stone-900">Quality Protein</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sprouted moong, kala chana, rajma, paneer, tofu, sattu, eggs, or fish. Essential for cellular repair and satiety.
            </p>
          </div>

          <div className="bg-terracotta-50 p-5 rounded-2xl border border-terracotta-200 space-y-2">
            <span className="text-xs font-bold text-terracotta-900 uppercase tracking-wider block">25% Quarter Plate</span>
            <h3 className="font-display text-base font-bold text-stone-900">Complex Millets & Grains</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Ragi (calcium-rich), Jowar, Bajra, brown or hand-pounded rice. Low glycemic index stabilizes energy.
            </p>
          </div>

          <div className="bg-ivory-100 p-5 rounded-2xl border border-ivory-300 space-y-2">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">Healthy Fats</span>
            <h3 className="font-display text-base font-bold text-stone-900">Oils, Nuts & Seeds</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              A spoonful of pure ghee, cold-pressed mustard/sesame oil, soaked almonds, flaxseeds (alsi), and pumpkin seeds.
            </p>
          </div>
        </div>
      </div>

      {/* Practical Meal Plans Section */}
      <div className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-stone-900">
          Sample Balanced Day Meal Ideas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleMealPlans.map(meal => (
            <div
              key={meal.id}
              className="bg-white rounded-3xl border border-ivory-200 p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                    {meal.timeOfDay}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium">
                    {meal.dietType}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-stone-900 leading-snug">
                  {meal.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {meal.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-ivory-200 text-xs">
                <div className="flex flex-wrap gap-1">
                  {meal.nutritionalHighlights.map((nh, idx) => (
                    <span key={idx} className="text-[10px] bg-ivory-100 px-2 py-0.5 rounded font-medium text-stone-700">
                      {nh}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-terracotta-700 font-medium">
                  💡 Tip: {meal.tips}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indian Whole Foods Database Explorer */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-ivory-200 gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-stone-900">
              Indian Whole Foods & Nutrient Highlights
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Explore key nutrients, regional names, and serving ideas.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search foods (e.g. Ragi, Moringa, Amla)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-ivory-300 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          <span className="text-stone-400 font-medium shrink-0">Category:</span>
          {['all', 'vegetable', 'fruit', 'grain', 'dal_protein', 'nuts_seeds'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl capitalize font-medium transition ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white'
                  : 'bg-white border border-ivory-300 text-stone-700 hover:bg-ivory-100'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Foods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map(food => (
            <div
              key={food.id}
              className="bg-white rounded-3xl border border-ivory-200 p-6 shadow-sm space-y-4 hover:shadow-md transition"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-terracotta-800 bg-terracotta-50 px-2.5 py-0.5 rounded-full capitalize">
                    {food.category.replace('_', ' ')}
                  </span>
                  <div className="flex gap-1 text-[10px] text-stone-400">
                    {food.dietarySuitability.map(d => (
                      <span key={d} className="bg-ivory-100 px-1.5 py-0.5 rounded capitalize">
                        {d.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-stone-900 pt-1">
                  {food.name}
                </h3>
                {food.regionalName && (
                  <p className="text-xs font-semibold text-stone-500 italic">
                    {food.regionalName}
                  </p>
                )}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {food.benefits}
              </p>

              <div className="space-y-2 pt-2 border-t border-ivory-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                    Nutrient Focus:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {food.nutrientFocus.map(n => (
                      <span key={n} className="text-[10px] bg-rose-50 text-rose-800 px-2 py-0.5 rounded-md font-medium border border-rose-200 capitalize">
                        {n.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-ivory-50 p-2.5 rounded-xl border border-ivory-200 text-[11px] text-stone-700">
                  <strong className="font-semibold text-stone-900">Serving Idea:</strong> {food.servingIdea}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
