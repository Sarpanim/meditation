"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import ProgressBar from "@/components/ProgressBar";
import {
  MY_COURSES_STORAGE_KEY,
  MY_COURSES_UPDATED_EVENT,
  listMyCourses,
} from "@/lib/storage/myCourses";
import { formatDuration } from "@/lib/utils";
import { COURSE_LEVEL_LABELS, getAllCourses } from "@/types/course";
import type { Course, MyCourse } from "@/types/course";

type EnrichedCourse = MyCourse & { course: Course };

function mapCourses(courses: MyCourse[], catalog: Course[]): EnrichedCourse[] {
  const byId = new Map(catalog.map((course) => [course.id, course]));
  return courses
    .map((entry) => {
      const course = byId.get(entry.courseId);
      if (!course) {
        return null;
      }
      return { ...entry, course };
    })
    .filter((value): value is EnrichedCourse => value !== null);
}

export default function MyCoursesSection() {
  const catalog = useMemo(() => getAllCourses(), []);
  const [items, setItems] = useState<EnrichedCourse[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const refresh = () => {
      const list = listMyCourses();
      setItems(mapCourses(list, catalog));
      setHasHydrated(true);
    };

    refresh();

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== MY_COURSES_STORAGE_KEY) {
        return;
      }
      refresh();
    };

    const handleCustom = () => refresh();

    window.addEventListener("storage", handleStorage);
    window.addEventListener(MY_COURSES_UPDATED_EVENT, handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(MY_COURSES_UPDATED_EVENT, handleCustom);
    };
  }, [catalog]);

  if (!hasHydrated) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center shadow-sm">
        <span className="text-4xl" role="img" aria-label="Lotus">
          🪷
        </span>
        <h2 className="text-lg font-semibold">Aucun cours suivi pour l’instant</h2>
        <p className="text-sm text-slate-600">
          Explorez le catalogue pour démarrer un programme adapté à votre rythme.
        </p>
        <Button href="/courses" className="mx-auto w-full sm:w-auto">
          Parcourir les cours
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Mes cours</h2>
        <Button href="/courses" variant="secondary" className="hidden sm:inline-flex">
          Ajouter un cours
        </Button>
      </div>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.courseId} className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/courses/${item.course.slug}`}
                  className="text-base font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-primary-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  {item.course.title}
                </Link>
                <Badge variant="soft">{COURSE_LEVEL_LABELS[item.course.level]}</Badge>
              </div>
              <p className="text-sm text-slate-600">{item.course.subtitle}</p>
              <span className="text-xs font-medium text-slate-500">
                Durée totale : {formatDuration(item.course.durationMinutes)} · {item.course.lessonsCount} leçons
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:w-64">
              <ProgressBar value={item.progress ?? 0} label="Progression" />
              <Button
                href={`/courses/${item.course.slug}#plan`}
                variant="secondary"
                className="w-full"
                aria-label={`Continuer le cours ${item.course.title}`}
              >
                Continuer
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
