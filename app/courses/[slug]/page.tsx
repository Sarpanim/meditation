"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { courses } from "@/data/courses";

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const course = useMemo(() => courses.find((c) => c.slug === slug), [slug]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);

  // Sauvegarde & reprise de la progression (localStorage)
  useEffect(() => {
    if (!course) return;
    const key = `progress:${course.slug}`;
    const el = audioRef.current;
    if (!el) return;

    const onLoaded = () => {
      const saved = localStorage.getItem(key);
      if (saved) {
        const t = Number(saved);
        if (!Number.isNaN(t)) {
          el.currentTime = t;
        }
      }
      setReady(true);
    };

    const onTime = () => {
      try {
        localStorage.setItem(key, String(el.currentTime));
      } catch {}
    };

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTime);
    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTime);
    };
  }, [course]);

  if (!course) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-slate-600">Cours introuvable.</p>
        <Link className="text-indigo-600 underline" href="/courses">
          ← Retour au catalogue
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <Link className="text-indigo-600 underline" href="/courses">
        ← Retour au catalogue
      </Link>

      <h1 className="mt-2 text-3xl font-bold">{course.title}</h1>
      <p className="mt-1 text-slate-600">{course.summary}</p>
      <div className="mt-2 text-sm text-slate-500">
        {course.category} • {course.level} • {course.duration} min
      </div>

      <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
        <audio
          ref={audioRef}
          controls
          preload="metadata"
          src={course.audioUrl}
          className="w-full"
        />
        {!ready && (
          <p className="mt-2 text-sm text-slate-500">
            Chargement des métadonnées audio…
          </p>
        )}
      </div>
    </section>
  );
}
