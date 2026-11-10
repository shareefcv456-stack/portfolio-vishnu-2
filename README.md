# Vishnu R G — Executive Portfolio (V2)

A new portfolio site for Vishnu R G, CEO & Executive Director of RG Group. It is a separate project from V1 (`portfolio-foods`) and has its own design system: midnight navy, obsidian, heritage forest and warm ivory, with antique-champagne accents. Type is set in Playfair Display and Manrope.

All copy, figures, dates, contacts and photographs come from the original rgvishnu.com site and its profile. They live in `lib/content.ts` and `lib/articles.ts`. **Do not add facts the original site doesn't state.**

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP 3 and ScrollTrigger (through `@gsap/react`), Framer Motion and Lucide React.

## Routes

| Route | Content |
| --- | --- |
| `/` | Hero, introduction, enterprises, horizontal leadership timeline, recognition, global presence, philosophy, gallery, journal, contact |
| `/about` | Six-chapter biography, profile details, organisations, awards, FAQ |
| `/business` | Enterprises of RG Group, the full list of organisations, global presence |
| `/leadership` | Three generations, pinned horizontal timeline 1940–2025, verified figures and awards, philosophy |
| `/gallery` | 29 photographs in a filterable masonry grid with a keyboard-accessible lightbox |
| `/journal`, `/journal/[slug]` | Four articles, each with a reading layout |
| `/contact` | Contact details, a form that opens the visitor's mail app, and a map |

The old URLs (`/index`, `/blog`, `/blog-details`, `*.html` and so on) redirect permanently to the new routes. See `next.config.ts`.

## Commands

```bash
npm install        # install dependencies (Node >= 20.9)
npm run dev        # development server → http://localhost:3000
npm run typecheck  # TypeScript check
npm run lint       # ESLint
npm run build      # production build
npm start          # serve the production build
```

## Deploy

**Vercel (recommended):** push this folder to a Git repository, import it at vercel.com/new and keep the defaults (framework: Next.js). No environment variables are needed.

**Any Node host:** run `npm ci && npm run build && npm start`. The `PORT` environment variable sets the port.

## Notes

- The animation helpers are in `components/animations/`. Every GSAP effect sits inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` and is cleaned up by `useGSAP`, so visitors who prefer reduced motion see the finished state straight away.
- There is no custom cursor, no element that follows the mouse and no floating image preview.
- The contact form uses `mailto:` to send to Office@rgvishnu.com. To deliver messages server-side, swap it for an API route.
- The global-presence map shows only the places the original record names: Calicut, the GCC and China (RG Links Limited).
