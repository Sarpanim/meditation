# Meditation

Base Next.js 14 (App Router) + TypeScript + Tailwind CSS, pensée mobile-first, avec un flux d’authentification Supabase (magic
link).

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

## Navigation

La barre de navigation reste cohérente sur mobile et desktop avec les sections principales suivantes :

- `Accueil`
- `Cours`
- `Dashboard`

Le bouton à droite s’adapte à l’état de session (`Login` ou `Logout`).

Sur le dashboard, la section **Mes cours** récupère automatiquement vos inscriptions locales et affiche une barre de
progression pour chaque parcours.

## Catalogue de cours

- Les données des cours sont stockées dans [`data/courses.ts`](data/courses.ts) et typées via
  [`types/course.ts`](types/course.ts). Le même shape sera réutilisé lors de la future connexion à Supabase.
- Les images de couverture sont servies depuis `/public/images/courses/` (placeholders SVG optimisés pour Next `<Image>`).
- La page [`/courses`](app/courses/page.tsx) propose des filtres par catégorie et niveau (query params) et des cartes
  interactives (`CourseCard`).
- La page détail [`/courses/[slug]`](app/courses/[slug]/page.tsx) présente le plan généré, le bouton **Démarrer** qui
  initialise le suivi dans `localStorage`, et les appels à l’action pour continuer le cours ou revenir au dashboard.
- L’état “Mes cours” s’appuie sur le stockage local versionné (`myCourses:v1`) via [`lib/storage/myCourses.ts`](lib/storage/myCourses.ts).
- Les composants réutilisables (`Badge`, `CourseHeader`, `CourseFilters`, `ProgressBar`, etc.) restent orientés Tailwind et
  mobile-first.

> À venir : une branche dédiée Supabase consommera ces mêmes types/structures pour remplacer les données locales.

## Authentification

L’application s’appuie désormais uniquement sur Supabase et l’envoi de liens magiques.

### Parcours Supabase (Magic Link)

- La page [`/login`](app/login/page.tsx) déclenche `supabase.auth.signInWithOtp` côté client et propose un message de confirmation.
- La route [`/auth/callback`](app/auth/callback/route.ts) échange le code renvoyé par Supabase, installe les cookies via
  `createRouteHandlerClient` puis redirige vers le dashboard (ou vers le paramètre `next` si présent).
- Le middleware (`middleware.ts`) utilise `createMiddlewareClient` pour rafraîchir la session et bloque l’accès à `/dashboard`
  tant qu’aucune session Supabase n’est disponible.
- La page [`/dashboard`](app/dashboard/page.tsx) fonctionne en SSR grâce à `getServerSupabase()` et redirige vers `/login` si
  l’utilisateur n’est pas authentifié.
- La route [`/logout`](app/logout/route.ts) appelle Supabase pour fermer la session avant de retourner sur l’accueil.

### Configuration requise

1. Installez les dépendances (`npm install`).
2. Renseignez les variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` (voir `.env.example`).
3. Dans votre projet Supabase, ajoutez les URL de rappel `https://votre-app.vercel.app/auth/callback` et
   `http://localhost:3000/auth/callback` pour le développement.
4. Redémarrez ou déployez l’application : les pages utilisent automatiquement la session Supabase, aucune modification
   supplémentaire n’est nécessaire.

> Sans configuration Supabase, l’accueil affiche un message invitant à renseigner les clés et le formulaire de connexion signalera
> l’échec de l’envoi du lien magique.

## Déploiement

Le projet est prêt pour un déploiement sur [Vercel](https://vercel.com/). Assurez-vous de définir les variables d’environnement
Supabase dans le dashboard Vercel si vous souhaitez utiliser l’authentification réelle.

## Structure

- `app/` – Pages App Router (`/`, `/login`, `/dashboard`) et layout global.
- `components/` – UI de base (Header, Button, CourseCard, CourseHeader, ProgressBar…).
- `components/dashboard` – composants spécifiques au tableau de bord (ex: liste “Mes cours”).
- `data/` – catalogue local de cours.
- `lib/` – utilitaires (clients Supabase, helpers, stockage local).
- `tailwind.config.ts` & `postcss.config.js` – configuration Tailwind CSS.

## Variables d’environnement

Copiez `.env.example` vers `.env.local` et complétez :

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Sans ces valeurs, l’accueil rappelle qu’il faut configurer Supabase et l’authentification restera inactive.
