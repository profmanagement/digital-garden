# Digital Garden

A personal digital garden — notes, ideas, and writing published as a clean, bilingual static website. Built with Obsidian, Pandoc, and GitHub Actions. No local build tool required.

**Live site:** [Maik · Digital Garden](https://profmanagement.github.io/digital-garden/en/index.html)

---

## What it is

A digital garden is somewhere between a blog and a private notebook — notes that are public, evolving, and honest about their maturity level. Notes are tagged as *seedling*, *growing*, or *evergreen* to signal how developed they are.

This garden started as an experiment at the **PKM Summit 2026** and mostly gathers thoughts, links, and reflections around personal and collective knowledge management (PKM/CKM), digital gardening, and AI-assisted workflows.

This repo is both the **content source** and a **ready-to-fork template** for your own garden.

---

## How it works

```
Write in Obsidian  →  git push  →  GitHub Actions builds HTML  →  GitHub Pages serves it
```

- **No local toolchain.** Pandoc runs in the cloud via GitHub Actions.
- **No framework to maintain.** Plain HTML + one CSS file + a little vanilla JS.
- **Free hosting.** GitHub Pages with HTTPS.
- **One-command publish.** Push triggers everything.
- **Bilingual by design.** English (`en`) and German (`de`) sites are built side by side and cross-linked.

---

## Features

| Feature | Notes |
|---------|-------|
| **Bilingual EN / DE** | Two parallel sites with a language switcher; notes can link to their translation via a `translation` frontmatter field |
| **Automated note listing** | Homepage note cards (title, category, maturity, byline, date) are generated from note frontmatter at build time |
| **Maturity levels** | `seedling` · `growing` · `evergreen` — surfaced as labels and colour-coded in the graph legend |
| **Interactive graph view** | A D3.js force-directed knowledge graph (Quartz-inspired) with interactive and tag-based filters, opened from the 📊 Graph button |
| **RSS feeds** | Separate `feed.xml` for EN and DE, with feed-discovery `<link>` in `<head>` and 📡 RSS links in nav + footer |
| **Sidenotes** | Footnotes render as margin notes on wide screens (`sidenotes.js`) |
| **Search** | Full-text search via Pagefind |
| **Authorship transparency** | A `written_by` field records how much of a note is human vs. AI-assisted (e.g. *100% human*, *80% human*) |

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
| **QuickAdd** | *New note (EN)* and *New note (DE)* commands |

---

## Writing a note

Notes live in `content/en/notes/` (or `content/de/notes/` for German). Each note has YAML frontmatter:

```yaml
---
title: My note title
description: One-line summary
author: Your Name
written_by: 100% human      # 100% human | 80% human | ai-collab | ai-generated
status: draft               # draft | published
type: seedling              # seedling | growing | evergreen
category: Technology
created: 2026-03-24
translation: my-note-title  # slug of the note in the other language (optional)
---
```

The build pipeline reads this frontmatter to generate the category label, maturity level, byline, note listing on the homepage, and the language-switch link.

> **Note:** Use standard Markdown for images and links — `![[wikilink]]` embeds are preprocessed, but for portability prefer `![alt](../images/file.png)` and `[Title](slug.html)`. The `translation` field must be a bare slug **without** the `.md` extension.

---

## Tech stack

| Layer | Tool |
|-------|------|
| Writing | [Obsidian](https://obsidian.md/) |
| Conversion | [Pandoc](https://pandoc.org/) |
| Automation | GitHub Actions |
| Search | [Pagefind](https://pagefind.app/) |
| Graph view | [D3.js](https://d3js.org/) |
| Hosting | GitHub Pages |
| Styling | Plain CSS (`style.css`) |

---

## Development history

The garden has grown well beyond the initial static-site template. Highlights, roughly in order:

- **Foundation** — core build pipeline, automated navigation, wikilink preprocessing, Pagefind search.
- **Note listing** — homepage cards generated from frontmatter, with clickable cards, hover styles, and typography fixes.
- **Second language switched NL → DE** — the template's Dutch site was replaced with a German one.
- **Sidenotes** — footnotes rendered as margin notes.
- **RSS feeds** — per-language `feed.xml` with discovery links and RSS icons in nav and footer.
- **Graph view** — an interactive knowledge graph, first prototyped with Vis.js and then rebuilt with D3.js (Quartz-inspired), later gaining interactive and tag-based filters.
- **Translation linking** — EN and DE notes reference each other via a `translation` field.

Planning artifacts (PRDs, tasks, retros) live in [`_comms/`](./_comms/); see [`_comms/INDEX.md`](./_comms/INDEX.md) for the current state.

---

## Full setup guide

See [`_comms/MANUAL-01_20260321_digital-garden-setup_v02.md`](./_comms/MANUAL-01_20260321_digital-garden-setup_v02.md) for the complete step-by-step guide including customisation, troubleshooting, and the full frontmatter schema.

---

## Customising

| What | Where |
|------|-------|
| Colours, fonts, spacing | `style.css` |
| Note template | `content/templates/note-template-en.md` |
| Homepage content | `content/en/en/index.md` (and `content/de/de/index.md`) |
| Graph behaviour | `graph-d3.js`, `graph-init.js` |
| Sidenotes | `sidenotes.js` |
| Build pipeline | `.github/workflows/deploy.yml` |

---

*Credits and Thanks to [Bram](https://clawlab.nl/en/about/) · feel free to fork and adapt*
