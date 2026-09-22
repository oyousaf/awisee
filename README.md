# AWISEE

A ground-up rebuild of [awisee.com](https://awisee.com) — a link building, SEO, digital PR and influencer marketing agency operating across 35+ countries.

The previous site ran on WordPress + WPML, with over 60 near-duplicate hand-authored pages for country-specific link building offerings. This rebuild replaces that with a statically generated, content-collection-driven site: one template per page type, real content, and no CMS runtime dependency.

## Stack

- **Astro 7** (static output, TypeScript strict) — content-first architecture; ships no JS by default, hydrates only the specific widgets that need it
- **Tailwind CSS v4** (CSS-first config) for the design system
- **React** islands for the few interactive pieces (booking form, case-study filter, mobile nav)
- **Astro Content Collections** for services, regional pages, blog posts and testimonials — edited as Markdown/MDX in this repo, not through a CMS
- **Vercel** adapter for deployment

## Scope

- Full copy rewrite in UK English, replacing generic agency boilerplate with the agency's actual credibility markers (client roster, stats, testimonials, founder quote)
- One dynamic route (`/link-building/[country]`) driven by per-country content files, replacing the old site's 60+ manually built regional pages
- A distinctive visual identity (violet-magenta + lime accent on an ink/paper base) built to read as confident and a little quirky, not template-agency generic
- Dark mode, native scroll-driven animation, and a Lighthouse-first performance bar, since site performance is part of what this agency sells

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro check` | Type-check `.astro`/`.ts`/`.tsx` files |
