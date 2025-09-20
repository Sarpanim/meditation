// app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-6 py-12">
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
        Construisez votre application de méditation en quelques minutes.
      </h1>

      <p className="max-w-prose text-muted-foreground">
        Base Next.js 14 optimisée mobile-first, Tailwind CSS et Supabase. Thème
        personnalisable en une variable.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href="/login">
          <Button>Se connecter</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="secondary">Tableau de bord</Button>
        </Link>
      </div>
    </section>
  );
}
