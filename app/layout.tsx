import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    template: "%s | Meditation",
    default: "Meditation",
  },
  description:
    "Meditation est une base Next.js prête pour démarrer rapidement une application avec authentification Supabase ou démo.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const isAuthenticated = cookies().get(AUTH_COOKIE_NAME)?.value === "true";

  return (
    <html lang="fr">
      <body className="bg-slate-50 text-slate-900">
        <Header isAuthenticated={isAuthenticated} />
        <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col px-4 pb-12 pt-6">
          {children}
        </main>
      </body>
    </html>
  );
}
