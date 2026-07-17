import { createClient } from "@/lib/supabase/server";
import { ApplicationList } from "@/components/application-list";
import type { Application } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .order("applied_date", { ascending: false });

  if (error) {
    throw new Error(`Failed to load applications: ${error.message}`);
  }

  return (
    <ApplicationList applications={(applications as Application[]) ?? []} />
  );
}
