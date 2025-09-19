import Link from "next/link";
import Button from "@/components/Button";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

type HeaderProps = {
  isAuthenticated: boolean;
};

export default function Header({ isAuthenticated }: HeaderProps) {
  async function handleLogout() {
    "use server";
    cookies().delete(AUTH_COOKIE_NAME);
  }

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-base font-semibold text-slate-900">
          Meditation
        </Link>
        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button href="/dashboard" variant="secondary">
                Tableau de bord
              </Button>
              <form action={handleLogout}>
                <Button type="submit">Se déconnecter</Button>
              </form>
            </>
          ) : (
            <Button href="/login">Se connecter</Button>
          )}
        </nav>
      </div>
    </header>
  );
}
