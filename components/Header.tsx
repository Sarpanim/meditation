import Link from "next/link";

const navLinkClasses =
  "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-lg font-semibold lowercase tracking-tight text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          meditation
        </Link>
        <nav aria-label="Navigation principale">
          <Link href="/" className={navLinkClasses}>
            Accueil
          </Link>
        </nav>
      </div>
    </header>
  );
}
