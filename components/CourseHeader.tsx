"use client";

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

export default function CourseHeader({ course }: { course: Course }) {
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setIsEnrolled(listMyCourses().some((item) => item.courseId === course.id));
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
  }, [course.id]);

  const handleEnroll = useCallback(() => {
    upsertMyCourse(course.id);
    setIsEnrolled(true);
  }, [course.id]);

  const levelLabel = COURSE_LEVEL_LABELS[course.level];

  return (
    <header className="flex flex-col gap-6 rounded-3xl bg-white/80 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-wrap items-center gap-3">
        <Badge
          variant={levelBadgeVariant[course.level]}
          className="uppercase"
          aria-label={`Niveau ${levelLabel}`}
        >
          {levelLabel}
        </Badge>
        <Badge variant="outline">{course.category}</Badge>
        <Badge variant="outline">{course.lessonsCount} leçons</Badge>
        <Badge variant="outline">{formatDuration(course.durationMinutes)}</Badge>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{course.title}</h1>
        <p className="text-base text-slate-600 sm:text-lg">{course.subtitle}</p>
      </div>
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        {isEnrolled ? (
          <Button
            href="/dashboard"
            className="w-full sm:w-auto"
            aria-label={`Continuer le cours ${course.title} depuis le dashboard`}
          >
            Continuer depuis le dashboard
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleEnroll}
            className="w-full sm:w-auto"
            aria-label={`M'inscrire au cours ${course.title}`}
          >
            M’inscrire
          </Button>
        )}
        <Button href="#plan" variant="secondary" className="w-full sm:w-auto">
          Voir le plan
        </Button>
      </div>
    </header>
  );
}
