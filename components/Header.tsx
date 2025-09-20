"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/components/ui/cn";

const NAV = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/courses", label: "Catalogue" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4">
        <Link
          href="/"
          className="mr-4 whitespace-nowrap text-sm font-semibold tracking-tight"
        >
          Meditation
        </Link>

        <nav className="flex-1 overflow-x-auto">
          <ul className="flex items-center gap-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                    "hover:text-primary",
                    pathname?.startsWith(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </header>
  );
}
