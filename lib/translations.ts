export const locales = ['es', 'fr', 'it'] as const;
export type Locale = (typeof locales)[number] | 'en';

export const navTranslations: Record<Locale, Record<string, string>> = {
  en: { writing: 'Writing', portfolio: 'Portfolio', projects: 'Projects', design: 'Design', photos: 'Photos', blog: 'Blog' },
  es: { writing: 'Artículos', portfolio: 'Portafolio', projects: 'Proyectos', design: 'Diseño', photos: 'Fotos', blog: 'Blog' },
  fr: { writing: 'Articles', portfolio: 'Portfolio', projects: 'Projets', design: 'Design', photos: 'Photos', blog: 'Blog' },
  it: { writing: 'Articoli', portfolio: 'Portfolio', projects: 'Progetti', design: 'Design', photos: 'Foto', blog: 'Blog' },
};

export const languageNames: Record<Locale, string> = {
  en: 'EN', es: 'ES', fr: 'FR', it: 'IT',
};

export const metadataTranslations: Record<Locale, Record<string, { title: string; description: string }>> = {
  en: {
    home: {
      title: 'Justin Abercrombia | Home',
      description: 'DevOps & platform engineer building cloud infrastructure with Terraform, CI/CD pipelines, and observability for fast, reliable web platforms.',
    },
    writing: {
      title: 'Justin Abercrombia | Writing',
      description: 'Articles on DevOps, infrastructure as code, Cloudflare, Terraform, observability, and AI-assisted engineering, published on Medium by Justin Abercrombia.',
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
      description: 'Ingeniero DevOps y de plataforma que construye infraestructura en la nube con Terraform, pipelines CI/CD y observabilidad para plataformas web fiables.',
    },
    writing: {
      title: 'Justin Abercrombia | Artículos',
      description: 'Artículos sobre DevOps, infraestructura como código, Cloudflare, Terraform, observabilidad e ingeniería asistida por IA, publicados en Medium.',
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
      description: "Ingénieur DevOps et plateforme : infrastructure cloud avec Terraform, pipelines CI/CD et observabilité pour des plateformes web rapides et fiables.",
    },
    writing: {
      title: 'Justin Abercrombia | Articles',
      description: "Articles sur le DevOps, l'infrastructure as code, Cloudflare, Terraform, l'observabilité et l'ingénierie assistée par IA, publiés sur Medium.",
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
      description: 'Ingegnere DevOps e di piattaforma che costruisce infrastruttura cloud con Terraform, pipeline CI/CD e osservabilità per piattaforme web affidabili.',
    },
    writing: {
      title: 'Justin Abercrombia | Articoli',
      description: "Articoli su DevOps, infrastruttura come codice, Cloudflare, Terraform, osservabilità e ingegneria assistita dall'IA, pubblicati su Medium.",
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

type PipelineStage = { name: string; body: string };

export const homeTranslations: Record<Locale, {
  eyebrow: string;
  heading1: string;
  heading2: string;
  heading3: string;
  subtitle: string;
  pipelineLabel: string;
  pipeline: PipelineStage[];
  writing: string;
  allArticles: string;
  experience: string;
  skills: string;
  certifications: string;
  current: string;
  present: string;
}> = {
  en: {
    eyebrow: 'Available for work',
    heading1: 'DevOps &',
    heading2: 'Platform',
    heading3: 'Engineer',
    subtitle: 'I build and run the infrastructure behind fast web platforms: Terraform-managed cloud, CI/CD pipelines that test before they ship, and observability that catches problems before users do.',
    pipelineLabel: 'How I ship',
    pipeline: [
      { name: 'Plan', body: 'Infrastructure defined in Terraform and reviewed like any other code.' },
      { name: 'Build', body: 'Reproducible builds with Docker and GitHub Actions, cached and fast.' },
      { name: 'Test', body: 'Playwright and Cypress suites gate every merge. Nothing ships untested.' },
      { name: 'Deploy', body: 'Preview environments per branch, then zero-downtime releases to the edge.' },
      { name: 'Observe', body: 'Dashboards, logs, and alerts in Datadog and Grafana that surface issues first.' },
    ],
    writing: 'Latest writing',
    allArticles: 'All articles',
    experience: 'Experience',
    skills: 'Skills',
    certifications: 'Certifications',
    current: 'Current',
    present: 'Present',
  },
  es: {
    eyebrow: 'Disponible para trabajar',
    heading1: 'Ingeniero',
    heading2: 'DevOps',
    heading3: 'y de Plataforma',
    subtitle: 'Construyo y opero la infraestructura detrás de plataformas web rápidas: nube gestionada con Terraform, pipelines CI/CD que prueban antes de desplegar y observabilidad que detecta problemas antes que los usuarios.',
    pipelineLabel: 'Cómo despliego',
    pipeline: [
      { name: 'Planificar', body: 'Infraestructura definida en Terraform y revisada como cualquier otro código.' },
      { name: 'Construir', body: 'Builds reproducibles con Docker y GitHub Actions, rápidos y en caché.' },
      { name: 'Probar', body: 'Suites de Playwright y Cypress validan cada merge. Nada sale sin pruebas.' },
      { name: 'Desplegar', body: 'Entornos de vista previa por rama y lanzamientos sin interrupciones en el edge.' },
      { name: 'Observar', body: 'Dashboards, logs y alertas en Datadog y Grafana que detectan problemas primero.' },
    ],
    writing: 'Últimos artículos',
    allArticles: 'Todos los artículos',
    experience: 'Experiencia',
    skills: 'Habilidades',
    certifications: 'Certificaciones',
    current: 'Actual',
    present: 'Presente',
  },
  fr: {
    eyebrow: 'Disponible pour travailler',
    heading1: 'Ingénieur',
    heading2: 'DevOps',
    heading3: '& Plateforme',
    subtitle: "Je construis et j'exploite l'infrastructure de plateformes web rapides : cloud géré avec Terraform, pipelines CI/CD qui testent avant de livrer et observabilité qui détecte les problèmes avant les utilisateurs.",
    pipelineLabel: 'Comment je livre',
    pipeline: [
      { name: 'Planifier', body: 'Infrastructure définie dans Terraform et relue comme tout autre code.' },
      { name: 'Construire', body: 'Builds reproductibles avec Docker et GitHub Actions, rapides et mis en cache.' },
      { name: 'Tester', body: 'Les suites Playwright et Cypress valident chaque merge. Rien ne part sans tests.' },
      { name: 'Déployer', body: "Environnements de preview par branche, puis mises en production sans interruption sur l'edge." },
      { name: 'Observer', body: 'Dashboards, logs et alertes dans Datadog et Grafana qui signalent les problèmes en premier.' },
    ],
    writing: 'Derniers articles',
    allArticles: 'Tous les articles',
    experience: 'Expérience',
    skills: 'Compétences',
    certifications: 'Certifications',
    current: 'Actuel',
    present: "Aujourd'hui",
  },
  it: {
    eyebrow: 'Disponibile per lavorare',
    heading1: 'Ingegnere',
    heading2: 'DevOps',
    heading3: '& Piattaforma',
    subtitle: "Costruisco e gestisco l'infrastruttura di piattaforme web veloci: cloud gestito con Terraform, pipeline CI/CD che testano prima del rilascio e osservabilità che individua i problemi prima degli utenti.",
    pipelineLabel: 'Come rilascio',
    pipeline: [
      { name: 'Pianificare', body: 'Infrastruttura definita in Terraform e revisionata come qualsiasi altro codice.' },
      { name: 'Compilare', body: 'Build riproducibili con Docker e GitHub Actions, veloci e in cache.' },
      { name: 'Testare', body: 'Le suite Playwright e Cypress validano ogni merge. Nulla viene rilasciato senza test.' },
      { name: 'Rilasciare', body: "Ambienti di anteprima per branch, poi rilasci senza downtime sull'edge." },
      { name: 'Osservare', body: 'Dashboard, log e alert in Datadog e Grafana che segnalano i problemi per primi.' },
    ],
    writing: 'Ultimi articoli',
    allArticles: 'Tutti gli articoli',
    experience: 'Esperienza',
    skills: 'Competenze',
    certifications: 'Certificazioni',
    current: 'Attuale',
    present: 'Oggi',
  },
};

export const writingTranslations: Record<Locale, {
  eyebrow: string;
  heading: string;
  headingSub: string;
  subtitle: string;
  sectionLabel: string;
  readOn: string;
  followOn: string;
  empty: string;
}> = {
  en: {
    eyebrow: 'Writing',
    heading: 'Notes from',
    headingSub: 'the pipeline',
    subtitle: 'Articles on infrastructure as code, edge platforms, observability, and AI-assisted engineering, published on Medium.',
    sectionLabel: 'Articles',
    readOn: 'Read on Medium',
    followOn: 'Follow on Medium',
    empty: 'Articles are temporarily unavailable here.',
  },
  es: {
    eyebrow: 'Artículos',
    heading: 'Notas desde',
    headingSub: 'el pipeline',
    subtitle: 'Artículos sobre infraestructura como código, plataformas edge, observabilidad e ingeniería asistida por IA, publicados en Medium.',
    sectionLabel: 'Artículos',
    readOn: 'Leer en Medium',
    followOn: 'Seguir en Medium',
    empty: 'Los artículos no están disponibles temporalmente aquí.',
  },
  fr: {
    eyebrow: 'Articles',
    heading: 'Notes depuis',
    headingSub: 'le pipeline',
    subtitle: "Articles sur l'infrastructure as code, les plateformes edge, l'observabilité et l'ingénierie assistée par IA, publiés sur Medium.",
    sectionLabel: 'Articles',
    readOn: 'Lire sur Medium',
    followOn: 'Suivre sur Medium',
    empty: 'Les articles sont temporairement indisponibles ici.',
  },
  it: {
    eyebrow: 'Articoli',
    heading: 'Note dalla',
    headingSub: 'pipeline',
    subtitle: "Articoli su infrastruttura come codice, piattaforme edge, osservabilità e ingegneria assistita dall'IA, pubblicati su Medium.",
    sectionLabel: 'Articoli',
    readOn: 'Leggi su Medium',
    followOn: 'Segui su Medium',
    empty: 'Gli articoli non sono temporaneamente disponibili qui.',
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
