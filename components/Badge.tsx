"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "neutral" | "outline" | "soft";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

const styles: Record<BadgeVariant, string> = {
  neutral: "bg-slate-900/90 text-white",
  outline: "border border-slate-200 text-slate-700",
  soft: "bg-primary-50 text-primary-700",
};

export default function Badge({ children, className, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
