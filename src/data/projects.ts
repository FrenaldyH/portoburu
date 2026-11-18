import type { Project } from '../types'

// Your projects, shown top to bottom in this order (strongest first).
// Filled in: title, links, and tech taken from each repo. Still TODO: description and videoUrl.
// `year` is a guess from each repo's last commit date; correct it if needed.
// Improvement ideas per project: ../../../notes/project-review.md
export const projects: Project[] = [
  {
    title: 'Real Estate E-Commerce',
    // Source: the repo (internal/service/knowledge.go, routes/router.go, README contributors).
    description:
      'Property marketplace REST API built by a two-person team, with a layered handler-service-repository architecture and JWT auth. Its RAG chatbot embeds user questions with Gemini and searches listings, FAQs, and business info stored as vectors in pgvector before generating an answer.',
    year: '2026',
    tech: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'pgvector', 'Gemini API', 'Docker'],
    repoUrl: 'https://github.com/FrenaldyH/real-estate-ecommerce',
    // videoUrl: 'TODO: demo video link',
  },
  {
    title: 'CertSend',
    // Source: your LinkedIn post (Aug 2026). Add the exact number of certificates sent if you know it.
    description:
      'Desktop app I built as a student association staff member to email participation certificates to dozens of seminar attendees. It matches each certificate PDF to a name in a CSV roster, shows a review step before sending, and throttles delivery to stay under email provider limits; packaged as a .deb installer for Ubuntu.',
    year: '2026',
    tech: ['Go', 'Wails', 'React', 'TypeScript'],
    repoUrl: 'https://github.com/FrenaldyH/CertSend',
    // videoUrl: 'TODO: demo video link',
  },
  {
    title: 'Buddy',
    // Source: your LinkedIn post (Jul 2026).
    description:
      'Prototype platform connecting pet owners with walkers, sitters, and trainers, built in a three-person IoT team where I owned the web app. Includes provider search with an interactive map, a full booking flow with real-time pricing, and a Supabase backend secured with Row Level Security; the working prototype was finished in 2 days.',
    year: '2026',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Deno', 'Hono', 'PostgreSQL'],
    repoUrl: 'https://github.com/FrenaldyH/buddy-app',
    demoUrl: 'https://buddy-app-ivory-zeta.vercel.app',
    // videoUrl: 'TODO: demo video link',
  },
  {
    title: 'Minesweeper',
    // Source: your LinkedIn post (May 2026).
    description:
      'Web Minesweeper built for my Algorithm Design and Analysis course to apply graph algorithms in a real app: BFS explores cells and flood fill opens connected empty regions automatically.',
    year: '2026',
    tech: ['React', 'TypeScript'],
    repoUrl: 'https://github.com/FrenaldyH/minesweeper-game',
    demoUrl: 'https://minesweeper-game-frenaldy.vercel.app',
  },
  {
    title: 'Unfollow Tracker',
    // Source: the repo README.
    description:
      'Desktop app that reads an Instagram data export and lists the accounts you follow that do not follow you back. Everything runs locally, so your data never leaves your machine.',
    year: '2026',
    tech: ['Go', 'Fyne'],
    repoUrl: 'https://github.com/FrenaldyH/unfollow_tracker',
  },
  // Hidden until fixed (hardcoded JWT secret, committed database/log). See notes/project-review.md.
  // {
  //   title: 'ITS Riding Transport (IRiT)',
  //   description: 'TODO',
  //   year: '2025',
  //   tech: ['Go', 'Gin', 'GORM', 'SQLite', 'JWT'],
  //   repoUrl: 'https://github.com/FrenaldyH/ITS-Riding-Transport',
  // },
]
