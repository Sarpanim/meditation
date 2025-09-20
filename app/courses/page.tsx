import CourseCard from "@/components/catalog/CourseCard";
import CourseFilters from "@/components/CourseFilters";
import Button from "@/components/Button";
import { COURSE_LEVEL_LABELS, getAllCourses } from "@/types/course";

const catalog = getAllCourses();
const categoryOptions = Array.from(new Set(catalog.map((course) => course.category)))
  .sort((a, b) => a.localeCompare(b))
  .map((category) => ({
    value: category,
    label: category,
  }));
const levelOptions = (Object.entries(COURSE_LEVEL_LABELS) as Array<[keyof typeof COURSE_LEVEL_LABELS, string]>).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

type CoursesPageProps = {
  searchParams: {
    category?: string;
    level?: string;
  };
};

export default function CoursesPage({ searchParams }: CoursesPageProps) {
  const selectedCategory = searchParams.category ?? "";
  const selectedLevel = searchParams.level ?? "";

  const filteredCourses = catalog.filter((course) => {
    const categoryMatch = !selectedCategory || course.category === selectedCategory;
    const levelMatch = !selectedLevel || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <section className="flex flex-col gap-6 py-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold sm:text-4xl">Tous les cours</h1>
        <p className="text-base text-slate-600 sm:text-lg">
          Explorez des parcours de méditation variés, adaptés à chaque niveau et à chaque moment de la journée.
        </p>
      </div>
      <CourseFilters
        categories={categoryOptions}
        levels={levelOptions}
        selectedCategory={selectedCategory}
        selectedLevel={selectedLevel}
      />
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold">Aucun cours ne correspond aux filtres sélectionnés.</p>
          <p className="text-sm text-slate-600">Essayez une autre catégorie ou un autre niveau pour découvrir davantage de contenus.</p>
          <Button href="/courses" variant="secondary">
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </section>
  );
}
