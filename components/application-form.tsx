"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Application, ApplicationFormData, ApplicationStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

interface ApplicationFormProps {
  application?: Application;
  onClose: () => void;
}

export function ApplicationForm({ application, onClose }: ApplicationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<ApplicationFormData>({
    company: application?.company ?? "",
    role: application?.role ?? "",
    url: application?.url ?? "",
    status: application?.status ?? "applied",
    applied_date: application?.applied_date ?? new Date().toISOString().split("T")[0],
    notes: application?.notes ?? "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const payload = {
      company: formData.company,
      role: formData.role,
      url: formData.url || null,
      status: formData.status,
      applied_date: formData.applied_date,
      notes: formData.notes || null,
    };

    let result;
    if (application) {
      result = await supabase
        .from("applications")
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq("id", application.id);
    } else {
      // Get the current user's ID for RLS policy compliance
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("You must be logged in to add an application.");
        setLoading(false);
        return;
      }
      result = await supabase.from("applications").insert({
        ...payload,
        user_id: user.id,
      });
    }

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      router.refresh();
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            {application ? "Edit Application" : "Add Application"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
              Company *
            </label>
            <input
              id="company"
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
              Role *
            </label>
            <input
              id="role"
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              placeholder="e.g. Senior Frontend Engineer"
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">
              Job URL
            </label>
            <input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ApplicationStatus })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="applied_date" className="block text-sm font-medium text-slate-700 mb-1">
                Date Applied
              </label>
              <input
                id="applied_date"
                type="date"
                value={formData.applied_date}
                onChange={(e) => setFormData({ ...formData, applied_date: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
              placeholder="Any notes about this application..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : application ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
