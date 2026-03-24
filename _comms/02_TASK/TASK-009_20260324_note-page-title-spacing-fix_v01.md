---
Refs: —

# TASK-009 — Note page: title split bug + spacing & typography fix

## Goal
Fix the broken title rendering on note pages (title split by the byline), correct spacing hierarchy between category label / title / byline, and bump supporting text sizes for better readability on desktop and mobile.

## Scope
- **In:** `deploy.yml` pandoc calls for note pages, `.note-category-label` and `.note-byline` CSS, `.note-footer small` CSS
- **Out:** Body text, h1 size, nav styles, card listing styles

## Steps
- [x] Diagnose root cause of title split
- [x] Add `--wrap=none` to pandoc note builds (EN + NL) in `deploy.yml`
- [x] Tighten `note-category-label` margin-bottom (label belongs to title)
- [x] Fix `note-byline` margin-top to create proper breathing room
- [x] Bump `note-byline` font-size to 0.875rem (14px — readable on mobile)
- [x] Bump `note-footer small` font-size to 0.8rem

## Files
- `.github/workflows/deploy.yml`
- `style.css`

## Open questions
*(None — all resolved during execution)*

---
*Created: 2026-03-24 · v01*
