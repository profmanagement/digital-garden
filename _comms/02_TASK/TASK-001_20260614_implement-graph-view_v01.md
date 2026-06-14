# TASK-001: Implement Graph View

**Refs:** PRD-001  
**Status:** Open  
**Estimate:** 1.5 hours  

---

## Goal

Parse all notes and generate a JSON graph structure. Integrate Vis.js visualization into note pages so visitors explore note relationships interactively.

---

## Scope

- Extract wikilinks from markdown: `[[slug]]`, `[[slug|label]]`
- Build `graph-data.json` for each language (EN, DE)
- Add Vis.js library to frontend
- Create graph modal/sidebar on every note page
- Highlight current note in visualization
- Make nodes clickable for navigation

---

## Steps

- [ ] **1.1** — Audit existing wikilink usage
  - Spot-check 2–3 notes for wikilink patterns
  - Document edge cases (PDFs, external links, relative paths)

- [ ] **1.2** — Write wikilink parser (bash)
  - Extract lines matching `[[...]]`
  - Normalize slugs
  - Output: `source_slug target_slug`

- [ ] **1.3** — Add graph generation to deploy.yml
  - Loop through `content/{en,de}/notes/*.md`
  - Build nodes: `{id, label, category, type}`
  - Build links: `{source, target}`
  - Output: `_site/{en,de}/graph-data.json`

- [ ] **1.4** — Add Vis.js library and init script
  - Download/reference Vis.js (250KB minified)
  - Create `_site/graph-init.js` for rendering
  - Initialize on page load

- [ ] **1.5** — Create graph UI and styling
  - Add container to `_note_nav.html`
  - Add CSS: `.graph-container`, `.graph-node`, `.graph-edge`
  - Add toggle button (show/hide)
  - Dark mode support

- [ ] **1.6** — Test locally
  - Run workflow (via act or manual test)
  - Verify graph-data.json structure
  - Open HTML in browser, check rendering
  - Test: node clicks navigate correctly
  - Test: mobile responsive

- [ ] **1.7** — Optimize
  - Check for console errors
  - Validate JSON output
  - Measure build time delta
  - Add inline documentation

---

## Files to Modify

| File | Change |
|------|--------|
| `.github/workflows/deploy.yml` | Add graph generation section |
| `style.css` | Add graph styling |
| `_note_nav.html` | Add graph container + toggle |

---

## Files to Create (Generated)

- `_site/en/graph-data.json`
- `_site/de/graph-data.json`
- `_site/graph-init.js` (Vis.js init code)

---

## Validation

- [ ] Graph renders on 5+ notes
- [ ] Node clicks navigate correctly
- [ ] Current note highlighted visually
- [ ] Mobile responsive
- [ ] No broken links
- [ ] JSON validates with `jq`
- [ ] No console errors

---

## Open Questions

1. **Edge cases:** Do notes link to PDFs, HTTP URLs, or non-note files? Need to filter these?
2. **Graph scale:** Total nodes expected? If >500, implement LOD?
3. **Session state:** Save graph open/closed state (localStorage)?

---

*Created: 2026-06-14 22:16:00 · v01*
