# Prashant Kumar Singh — Portfolio

A personal brand website for a Software Engineer & Applied AI Engineer. Built with premium aesthetics inspired by Linear, Vercel, and Stripe.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-f38020)

## Features

- **Premium Design** — Dark-mode-first, Linear-inspired aesthetics with subtle animations
- **Sections** — Hero, About, Experience, Projects, Skills, GitHub Dashboard, Achievements, Contact
- **Interactive UX** — Command palette (⌘K), theme toggle, custom cursor, scroll animations
- **API Integrations** — GitHub API and LeetCode Stats API with graceful fallbacks
- **SEO & Performance** — Open Graph image, sitemap, robots.txt, PWA manifest
- **Analytics** — Vercel Analytics + optional Google Analytics

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- Shadcn UI (Radix primitives)
- Lucide Icons
- Deployed on Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production site URL (SEO, sitemap, Open Graph) |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub username for the dashboard |
| `NEXT_PUBLIC_LEETCODE_USERNAME` | LeetCode username for stats |
| `GITHUB_TOKEN` | Optional GitHub token for higher API rate limits |
| `NEXT_PUBLIC_GA_ID` | Optional Google Analytics measurement ID |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key for the contact form. If unset, submissions are logged instead of emailed. |
| `CONTACT_TO_EMAIL` | Destination for contact submissions (defaults to the owner's email) |
| `CONTACT_FROM_EMAIL` | Verified Resend sender (defaults to `onboarding@resend.dev`) |

## Customization

### Personal Info

Edit `src/lib/constants.ts` for name, title, links, and contact info.

### Content

- **Experience & Education** — `src/lib/data/experience.ts`
- **Projects** — `src/lib/data/projects.ts`
- **Skills** — `src/lib/data/skills.ts`
- **Achievements** — `src/lib/data/achievements.ts`

### Assets

- Resume: `public/Prashant_Kumar_Singh.pdf` (referenced by `resumeUrl` in `constants.ts`)
- Profile photo: `public/myphoto.jpeg` (referenced by `profileImage` in `constants.ts`)
- Project screenshots: add PNG/JPG/WebP files to `public/` and reference them in `projects.ts` (`images: ["/your-screenshot.png"]`). Projects with no real image fall back to a generated gradient card.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Build and preview on the Cloudflare Workers runtime locally |
| `npm run deploy` | Build and deploy to Cloudflare Workers |

## Deployment (Cloudflare Workers)

This project deploys to Cloudflare Workers using OpenNext. Configuration lives in
`wrangler.jsonc` and `open-next.config.ts`.

```bash
# Authenticate (one time)
npx wrangler login

# Build and deploy
npm run deploy
```

Set the environment variables above as Worker secrets/vars (via the Cloudflare
dashboard or `wrangler secret put`). Locally they are read from `.dev.vars` / `.env.local`.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/              # API routes (github, leetcode, contact)
│   ├── layout.tsx        # Root layout with SEO & providers
│   └── page.tsx          # Main page
├── components/
│   ├── layout/           # Navbar, Footer, Command Palette, etc.
│   ├── sections/         # Page sections
│   ├── shared/           # Reusable animation/visual components
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
