import Badge from "@/components/Badge";
import Button from "@/components/Button";

export type CourseCardCourse = {
  id: string;
  title: string;
  description: string | null;
  published: boolean | null;
  profiles: {
    full_name: string | null;
  } | null;
};

export function getInstructorName(course: CourseCardCourse): string {
  const name = course.profiles?.full_name?.trim();
  return name && name.length > 0 ? name : "Équipe Meditation";
}

export default function CourseCard({ course }: { course: CourseCardCourse }) {
  const instructorName = getInstructorName(course);

  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md focus-within:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-slate-900">{course.title}</h2>
          <p className="line-clamp-3 text-sm text-slate-600">
            {course.description ?? "Ce cours ne dispose pas encore d'une description détaillée."}
          </p>
        </div>
        {course.published ? (
          <Badge variant="soft" className="uppercase tracking-wide text-xs font-semibold">
            Publié
          </Badge>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-500">par {instructorName}</p>
        <Button
          href={`/courses/${course.id}`}
          variant="secondary"
          className="w-full sm:w-auto"
          aria-label={`Voir le cours ${course.title}`}
        >
          Voir le cours
        </Button>
      </div>
    </article>
  );
}
