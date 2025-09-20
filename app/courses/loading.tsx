export default function CoursesLoading() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="h-40 w-full animate-pulse rounded-xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-5 w-1/2 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
            </div>
            <div className="mt-auto space-y-2">
              <div className="h-10 animate-pulse rounded-full bg-slate-100" />
              <div className="h-10 animate-pulse rounded-full bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
