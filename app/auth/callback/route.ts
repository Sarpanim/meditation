// app/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * Callback minimal :
 * - si Supabase renvoie une erreur -> on revient sur /login avec le message
 * - si on reçoit un "code" -> on redirige vers /dashboard (ou vers ?next=)
 * (ne crée pas encore de session côté serveur, c'est volontairement simple)
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const error =
    url.searchParams.get("error_description") || url.searchParams.get("error");
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/dashboard";

  if (error) {
    const to = new URL("/login", url);
    to.searchParams.set("error", error);
    return NextResponse.redirect(to);
  }

  if (!code) {
    const to = new URL("/login", url);
    to.searchParams.set("error", "missing_code");
    return NextResponse.redirect(to);
  }

  return NextResponse.redirect(new URL(next, url));
}

