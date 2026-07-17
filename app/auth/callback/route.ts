import { type EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

// This handles the redirect from Supabase's default email verification flow.
// After Supabase verifies the token on their end, they redirect here.
// By the time the user hits this route, the session is already established
// via the hash fragment (#access_token=...) which the browser handles.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("next");
  redirectTo.searchParams.delete("code");

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  // If we get here without code or token_hash, Supabase's default flow
  // already verified the email and is just redirecting back.
  // The user's email is confirmed — send them to dashboard.
  return NextResponse.redirect(redirectTo);
}
