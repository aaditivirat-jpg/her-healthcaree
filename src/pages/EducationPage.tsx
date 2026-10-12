import React, { useState, useEffect } from 'react';
import { HealthArticle } from '../types';
import { fetchHealthArticles } from '../lib/storage';
import { 
  BookOpen, 
  Search, 
  Clock, 
  UserCheck, 
  ArrowRight, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ALL_CATEGORIES = [
  'All Categories',
  'Menstrual Cycle Basics',
  'PCOS & PCOD',
  'Irregular & Delayed Periods',
  'Menstrual Pain & Cramps',
  'Anaemia & Iron Deficiency',
  'Thyroid Health',
  'Urinary Tract Infections',
  'Menstrual Hygiene',
  'Nutrition & Healthy Food',
  'Physical Activity',
  'Sleep & Stress Management',
  'Preventive Healthcare',
  'Myths & Facts',
  'When to See a Doctor',
];

export const EducationPage: React.FC = () => {
  const [articles, setArticles] = useState<HealthArticle[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await fetchHealthArticles();
        setArticles(data);
      } catch (err) {
        console.error('Failed to load articles:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filtered = articles.filter(art => {
    const matchCategory = selectedCategory === 'All Categories' || art.category === selectedCategory;
    const matchSearch = art.title.toLowerCase().includes(search.toLowerCase()) ||
                        art.summary.toLowerCase().includes(search.toLowerCase()) ||
                        art.category.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-ivory-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-plum-800 bg-plum-100/70 px-2.5 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5 text-plum-700" />
          <span>Evidence-Based Clinical Knowledge</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
          Women’s Health & Wellness Library
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Clear, medically reviewed educational guides covering all aspects of menstrual health, PCOS, anaemia, nutrition, and when to consult a clinician.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search health library..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-ivory-300 bg-white text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
          />
        </div>

        {/* Categories scroll chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 text-xs">
          {ALL_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition font-medium ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white border border-ivory-300 text-stone-700 hover:bg-ivory-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <div className="py-16 text-center text-stone-500">
          <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-medium">Loading verified medical library...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-ivory-200 p-8">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="font-display text-base font-bold text-stone-800">No articles match your query</h3>
          <p className="text-xs text-stone-500 mt-1">
            Try adjusting your search terms or select "All Categories".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(article => (
            <Link
              key={article.id}
              to={`/education/${article.slug}`}
              className="bg-white rounded-3xl border border-ivory-200 p-6 hover:border-rose-300 shadow-sm hover:shadow-md transition flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-stone-400">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTimeMinutes} min read</span>
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-rose-800 transition leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-ivory-200 flex items-center justify-between text-xs">
                {article.reviewerName ? (
                  <div className="flex items-center gap-1.5 text-[11px] text-sage-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />
                    <span className="truncate max-w-[150px]">Clinically Reviewed</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-stone-400">Evidence Synthesized</span>
                )}

                <span className="font-semibold text-rose-700 group-hover:translate-x-1 transition flex items-center gap-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
};
