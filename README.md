# Pilar Vazquez — Film Composer Website

A minimal, white/black portfolio site built with plain HTML, CSS, and a touch
of JavaScript. No build tools or frameworks required — just open the files in
a browser or host them anywhere that serves static files.

## What's included

```
film-composer-site/
├── index.html      Home — single scrolling page: name, photo, playlist
├── music.html       Full portfolio / filmography page
├── about.html        Bio, photo, awards & press
├── contact.html        Contact form + social links
├── css/style.css       All styling — colors, fonts, layout
├── js/main.js         Nav toggle, contact form placeholder, playlist player
├── audio/              Placeholder tracks for the home page player
└── README.md          You are here
```

### About the home page

`index.html` is built as one scrolling page, per your brief: your name up top
in bold black-on-white type, a photo section under that, and a "Selected
Tracks" section with a real, working playlist player — click any track's
circular button to play/pause, and only one track plays at a time. Right now
it's wired to four silent placeholder MP3s in `/audio` (so you can see and
click through the player before you have real music loaded) — swap those
files for real tracks and it works exactly the same way with actual audio.

### About the fonts

You asked for the "Balimo" font for your name — that font's license is
personal-use only, so it isn't legally clear for a public/promotional site.
Instead, the site uses **Syne** for your name and headings (bold, geometric,
similar spirit to Balimo) and **Space Grotesk** for body/UI text — both are
free, open-license (SIL Open Font License) Google Fonts, safe for any use.
If you'd rather have the exact Balimo look, you (or your business) can buy
its commercial license from the foundry and send me the font file to
self-host instead — happy to swap it in.

Every page shares the same header, footer, and stylesheet, so editing
`css/style.css` updates the look of the whole site at once.

## 1. Replace the placeholder content

Everything you need to change is marked with *[Placeholder — ...]* text or
obviously-fake copy like "Title of Film One." Search each HTML file for the
word **"Placeholder"** and **"\[** to find every spot that needs your real
information:

- **Name & branding**: the `<title>` tags, `.nav-brand` links, and footer
  copyright line in all four files (already set to "Pilar Vazquez").
- **Home (`index.html`)**: hero subhead, the photo section text, and the
  four playlist track titles.
- **Music (`music.html`)**: each project card, the audio player blocks, and
  the filmography list at the bottom.
- **About (`about.html`)**: your bio paragraphs, the fact list (location,
  instruments, education, representation), and the awards/press cards.
- **Contact (`contact.html`)**: your real email address and social links.

### The hero background photo

The recording-session photo behind your name on the home page lives at
`images/hero-recording-session.jpg` and is set via inline `style` on the
`.hero.hero-photo` section in `index.html`:

```html
<section class="hero hero-photo" style="background-image: url('images/hero-recording-session.jpg');">
```

To swap it for a different photo, drop the new image into `images/` and
change that URL. The dark gradient overlay (in `css/style.css`, under
`.hero.hero-photo::before`) keeps the white text readable regardless of the
photo — darken or lighten it by adjusting the `rgba(10, 10, 10, ...)` opacity
values if a different photo needs more or less contrast.

### Adding your real photo (About / photo section)

On the home page, replace the `.photo-frame` div in `index.html` with an
`<img>` tag, e.g.:

```html
<img src="images/your-photo.jpg" alt="Pilar Vazquez" style="width:100%; aspect-ratio:4/5; object-fit:cover;" />
```

The About page has a similar circular `.avatar-frame` div you can replace
the same way. Drop your image files into the empty `images/` folder first.

### Adding your real music tracks

In `index.html`, each track in the playlist is one `.track` block:

```html
<div class="track" data-src="audio/track-01-placeholder.mp3">
  <button class="track-play" aria-label="Play Main Title Theme">
    <span class="icon-play"></span>
    <span class="icon-pause"></span>
  </button>
  <div class="track-info">
    <div class="track-title">Main Title Theme <em>[Placeholder Track One]</em></div>
    <div class="track-progress-bar"><div class="track-progress-fill"></div></div>
  </div>
  <div class="track-time" data-time>0:00</div>
</div>
```

To swap in a real track: drop your MP3 file into the `audio/` folder, change
`data-src` to point to it, and update the text inside `.track-title` (remove
the `<em>[Placeholder...]</em>` part). The duration shown on the right fills
in automatically once the browser reads the file — no need to type it in.
The player itself (play/pause, progress bar, only one track at a time) needs
no changes; it just works off whatever tracks are listed.

To add or remove tracks, copy/paste or delete a whole `.track` block.

### Adding real video

The Music page still uses placeholder `.media-frame` divs for video embeds.
Replace one with a real embed, e.g. for YouTube:

```html
<div style="aspect-ratio:16/9;">
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VIDEO_ID"
    title="Showreel" frameborder="0" allowfullscreen></iframe>
</div>
```

## 2. Connect the contact form

The form in `contact.html` doesn't send anywhere yet — it just shows a note
reminding you to hook it up. The two easiest no-backend options:

**Formspree** (https://formspree.io) — free tier available.
1. Create a free account and a new form, which gives you an endpoint like
   `https://formspree.io/f/xxxxxxx`.
2. In `contact.html`, change the form tag to:
   `<form id="contact-form" action="https://formspree.io/f/xxxxxxx" method="POST">`
3. Remove the `e.preventDefault()` block for this form in `js/main.js` (or
   just delete the whole `if (form)` block) so it submits normally.

**Netlify Forms** (if you host on Netlify) —
1. Add `data-netlify="true"` to the `<form>` tag.
2. Add a hidden input: `<input type="hidden" name="form-name" value="contact" />`
3. Netlify detects and handles the form automatically at deploy time — no
   endpoint needed.

## 3. Preview locally

Just double-click `index.html` to open it in your browser, or for a closer-
to-production preview, run a tiny local server from this folder:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## 4. Host it online

Since this is a static site (no server-side code), any static host works.
Two of the simplest, free options:

**GitHub Pages**
1. Create a new GitHub repository and push this folder's contents to it.
2. In the repo, go to Settings → Pages, set the source to your main branch
   (root folder), and save.
3. Your site will be live at `https://yourusername.github.io/repo-name/`.
4. Optional: add a custom domain in the same Pages settings screen.

**Netlify**
1. Go to https://app.netlify.com, sign up, and choose "Add new site →
   Deploy manually."
2. Drag this whole folder into the upload area.
3. Netlify gives you a live URL immediately, and lets you attach a custom
   domain from the site settings.

Both options are free for a personal site like this one and support HTTPS
and custom domains.

## Customizing the look

All colors, fonts, and spacing live at the top of `css/style.css` as CSS
variables:

```css
:root {
  --color-bg: #ffffff;      /* page background */
  --color-ink: #0f0f0f;      /* main text color */
  --color-accent: #4a4a4a;    /* underline/hover accents */
  --font-display: 'Syne', ...;         /* name & headings */
  --font-body: 'Space Grotesk', ...;  /* paragraph & UI text */
}
```

Change these values to re-skin the entire site without touching any HTML.
