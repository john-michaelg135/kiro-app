"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * This component listens for Supabase auth state changes.
 * When Supabase's default email confirmation flow redirects back with
 * an access_token in the URL hash fragment, the Supabase client picks it up
 * and fires an auth state change. This component handles the redirect.
 */
export function AuthListener() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.push("/dashboard");
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return null;
}
