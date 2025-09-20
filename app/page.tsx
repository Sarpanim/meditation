import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-6 py-12">
      <h1 className="text-3xl font-bold leading-tight">
        Construisez votre application de méditation en quelques minutes.
      </h1>
      <p className="max-w-prose text-muted-foreground">
        Base Next.js 14 optimisée mobile-first, Tailwind CSS, Supabase. Thème personnalisable en 1 variable.
      </p>
      <div className="flex gap-3">
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
