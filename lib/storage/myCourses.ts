import type { MyCourse } from "@/types/course";

const STORAGE_VERSION = 1;
export const MY_COURSES_STORAGE_KEY = `myCourses:v${STORAGE_VERSION}`;
export const MY_COURSES_UPDATED_EVENT = "mycourses:updated";

type StoragePayload = {
  version: number;
  courses: MyCourse[];
};

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function parsePayload(raw: string | null): MyCourse[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed: StoragePayload | MyCourse[] = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return parsed as MyCourse[];
    }

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "courses" in parsed &&
      Array.isArray((parsed as StoragePayload).courses)
    ) {
      return (parsed as StoragePayload).courses;
    }
  } catch (error) {
    console.warn("Impossible de parser le stockage myCourses", error);
  }

  return [];
}

function readStorage(): MyCourse[] {
  if (!isBrowser()) {
    return [];
  }

  const raw = window.localStorage.getItem(MY_COURSES_STORAGE_KEY);
  return parsePayload(raw);
}

function writeStorage(courses: MyCourse[]) {
  if (!isBrowser()) {
    return;
  }

  const payload: StoragePayload = {
    version: STORAGE_VERSION,
    courses,
  };

  window.localStorage.setItem(MY_COURSES_STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(
    new CustomEvent(MY_COURSES_UPDATED_EVENT, {
      detail: courses,
    }),
  );
}

export function listMyCourses(): MyCourse[] {
  return readStorage();
}

export function upsertMyCourse(courseId: string) {
  if (!isBrowser()) {
    return null;
  }

  const courses = readStorage();
  const existingIndex = courses.findIndex((course) => course.courseId === courseId);

  if (existingIndex >= 0) {
    const existing = courses[existingIndex];
    const updated: MyCourse = {
      ...existing,
      startedAt: existing.startedAt ?? new Date().toISOString(),
      progress: typeof existing.progress === "number" ? clampProgress(existing.progress) : 0,
    };
    courses[existingIndex] = updated;
    writeStorage(courses);
    return updated;
  }

  const created: MyCourse = {
    courseId,
    startedAt: new Date().toISOString(),
    progress: 0,
  };

  courses.push(created);
  writeStorage(courses);
  return created;
}

export function removeMyCourse(courseId: string) {
  if (!isBrowser()) {
    return;
  }

  const courses = readStorage();
  const next = courses.filter((course) => course.courseId !== courseId);
  writeStorage(next);
}

export function setProgress(courseId: string, value: number) {
  if (!isBrowser()) {
    return null;
  }

  const courses = readStorage();
  const index = courses.findIndex((course) => course.courseId === courseId);

  if (index === -1) {
    const created: MyCourse = {
      courseId,
      startedAt: new Date().toISOString(),
      progress: clampProgress(value),
    };
    courses.push(created);
    writeStorage(courses);
    return created;
  }

  const updated: MyCourse = {
    ...courses[index],
    progress: clampProgress(value),
  };

  courses[index] = updated;
  writeStorage(courses);
  return updated;
}

function clampProgress(value: number) {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}
