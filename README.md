# Nibakaran Veeramuththu — Portfolio

Personal portfolio website for Nibakaran Veeramuththu.  
Built with vanilla HTML, CSS and JavaScript. Deployable directly to GitHub Pages with no build step.

---

## File Structure

```
portfolio/
├── index.html       # Main HTML — all sections
├── style.css        # Design system + responsive layout
├── script.js        # Navigation, animations, contact form
├── robots.txt       # SEO crawler instructions
├── sitemap.xml      # SEO sitemap
├── README.md        # This file
└── assets/          # [CREATE THIS FOLDER]
    ├── nibakaran-cv.pdf        # [ADD YOUR CV]
    ├── portrait.webp           # [ADD YOUR PORTRAIT — recommended 640×760px, WebP]
    ├── favicon.svg             # [ADD FAVICON]
    ├── apple-touch-icon.png    # [ADD 180×180px PNG]
    ├── og-image.png            # [ADD 1200×630px Open Graph image]
    └── projects/
        ├── yaak-pipeline.webp
        ├── nds-visualisation.webp
        ├── llm-assistant.webp
        ├── investly.webp
        ├── aviation-dashboard.webp
        └── siragugal-silks.webp
```

---

## Before You Deploy — Placeholder Checklist

Replace every placeholder below before going live.

### Required

- [ ] **CV file** — Add `assets/nibakaran-cv.pdf`
- [ ] **Portrait** — Add `assets/portrait.webp` (recommended 640×760px)
- [ ] **Favicon** — Add `assets/favicon.svg` and `assets/apple-touch-icon.png`
- [ ] **OG image** — Add `assets/og-image.png` (1200×630px)
- [ ] **Project images** — Add images to `assets/projects/` for each of the 6 projects
- [ ] **Web3Forms key** — In `index.html`, find the hidden input `name="access_key"` and replace `[YOUR-WEB3FORMS-ACCESS-KEY]` with your real key from https://web3forms.com (free, no backend needed)
- [ ] **LinkedIn URL** — Replace `https://linkedin.com/in/nibakaran` with your actual LinkedIn profile URL in `index.html` and the footer
- [ ] **GitHub URL** — Replace `https://github.com/nibakaran` with your actual GitHub profile URL
- [ ] **Canonical URL** — In `index.html` `<head>`, update the canonical and OG URL meta tags to your real URL
- [ ] **Sitemap URL** — Update the URL in `sitemap.xml` and `robots.txt` to match your deployed domain
- [ ] **JSON-LD schema** — Update `url` and `sameAs` fields in the `<script type="application/ld+json">` block

### Confirm / Fill In

- [ ] **Employment dates** — All `[CONFIRM DATE]` placeholders in the Experience section
- [ ] **Education years** — `[CONFIRM YEARS]` placeholders in the Education section
- [ ] **Project GitHub links** — Replace `[ ADD GITHUB LINK ]` placeholders on each project card
- [ ] **Project live demo links** — Replace `[ ADD LIVE DEMO ]` placeholders where relevant
- [ ] **SunExpress location** — `[CONFIRM LOCATION]` in the Experience section

---

## Contact Form Setup (Web3Forms)

1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email address and submit — you will receive an Access Key by email
3. Open `index.html` and find:
   ```html
   <input type="hidden" name="access_key" value="[YOUR-WEB3FORMS-ACCESS-KEY]" />
   ```
4. Replace `[YOUR-WEB3FORMS-ACCESS-KEY]` with the key from your email
5. Submissions will be sent directly to your inbox — no backend or server required

---

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `nibakaran.github.io` for a user site, or any repo name for a project site)
2. Push all files to the `main` branch
3. Go to **Settings → Pages**
4. Set Source to **Deploy from a branch** → `main` → `/ (root)`
5. GitHub will publish your site at `https://[username].github.io` or `https://[username].github.io/[repo-name]`
6. Update the canonical URL, sitemap and OG tags to match

---

## Customisation Notes

- **Colours** — all defined as CSS variables at the top of `style.css` under `:root`
- **Fonts** — Manrope (headings) and Inter (body) loaded from Google Fonts
- **Sections** — each section has a unique `id` matching the navigation links
- **Animations** — scroll-reveal uses `IntersectionObserver`; fully disabled for `prefers-reduced-motion` users
- **Form validation** — client-side only; Web3Forms performs server-side checks too

---

*Designed and built by Nibakaran Veeramuththu.*
