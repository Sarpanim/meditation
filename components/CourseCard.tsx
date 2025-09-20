import Link from "next/link";

type Props = {
  course: {
    id: string;
    title: string;
    description?: string | null;
    price_cents?: number | null;
  };
};

export default function CourseCard({ course }: Props) {
  const price =
    typeof course.price_cents === "number"
      ? `${(course.price_cents / 100).toFixed(2)} €`
      : "Gratuit";

  return (
    <Link
      href={`/courses/${course.id}`}
      className="block rounded-2xl border p-5 transition hover:shadow-lg"
    >
      <h3 className="text-lg font-semibold">{course.title}</h3>
      {course.description && (
        <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
          {course.description}
        </p>
      )}
      <div className="mt-4 font-medium">{price}</div>
    </Link>
  );
}
