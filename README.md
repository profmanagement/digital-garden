# Digital Garden

A personal digital garden — notes, ideas, and writing published as a clean static website. Built with Obsidian, Pandoc, and GitHub Actions. No local build tool required.

**Live site:** [Digital Garden](https://cooltunes.github.io/digital-garden/)

---

## What it is

A digital garden is somewhere between a blog and a private notebook — notes that are public, evolving, and honest about their maturity level. Notes are tagged as *seedling*, *growing*, or *evergreen* to signal how developed they are.

This repo is both the **content source** and a **ready-to-fork template** for your own garden.

---

## How it works

```
Write in Obsidian  →  git push  →  GitHub Actions builds HTML  →  GitHub Pages serves it
```

- **No local toolchain.** Pandoc runs in the cloud via GitHub Actions.
- **No framework to maintain.** Plain HTML + one CSS file.
- **Free hosting.** GitHub Pages with HTTPS.
- **One-command publish.** Push triggers everything.

---

## Quickstart

The `.obsidian/` folder is included and pre-configured. The fastest way to get your own garden running:

1. **Fork** this repository
2. **Clone** your fork: `git clone https://github.com/YOUR-USERNAME/digital-garden.git`
3. Open **Obsidian** → *Open folder as vault* → select the cloned folder
4. Trust the community plugins when prompted
5. Use `Cmd/Ctrl+P` → **QuickAdd: New note (EN)** to create your first note
6. Push — your site builds automatically in ~1 minute

### Included plugins

| Plugin | What it does |
|--------|--------------|
| **Obsidian Git** | Commits and pushes on a schedule — no terminal needed |
| **Templater** | Auto-fills note frontmatter on file creation |
| **QuickAdd** | *New note (EN)* and *New note (NL)* commands |

---

## Writing a note

Notes live in `content/en/notes/` (or `content/nl/notes/` for Dutch). Each note has YAML frontmatter:

```yaml
---
title: My note title
description: One-line summary
author: Your Name
written_by: 100% human      # 100% human | ai-collab | ai-generated
status: draft               # draft | published
type: seedling              # seedling | growing | evergreen
category: Technology
created: 2026-03-24
---
```

The build pipeline reads this frontmatter to generate the category label, byline, and note listing on the homepage.

---

## Tech stack

| Layer | Tool |
|-------|------|
| Writing | [Obsidian](https://obsidian.md/) |
| Conversion | [Pandoc](https://pandoc.org/) |
| Automation | GitHub Actions |
| Search | [Pagefind](https://pagefind.app/) |
| Hosting | GitHub Pages |
| Styling | Plain CSS (`style.css`) |

---

## Full setup guide

See [`_comms/MANUAL-01_20260321_digital-garden-setup_v02.md`](./_comms/MANUAL-01_20260321_digital-garden-setup_v02.md) for the complete step-by-step guide including customisation, troubleshooting, and the full frontmatter schema.

---

## Customising

| What | Where |
|------|-------|
| Colours, fonts, spacing | `style.css` |
| Note template | `content/templates/note-template-en.md` |
| Homepage content | `content/en/en/index.md` |
| Build pipeline | `.github/workflows/deploy.yml` |

---

*Made by [Bram](https://clawlab.nl/en/about/) · feel free to fork and adapt*
