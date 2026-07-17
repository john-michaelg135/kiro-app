"use client";

import { motion } from "motion/react";
import type { ApplicationStatus } from "@/lib/types";

const statusConfig: Record<ApplicationStatus, { label: string; bg: string; text: string; dot: string }> = {
  applied: { label: "Applied", bg: "rgb(var(--color-primary-container))", text: "rgb(var(--color-on-primary-container))", dot: "rgb(var(--color-primary))" },
  interviewing: { label: "Interviewing", bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  offer: { label: "Offer", bg: "#D1FAE5", text: "#065F46", dot: "#10B981" },
  rejected: { label: "Rejected", bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = statusConfig[status];
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-full)] text-xs font-semibold"
      style={{ background: config.bg, color: config.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.dot }} />
      {config.label}
    </motion.span>
  );
}
