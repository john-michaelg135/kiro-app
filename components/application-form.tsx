"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { X } from "@phosphor-icons/react";
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("You must be logged in.");
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

  const inputStyles = {
    background: "rgb(var(--color-surface))",
    borderColor: "rgb(var(--color-outline))",
    color: "rgb(var(--color-on-surface))",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[var(--radius-xl)] border"
        style={{
          background: "rgb(var(--color-surface-container))",
          borderColor: "rgb(var(--color-outline-variant))",
          boxShadow: "var(--shadow-elevation-3)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgb(var(--color-outline-variant))" }}>
          <h2 className="text-lg font-semibold" style={{ color: "rgb(var(--color-on-surface))" }}>
            {application ? "Edit Application" : "Add Application"}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1.5 rounded-[var(--radius-full)]"
            style={{ color: "rgb(var(--color-on-surface-variant))" }}
          >
            <X size={20} weight="bold" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm px-4 py-3 rounded-[var(--radius-md)]"
              style={{ background: "rgb(var(--color-error) / 0.1)", color: "rgb(var(--color-error))" }}
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--color-on-surface))" }}>Company *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-[var(--radius-md)] text-sm transition-all duration-200 focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent outline-none"
              style={inputStyles}
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--color-on-surface))" }}>Role *</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-[var(--radius-md)] text-sm transition-all duration-200 focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent outline-none"
              style={inputStyles}
              placeholder="e.g. Senior Frontend Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--color-on-surface))" }}>Job URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-[var(--radius-md)] text-sm transition-all duration-200 focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent outline-none"
              style={inputStyles}
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--color-on-surface))" }}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ApplicationStatus })}
                className="w-full px-4 py-2.5 border rounded-[var(--radius-md)] text-sm transition-all duration-200 focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent outline-none"
                style={inputStyles}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--color-on-surface))" }}>Date Applied</label>
              <input
                type="date"
                value={formData.applied_date}
                onChange={(e) => setFormData({ ...formData, applied_date: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-[var(--radius-md)] text-sm transition-all duration-200 focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent outline-none"
                style={inputStyles}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--color-on-surface))" }}>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 border rounded-[var(--radius-md)] text-sm transition-all duration-200 focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent outline-none resize-none"
              style={inputStyles}
              placeholder="Any notes..."
            />
          </div>

          <div className="flex gap-3 pt-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border rounded-[var(--radius-full)] font-medium text-sm transition-all duration-200"
              style={{ borderColor: "rgb(var(--color-outline))", color: "rgb(var(--color-on-surface))" }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-[var(--radius-full)] font-medium text-sm transition-all duration-200 disabled:opacity-50"
              style={{ background: "rgb(var(--color-primary))", color: "rgb(var(--color-on-primary))" }}
            >
              {loading ? "Saving..." : application ? "Update" : "Add"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
