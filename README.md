# georgiedoesdesign.com

Your portfolio site. Static, no CMS, no monthly fee. Case studies are `.mdx`
files you edit like documents; images are files you drop in a folder.

Built with [Astro](https://astro.build). Hosted free on Cloudflare Pages.

**Read these in order:**

1. **DEPLOY.md** to get it live. Do this first, it is the one-time setup.
2. **EDITING.md** for how to change anything from your browser afterwards. No
   terminal, no installs.
3. **CONTENT-GUIDE.md** when you write a case study.

The section below is optional. You only need it if you want a live preview while
you type, and you can skip it entirely.

---

## Running it on your machine (optional)

You need Node 22 or newer ([download](https://nodejs.org)). Once, in this folder:

```bash
npm install
```

Then, whenever you want to work on the site:

```bash
npm run dev
```

Open http://localhost:4321. Save a file and the browser updates instantly.

To check the real production build before pushing:

```bash
npm run build && npm run preview
```

---

## Where everything lives

```
src/
  site.ts                     your name, email, CV link, nav. Start here.
  content/work/               one .mdx file per case study
  pages/
    index.astro               the home page (hero copy is in here)
    about.astro               the about page (all its text is at the top of the file)
    404.astro                 not-found page
    p/[...slug].astro         builds a page for every case study. Leave alone.
  components/
    Nav.astro  Footer.astro  WorkCard.astro  Logo.astro
    content/                  the building blocks you use inside case studies
  layouts/
    Base.astro                <head>, nav, footer
    CaseStudy.astro           the case study page shell
  styles/global.css           all colours, type sizes, spacing. One file.

public/                       anything in here is served as-is
  images/                     your photos and screenshots
  georgie-hewitt-cv.pdf       your CV
  favicon.svg
```

## The three things you will actually do

### 1. Add a case study

Copy an existing file in `src/content/work/` and rename it. The filename becomes
the URL: `partner-cart.mdx` becomes `/p/partner-cart`.

See **CONTENT-GUIDE.md** for the full list of front matter fields and layout
components.

### 2. Add images

Drop them in `public/images/work/<case-study-name>/` and reference them from the
top of the path, for example `/images/work/partner-cart/hero.png`.

Export at roughly:

| Slot            | Size            | Notes                                  |
| --------------- | --------------- | -------------------------------------- |
| Card thumbnail  | 1200 x 825px    | Shown on the home page grid            |
| Case study hero | 1400 x 1000px   | Sits beside the title                  |
| In-page figures | 1600px wide     | Height to suit                         |
| Portrait        | 612 x 720px     | `public/images/georgie.jpg`            |
| Social share    | 1200 x 630px    | `public/images/og-default.png`         |

Keep files under about 400KB each. PNG for UI screens, JPG for photos.

### 3. Change the look

Everything visual is a variable at the top of `src/styles/global.css`: colours,
type sizes, radii, page width. Change a value there and it updates site-wide.

---

## Placeholders to replace

The site ships with labelled placeholder images so you can see the layout. Each
one names the file that should replace it. To regenerate them after adding a new
image slot:

```bash
node scripts/make-placeholders.mjs
```

Still to swap in:

- `public/images/georgie.jpg` - your portrait
- `public/images/work/**` - every case study image
- `public/images/og-default.png` - the social share card
- `public/georgie-hewitt-cv.pdf` - your CV
- `src/components/Logo.astro` - your real logo mark

---

## Deploying

See **DEPLOY.md** for the one-time GitHub, Cloudflare Pages and Namecheap setup.
After that, every push to `main` publishes automatically.

---

## Optional improvements, if you ever want them

- **Self-host DM Sans.** Right now the font loads from Google Fonts. Downloading
  the woff2 files into `public/fonts/` and declaring `@font-face` in
  `global.css` removes a third-party request and makes first paint slightly
  faster.
- **A visual editor.** If editing `.mdx` files ever feels like friction,
  [Sveltia CMS](https://github.com/sveltia/sveltia-cms) can be added on top of
  these same files, giving you a browser admin at `/admin` without changing how
  anything is stored.
- **Analytics.** Cloudflare Web Analytics is free, privacy-friendly and needs no
  cookie banner. Turn it on in the Cloudflare dashboard.
