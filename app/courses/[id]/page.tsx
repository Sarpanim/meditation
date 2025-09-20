import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";

type Props = { params: { id: string } };

export default async function CourseDetailPage({ params }: Props) {
  const supabase = supabaseServer();

  const { data: course, error } = await supabase
    .from("courses")
    .select("id,title,description,price_cents,created_at,published")
    .eq("id", params.id)
    .single();

  if (error) throw new Error(error.message);
  if (!course || !course.published) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-muted-foreground">Cours introuvable.</p>
        <div className="mt-6">
          <Link className="underline" href="/courses">
            ← Retour au catalogue
          </Link>
        </div>
      </main>
    );
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id,title,content,position,created_at")
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  const price =
    typeof course.price_cents === "number"
      ? `${(course.price_cents / 100).toFixed(2)} €`
      : "Gratuit";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/courses" className="text-sm underline">
        ← Retour
      </Link>

      <h1 className="mt-2 text-3xl font-bold">{course.title}</h1>
      {course.description && (
        <p className="mt-2 text-muted-foreground">{course.description}</p>
      )}

      <div className="mt-4">
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
          {price}
        </span>
      </div>

      <section className="mt-8">
        <h2 className="mb-2 font-semibold">Programme</h2>
        {!lessons?.length ? (
          <p className="text-muted-foreground">Programme en cours de rédaction.</p>
        ) : (
          <ol className="space-y-3">
            {lessons!.map((l) => (
              <li key={l.id} className="rounded-xl border p-4">
                <div className="font-medium">
                  {l.position}. {l.title}
                </div>
                {l.content && (
                  <p className="mt-1 text-sm text-muted-foreground">{l.content}</p>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
