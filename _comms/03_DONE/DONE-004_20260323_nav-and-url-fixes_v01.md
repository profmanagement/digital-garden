# DONE-004: Nav & URL fixes

**Refs:** TASK-004

## What was done
Restructured EN URLs into `/en/`, added a proper single-line navbar, fixed duplicate titles, and added full nav + back link on content pages. Root `/` now redirects to `/en/`.

## Files created
| Path | Purpose |
|------|---------|
| `en/index.md` | English homepage (moved from root `index.md`) |
| `en/search.md` | EN search page (replaces root `search-en.md`) |
| `nl/search.md` | NL search page (replaces root `search-nl.md`) |
| `_comms/02_TASK/TASK-004_20260323_nav-and-url-fixes_v01.md` | Task file |
| `_comms/03_DONE/DONE-004_20260323_nav-and-url-fixes_v01.md` | This file |

## Files modified
| Path | Change |
|------|--------|
| `.github/workflows/deploy.yml` | Output EN/NL to flat `_site/en/` + `_site/nl/`; root redirect; new nav fragments; `get_title()` helper; `--metadata title=""` + `--metadata pagetitle=` on all Pandoc calls |
| `style.css` | Added `.site-nav`, `.nav-logo`, `.nav-links`, `.nav-sep`, `.nav-right`, `.nav-lang`, `.nav-search`, `.nav-back`, `.auto-nav` |

## Decisions made
- **Flat `/en/` structure:** content pages land at `_site/en/filename.html`, not `_site/content/en/`. Source files stay in `content/en/` — only the build output path changed. Keeps all EN pages at one URL level so every relative link within `en/` is just `filename.html`.
- **Root redirect:** generated directly in deploy.yml as inline echo block (no source .md file needed). `meta http-equiv="refresh"` + fallback `<a>` link.
- **Title fix:** `--metadata title=""` suppresses Pandoc's `<h1 class="title">` block; `--metadata pagetitle="$pt"` keeps the browser tab title. `get_title()` extracts the title from frontmatter before piping through `preprocess()`.
- **Navbar:** flex layout with `.nav-logo { margin-right: auto }` to push links right. Kept within `max-width: 640px` body — consistent with the content column.

## Issues / troubleshooting
None.

## Next steps
- Style active nav state (highlight current language, bold current page in nav-links).
- Consider removing old root `search-en.md` / `search-nl.md` once confirmed no longer needed.
- Consider a `.title` CSS class for `h1` elements that come from Pandoc's `pagetitle` output if needed.

---
*Created: 2026-03-23 00:00:00 · v01*
