import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Meditation",
    template: "%s | Meditation",
  },
  description: "Base Next.js + Supabase, themable & rapide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <header className="border-b border-border">
            <div className="container flex h-14 items-center justify-between">
              <Link href="/" className="font-semibold">
                Meditation
              </Link>
              <nav className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">Tableau de bord</Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Se connecter</Button>
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main className="container py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
