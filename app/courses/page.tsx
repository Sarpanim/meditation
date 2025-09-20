import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-static";

export default async function CoursesPage() {
  const supabase = supabaseServer();
  const { data: courses } = await supabase
    .from("courses")
    .select("id,title,description,category,price_cents,published")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Catalogue des cours</h1>
      {!courses?.length ? (
        <p className="opacity-70">Aucun cours publié pour le moment.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses!.map((c) => (
            <li key={c.id} className="rounded-2xl border p-4 shadow-sm hover:shadow">
              <div className="text-sm uppercase opacity-60">{c.category || "Général"}</div>
              <h2 className="mt-1 text-lg font-medium">{c.title}</h2>
              <p className="mt-2 text-sm line-clamp-3">{c.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium">
                  {c.price_cents ? (c.price_cents / 100).toFixed(2) + " €" : "Gratuit"}
                </span>
                <Link
                  href={`/courses/${c.id}`}
                  className="rounded-xl bg-primary px-4 py-2 text-white hover:opacity-90"
                >
                  Voir
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
