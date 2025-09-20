"use client";

import { useCallback } from "react";
import Button from "@/components/Button";
import { upsertMyCourse, setProgress } from "@/lib/storage/myCourses";

type StartCourseButtonProps = {
  courseId: string;
  courseTitle: string;
  className?: string;
};

export default function StartCourseButton({ courseId, courseTitle, className }: StartCourseButtonProps) {
  const handleStart = useCallback(() => {
    const entry = upsertMyCourse(courseId);

    if (!entry || entry.progress !== 0) {
      setProgress(courseId, 0);
    }
  }, [courseId]);

  return (
    <Button
      type="button"
      onClick={handleStart}
      className={className}
      aria-label={`Démarrer le cours ${courseTitle}`}
    >
      Démarrer
    </Button>
  );
}
