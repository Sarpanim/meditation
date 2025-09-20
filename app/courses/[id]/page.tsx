import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

type Params = { params: { id: string } };

export default async function CourseDetailPage({ params }: Params) {
  const supabase = supabaseServer();

  const [{ data: course }, { data: lessons }] = await Promise.all([
    supabase.from("courses").select("*").eq("id", params.id).maybeSingle(),
    supabase
      .from("lessons")
      .select("id,title,position")
      .eq("course_id", params.id)
      .order("position", { ascending: true }),
  ]);

  if (!course || !course.published) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <Link href="/courses" className="text-sm underline opacity-70 hover:opacity-100">
          ← Tous les cours
        </Link>
      </div>

      <h1 className="text-2xl font-semibold">{course.title}</h1>
      {course.description ? (
        <p className="mt-2 opacity-80">{course.description}</p>
      ) : null}

      <div className="mt-8">
        <h2 className="font-medium">Programme</h2>
        {!lessons?.length ? (
          <p className="opacity-70 mt-2">Le contenu arrive…</p>
        ) : (
          <ol className="mt-3 space-y-2">
            {lessons!.map((l) => (
              <li key={l.id} className="rounded-xl border p-3">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm">
                  {l.position}
                </span>
                {l.title}
              </li>
            ))}
          </ol>
        )}
      </div>

      <form action={`/courses/${params.id}/enroll`} method="post" className="mt-8">
        <button className="rounded-xl bg-primary px-5 py-2 text-white hover:opacity-90">
          S’inscrire à ce cours
        </button>
      </form>
    </main>
  );
}
