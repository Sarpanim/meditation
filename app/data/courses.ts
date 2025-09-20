// data/courses.ts
export type Course = {
  slug: string;
  title: string;
  summary: string;
  category: "sommeil" | "stress" | "concentration" | "compassion";
  level: "Débutant" | "Intermédiaire" | "Avancé";
  duration: number; // minutes
  audioUrl: string;
};

export const courses: Course[] = [
  {
    slug: "respiration-douce",
    title: "Respiration douce",
    summary: "Apaiser le système nerveux en 10 minutes.",
    category: "stress",
    level: "Débutant",
    duration: 10,
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    slug: "scan-du-corps",
    title: "Scan du corps",
    summary: "Relâcher les tensions du corps des pieds à la tête.",
    category: "concentration",
    level: "Intermédiaire",
    duration: 15,
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    slug: "compassion-active",
    title: "Compassion active",
    summary: "Cultiver la bienveillance envers soi et les autres.",
    category: "compassion",
    level: "Intermédiaire",
    duration: 12,
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    slug: "nuit-serene",
    title: "Nuit sereine",
    summary: "Préparer l’esprit au sommeil.",
    category: "sommeil",
    level: "Débutant",
    duration: 9,
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    slug: "marche-meditative",
    title: "Marche méditative",
    summary: "Ancrage et présence par le mouvement.",
    category: "concentration",
    level: "Avancé",
    duration: 14,
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    slug: "pause-consciente",
    title: "Pause consciente",
    summary: "3 minutes pour se recentrer.",
    category: "stress",
    level: "Débutant",
    duration: 3,
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    slug: "energie-matinale",
    title: "Énergie matinale",
    summary: "Démarrer la journée du bon pied.",
    category: "concentration",
    level: "Débutant",
    duration: 7,
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    slug: "silence-creatif",
    title: "Silence créatif",
    summary: "Ouvrir un espace d’inspiration.",
    category: "concentration",
    level: "Intermédiaire",
    duration: 11,
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    slug: "gestion-du-stress",
    title: "Gestion du stress",
    summary: "Observer et transformer les réactions automatiques.",
    category: "stress",
    level: "Avancé",
    duration: 16,
    audioUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
];

