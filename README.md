# Prashant Kumar Singh — Portfolio

A world-class personal brand website for a Software Engineer & Applied AI Engineer. Built with premium aesthetics inspired by Linear, Vercel, and Stripe.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **Premium Design** — Dark-mode-first, Linear-inspired aesthetics with subtle animations
- **Full Sections** — Hero, About, Experience, Projects, Skills, GitHub Dashboard, Achievements, Testimonials, Contact
- **Interactive UX** — Command palette (⌘K), theme toggle, cursor glow, scroll animations
- **API Integrations** — GitHub API, LeetCode Stats API with graceful fallbacks
- **SEO & Performance** — Open Graph images, sitemap, structured data, PWA manifest
- **Analytics** — Vercel Analytics + Google Analytics support

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Shadcn UI (Radix primitives)
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production site URL for SEO |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Your GitHub username |
| `NEXT_PUBLIC_LEETCODE_USERNAME` | Your LeetCode username |
| `GITHUB_TOKEN` | Optional GitHub token for API rate limits |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |

## Customization

### Personal Info

Edit `src/lib/constants.ts` for name, title, links, and contact info.

### Content

- **Experience & Timeline** — `src/lib/data/experience.ts`
- **Projects** — `src/lib/data/projects.ts`
- **Skills** — `src/lib/data/skills.ts`
- **Testimonials** — `src/lib/data/testimonials.ts`
- **Achievements** — `src/lib/data/achievements.ts`

### Assets

- Replace `public/resume.pdf` with your resume
- Add project screenshots to `public/projects/`
- Replace hero portrait placeholder in `src/components/sections/hero.tsx`

## Deployment (Vercel)

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# Or deploy via CLI
npm i -g vercel
vercel
```

Vercel Analytics is enabled automatically via `@vercel/analytics`.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/              # API routes (GitHub, LeetCode, Contact)
│   ├── layout.tsx        # Root layout with SEO & providers
│   └── page.tsx          # Main page
├── components/
│   ├── layout/           # Navbar, Footer, Command Palette, etc.
│   ├── sections/         # Page sections
│   ├── shared/           # Reusable components
│   └── ui/               # Shadcn UI components
├── lib/
│   ├── data/             # Content data
│   ├── constants.ts      # Site configuration
│   └── utils.ts          # Utilities
└── types/                # TypeScript types
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |

## License

MIT

---

Built with precision by **Prashant Kumar Singh**
