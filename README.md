# Ephraim Daniel — Portfolio

Personal portfolio site built as an editorial web experience rather than a typical startup landing page.

## Design Direction

The site is art-directed like a digital magazine spread:

- **Playfair Display** (serif) for headlines, **Inter** (sans) for body text
- Warm ivory background, charcoal typography, muted rust accent
- Asymmetric layouts, dramatic whitespace, typographic hierarchy
- Scroll-reveal animations with gentle fade transitions
- Projects presented as editorial case studies, not feature cards

## Structure

| Section | Purpose |
|---|---|
| **Opening** | Full-viewport typographic statement |
| **Identity** | Asymmetric portrait + editorial introduction |
| **Selected Work** | Project case studies (challenge / approach / impact) |
| **Capabilities** | Studio-style capability list |
| **Voices** | Testimonial quotes with attribution |
| **Philosophy** | Short written manifesto |
| **Contact** | Email, LinkedIn, scheduling link |
| **Colophon** | Minimal footer |

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI layer |
| Vite | Dev server and build tool |
| Tailwind CSS v4 | Utility styling with `@theme` configuration |
| React Router v7 | Routing |
| ESLint + Prettier | Linting and formatting |

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
