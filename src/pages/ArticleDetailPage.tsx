import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HealthArticle } from '../types';
import { fetchHealthArticles } from '../lib/storage';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Stethoscope, 
  HeartPulse, 
  ShieldCheck 
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<HealthArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const all = await fetchHealthArticles();
        const found = all.find(a => a.slug === slug);
        setArticle(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="py-24 text-center text-stone-500">
        <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-medium">Loading clinical article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h2 className="font-display text-xl font-bold text-stone-900 mb-2">Article Not Found</h2>
        <p className="text-xs text-stone-500 mb-6">
          The educational guide you are looking for may have moved or been updated.
        </p>
        <Link
          to="/education"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Health Library
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back link */}
      <div>
        <Link
          to="/education"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-rose-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Health Library
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 pb-6 border-b border-ivory-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            {article.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTimeMinutes} min read</span>
          </div>
          {article.reviewedAt && (
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last reviewed: {article.reviewedAt}</span>
            </div>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal bg-ivory-50 p-4 rounded-2xl border border-ivory-200">
          {article.summary}
        </p>
      </div>

      {/* Verified Medical Reviewer Box */}
      {article.reviewerName && (
        <div className="bg-sage-50 border border-sage-200 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-sage-200 text-sage-900 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-sage-800" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sage-950 text-sm">Medically Reviewed by {article.reviewerName}</span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-semibold text-sage-800 border border-sage-300">
                Verified Clinician
              </span>
            </div>
            <p className="text-sage-800 leading-relaxed">
              {article.reviewerTitle}
            </p>
            <p className="text-[11px] text-sage-700/80 italic">
              Reviewed against international clinical guidelines from ACOG, WHO, and ICMR.
            </p>
          </div>
        </div>
      )}

      {/* Main Body Content */}
      <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
        <div className="whitespace-pre-line text-stone-800 leading-relaxed">
          {article.content}
        </div>
      </div>

      {/* Structured Clinical Sections */}
      <div className="space-y-6 pt-4">
        
        {/* Symptoms & Possible Causes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {article.symptoms && article.symptoms.length > 0 && (
            <div className="bg-white rounded-3xl border border-ivory-200 p-6 space-y-3 shadow-xs">
              <h3 className="font-display text-sm font-bold text-stone-900 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                Common Symptoms
              </h3>
              <ul className="space-y-2 text-xs text-stone-600">
                {article.symptoms.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {article.possibleCauses && article.possibleCauses.length > 0 && (
            <div className="bg-white rounded-3xl border border-ivory-200 p-6 space-y-3 shadow-xs">
              <h3 className="font-display text-sm font-bold text-stone-900 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-plum-600" />
                Possible Causes & Contributing Factors
              </h3>
              <ul className="space-y-2 text-xs text-stone-600">
                {article.possibleCauses.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-plum-500 mt-1.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Evidence-informed Self Care Tips */}
        {article.selfCareTips && article.selfCareTips.length > 0 && (
          <div className="bg-white rounded-3xl border border-ivory-200 p-6 space-y-3 shadow-xs">
            <h3 className="font-display text-sm font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sage-600" />
              Evidence-Informed Self-Care Information
            </h3>
            <ul className="space-y-2 text-xs text-stone-600">
              {article.selfCareTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-600 mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* What a Clinician May Evaluate & Treatments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {article.clinicalEvaluation && article.clinicalEvaluation.length > 0 && (
            <div className="bg-ivory-50 rounded-3xl border border-ivory-200 p-6 space-y-3">
              <h3 className="font-display text-sm font-bold text-stone-900">
                What a Doctor May Assess
              </h3>
              <ul className="space-y-2 text-xs text-stone-600">
                {article.clinicalEvaluation.map((ev, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {article.medicalTreatments && article.medicalTreatments.length > 0 && (
            <div className="bg-ivory-50 rounded-3xl border border-ivory-200 p-6 space-y-3">
              <h3 className="font-display text-sm font-bold text-stone-900">
                Medical Treatment Approaches
              </h3>
              <ul className="space-y-2 text-xs text-stone-600">
                {article.medicalTreatments.map((tr, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                    <span>{tr}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Red Flag Warning Signs */}
        {article.warningSigns && article.warningSigns.length > 0 && (
          <div className="bg-red-50/70 border border-red-200 rounded-3xl p-6 space-y-3">
            <h3 className="font-display text-sm font-bold text-red-950 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-700" />
              Red Flag Warning Signs: When to Seek Medical Evaluation
            </h3>
            <ul className="space-y-2 text-xs text-red-900">
              {article.warningSigns.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* References & Citations */}
        {article.references && article.references.length > 0 && (
          <div className="bg-white rounded-3xl border border-ivory-200 p-6 space-y-2 text-xs text-stone-500">
            <h4 className="font-bold text-stone-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Scientific & Clinical References
            </h4>
            <ol className="list-decimal list-inside space-y-1">
              {article.references.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ol>
          </div>
        )}

      </div>

    </article>
  );
};
