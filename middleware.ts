// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  // ceci rafraîchit la session si besoin (cookies)
  await supabase.auth.getSession();
  return res;
}

// On évite les ressources statiques
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|site.webmanifest).*)"],
};
