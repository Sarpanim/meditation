import Button from "@/components/Button";
import { isDemoAuthenticated } from "@/lib/auth";
import { getSupabaseClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  if (!isDemoAuthenticated()) {
    redirect("/login");
  }

  const supabase = getSupabaseClient();
  const demoMode = !supabase;

  return (
    <section className="flex flex-1 flex-col gap-6 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold sm:text-4xl">Tableau de bord</h1>
        <p className="text-base text-slate-600">
          Gérez vos sessions et contenus de méditation depuis un espace centralisé.
        </p>
      </div>

      {demoMode && (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Auth démo active : aucune connexion à Supabase n&apos;est effectuée. Configurez vos
          variables d&apos;environnement pour activer l&apos;authentification réelle.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Vos programmes</h2>
          <p className="mt-2 text-sm text-slate-600">
            Ajoutez vos parcours de méditation favoris et suivez la progression de vos
            utilisateurs.
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
