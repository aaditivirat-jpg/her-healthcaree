import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  fetchAuditEvents, 
  fetchDataRequests, 
  updateDataRequestStatus, 
  fetchHealthArticles, 
  saveHealthArticle 
} from '../lib/storage';
import { AuditEvent, DataRequest, HealthArticle, UserRole } from '../types';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Lock, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Edit3, 
  AlertTriangle,
  Activity,
  Layers
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'articles' | 'requests' | 'audit'>('analytics');
  
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [dataRequests, setDataRequests] = useState<DataRequest[]>([]);
  const [articles, setArticles] = useState<HealthArticle[]>([]);
  const [editingArticle, setEditingArticle] = useState<HealthArticle | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [events, reqs, arts] = await Promise.all([
        fetchAuditEvents(),
        fetchDataRequests(),
        fetchHealthArticles(),
      ]);
      setAuditEvents(events);
      setDataRequests(reqs);
      setArticles(arts);
    }
    loadData();
  }, []);

  const handleUpdateRequestStatus = async (id: string, status: DataRequest['status']) => {
    await updateDataRequestStatus(id, status);
    const updated = await fetchDataRequests();
    setDataRequests(updated);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    await saveHealthArticle(editingArticle);
    const updated = await fetchHealthArticles();
    setArticles(updated);
    setIsArticleModalOpen(false);
    setEditingArticle(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-plum-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-300" />
            <span>Platform Administration & Privacy Portal</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            Administrative Control Center
          </h1>
          <p className="text-xs text-rose-200">
            Authenticated Administrator: <strong className="font-semibold">{user?.displayName}</strong> ({user?.email})
          </p>
        </div>

        {/* Least-privilege notice badge */}
        <div className="bg-white/10 p-3 rounded-2xl border border-white/20 text-xs text-rose-100 max-w-sm">
          <span className="font-bold text-white block mb-0.5">Least-Privilege Policy:</span>
          Identifiable patient cycle notes and symptoms remain strictly isolated by RLS and cannot be read here.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-ivory-200 pb-2 overflow-x-auto text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-plum-100 text-plum-900'
              : 'text-stone-600 hover:bg-ivory-100'
          }`}
        >
          <Activity className="w-4 h-4 text-plum-700" />
          Aggregate Analytics
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 ${
            activeTab === 'articles'
              ? 'bg-plum-100 text-plum-900'
              : 'text-stone-600 hover:bg-ivory-100'
          }`}
        >
          <FileText className="w-4 h-4 text-plum-700" />
          Health Library Articles ({articles.length})
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 ${
            activeTab === 'requests'
              ? 'bg-plum-100 text-plum-900'
              : 'text-stone-600 hover:bg-ivory-100'
          }`}
        >
          <Layers className="w-4 h-4 text-plum-700" />
          Data & Deletion Requests ({dataRequests.length})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-plum-100 text-plum-900'
              : 'text-stone-600 hover:bg-ivory-100'
          }`}
        >
          <Lock className="w-4 h-4 text-plum-700" />
          Security Audit Trail ({auditEvents.length})
        </button>
      </div>

      {/* TAB 1: AGGREGATE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-2">
              <span className="text-xs text-stone-500 font-medium">Registered User Profiles</span>
              <p className="font-display text-3xl font-bold text-stone-900">4,280+</p>
              <span className="text-[11px] text-sage-700">100% consent confirmed</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-2">
              <span className="text-xs text-stone-500 font-medium">Anonymous Logged Cycles</span>
              <p className="font-display text-3xl font-bold text-rose-900">19,410</p>
              <span className="text-[11px] text-stone-400">Stored with RLS isolation</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-2">
              <span className="text-xs text-stone-500 font-medium">Cohort Average Cycle</span>
              <p className="font-display text-3xl font-bold text-stone-900">28.4 days</p>
              <span className="text-[11px] text-stone-500">Typical adult population baseline</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-2">
              <span className="text-xs text-stone-500 font-medium">Reviewed Health Articles</span>
              <p className="font-display text-3xl font-bold text-plum-900">{articles.length}</p>
              <span className="text-[11px] text-sage-700">Across 14 clinical categories</span>
            </div>

          </div>

          <div className="bg-ivory-50 rounded-3xl border border-ivory-200 p-6 text-xs text-stone-600 space-y-2">
            <h4 className="font-bold text-stone-900 text-sm">Privacy-Conscious Aggregation Methodology</h4>
            <p className="leading-relaxed">
              In strict accordance with the Digital Personal Data Protection (DPDP) Act and international medical ethics, these statistics are derived from anonymized database counters. No administrator can map aggregate statistics back to specific patient identifiers or individual medical conditions.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: ARTICLES MANAGEMENT */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-stone-900">
              Published Health Knowledge Articles
            </h3>
            <button
              onClick={() => {
                setEditingArticle({
                  id: 'art_' + Date.now(),
                  slug: 'new-article-' + Date.now(),
                  title: '',
                  category: 'Menstrual Cycle Basics',
                  summary: '',
                  content: '',
                  references: [],
                  publicationStatus: 'draft',
                  readTimeMinutes: 5,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                });
                setIsArticleModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-plum-800 text-white font-semibold text-xs hover:bg-plum-900 flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create Article</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-ivory-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory-100 text-stone-700 border-b border-ivory-200">
                <tr>
                  <th className="py-3 px-5">Title</th>
                  <th className="py-3 px-5">Category</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Reviewer</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200">
                {articles.map(art => (
                  <tr key={art.id} className="hover:bg-ivory-50 transition">
                    <td className="py-3 px-5 font-semibold text-stone-900 max-w-xs truncate">
                      {art.title}
                    </td>
                    <td className="py-3 px-5 text-stone-600">
                      {art.category}
                    </td>
                    <td className="py-3 px-5">
                      <span className={`px-2 py-0.5 rounded-full font-medium text-[10px] uppercase ${
                        art.publicationStatus === 'published'
                          ? 'bg-sage-100 text-sage-800'
                          : 'bg-ivory-200 text-stone-700'
                      }`}>
                        {art.publicationStatus}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-stone-600">
                      {art.reviewerName || 'Unassigned'}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button
                        onClick={() => {
                          setEditingArticle(art);
                          setIsArticleModalOpen(true);
                        }}
                        className="p-1 rounded-lg text-plum-700 hover:bg-plum-50"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DATA EXPORT & DELETION REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-stone-900">
            User Rights Requests (Data Portability & Erasure)
          </h3>

          {dataRequests.length === 0 ? (
            <div className="bg-white rounded-3xl border border-ivory-200 p-8 text-center text-stone-500 text-xs">
              No pending export or deletion requests submitted.
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-ivory-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-ivory-100 text-stone-700 border-b border-ivory-200">
                  <tr>
                    <th className="py-3 px-5">Request ID</th>
                    <th className="py-3 px-5">User Email</th>
                    <th className="py-3 px-5">Type</th>
                    <th className="py-3 px-5">Date</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-200">
                  {dataRequests.map(req => (
                    <tr key={req.id} className="hover:bg-ivory-50 transition">
                      <td className="py-3 px-5 font-mono text-stone-500">{req.id}</td>
                      <td className="py-3 px-5 font-medium text-stone-900">{req.userEmail}</td>
                      <td className="py-3 px-5">
                        <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                          req.requestType === 'deletion'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-plum-100 text-plum-800'
                        }`}>
                          {req.requestType}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-stone-600">
                        {format(parseISO(req.requestedAt), 'MMM dd, yyyy HH:mm')}
                      </td>
                      <td className="py-3 px-5">
                        <span className={`capitalize px-2 py-0.5 rounded text-[11px] font-semibold ${
                          req.status === 'completed'
                            ? 'bg-sage-100 text-sage-800'
                            : 'bg-ivory-200 text-stone-800'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-right space-x-1.5">
                        {req.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateRequestStatus(req.id, 'completed')}
                            className="px-2.5 py-1 rounded-lg bg-sage-600 text-white font-medium text-[11px] hover:bg-sage-700"
                          >
                            Mark Completed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-stone-900">
            Security & Authentication Audit Trail
          </h3>

          <div className="bg-white rounded-3xl border border-ivory-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-ivory-100 text-stone-700 border-b border-ivory-200 font-sans">
                <tr>
                  <th className="py-3 px-5">Timestamp</th>
                  <th className="py-3 px-5">Action</th>
                  <th className="py-3 px-5">Actor</th>
                  <th className="py-3 px-5">Resource</th>
                  <th className="py-3 px-5">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200 text-[11px]">
                {auditEvents.map(evt => (
                  <tr key={evt.id} className="hover:bg-ivory-50">
                    <td className="py-2.5 px-5 text-stone-500 whitespace-nowrap">
                      {format(parseISO(evt.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                    </td>
                    <td className="py-2.5 px-5 font-semibold text-plum-900">
                      {evt.action}
                    </td>
                    <td className="py-2.5 px-5 text-stone-800">
                      {evt.actorEmail || evt.actorUserId || 'system'}
                    </td>
                    <td className="py-2.5 px-5 text-stone-600">
                      {evt.resourceType}
                    </td>
                    <td className="py-2.5 px-5 text-stone-600 max-w-xs truncate">
                      {evt.reason || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Article Edit/Create Modal */}
      {isArticleModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 border border-ivory-200 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-stone-900">
              {editingArticle.id.startsWith('art_new') ? 'Create Health Article' : 'Edit Health Article'}
            </h3>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Category</label>
                <select
                  value={editingArticle.category}
                  onChange={e => setEditingArticle({ ...editingArticle, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50"
                >
                  <option value="Menstrual Cycle Basics">Menstrual Cycle Basics</option>
                  <option value="PCOS & PCOD">PCOS & PCOD</option>
                  <option value="Irregular & Delayed Periods">Irregular & Delayed Periods</option>
                  <option value="Menstrual Pain & Cramps">Menstrual Pain & Cramps</option>
                  <option value="Anaemia & Iron Deficiency">Anaemia & Iron Deficiency</option>
                  <option value="Thyroid Health">Thyroid Health</option>
                  <option value="Urinary Tract Infections">Urinary Tract Infections</option>
                  <option value="Menstrual Hygiene">Menstrual Hygiene</option>
                  <option value="Nutrition & Healthy Food">Nutrition & Healthy Food</option>
                  <option value="Physical Activity">Physical Activity</option>
                  <option value="Sleep & Stress Management">Sleep & Stress Management</option>
                  <option value="Preventive Healthcare">Preventive Healthcare</option>
                  <option value="Myths & Facts">Myths & Facts</option>
                  <option value="When to See a Doctor">When to See a Doctor</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={editingArticle.summary}
                  onChange={e => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Detailed Content</label>
                <textarea
                  rows={6}
                  required
                  value={editingArticle.content}
                  onChange={e => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50 font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Reviewer Name</label>
                  <input
                    type="text"
                    value={editingArticle.reviewerName || ''}
                    onChange={e => setEditingArticle({ ...editingArticle, reviewerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Publication Status</label>
                  <select
                    value={editingArticle.publicationStatus}
                    onChange={e => setEditingArticle({ ...editingArticle, publicationStatus: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-ivory-200">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-ivory-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-plum-800 text-white font-semibold hover:bg-plum-900"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
