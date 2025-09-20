// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import SignOutButton from "@/components/SignOutButton";
import Button from "@/components/Button";

export default async function DashboardPage() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="mx-auto flex max-w-5xl flex-1 flex-col gap-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Tableau de bord
          <span className="block text-sm font-normal text-slate-500">
            Connecté : <span className="font-mono">{user?.email}</span>
          </span>
        </h1>
        <SignOutButton />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Vos programmes</h2>
          <p className="mt-2 text-sm text-slate-600">
            Ajoutez vos parcours de méditation favoris et suivez la progression de vos utilisateurs.
          </p>
          <Button className="mt-4 w-full" variant="secondary">
            Créer un programme
          </Button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Dernières sessions</h2>
          <p className="mt-2 text-sm text-slate-600">
            Visualisez rapidement les sessions terminées et les statistiques clés.
          </p>
          <Button className="mt-4 w-full" variant="secondary">
            Voir les sessions
          </Button>
        </div>
      </div>
    </section>
  );
}
