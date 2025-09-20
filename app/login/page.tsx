"use client";

import { useState } from "react";
import supabase from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState<null | "ok" | "err">(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSent(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setSent("ok");
    } catch {
      setSent("err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Connexion</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-muted-foreground">Adresse e-mail</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@example.com"
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Recevoir un lien magique"}
        </button>
      </form>

      {sent === "ok" && (
        <p className="mt-4 text-sm text-green-600">
          Lien envoyé ! Consulte ton e-mail et clique sur “Se connecter”.
        </p>
      )}
      {sent === "err" && (
        <p className="mt-4 text-sm text-red-600">
          Impossible d’envoyer l’e-mail. Vérifie la configuration Supabase Email.
        </p>
      )}

      <p className="mt-8 text-xs text-muted-foreground">
        Astuce: dans Supabase → Authentication → URL Configuration :
        <br />
        Site URL = <code>{`https://meditation-dusky-three.vercel.app`}</code>
        <br />
        Redirect URLs incluent <code>/auth/callback</code>
      </p>
    </div>
  );
}
