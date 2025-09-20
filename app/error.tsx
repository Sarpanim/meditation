"use client";
export default function Error({ error }: { error: Error }) {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Oups…</h1>
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  );
}
