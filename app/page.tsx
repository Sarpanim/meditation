import Button from "@/components/Button";

export default function HomePage() {
  return (
    <section className="flex flex-1 flex-col justify-center gap-8 py-12">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-wide text-primary-600">
          Bienvenue
        </span>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          Construisez votre application de méditation en quelques minutes.
        </h1>
        <p className="text-base text-slate-600 sm:text-lg">
          Une base Next.js 14 optimisée mobile-first avec Tailwind CSS et un stub
          d&apos;authentification Supabase. Parfait pour démarrer rapidement.
        </p>
      </div>
      <div>
        <Button href="/login" className="w-full sm:w-auto">
          Se connecter
        </Button>
      </div>
    </section>
  );
}
