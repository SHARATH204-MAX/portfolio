# Sharath M — Developer Portfolio

A premium, unique developer portfolio with:
- **Three.js** animated particle field + floating 3D wireframe shapes
- **Typewriter effect** cycling through roles
- **Glassmorphism** cards, smooth gradients, scroll-reveal animations
- **Personal hero photo** with parallax overlay
- **Mobile responsive** layout

## Structure
```
protfolio/
├── index.html        # Main HTML
├── style.css         # All styles
├── script.js         # Three.js + interactions
├── vercel.json       # Vercel deploy config
└── assets/
    └── sharath.jpg   # Hero photo
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
- **Colors** → change CSS variables at the top of `style.css`
- **Photo** → replace `assets/sharath.jpg`
