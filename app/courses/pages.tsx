"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { courses } from "@/data/courses";

export default function CoursesPage() {
  const search = useSearchParams();
  const router = useRouter();

  const q = (search.get("q") || "").toLowerCase();
  const cat = search.get("cat") || "";
  const level = search.get("level") || "";

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const okQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q);
      const okCat = !cat || c.category === cat;
      const okLv = !level || c.level === level;
      return okQ && okCat && okLv;
    });
  }, [q, cat, level]);

  function updateParam(name: string, value: string) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(name, value);
    else url.searchParams.delete(name);
    router.push(url.pathname + "?" + url.searchParams.toString());
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Catalogue</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {/* Recherche */}
        <input
          defaultValue={q}
          placeholder="Rechercher…"
          className="rounded-xl border p-2"
          onChange={(e) => updateParam("q", e.target.value)}
        />

        {/* Catégorie */}
        <select
          defaultValue={cat}
          className="rounded-xl border p-2"
          onChange={(e) => updateParam("cat", e.target.value)}
        >
          <option value="">Toutes catégories</option>
          <option value="sommeil">Sommeil</option>
          <option value="stress">Stress</option>
          <option value="concentration">Concentration</option>
          <option value="compassion">Compassion</option>
        </select>

        {/* Niveau */}
        <select
          defaultValue={level}
          className="rounded-xl border p-2"
          onChange={(e) => updateParam("level", e.target.value)}
        >
          <option value="">Tous niveaux</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
        </select>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            href={`/courses/${c.slug}`}
            className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow"
          >
            <div className="mb-2 text-sm text-slate-500">
              {c.category} • {c.level} • {c.duration} min
            </div>
            <h2 className="text-lg font-semibold">{c.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{c.summary}</p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-slate-500">
          Aucun cours ne correspond à votre recherche.
        </p>
      )}
    </section>
  );
}
