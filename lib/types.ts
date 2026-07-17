export type ApplicationStatus = "applied" | "interviewing" | "offer" | "rejected";

export interface Application {
  id: string;
  user_id: string;
  company: string;
  role: string;
  url: string | null;
  status: ApplicationStatus;
  applied_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationFormData {
  company: string;
  role: string;
  url?: string;
  status: ApplicationStatus;
  applied_date: string;
  notes?: string;
}
