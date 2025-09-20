import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  await supabase.auth.signOut();
  redirect("/");
}
