import Button from "@/components/Button";
import { setDemoAuthCookie } from "@/lib/auth";
import { getSupabaseClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

const SUCCESS_QUERY = "status=magic-link";
const ERROR_QUERY_KEY = "error";

function buildRedirectUrl(path: string, query: string) {
  return query ? `${path}?${query}` : path;
}

type LoginPageProps = {
  searchParams?: {
    status?: string;
    error?: string;
  };
};

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = getSupabaseClient();
  const supabaseConfigured = Boolean(supabase);
  const status = searchParams?.status;
  const errorMessage = searchParams?.error;
  const decodedError = errorMessage ? safeDecode(errorMessage) : null;

  async function authenticate(formData: FormData) {
    "use server";

    const email = String(formData.get("email") ?? "").trim();

    if (!email) {
      redirect(buildRedirectUrl("/login", `${ERROR_QUERY_KEY}=` + encodeURIComponent("Veuillez saisir un e-mail valide.")));
    }

    const client = getSupabaseClient();

    if (!client) {
      setDemoAuthCookie();
      redirect("/dashboard");
    }

    try {
      const emailRedirectTo = process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/dashboard`
        : "http://localhost:3000/dashboard";

      const { error } = await client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo,
        },
      });

      if (error) {
        redirect(
          buildRedirectUrl(
            "/login",
            `${ERROR_QUERY_KEY}=` + encodeURIComponent(error.message || "Une erreur est survenue lors de l'envoi du lien."),
          ),
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Impossible d'envoyer le lien pour le moment.";
      redirect(buildRedirectUrl("/login", `${ERROR_QUERY_KEY}=` + encodeURIComponent(message)));
    }

    redirect(buildRedirectUrl("/login", SUCCESS_QUERY));
  }

  return (
    <section className="flex flex-1 flex-col justify-center gap-8 py-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Connexion</h1>
        <p className="text-base text-slate-600 sm:text-lg">
          {supabaseConfigured
            ? "Entrez votre e-mail pour recevoir un lien magique Supabase."
            : "Auth démo active : saisissez n'importe quel e-mail pour accéder au tableau de bord."}
        </p>
      </div>

      <form action={authenticate} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Adresse e-mail
          <input
            required
            name="email"
            type="email"
            placeholder="vous@example.com"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </label>
        <Button type="submit" className="w-full">
          Recevoir un lien magique
        </Button>
      </form>

      {status === "magic-link" && (
        <p className="rounded-xl bg-primary-50 px-4 py-3 text-sm text-primary-700">
          Nous vous avons envoyé un lien magique. Consultez votre boîte mail pour continuer.
        </p>
      )}

      {decodedError && (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {decodedError}
        </p>
      )}

      {!supabaseConfigured && (
        <p className="text-xs text-slate-500">
          Configurez les variables NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY pour utiliser Supabase.
        </p>
      )}
    </section>
  );
}
