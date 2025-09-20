import CourseCard from "@/components/CourseCard";
import { supabaseServer } from "@/lib/supabase-server";

export const revalidate = 30; // ISR léger

export default async function CoursesPage() {
  const supabase = supabaseServer();

  const { data: courses, error } = await supabase
    .from("courses")
    .select("id,title,description,price_cents,created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Catalogue des cours</h1>

      {!courses?.length ? (
        <p className="text-muted-foreground">Aucun cours publié pour le moment.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses!.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </main>
  );
}
