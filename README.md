# Sharath M — Developer Portfolio

A premium, resume-accurate developer portfolio built from scratch with a custom
"aurora-on-obsidian" design system.

## Highlights

- **Design system** — layered token architecture (`--sh-1` → `--sh-5` elevation
  scale, glow + rim shadows, aurora gradients) for depth that reads clearly on
  every surface
- **Dual themes** — full dark & light modes driven by shared CSS variables
- **Three.js** animated particle field + floating 3D wireframe shapes
  (auto-disabled under `prefers-reduced-motion`)
- **Typewriter effect** cycling through roles
- **Hand-crafted SVG project visuals** — console mockup (SynapseSQL),
  microservices architecture diagram (FitMe), VGG16 pipeline (Kidney Disease)
- **Scroll-reveal animations**, tilt cards, custom cursor, accessible
  focus-visible rings, `prefers-reduced-motion` support
- **Mobile responsive** layout with hamburger nav (Escape closes it)
- **SEO / structured data** — Open Graph tags, JSON-LD `Person` schema, favicon
- **Resume-synced content** — CGPA 8.95, all 3 projects, expanded skills,
  certifications, two contact emails, AI Data Associate internship focus

## Structure

```
protfolio/
├── index.html                 # Main HTML (all content + JSON-LD)
├── style.css                  # Design tokens, dual themes, components
├── script.js                  # Three.js, typewriter, nav, reveals, cursor
├── vercel.json                # Vercel deploy config
├── .gitignore
├── README.md
└── assets/
    ├── sharath_new.jpg        # Hero portrait
    ├── sharath-m-resume.pdf   # Resume served by download buttons
    └── logos/                 # 52 local tech-stack SVGs (no CDN calls)
```

## Run Locally

Open `index.html` directly in a browser, OR use a local server:

```bash
npx serve .
```

Then open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new
3. Import your GitHub repo.
4. Vercel auto-detects it as a static site — click **Deploy**.
5. Your live URL will be: `https://your-project.vercel.app`

## Customise

- **Resume data** → edit sections in `index.html`
- **Colors / shadows** → change the CSS variables in the `:root` (and
  `[data-theme="light"]`) token blocks at the top of `style.css`
- **Photo** → replace `assets/sharath_new.jpg`
- **Resume PDF** → replace `assets/sharath-m-resume.pdf` (keep the filename)
