"use client";

import { useState } from "react";
import { Plus, Link as LinkIcon, Clock, Trash2, Copy, Check, ExternalLink } from "lucide-react";
import { createEventType, deleteEventType } from "@/app/actions";

type EventType = { id: string; title: string; description: string | null; duration: number; urlSlug: string };

const inputClass = "mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all";

export default function EventTypesClient({ initialEventTypes }: { initialEventTypes: EventType[] }) {
  const [eventTypes, setEventTypes] = useState(initialEventTypes);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", duration: 30, urlSlug: "" });
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createEventType(formData);
      setModalOpen(false);
      setFormData({ title: "", description: "", duration: 30, urlSlug: "" });
      window.location.reload();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event type?")) {
      await deleteEventType(id);
      window.location.reload();
    }
  };

  const copyLink = (slug: string, id: string) => {
    const link = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const durationColors: Record<number, string> = {
    15: "bg-green-50 text-green-700 border-green-200",
    30: "bg-blue-50 text-blue-700 border-blue-200",
    60: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Event Types</h1>
          <p className="text-gray-500 mt-1 text-sm">Create events to share for people to book on your calendar.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium flex items-center shadow-sm hover:bg-indigo-500 transition-colors text-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" /> New event type
        </button>
      </div>

      {eventTypes.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <LinkIcon className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-gray-700 font-semibold mb-1">No event types yet</h3>
          <p className="text-gray-400 text-sm mb-4">Create your first event type to start receiving bookings.</p>
          <button onClick={() => setModalOpen(true)} className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
            + Create event type
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {eventTypes.map((et) => {
            const colorClass = durationColors[et.duration] || "bg-gray-50 text-gray-700 border-gray-200";
            return (
              <div key={et.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all flex justify-between items-center group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-900">{et.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${colorClass}`}>
                        {et.duration} min
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <LinkIcon className="w-3 h-3" /> /{et.urlSlug}
                      </span>
                    </div>
                    {et.description && <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">{et.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <a
                    href={`/${et.urlSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 font-medium text-gray-600 flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> Preview
                  </a>
                  <button
                    onClick={() => copyLink(et.urlSlug, et.id)}
                    className={`text-xs px-3 py-1.5 border rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                      copiedId === et.id
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    {copiedId === et.id ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy link</>}
                  </button>
                  <button
                    onClick={() => handleDelete(et.id)}
                    className="text-gray-300 p-2 hover:bg-red-50 hover:text-red-500 rounded-lg border border-transparent hover:border-red-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-5">New Event Type</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="30 Min Meeting" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL Slug *</label>
                <div className="flex mt-1">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-400 text-sm">/</span>
                  <input required type="text" value={formData.urlSlug} onChange={e => setFormData({ ...formData, urlSlug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} className="flex-1 block w-full rounded-none rounded-r-lg border border-gray-200 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="30min" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (minutes) *</label>
                <select value={formData.duration} onChange={e => setFormData({ ...formData, duration: Number(e.target.value) })} className={inputClass}>
                  {[15, 20, 30, 45, 60, 90].map(d => (
                    <option key={d} value={d}>{d} minutes</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className={inputClass + " resize-none"} rows={2} placeholder="A brief description of this meeting..." />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 text-sm font-medium disabled:opacity-50 transition-colors">
                  {saving ? "Saving..." : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
