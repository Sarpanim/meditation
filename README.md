# Meditation

Base Next.js 14 (App Router) + TypeScript + Tailwind CSS, pensée mobile-first, avec un flux d’authentification démo basé sur un cookie et un stub Supabase optionnel.

## Prérequis

- Node.js 18 (voir `.nvmrc`)
- npm 9+

## Installation et développement

```bash
npm install
npm run dev
```

L’application est servie sur [http://localhost:3000](http://localhost:3000).

## Scripts npm

- `npm run dev` – lance le serveur de développement Next.js sur le port 3000.
- `npm run build` – construit l’application sans bloquer sur ESLint ni TypeScript.
- `npm run start` – démarre la version production sur le port `PORT` (3000 par défaut).
- `npm run lint` – exécute ESLint avec la configuration minimale fournie.

## Authentification démo & Supabase

Par défaut, l’application utilise un cookie non persistant pour simuler l’authentification et protéger `/dashboard`.

Pour activer Supabase :

1. Installez le SDK Supabase (`npm install @supabase/supabase-js`) si ce n’est pas déjà fait.
2. Renseignez les variables d’environnement (voir `.env.example`).
3. Relancez le serveur (`npm run dev`).
4. Le formulaire `/login` déclenchera `supabase.auth.signInWithOtp` pour envoyer un magic link. En l’absence de variables ou du SDK, le mode démo reste actif et vous redirige immédiatement vers le dashboard.

Désactiver le mode démo : supprimez les variables d’environnement Supabase pour revenir à l’authentification cookie.

## Déploiement

Le projet est prêt pour un déploiement sur [Vercel](https://vercel.com/). Assurez-vous de définir les variables d’environnement Supabase dans le dashboard Vercel si vous souhaitez utiliser l’authentification réelle.

## Structure

- `app/` – Pages App Router (`/`, `/login`, `/dashboard`) et layout global.
- `components/` – UI de base (Header, Button).
- `lib/` – utilitaires (auth cookie, stub Supabase).
- `tailwind.config.ts` & `postcss.config.js` – configuration Tailwind CSS.

## Variables d’environnement

Copiez `.env.example` vers `.env.local` et complétez si nécessaire :

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Sans ces valeurs, l’application reste en mode démonstration.
