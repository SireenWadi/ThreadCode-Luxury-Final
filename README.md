# ThreadCode — Luxury AI Styling Platform

> "A luxury fashion AI platform, not a tech demo."

---

## Overview

ThreadCode is a full-stack Next.js application built with the **Quiet Luxury Tech** aesthetic. It delivers an immersive, editorial-grade fashion experience powered by a MySQL database, Prisma ORM, and Framer Motion animations.

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | Next.js 14 (App Router)             |
| Styling     | Tailwind CSS + CSS Custom Properties|
| Animations  | Framer Motion                       |
| Database    | MySQL + Prisma ORM                  |
| Language    | TypeScript                          |

---

## Folder Structure

```
threadcode/
├── prisma/
│   ├── schema.prisma          # MySQL schema
│   └── seed.ts                # 12 luxury item seeder
├── public/
│   ├── images/                # Fashion editorials & product shots
│   └── videos/
│       └── fashion-loop.mp4   # Hero cinematic loop
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── products/route.ts
│   │   │   └── orders/route.ts
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── compare/page.tsx
│   │   ├── quiz/page.tsx
│   │   ├── shop/page.tsx
│   │   ├── stylist/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── features/
│   │   │   ├── BeforeAfterSection.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   └── OccasionGrid.tsx
│   │   ├── layout/
│   │   │   └── Navigation.tsx
│   │   └── ui/
│   │       ├── CodeWatermark.tsx
│   │       └── ProductCard.tsx
│   ├── lib/
│   │   └── prisma.ts
│   └── types/
│       └── index.ts
├── .env.example
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your MySQL connection string:

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/threadcode"
```

### 3. Generate Prisma Client & Push Schema

```bash
npm run db:generate
npm run db:push
```

### 4. Seed the Database

```bash
npm run db:seed
```

This seeds **12 luxury items** across 3 occasions:
- Job Interview (4 pieces)
- Gym (4 pieces)
- Dinner Night (4 pieces)

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Required Assets

Place the following in `public/images/` and `public/videos/`:

### Hero & Cinematic
- `cinematic-hero.jpg` — Full-screen luxury editorial backdrop
- `fashion-loop.mp4` — Cinematic lifestyle video (autoplays muted)

### Occasion Covers
- `occasion-interview.jpg`
- `occasion-gym.jpg`
- `occasion-dinner.jpg`

### Before & After
- `before-outfit.jpg`
- `after-outfit.jpg`

### Product Images
- `lp-wool-blazer.jpg`
- `canali-trousers.jpg`
- `brioni-shirt.jpg`
- `eg-oxford.jpg`
- `veilance-top.jpg`
- `rc-jogger.jpg`
- `on-sneaker.jpg`
- `garmin-watch.jpg`
- `bc-turtleneck.jpg`
- `therow-trousers.jpg`
- `sl-chelsea.jpg`
- `tomwood-ring.jpg`

> See the **Image Asset Catalog** at the end for AI generation prompts.

---

## Features

| Feature                  | Description                                           |
|--------------------------|-------------------------------------------------------|
| Cinematic Hero           | 3-layer system: static image → video → soft overlay   |
| Body Shape Quiz          | 3-step quiz with visual body shape selectors          |
| Interactive Stylist      | Canvas with zones, compatibility score, AI advice     |
| Before & After Slider    | Draggable vertical comparison slider                  |
| Shop with Filters        | Filter by occasion and category                       |
| Tech-Spec Tooltips       | Hover on products to reveal code-style tag metadata   |
| Code Watermark           | 5% opacity code background — invisible aesthetic      |
| Glassmorphism Cards      | Ultra-thin silver borders, backdrop blur              |

---

## Design System

```
Background:    #121212 (Deep Charcoal)
Gold Accent:   #c9a97a
Silver Text:   #e8e8e4 (body), #b8b8b0 (muted)
Glass:         rgba(255,255,255,0.03) + 1px rgba(255,255,255,0.08) border
Serif:         Playfair Display
Sans:          Inter (weight 300–500)
Animations:    Framer Motion — slow, fluid, fabric-like
```
