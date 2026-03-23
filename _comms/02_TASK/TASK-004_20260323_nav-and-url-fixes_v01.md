# TASK-004: Nav & URL fixes

**Refs:** TASK-003, RETRO-01

## Goal
Four targeted fixes to the live site following the v2 deploy.

## Scope

1. **English → `/en/` subfolder** — move EN homepage to `_site/en/`, EN content pages to `_site/en/`, add root redirect `index.html → en/`. URL pruning now works: `/en/note-1.html` → `/en/` → `/`.
2. **Proper single-line nav bar** — `Digital Garden | HOME | ABOUT  EN · NL 🔍` on every page.
3. **Duplicate title fix** — Pandoc auto-generates `<h1>` from frontmatter `title:`, which duplicates the `# Heading` in the Markdown. Fix by passing `--metadata title="" --metadata pagetitle="..."` so Pandoc only uses the title for `<head><title>`.
4. **Full nav on content pages + back link below** — content pages now show the complete nav bar first, then `← Back` as a second line below it.

## Steps
- [ ] Create `en/index.md` (EN homepage, moved from root `index.md`)
- [ ] Create `en/search.md` (updated Pagefind paths)
- [ ] Create `nl/search.md`
- [ ] Rewrite `deploy.yml`: flatten output to `_site/en/` and `_site/nl/`, root redirect, new nav HTML fragments, title fix
- [ ] Update `style.css`: proper `.site-nav` flex layout, `.nav-logo`, `.nav-links`, `.nav-right`, `.nav-back`, `.auto-nav`

## Files
| Action | Path |
|--------|------|
| Create | `en/index.md` |
| Create | `en/search.md` |
| Create | `nl/search.md` |
| Modify | `.github/workflows/deploy.yml` |
| Modify | `style.css` |

---
*Created: 2026-03-23 00:00:00 · v01*
