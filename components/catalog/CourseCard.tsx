"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import {
  MY_COURSES_STORAGE_KEY,
  MY_COURSES_UPDATED_EVENT,
  listMyCourses,
  upsertMyCourse,
} from "@/lib/storage/myCourses";
import { formatDuration } from "@/lib/utils";
import { COURSE_LEVEL_LABELS } from "@/types/course";
import type { Course } from "@/types/course";

const levelBadgeVariant: Record<Course["level"], "soft" | "neutral" | "outline"> = {
  beginner: "soft",
  intermediate: "neutral",
  advanced: "outline",
};

export default function CourseCard({ course }: { course: Course }) {
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const hasCourse = listMyCourses().some((item) => item.courseId === course.id);
      setIsEnrolled(hasCourse);
    };

    updateState();

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== MY_COURSES_STORAGE_KEY) {
        return;
      }
      updateState();
    };

    const handleCustom = () => {
      updateState();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(MY_COURSES_UPDATED_EVENT, handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(MY_COURSES_UPDATED_EVENT, handleCustom);
    };
  }, [course.id]);

  const handleEnroll = useCallback(() => {
    upsertMyCourse(course.id);
    setIsEnrolled(true);
  }, [course.id]);

  const levelLabel = COURSE_LEVEL_LABELS[course.level];
  const durationLabel = formatDuration(course.durationMinutes);

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby={`course-${course.id}`}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={`Illustration du cours ${course.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Badge
              variant={levelBadgeVariant[course.level]}
              className="w-max uppercase tracking-tight"
              aria-label={`Niveau ${levelLabel}`}
            >
              {levelLabel}
            </Badge>
            <h3 id={`course-${course.id}`} className="text-lg font-semibold text-slate-900">
              {course.title}
            </h3>
            <p className="text-sm text-slate-600">{course.subtitle}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {course.lessonsCount} leçons
          </span>
        </div>
        <p className="text-sm font-medium text-slate-700">Durée estimée : {durationLabel}</p>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            href={`/courses/${course.slug}`}
            className="w-full sm:flex-1"
            aria-label={`Voir le détail du cours ${course.title}`}
          >
            Voir le cours
          </Button>
          <Button
            type="button"
            onClick={handleEnroll}
            variant="secondary"
            className="w-full sm:flex-1"
            disabled={isEnrolled}
            aria-label={
              isEnrolled
                ? `Cours ${course.title} déjà dans vos favoris`
                : `M'inscrire au cours ${course.title}`
            }
          >
            {isEnrolled ? "Inscrit" : "M’inscrire"}
          </Button>
        </div>
      </div>
    </article>
  );
}
