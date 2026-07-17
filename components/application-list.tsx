"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Application, ApplicationStatus } from "@/lib/types";
import { StatusBadge } from "./status-badge";
import { ApplicationForm } from "./application-form";

const FILTER_OPTIONS: { value: ApplicationStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

interface ApplicationListProps {
  applications: Application[];
}

export function ApplicationList({ applications }: ApplicationListProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Application | undefined>(undefined);

  const filtered =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  async function handleDelete(id: string) {
    if (!confirm("Delete this application?")) return;
    const supabase = createClient();
    await supabase.from("applications").delete().eq("id", id);
    router.refresh();
  }

  function handleEdit(app: Application) {
    setEditing(app);
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditing(undefined);
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Applications</h2>
          <p className="text-sm text-slate-500 mt-1">
            {applications.length} total &middot; {filtered.length} shown
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-slate-900 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors text-sm"
        >
          + Add application
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === opt.value
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <div className="text-4xl mb-3">📋</div>
          <h3 className="text-lg font-medium text-slate-900">
            {applications.length === 0
              ? "No applications yet"
              : "No matches for this filter"}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {applications.length === 0
              ? "Add your first job application to get started."
              : "Try a different status filter."}
          </p>
          {applications.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              + Add application
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900 truncate">
                      {app.company}
                    </h3>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5 truncate">
                    {app.role}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                    <span>Applied {app.applied_date}</span>
                    {app.url && (
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-slate-600 underline"
                      >
                        Job link ↗
                      </a>
                    )}
                  </div>
                  {app.notes && (
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                      {app.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(app)}
                    className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="text-sm text-red-600 hover:text-red-700 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <ApplicationForm application={editing} onClose={handleClose} />
      )}
    </>
  );
}
