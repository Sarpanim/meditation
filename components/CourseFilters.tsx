"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
};

type CourseFiltersProps = {
  categories: Option[];
  levels: Option[];
  selectedCategory?: string;
  selectedLevel?: string;
};

export default function CourseFilters({ categories, levels, selectedCategory, selectedLevel }: CourseFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryOptions = useMemo(() => [{ value: "", label: "Toutes les catégories" }, ...categories], [categories]);
  const levelOptions = useMemo(() => [{ value: "", label: "Tous les niveaux" }, ...levels], [levels]);

  const updateQuery = (key: "category" | "level", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <form className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="flex w-full flex-col gap-1 sm:w-auto">
        <label htmlFor="category" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Catégorie
        </label>
        <select
          id="category"
          name="category"
          value={selectedCategory ?? ""}
          onChange={(event) => updateQuery("category", event.target.value)}
          className={cn(
            "w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
          )}
          aria-label="Filtrer par catégorie"
        >
          {categoryOptions.map((option) => (
            <option key={option.value || "all"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full flex-col gap-1 sm:w-auto">
        <label htmlFor="level" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Niveau
        </label>
        <select
          id="level"
          name="level"
          value={selectedLevel ?? ""}
          onChange={(event) => updateQuery("level", event.target.value)}
          className={cn(
            "w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
          )}
          aria-label="Filtrer par niveau"
        >
          {levelOptions.map((option) => (
            <option key={option.value || "all"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
