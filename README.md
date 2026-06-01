# Academic Portfolio — Civil Engineering & Structural Health Monitoring

A clean, modern, responsive personal academic website for a researcher in
bridge engineering, structural engineering and **Structural Health Monitoring (SHM)**.

- **No build step. No back-end. No frameworks to install.**
- All your content lives in **one file**: `js/data.js`.
- Works by simply opening `index.html`, and deploys to GitHub Pages, Netlify, or Vercel for free.

---

## 1. Folder structure

```
academic-website/
├── index.html              Page shell (rarely edited)
├── css/
│   └── styles.css          All design / theme (colors, layout, responsive)
├── js/
│   ├── data.js             ★ EDIT THIS — all your content lives here
│   ├── render.js           Reusable rendering ("components")
│   └── main.js             Navigation, animated bridge, lightbox, reveals
├── public/
│   ├── images/             Photos (bridge-hero.jpg, monitoring-system.jpg, …)
│   ├── videos/             Local videos (shm-demo.mp4, …)
│   ├── certificates/       Certificate images / PDFs
│   └── cv/                 cv.pdf
├── README.md               This file
└── .nojekyll               Tells GitHub Pages to serve files as-is
```

The site comes with **themed placeholder images, sample videos and a placeholder
CV**, so it looks complete immediately. Replace them with your own files
(keep the same names and the site updates automatically).

---

## 2. Preview it locally

**Easiest:** double-click `index.html` — it opens in your browser. Everything works offline
(the only thing that needs internet is the Google Fonts; the design still works without them).

**Recommended (avoids any browser quirks):** run a tiny local server from the project folder:

```bash
# Option A — Python (already on most machines)
python3 -m http.server 8000
# then open http://localhost:8000

# Option B — Node
npx serve
```

---

## 3. How to update content (no coding needed)

Open **`js/data.js`** in any text editor (VS Code, Notepad, TextEdit). The file is
organised into clearly-labelled sections that match the website. The rules:

- Change text → edit what's inside the `"quotes"`.
- Add an item → **copy** an existing `{ … }` block, paste it, edit it. Separate blocks with commas.
- Remove an item → delete its whole `{ … }` block (and the comma after it).
- Keep quotes `"` and commas `,` — they matter.

Save the file and refresh the page.

### Examples

**Add a publication** — inside the matching category's `items: [ … ]`, add:

```js
{ authors: "Researcher, J. A., Smith, B.", year: "2025",
  title: "Your new paper title",
  venue: "Journal Name, 12(3), 100–120",
  doi: "10.1234/abcd",   // optional → makes a DOI button
  pdf: "public/cv/paper.pdf",  // optional → PDF button
  link: "" },            // optional → external Link button
```

**Add a project** — inside `projects: [ … ]`, copy a block and edit the title,
status (`Ongoing` / `Completed` / `Planned`), objectives, etc.

**Add a certificate** — inside `certificates: [ … ]`:

```js
{ title: "Course name", org: "Issuing body", date: "2025",
  image: "public/certificates/my-cert.jpg",
  file: "public/certificates/my-cert.pdf" }, // optional PDF link
```

**Change your CV PDF** — replace `public/cv/cv.pdf` with your own file (same name).

---

## 4. How to add images and videos

Drop your file into the right folder, then point to it from `js/data.js`.

### Add an image (this site — HTML/JS)

1. Put the photo in `public/images/`, e.g. `public/images/new-bridge.jpg`.
2. Reference it. Each **gallery** card (`gallery: [ … ]`) has a category, title,
   description, and one media field — for an image, set `image`:

```js
{
  category: "Bridge photo",
  title: "New bridge site",
  description: "Inspection visit, spring 2026.",
  image: "public/images/new-bridge.jpg"
},
```

   In a **project** (`media:` field):

```js
media: { type: "image", src: "public/images/new-bridge.jpg" }
```

### Add a local video

1. Put the video in `public/videos/`, e.g. `public/videos/test.mp4`.
2. Use the `video` field (the `poster` image shows with a play button; the video
   loads when the visitor clicks it):

```js
{
  category: "Lab testing video",
  title: "Specimen vibration test",
  description: "Shaker-table experiment.",
  video: "public/videos/test.mp4",
  poster: "public/images/gallery-poster-lab.jpg"
},
```

### Embed a YouTube video

Take the ID from the URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → the ID is
`dQw4w9WgXcQ`. Use the `youtube` field (it embeds inline in the card):

```js
{
  category: "Project overview",
  title: "Project explainer",
  description: "Short overview of the monitoring campaign.",
  youtube: "dQw4w9WgXcQ"
},
```

> **Tip on image sizes:** for fast loading, keep photos around 1600 px wide and
> compress them (e.g. [squoosh.app](https://squoosh.app)). The hero photo
> (`public/images/bridge-hero.jpg`) looks best wide, ~1920×1080.

### If you ever migrate to React / Next.js

The same media, in JSX, would look like this (for reference — you do **not** need React for this site):

```jsx
// React / Next.js image
import Image from "next/image";
<Image src="/images/new-bridge.jpg" alt="New bridge site" width={1600} height={900} />

// Local video
<video controls poster="/images/video-poster.jpg">
  <source src="/videos/test.mp4" type="video/mp4" />
</video>

// YouTube embed
<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Project overview" allowFullScreen
  style={{ width: "100%", aspectRatio: "16 / 9", border: 0 }} />
```

---

## 5. Contact form

By default the form opens the visitor's email app pre-filled (works on a static site,
no setup). To receive messages **directly** without an email app:

1. Create a free form endpoint at [formspree.io](https://formspree.io) (or use Netlify Forms).
2. Paste the endpoint URL into `data.js` → `contact.formEndpoint: "https://formspree.io/f/xxxx"`.

The form then submits straight to your inbox.

---

## 6. Change the look

Open `css/styles.css`. The colors live at the very top under `:root` — change these
and the whole site updates:

```css
--ink:          #0f2438;  /* deep navy text / dark sections */
--steel:        #1d5a8a;  /* primary blue */
--steel-bright: #2f7cb8;  /* accent blue */
--concrete:     #5a6675;  /* grey body text */
--surface:      #f5f7f9;  /* off-white panels */
```

Fonts are loaded in `index.html` (Fraunces, IBM Plex Sans, IBM Plex Mono).

---

## 7. Deploy online (free)

You only need to upload the **whole `academic-website` folder**. Pick one host:

### Option A — Netlify (drag & drop, simplest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the `academic-website` folder onto the page.
3. Done — you get a live URL instantly. (Optional: add a custom domain in site settings.)

### Option B — Vercel
1. Push the folder to a GitHub repo (see below), then import it at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Other** / "No framework". Output directory: leave as root.
3. Deploy.

### Option C — GitHub Pages
1. Create a GitHub repository (e.g. `my-website`) and upload all files
   (keep `index.html` at the repo root). The included `.nojekyll` file is important — keep it.

   ```bash
   cd academic-website
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   choose branch `main` and folder `/ (root)`, then **Save**.
3. Your site appears at `https://USERNAME.github.io/REPO/` within a minute or two.

   - For a personal site at `https://USERNAME.github.io/` (no sub-path), name the repo `USERNAME.github.io`.

**To update later:** edit `js/data.js` (or add media), then re-upload / `git push`. The live site refreshes automatically.

---

## 8. Accessibility & SEO notes

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`), descriptive
  `alt` text, keyboard-accessible gallery and menu, visible focus styles, and
  `prefers-reduced-motion` support are built in.
- Edit the `<title>`, `<meta name="description">` and Open Graph tags at the top of
  `index.html` to match your name and research for better search/link previews.

---

*Built as a static site — fast, secure, free to host, and easy to maintain.*
