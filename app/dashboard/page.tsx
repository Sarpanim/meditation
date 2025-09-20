import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardPage() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) redirect("/login");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Bonjour, <span className="font-mono">{user.email}</span>
        </h1>
        <SignOutButton />
      </div>

      {/* Ici viendra le contenu dynamique (programmes, sessions, etc.) */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border p-4">Bloc A</div>
        <div className="rounded-lg border p-4">Bloc B</div>
      </div>
    </div>
  );
}
