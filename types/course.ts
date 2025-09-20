import { courses } from "@/data/courses";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  level: CourseLevel;
  category: string;
  thumbnail: string;
  lessonsCount: number;
};

export type MyCourse = {
  courseId: Course["id"];
  startedAt: string;
  progress: number;
  lastLesson?: number;
};

export const COURSE_LEVEL_LABELS: Record<CourseLevel, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export function getAllCourses() {
  return courses;
}

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByCategory(category: string) {
  return courses.filter((course) => course.category === category);
}
