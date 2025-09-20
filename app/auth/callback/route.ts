// app/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const error =
    url.searchParams.get("error_description") || url.searchParams.get("error");
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/dashboard";

  // 1) Si Supabase renvoie une erreur → retour sur /login avec le message
  if (error) {
    const to = new URL("/login", url);
    to.searchParams.set("error", error);
    return NextResponse.redirect(to);
  }

  // 2) Sans code → retour sur /login avec erreur explicite
  if (!code) {
    const to = new URL("/login", url);
    to.searchParams.set("error", "missing_code");
    return NextResponse.redirect(to);
  }

  // 3) Avec code → on échange contre une session (cookies) puis on redirige
  const supabase = createRouteHandlerClient({ cookies });
  try {
    await supabase.auth.exchangeCodeForSession(code);
  } catch {
    const to = new URL("/login", url);
    to.searchParams.set("error", "exchange_failed");
    return NextResponse.redirect(to);
  }

  return NextResponse.redirect(new URL(next, url));
}
