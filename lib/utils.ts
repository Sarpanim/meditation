export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDuration(minutes: number) {
  if (!Number.isFinite(minutes)) {
    return "--";
  }

  const totalMinutes = Math.max(0, Math.round(minutes));

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const remaining = totalMinutes % 60;

  if (remaining === 0) {
    return `${hours}h`;
  }

  return `${hours}h${remaining.toString().padStart(2, "0")}`;
}
