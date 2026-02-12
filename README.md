# 💝 Valentine's Day Website

A password-protected, animated Valentine's Day website built with **Next.js 14**, **TailwindCSS**, and **Framer Motion**. Optimized for iPhone 17 Pro Safari.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Generate your passphrase hash
npm run generate-hash
# → Enter your secret passphrase when prompted
# → Copy the two lines of output

# 3. Create .env.local and paste the output
#    (a test .env.local with passphrase "iloveyou" is included)

# 4. Run the dev server
npm run dev

# 5. Open http://localhost:3000 in your browser
```

---

## Project Structure

```
├── public/
│   ├── photos/          ← Drop your photos here
│   └── music/           ← Drop your MP3s here
├── scripts/
│   └── generate-hash.mjs
├── src/
│   ├── app/
│   │   ├── api/auth/    ← Login endpoint (server-side)
│   │   ├── api/logout/  ← Logout endpoint
│   │   ├── login/       ← Login page
│   │   ├── valentine/   ← Protected main page
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── page.tsx     ← Redirects to /login
│   ├── components/      ← All UI components
│   ├── content/
│   │   └── content.ts   ← ★ EDIT THIS FILE ★
│   ├── hooks/
│   │   └── useMusicPlayer.ts
│   ├── lib/
│   │   └── auth.ts      ← Hashing & cookie logic
│   └── middleware.ts    ← Route protection
├── .env.local           ← YOUR secrets (git-ignored)
├── .env.local.example
├── tailwind.config.ts
└── package.json
```

---

## Customization Guide

### 1. Change the passphrase

```bash
npm run generate-hash
```

Enter your secret phrase. Copy the output into `.env.local`.

### 2. Change message, photos, playlist, timeline

Edit **one file**: `src/content/content.ts`

| Section       | What to change                                  |
| ------------- | ----------------------------------------------- |
| `login`       | Title, hint text, error message                 |
| `hero`        | Valentine message, greeting, her name           |
| `photos`      | Filenames + captions (files go in public/photos) |
| `playlist`    | Filenames + song titles (files go in public/music) |
| `timeline`    | Date, title, text, and which photo to show      |
| `closing`     | "I love you" message, signature                 |

### 3. Add your photos

1. Copy your JPG/PNG/WebP files into `public/photos/`
2. Update `content.ts` → `photos` array with the new filenames
3. Also update `timeline` entries if they reference photos

### 4. Add your music

1. Copy your MP3 files into `public/music/`
2. Update `content.ts` → `playlist` array with the new filenames and titles
3. MP3 format recommended for maximum iOS Safari compatibility

---

## Authentication Flow

```
User → /login → enters passphrase
  ↓
POST /api/auth → server hashes input with SHA-256
  ↓ compare with VALENTINE_PASS_HASH env var
  ↓
On match → sets httpOnly cookie (valentine_auth = VALENTINE_AUTH_TOKEN)
  ↓
Middleware on /valentine → checks cookie value
  ↓
If valid → allow access
If missing/invalid → redirect to /login
```

- Passphrase is **never stored in frontend code** — only the hash is in `.env.local`
- Cookie is `httpOnly` (not readable by JS) and `secure` in production
- **Cannot be bypassed** by editing localStorage/sessionStorage

---

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "valentine"
# Push to a GitHub repo

# 2. Import in Vercel
# → Go to vercel.com/new → Import your repo

# 3. Add Environment Variables in Vercel dashboard:
#    VALENTINE_PASS_HASH = <your hash>
#    VALENTINE_AUTH_TOKEN = <your token>

# 4. Deploy!
```

---

## Features

| Feature                  | Details                                              |
| ------------------------ | ---------------------------------------------------- |
| **Auth gate**            | Server-side passphrase verification, httpOnly cookie |
| **Hero**                 | Animated greeting with "Start the Magic" CTA         |
| **Floating Polaroids**   | Staggered entrance, tilt on tap, 6-card grid         |
| **Crossfade Slideshow**  | Auto-advance with Ken Burns zoom, prev/next, dots    |
| **Heart Burst**          | Tap to emit hearts that float and fade               |
| **Memory Timeline**      | Scroll-reveal cards with photos and captions          |
| **Music Player**         | Play/pause, next/prev, volume, track title           |
| **iOS Audio**            | Plays only after user gesture (iOS autoplay safe)    |
| **Closing**              | "I Love You" + logout button                         |
| **Debug mode**           | `?debug=1` shows device info + audio state           |

---

## iPhone 17 Pro / iOS Safari Compatibility

| Concern                   | Solution                                              |
| ------------------------- | ----------------------------------------------------- |
| Viewport height           | Uses `100svh` with `100vh` fallback                   |
| Safe area (notch)         | `env(safe-area-inset-*)` via CSS custom properties    |
| `viewport-fit`            | Set to `cover` in meta viewport                       |
| Horizontal overflow       | `overflow-x: hidden` on html+body, all sections contained |
| Tap targets               | All buttons ≥ 44×44 px                                |
| Hover-only interactions   | None — all interactions have tap equivalents           |
| Animation performance     | `transform`/`opacity` only (GPU-composited)           |
| Reduced motion            | Respects `prefers-reduced-motion: reduce`             |
| Audio autoplay            | Starts only after "Start the Magic" button tap        |
| `backdrop-filter`         | Used as progressive enhancement, fallback bg works    |
| Lazy loading              | Images use `loading="lazy"`                           |

---

## Testing Checklist (iPhone Safari)

- [ ] `/valentine` redirects to `/login` when not authenticated
- [ ] Correct passphrase logs in and redirects to `/valentine`
- [ ] Wrong passphrase shows error + shake animation
- [ ] Cookie persists on refresh and direct URL entry
- [ ] Music starts after tapping "Start the Magic"
- [ ] Next/prev track switching works
- [ ] Volume control works (mute toggle on mobile)
- [ ] Animations are smooth, no stutter
- [ ] Safe area padding visible (no content behind notch/home bar)
- [ ] No horizontal scroll or overflow
- [ ] `?debug=1` shows device info panel
- [ ] Logout clears cookie and returns to login

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS 3**
- **Framer Motion 11**
- **No database** — auth via env vars + cookies

---

## Commands

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Start development server             |
| `npm run build`       | Production build                     |
| `npm run start`       | Start production server              |
| `npm run generate-hash` | Generate passphrase hash + token  |
