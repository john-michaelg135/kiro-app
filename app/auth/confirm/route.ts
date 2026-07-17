import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// This route handles email confirmation via PKCE flow.
// Supabase email templates should link to:
// {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";
  const code = searchParams.get("code");

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("next");
  redirectTo.searchParams.delete("code");

  // PKCE flow: verify OTP with token_hash
  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
    // If verification fails, fall through to error
    redirectTo.pathname = "/login";
    redirectTo.searchParams.set("error", "Email verification failed. The link may have expired.");
    return NextResponse.redirect(redirectTo);
  }

  // Code exchange flow (OAuth, magic link)
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
    redirectTo.pathname = "/login";
    redirectTo.searchParams.set("error", "Authentication failed.");
    return NextResponse.redirect(redirectTo);
  }

  // No token_hash or code — invalid request
  redirectTo.pathname = "/login";
  redirectTo.searchParams.set("error", "Invalid confirmation link.");
  return NextResponse.redirect(redirectTo);
}
