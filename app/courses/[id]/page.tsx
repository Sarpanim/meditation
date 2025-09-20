import Badge from "@/components/Badge";
import Button from "@/components/Button";
import {
  type CourseCardCourse,
  getInstructorName,
} from "@/components/CourseCard";
import { getServerSupabase } from "@/lib/supabase-server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const COURSE_SELECT = `
  id,
  title,
  description,
  price,
  published,
  profiles:profiles!courses_instructor_id_fkey ( full_name )
`;

const LESSONS_SELECT = `
  id,
  title,
  position
`;

type CourseDetail = CourseCardCourse & {
  price: number | null;
};

type Lesson = {
  id: string;
  title: string | null;
  position: number | null;
};

type CourseDetailPageProps = {
  params: {
    id: string;
  };
};

type CourseResult = {
  course: CourseDetail | null;
  error?: string;
  notConfigured: boolean;
};

type LessonsResult = {
  lessons: Lesson[];
  error?: string;
};

function isSupabaseConfigured(): boolean {
  return (
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "Gratuit";
  }

  const normalized = value >= 100 ? value / 100 : value;

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: normalized % 1 === 0 ? 0 : 2,
  }).format(normalized);
}

function summarize(text: string | null | undefined): string | undefined {
  if (!text) {
    return undefined;
  }

  const trimmed = text.trim();

  if (trimmed.length <= 160) {
    return trimmed;
  }

  return `${trimmed.slice(0, 157)}…`;
}

async function fetchCourse(courseId: string): Promise<CourseResult> {
  if (!isSupabaseConfigured()) {
    return {
      course: null,
      notConfigured: true,
    };
  }

  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_SELECT)
    .eq("id", courseId)
    .maybeSingle();

  if (error) {
    return {
      course: null,
      error: error.message ?? "Impossible de charger le cours.",
      notConfigured: false,
    };
  }

  return {
    course: (data as CourseDetail | null) ?? null,
    notConfigured: false,
  };
}

async function fetchLessons(courseId: string): Promise<LessonsResult> {
  if (!isSupabaseConfigured()) {
    return {
      lessons: [],
      error: "Configuration Supabase manquante.",
    };
  }

  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from("lessons")
    .select(LESSONS_SELECT)
    .eq("course_id", courseId)
    .order("position", { ascending: true });

  if (error) {
    return {
      lessons: [],
      error: error.message ?? "Impossible de charger le programme.",
    };
  }

  return {
    lessons: (data ?? []) as Lesson[],
  };
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { course, notConfigured } = await fetchCourse(params.id);

  if (!course) {
    const title = notConfigured
      ? "Configuration Supabase requise | Meditation"
      : "Cours introuvable | Meditation";
    const description = notConfigured
      ? "Configurez Supabase pour accéder au détail des cours."
      : "Le cours demandé est introuvable ou n'est pas publié.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
    };
  }

  const metadataDescription = summarize(course.description) ??
    "Découvrez un parcours de méditation guidée proposé par Meditation.";
  const title = `${course.title} | Meditation`;

  return {
    title,
    description: metadataDescription,
    openGraph: {
      title,
      description: metadataDescription,
      type: "website",
    },
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { course, error, notConfigured } = await fetchCourse(params.id);

  if (notConfigured) {
    return (
      <section className="flex flex-col gap-4 py-12">
        <h1 className="text-3xl font-bold sm:text-4xl">Configuration Supabase requise</h1>
        <p className="text-base text-slate-600">
          Ajoutez les variables <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs font-semibold text-slate-700">NEXT_PUBLIC_SUPABASE_URL</code>
          et
          <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs font-semibold text-slate-700">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
          pour activer le détail des cours.
        </p>
        <Button href="/" variant="secondary" className="w-full sm:w-auto">
          Retour à l'accueil
        </Button>
      </section>
    );
  }

  if (!course) {
    if (error) {
      return (
        <section className="flex flex-col gap-4 py-12">
          <h1 className="text-3xl font-bold sm:text-4xl">Impossible de charger le cours</h1>
          <p className="text-base text-slate-600">
            {error}
          </p>
          <Button href="/" variant="secondary" className="w-full sm:w-auto">
            Retour à l'accueil
          </Button>
        </section>
      );
    }

    notFound();
  }

  const instructorName = getInstructorName(course);
  const priceLabel = formatPrice(course.price);
  const description = course.description ??
    "Ce cours ne dispose pas encore d'une description détaillée. Revenez bientôt pour en savoir plus.";

  const { lessons, error: lessonsError } = await fetchLessons(course.id);

  return (
    <article className="flex flex-col gap-10 py-12">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{course.title}</h1>
          {course.published ? (
            <Badge variant="soft" className="uppercase tracking-wide text-xs font-semibold">
              Publié
            </Badge>
          ) : null}
        </div>
        <p className="text-base text-slate-600">par {instructorName}</p>
        <p className="text-xl font-semibold text-primary-600">{priceLabel}</p>
        <p className="text-base leading-relaxed text-slate-700">{description}</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/login" className="w-full sm:w-auto" aria-label={`S’inscrire au cours ${course.title}`}>
            S’inscrire
          </Button>
        </div>
        {lessonsError ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {lessonsError}
          </p>
        ) : null}
      </header>

      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="programme">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="programme" className="text-2xl font-semibold text-slate-900">
            Programme
          </h2>
          <span className="text-sm text-slate-500">{lessons.length} leçon{lessons.length > 1 ? "s" : ""}</span>
        </div>
        {lessons.length > 0 ? (
          <ol className="flex flex-col gap-3">
            {lessons.map((lesson, index) => {
              const order = lesson.position ?? index + 1;
              const title = lesson.title?.trim() || `Étape ${order}`;
              return (
                <li
                  key={lesson.id ?? `${order}-${title}`}
                  className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-semibold text-primary-600">{order.toString().padStart(2, "0")}</span>
                    <p className="text-base font-medium text-slate-800">{title}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="text-sm text-slate-600">Le programme arrive bientôt.</p>
        )}
      </section>
    </article>
  );
}
