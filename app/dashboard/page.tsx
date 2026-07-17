import { createClient } from "@/lib/supabase/server";
import { ApplicationList } from "@/components/application-list";
import type { Application } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: applications } = await supabase
    .from("applications")
    .select("*")
    .order("applied_date", { ascending: false });

  return (
    <ApplicationList applications={(applications as Application[]) ?? []} />
  );
}
