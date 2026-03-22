# IEEE IAS PES ITSIC SBJC — Power Core Website

A Next.js 14 website with an underground power core boot experience, ambient SFX, and HUD navigation.

## Project Structure

```
ieee-ias-pes/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (wraps everything)
│   ├── page.tsx                  # Home page
│   ├── about/page.tsx
│   ├── events/page.tsx
│   ├── team/page.tsx
│   └── members-of-the-month/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── ClientShell.tsx       # Power-up gate + nav + particles wrapper
│   │   └── HudNav.tsx            # HUD navigation bar
│   ├── sections/
│   │   ├── PowerCore.tsx         # Boot screen with core sphere animation
│   │   ├── HomeSection.tsx       # Home page content + animated counters
│   │   ├── AboutSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── TeamSection.tsx
│   │   └── MembersOfMonthSection.tsx
│   └── ui/
│       ├── ParticlesCanvas.tsx   # Floating particle system (canvas)
│       └── LoadingBar.tsx        # Route-change progress bar
│
├── hooks/
│   └── useAudio.ts               # Web Audio API hook (all SFX + ambient)
│
├── lib/
│   ├── AudioContext.tsx          # React context for audio across all components
│   └── data.ts                   # All static content (events, team, etc.)
│
└── styles/
    └── globals.css               # CSS variables, animations, shared classes
```

## Setup & Run

### Requirements
- Node.js 18+ 
- npm or yarn

### Install
```bash
cd ieee-ias-pes
npm install
```

### Development
```bash
npm run dev
# Visit http://localhost:3000
```

### Production build
```bash
npm run build
npm start
```

## Customization

- **Colors** → `styles/globals.css` `:root` variables (`--green-bright`, `--green-deep`)
- **Content** → `lib/data.ts` (events, team members, stats, nav links)
- **Add pages** → Create `app/your-page/page.tsx` and add to `NAV_LINKS` in `lib/data.ts`
- **Sounds** → `hooks/useAudio.ts`

## Colors
- `#78BE20` — Bright lime green (primary glow, highlights)
- `#00843D` — Deep forest green (secondary depth)
- `#030803` — Near-black with green tint (background)
