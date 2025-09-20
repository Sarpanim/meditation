import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if not authenticated, send back to login with ?next=
  if (!user) {
    const url = new URL(
      "/login",
      process.env.NEXT_PUBLIC_SITE_URL || "https://meditation-dusky-three.vercel.app",
    );
    url.searchParams.set("next", `/courses/${params.id}`);
    return NextResponse.redirect(url, { status: 302 });
  }

  // create enrollment if not exists
  await supabase
    .from("enrollments")
    .insert({ user_id: user.id, course_id: params.id })
    .select("*")
    .single()
    .catch(() => null);

  // then to dashboard
  const dashboard = new URL(
    "/dashboard",
    process.env.NEXT_PUBLIC_SITE_URL || "https://meditation-dusky-three.vercel.app",
  );
  return NextResponse.redirect(dashboard, { status: 302 });
}
