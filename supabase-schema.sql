# RAI PORTAL — Deployment Guide
## VTU 2022 Scheme · Robotics & AI Department Portal

---

## WHAT YOU HAVE
A complete production-ready web app with:
- ✅ Full VTU 2022 RAI syllabus (all 8 semesters, every subject + elective)
- ✅ Textbook library (22 prescribed books with filter)
- ✅ Notes section (16 subject note cards)
- ✅ RAI Tutor (Claude AI-powered academic assistant)
- ✅ SkillUp (6 courses, lesson player, final exam, downloadable certificate)
- ✅ User authentication (sign up / sign in)
- ✅ Google Drive integration hooks
- ✅ Supabase backend (enrollments, results, chat logs)

---

## STEP 1 — Set Up Supabase (Free Database + Auth)

1. Go to **https://app.supabase.com** → click **New Project**
2. Name it `rai-portal`, choose a password, pick any region → **Create Project**
3. Wait ~2 minutes for setup
4. Go to **SQL Editor** → click **New Query**
5. Paste the contents of **`supabase-schema.sql`** → click **Run**
6. Go to **Settings → API**
7. Copy your **Project URL** (looks like `https://xxxx.supabase.co`)
8. Copy your **anon public** key (long string starting with `eyJ...`)

---

## STEP 2 — Add Your API Keys

Open `src/lib/supabase.js` and replace the top 3 lines:

```js
const SUPABASE_URL  = 'https://YOUR-PROJECT-ID.supabase.co';   // ← paste here
const SUPABASE_ANON = 'eyJhbGciO...YOUR-ANON-KEY';             // ← paste here
const CLAUDE_KEY    = 'sk-ant-api03-YOUR-ANTHROPIC-KEY';       // ← paste here
```

**Get your Claude API key:**
- Go to **https://console.anthropic.com** → API Keys → Create Key
- The free tier gives you $5 credit to start

---

## STEP 3 — Add Your Google Drive PDF Links

For each textbook and note, upload the PDF to Google Drive, then:
1. Right-click the file → **Share** → **Anyone with the link can view**
2. Copy the link
3. Open `src/lib/data.js`
4. Find the book/note entry and paste the link into `driveUrl: 'YOUR-LINK'`

---

## STEP 4 — Deploy to Vercel (Free Hosting)

### Option A — Drag & Drop (Easiest, no account needed initially)
1. Go to **https://vercel.com** → click **Sign Up** (use GitHub or Google)
2. Click **Add New → Project**
3. Click **"Import from your local machine"** or drag the `rai-portal` folder
4. Click **Deploy**
5. Your site is live at `https://rai-portal-xxxx.vercel.app` in ~60 seconds!

### Option B — GitHub (Best for updates)
1. Create a free account at **https://github.com**
2. Click **+** → **New Repository** → name it `rai-portal` → **Create**
3. Upload all files from the `rai-portal` folder to GitHub (drag & drop)
4. Go to **https://vercel.com** → **Add New Project** → **Import from GitHub**
5. Select your `rai-portal` repo → **Deploy**
6. Any future change you push to GitHub auto-deploys! ✨

---

## STEP 5 — Custom Domain (Optional)

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g., `rai.yourcollege.edu`)
3. Follow the DNS instructions Vercel shows you

---

## FILE STRUCTURE

```
rai-portal/
├── index.html                  ← Entry point
├── vercel.json                 ← Hosting config
├── supabase-schema.sql         ← Run this in Supabase
├── DEPLOY.md                   ← This guide
└── src/
    ├── styles/
    │   └── main.css            ← All styling
    ├── lib/
    │   ├── supabase.js         ← ⚠️ ADD YOUR KEYS HERE
    │   ├── data.js             ← All syllabus/books/notes data
    │   └── router.js           ← SPA navigation
    └── components/
        ├── Auth.js             ← Sign in / Sign up
        ├── Syllabus.js         ← 8-semester syllabus
        ├── Textbooks.js        ← Book library
        ← Notes.js             ← Study notes
        ├── Tutor.js            ← AI tutor (Claude)
        └── SkillUp.js          ← Courses + exam + certificate
```

---

## RUNNING LOCALLY (Optional)

You need a simple HTTP server (because browsers block local JS modules).

**If you have Python installed:**
```bash
cd rai-portal
python -m http.server 3000
# Open http://localhost:3000
```

**If you have Node.js installed:**
```bash
npx serve rai-portal
# Open the URL it shows
```

---

## ADDING MORE CONTENT

### Add a textbook:
In `src/lib/data.js`, add to the `TEXTBOOKS` array:
```js
{ id: 23, title: 'Your Book Title', author: 'Author Name', edition: '2024',
  sem: '5', field: 'Robotics', icon: '📘', color: '#0A1628', driveUrl: 'YOUR-DRIVE-LINK' }
```

### Add a SkillUp course:
In `src/lib/data.js`, add to the `COURSES` array with lessons and quiz questions.

### Add study notes:
In `src/lib/data.js`, add to the `NOTES` array with the Google Drive link.

---

## SUPPORT

- Vercel docs: https://vercel.com/docs
- Supabase docs: https://supabase.com/docs
- Claude API docs: https://docs.anthropic.com
- VTU syllabus source: https://vtu.ac.in

---

Built for VTU Dept. of Robotics & AI · 2022 Scheme
