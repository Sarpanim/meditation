type ClassDictionary = Record<string, string | number | boolean | null | undefined>;

export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassValue[];

function toClassString(value: ClassValue): string {
  if (!value) return "";
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(toClassString).filter(Boolean).join(" ");
  }
  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([, v]) => Boolean(v))
      .map(([key]) => key)
      .join(" ");
  }
  return "";
}

export default function clsx(...inputs: ClassValue[]): string {
  return inputs.map(toClassString).filter(Boolean).join(" ");
}
