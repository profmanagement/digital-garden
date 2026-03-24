# MANUAL-01: Digital Garden Setup — Obsidian → GitHub Pages

A complete guide to replicating this setup from scratch. No prior DevOps knowledge required.

---

## What this is

A **digital garden** is a personal website where you publish notes, ideas, and writing — less polished than a blog, more public than a private notebook. This setup lets you write in Obsidian, push to GitHub, and have a clean static website update automatically. No CMS, no subscription, no local build tool.

---

## Why this setup?

Most static site generators (Jekyll, Hugo, Astro, Next.js) require a local runtime installed on your machine — Ruby, Go, or Node.js — plus a build pipeline you have to maintain. This adds friction every time you want to publish.

This setup removes all of that:

| Principle | How |
|-----------|-----|
| No local toolchain | Pandoc runs in GitHub Actions (cloud), not on your machine |
| No framework to maintain | Plain HTML + one CSS file |
| Free hosting | GitHub Pages |
| One-command publish | `git push` triggers everything |
| Long-lived | Plain HTML and CSS don't break. This will still work in 10 years. |
| Privacy-respecting | No JavaScript tracking, no cookies |

---

## Tech stack

| Layer | Tool | Why |
|-------|------|-----|
| Writing | [Obsidian](https://obsidian.md/) | Portable `.md` files, no lock-in |
| Conversion | [Pandoc](https://pandoc.org/) | Best-in-class Markdown → HTML; runs anywhere |
| Automation | GitHub Actions | Free CI/CD; runs on every `git push` |
| Hosting | GitHub Pages | Free, fast, HTTPS by default |
| Styling | Plain CSS | No build step, fully readable, easy to customise |
| Search | [Pagefind](https://pagefind.app/) | Static, client-side search index; no server needed |
| Deployment | [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) | Pushes built files to `gh-pages` branch cleanly |

---

## Quickstart: use the included Obsidian vault

The easiest way to get started is to **fork or clone this repo and open it directly as an Obsidian vault.** The `.obsidian/` folder is included and pre-configured with:

| Plugin | What it does |
|--------|--------------|
| **Obsidian Git** | Auto-commits and pushes to GitHub on a schedule; no terminal needed for day-to-day publishing |
| **Templater** | Fills in note frontmatter automatically when you create a new file |
| **QuickAdd** | Two commands — *New note (EN)* and *New note (NL)* — to create a correctly structured note in one keystroke |

To use it:

1. Fork this repository on GitHub
2. Clone your fork locally: `git clone https://github.com/YOUR-USERNAME/digital-garden.git`
3. Open Obsidian → **Open folder as vault** → select the cloned folder
4. Obsidian will ask to trust the community plugins — click **Trust and enable**
5. Update your author name in `content/templates/note-template-en.md` and `note-template-nl.md`
6. Start writing — use `Cmd/Ctrl+P` → *QuickAdd: New note (EN)* to create your first note

That's it. When you're ready to publish, trigger a commit via Obsidian Git or run `git push` in your terminal.

---

## File structure

```
your-garden/
├── .obsidian/                      ← Pre-configured Obsidian settings (included)
│   ├── plugins/
│   │   ├── obsidian-git/           ← Auto-push to GitHub
│   │   ├── templater-obsidian/     ← Frontmatter templates
│   │   └── quickadd/               ← New note shortcuts
│   └── community-plugins.json
├── content/
│   ├── templates/
│   │   ├── note-template-en.md     ← Template used by QuickAdd (EN)
│   │   └── note-template-nl.md     ← Template used by QuickAdd (NL)
│   ├── en/
│   │   ├── en/
│   │   │   └── index.md            ← English homepage content
│   │   ├── notes/                  ← Your published EN notes go here
│   │   │   └── My note.md
│   │   └── pages/                  ← Static pages (about, etc.)
│   │       └── about.md
│   └── nl/
│       ├── nl/
│       │   └── index.md            ← Dutch homepage content
│       ├── notes/                  ← Published NL notes
│       └── pages/
│           └── about.md
├── style.css                       ← Global stylesheet
├── search-en.md                    ← Search page (EN)
├── search-nl.md                    ← Search page (NL)
└── .github/
    └── workflows/
        └── deploy.yml              ← Build + deploy pipeline
```

The `_site/` folder is built by GitHub Actions and **never committed** to `main`.

---

## Note frontmatter schema

Every note uses this YAML frontmatter (auto-filled by Templater + QuickAdd):

```yaml
---
title: Note title
description: One-line summary shown in the listing
author: Your Name
written_by: 100% human       # 100% human | ai-collab | ai-generated

status: draft                # draft | published
type: seedling               # seedling | growing | evergreen

category: Technology         # Free-form; shown above the title on the note page
tags: []

language: en                 # en | nl
translation:                 # Slug of the equivalent note in the other language (optional)

source:                      # URL or bibliographic reference (optional)
related:                     # [[wikilinks]] to related notes (optional)

created: 2026-03-24
modified: 2026-03-24
version: v01
---
```

**Note types** signal how developed a note is:

| Type | Meaning |
|------|---------|
| `seedling` | Early idea, rough draft |
| `growing` | Being actively developed |
| `evergreen` | Stable, considered complete |

---

## What the build pipeline does

When you push to `main`, GitHub Actions:

1. Installs Pandoc
2. Builds **note pages** (`content/en/notes/*.md` → `_site/en/*.html`):
   - Injects a category label above the `<h1>` title
   - Injects a byline (author · date · written_by) below the title
   - Adds a footer with created/modified/version metadata
3. Builds **static pages** (about, etc.)
4. Builds **homepages** with a note listing sorted newest-first
5. Runs **Pagefind** to generate a static search index
6. Deploys everything to GitHub Pages via the `gh-pages` branch

Wikilinks (`[[note title]]`) are automatically converted to HTML links by a Pandoc Lua filter.

---

## Step-by-step setup from scratch

*(Skip this if you're using the included Obsidian vault — see Quickstart above.)*

### 1. Create the GitHub repository

1. Go to [github.com](https://github.com) → **New repository**
2. Name it (e.g. `digital-garden`)
3. Set to **Public** (required for free GitHub Pages)
4. Do not initialise with a README
5. Copy the repo URL

### 2. Enable Actions write permissions

GitHub Actions needs write access to create the `gh-pages` branch:

1. Repo → **Settings → Actions → General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions** → **Save**

### 3. Push your files and trigger the first build

```bash
git init
git remote add origin https://github.com/YOUR-USERNAME/digital-garden.git
git add .
git commit -m "init: digital garden"
git push -u origin main
```

Wait for the green checkmark in the **Actions** tab.

### 4. Enable GitHub Pages

1. Repo → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `gh-pages`, folder `/ (root)`
4. Click **Save**

Your site is now live at:
```
https://YOUR-USERNAME.github.io/digital-garden/
```

---

## Daily workflow (Obsidian-first)

1. Open Obsidian
2. `Cmd/Ctrl+P` → **QuickAdd: New note (EN)** (or NL)
3. Enter the title — Templater fills the frontmatter and places the cursor in the body
4. Write your note
5. When ready to publish: change `status: draft` → `status: published`
6. Obsidian Git auto-commits on its schedule, **or** use `Cmd/Ctrl+P` → **Obsidian Git: Commit all changes** → **Obsidian Git: Push**

GitHub Actions builds and deploys in ~1 minute.

---

## Adding a note checklist

- [ ] Create via QuickAdd (or manually in `content/en/notes/`)
- [ ] Fill in `title`, `description`, `category`
- [ ] Set `status: published` when ready
- [ ] `git push` (or let Obsidian Git do it)

---

## Customising

| What | Where |
|------|-------|
| Colours, fonts, spacing | `style.css` |
| Note template fields | `content/templates/note-template-en.md` |
| Homepage content | `content/en/en/index.md` |
| About page | `content/en/pages/about.md` |
| Build pipeline | `.github/workflows/deploy.yml` |
| Obsidian Git commit interval | `.obsidian/plugins/obsidian-git/data.json` → `autoSaveInterval` (minutes, `0` = off) |

To **remove the Dutch (NL) language**, delete all `nl/` sections from `deploy.yml` and remove the `content/nl/` folder.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Workflow fails with permission error | Settings → Actions → General → Read and write permissions |
| Site not updating | Check the Actions tab for build errors |
| CSS not loading | Check `--css` path depth in `deploy.yml` matches the folder depth of the HTML file |
| `gh-pages` branch not created | Trigger the workflow at least once after enabling write permissions |
| Blank page | Pandoc `--standalone` flag may be missing in the workflow step |
| Title splits across lines in the output | Make sure all note pandoc calls include `--wrap=none` |
| Obsidian Git not pushing | Check the plugin settings; make sure the remote is configured in the terminal first with `git remote add origin ...` |
| Templater not running on new files | Obsidian Settings → Templater → enable *Trigger Templater on new file creation* |

---

## Ideas for future enhancements

- **Custom domain** — Add a `CNAME` file with your domain; configure DNS at your registrar
- **RSS feed** — Generate a feed.xml in the build step from note frontmatter
- **Note graph** — Static visualisation of `related:` wikilink connections

---

*Created: 2026-03-21 15:05:00 · Updated: 2026-03-24 · v02*
