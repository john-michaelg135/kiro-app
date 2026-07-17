import type { ApplicationStatus } from "@/lib/types";

const statusConfig: Record<ApplicationStatus, { label: string; classes: string }> = {
  applied: {
    label: "Applied",
    classes: "bg-blue-50 text-blue-700 border-blue-200",
  },
  interviewing: {
    label: "Interviewing",
    classes: "bg-amber-50 text-amber-700 border-amber-200",
  },
  offer: {
    label: "Offer",
    classes: "bg-green-50 text-green-700 border-green-200",
  },
  rejected: {
    label: "Rejected",
    classes: "bg-red-50 text-red-700 border-red-200",
  },
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.classes}`}
    >
      {config.label}
    </span>
  );
}
