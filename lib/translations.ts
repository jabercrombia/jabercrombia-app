export const locales = ['es', 'fr', 'it'] as const;
export type Locale = (typeof locales)[number] | 'en';

export const navTranslations: Record<Locale, Record<string, string>> = {
  en: { portfolio: 'Portfolio', projects: 'Projects', design: 'Design', photos: 'Photos', blog: 'Blog' },
  es: { portfolio: 'Portafolio', projects: 'Proyectos', design: 'Diseño', photos: 'Fotos', blog: 'Blog' },
  fr: { portfolio: 'Portfolio', projects: 'Projets', design: 'Design', photos: 'Photos', blog: 'Blog' },
  it: { portfolio: 'Portfolio', projects: 'Progetti', design: 'Design', photos: 'Foto', blog: 'Blog' },
};

export const languageNames: Record<Locale, string> = {
  en: 'EN', es: 'ES', fr: 'FR', it: 'IT',
};

export const metadataTranslations: Record<Locale, Record<string, { title: string; description: string }>> = {
  en: {
    home: {
      title: 'Justin Abercrombia | Home',
      description: 'Front-End Specialist & Full-Stack Engineer building high-performance eCommerce and web applications with React, Salesforce Commerce, and DevOps infrastructure.',
    },
    portfolio: {
      title: 'Justin Abercrombia | Portfolio',
      description: 'A selection of web applications, eCommerce builds, and open-source projects.',
    },
    design: {
      title: 'Justin Abercrombia | Design',
      description: 'Visual design, brand systems, and UI work across web and print.',
    },
  },
  es: {
    home: {
      title: 'Justin Abercrombia | Inicio',
      description: 'Especialista Front-End e Ingeniero Full-Stack que construye aplicaciones web y eCommerce de alto rendimiento con React, Salesforce Commerce e infraestructura DevOps.',
    },
    portfolio: {
      title: 'Justin Abercrombia | Portafolio',
      description: 'Una selección de aplicaciones web, proyectos de eCommerce y proyectos de código abierto.',
    },
    design: {
      title: 'Justin Abercrombia | Diseño',
      description: 'Diseño visual, sistemas de marca y trabajo de UI para web e impresión.',
    },
  },
  fr: {
    home: {
      title: 'Justin Abercrombia | Accueil',
      description: 'Spécialiste Front-End & Ingénieur Full-Stack créant des applications web et eCommerce haute performance avec React, Salesforce Commerce et une infrastructure DevOps.',
    },
    portfolio: {
      title: 'Justin Abercrombia | Portfolio',
      description: "Une sélection d'applications web, de projets eCommerce et open-source.",
    },
    design: {
      title: 'Justin Abercrombia | Design',
      description: "Design visuel, systèmes de marque et travail UI pour le web et l'impression.",
    },
  },
  it: {
    home: {
      title: 'Justin Abercrombia | Home',
      description: 'Specialista Front-End e Ingegnere Full-Stack che sviluppa applicazioni web ed eCommerce ad alte prestazioni con React, Salesforce Commerce e infrastruttura DevOps.',
    },
    portfolio: {
      title: 'Justin Abercrombia | Portfolio',
      description: 'Una selezione di applicazioni web, progetti eCommerce e open-source.',
    },
    design: {
      title: 'Justin Abercrombia | Design',
      description: 'Design visivo, sistemi di brand e lavoro UI per il web e la stampa.',
    },
  },
};

export function generateHreflang(path: string): Record<string, string> {
  const base = process.env.SITE_URL ?? 'https://jabercrombia.com';
  const p = path.startsWith('/') ? path : `/${path}`;
  return {
    'en': `${base}${p}`,
    'es': `${base}/es${p}`,
    'fr': `${base}/fr${p}`,
    'it': `${base}/it${p}`,
    'x-default': `${base}${p}`,
  };
}

export function generateCanonical(path: string, locale: Locale): string {
  const base = process.env.SITE_URL ?? 'https://jabercrombia.com';
  const p = path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`);
  if (locale === 'en') return `${base}${p || '/'}`;
  return `${base}/${locale}${p}`;
}

export const portfolioTranslations: Record<Locale, {
  eyebrow: string;
  heading: string;
  headingSub: string;
  subtitle: string;
  sectionLabel: string;
}> = {
  en: {
    eyebrow: 'Work',
    heading: 'Portfolio',
    headingSub: 'Projects',
    subtitle: 'A selection of web applications, eCommerce builds, and open-source projects.',
    sectionLabel: 'Projects',
  },
  es: {
    eyebrow: 'Trabajo',
    heading: 'Portafolio',
    headingSub: 'Proyectos',
    subtitle: 'Una selección de aplicaciones web, proyectos de eCommerce y proyectos de código abierto.',
    sectionLabel: 'Proyectos',
  },
  fr: {
    eyebrow: 'Travail',
    heading: 'Portfolio',
    headingSub: 'Projets',
    subtitle: "Une sélection d'applications web, de projets eCommerce et open-source.",
    sectionLabel: 'Projets',
  },
  it: {
    eyebrow: 'Lavoro',
    heading: 'Portfolio',
    headingSub: 'Progetti',
    subtitle: 'Una selezione di applicazioni web, progetti eCommerce e open-source.',
    sectionLabel: 'Progetti',
  },
};

export const homeTranslations: Record<Locale, {
  eyebrow: string;
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
  subtitle: string;
  experience: string;
}> = {
  en: {
    eyebrow: 'Available for work',
    heading1: 'Full Stack',
    heading2: 'Engineer',
    heading3: 'and DevOps',
    heading4: 'Infrastructure',
    subtitle: 'Building high-performance eCommerce and web applications. Specializing in React, Salesforce Commerce, and DevOps infrastructure.',
    experience: 'Experience',
  },
  es: {
    eyebrow: 'Disponible para trabajar',
    heading1: 'Ingeniero',
    heading2: 'Full Stack',
    heading3: 'e Infraestructura',
    heading4: 'DevOps',
    subtitle: 'Construyendo aplicaciones web y eCommerce de alto rendimiento. Especializado en React, Salesforce Commerce e infraestructura DevOps.',
    experience: 'Experiencia',
  },
  fr: {
    eyebrow: 'Disponible pour travailler',
    heading1: 'Ingénieur',
    heading2: 'Full Stack',
    heading3: 'et Infrastructure',
    heading4: 'DevOps',
    subtitle: "Création d'applications web et eCommerce haute performance. Spécialisé en React, Salesforce Commerce et infrastructure DevOps.",
    experience: 'Expérience',
  },
  it: {
    eyebrow: 'Disponibile per lavorare',
    heading1: 'Ingegnere',
    heading2: 'Full Stack',
    heading3: 'e Infrastruttura',
    heading4: 'DevOps',
    subtitle: 'Sviluppo di applicazioni web ed eCommerce ad alte prestazioni. Specializzato in React, Salesforce Commerce e infrastruttura DevOps.',
    experience: 'Esperienza',
  },
};

export const designTranslations: Record<Locale, {
  eyebrow: string;
  heading: string;
  headingSub: string;
  subtitle: string;
  sectionLabel: string;
}> = {
  en: {
    eyebrow: 'Creative work',
    heading: 'Design',
    headingSub: 'Portfolio',
    subtitle: 'Visual design, brand systems, and UI work across web and print.',
    sectionLabel: 'Projects',
  },
  es: {
    eyebrow: 'Trabajo creativo',
    heading: 'Diseño',
    headingSub: 'Portafolio',
    subtitle: 'Diseño visual, sistemas de marca y trabajo de UI para web e impresión.',
    sectionLabel: 'Proyectos',
  },
  fr: {
    eyebrow: 'Travail créatif',
    heading: 'Design',
    headingSub: 'Portfolio',
    subtitle: 'Design visuel, systèmes de marque et travail UI pour le web et l\'impression.',
    sectionLabel: 'Projets',
  },
  it: {
    eyebrow: 'Lavoro creativo',
    heading: 'Design',
    headingSub: 'Portfolio',
    subtitle: 'Design visivo, sistemi di brand e lavoro UI per il web e la stampa.',
    sectionLabel: 'Progetti',
  },
};

export function getLocaleFromPath(pathname: string): Locale {
  const first = pathname.split('/')[1] ?? '';
  return (locales as readonly string[]).includes(first) ? (first as Locale) : 'en';
}

export function getPathWithLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0] ?? '';
  const rest = (locales as readonly string[]).includes(first)
    ? segments.slice(1)
    : segments;
  if (locale === 'en') return rest.length ? `/${rest.join('/')}` : '/';
  return rest.length ? `/${locale}/${rest.join('/')}` : `/${locale}`;
}
