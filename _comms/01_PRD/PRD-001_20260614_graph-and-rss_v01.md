# PRD-001: Graph View + RSS Feed

**Date:** 2026-06-14  
**Status:** Planning  
**Scope:** Add interactive graph visualization and RSS feed generation  

---

## Goal

Extend the digital garden with two complementary navigation features:

1. **Graph View** — Interactive visualization of note relationships visible on every page, enabling exploration via node/link navigation
2. **RSS Feeds** — Publish recent notes for subscribers in standard RSS format (per language)

Both features integrate seamlessly into the existing GitHub Actions build pipeline with zero client-side framework requirements.

---

## Why

| Feature | Benefit |
|---------|---------|
| **Graph** | Visitors discover related notes contextually; pattern recognition of knowledge clusters becomes visual; internal linking becomes explicit navigation |
| **RSS** | Subscribers get regular updates; decoupled from GitHub Pages; supports feed readers, social platforms, and email subscriptions |

---

## Scope: In

### Graph View
- Parse wikilinks from all notes (`[[note]]` syntax)
- Build node/edge graph JSON during build (EN + DE separate)
- Embed lightweight visualization library (Vis.js recommended)
- Display as modal/sidebar on every note page
- Show current note highlighted
- Clickable nodes link to target notes
- Responsive design (collapse on mobile)

### RSS Feeds
- Generate `en/feed.xml` and `de/feed.xml` during build
- Include:
  - Title, description, author, category
  - Publication date (`created` frontmatter)
  - Content (full HTML or excerpt)
  - Link to note
  - Per-language content
- Update on every build (no manual RSS management)

---

## Scope: Out

- Comments or discussions
- Full-text search in graph UI (Pagefind exists)
- Custom graph styling per note
- Backlinks page (separate feature)
- Email digests
- Social media auto-posting

---

## Success Criteria

- [ ] Graph view renders on all note pages (EN + DE)
- [ ] RSS feeds validate (W3C Feed Validator)
- [ ] All wikilinks parsed correctly
- [ ] Build time increase < 5 seconds
- [ ] Mobile responsive
- [ ] No JavaScript errors in console
- [ ] Feed readers can subscribe successfully
- [ ] Backward compatible

---

## Technical Approach

### Build-Time (GitHub Actions)

**Graph Generation:**
1. Loop through all `.md` files in `content/{en,de}/notes/`
2. Extract frontmatter (title, slug, category)
3. Parse body for wikilinks: `[[target]]`
4. Build JSON: `nodes[]`, `links[]`
5. Output: `_site/{en,de}/graph-data.json`

**RSS Generation:**
1. Loop through notes sorted by `created` (newest first)
2. Build RSS 2.0 XML per language
3. Output: `_site/{en,de}/feed.xml`

### Frontend

**Graph Rendering:**
1. Include Vis.js library (~250KB)
2. Fetch `graph-data.json` on page load
3. Highlight current note
4. Click nodes to navigate
5. Physics-based layout (optional)

---

## Files to Create/Modify

### New (generated)
- `_site/en/graph-data.json`
- `_site/de/graph-data.json`
- `_site/en/feed.xml`
- `_site/de/feed.xml`
- `_site/graph-viz.js` (Vis.js + init)

### Modified
- `.github/workflows/deploy.yml` — add graph & RSS steps
- `style.css` — graph styling
- `_note_nav.html` — add graph button

---

## Phases

| # | Task | Est. |
|---|------|------|
| 1 | Parse wikilinks, build graph JSON | 1h |
| 2 | Generate RSS feeds | 1h |
| 3 | Add Vis.js to frontend | 1h |
| 4 | Integrate into page template | 1h |
| 5 | Test & validate | 30m |

**Total:** 4.5 hours

---

## Open Questions

1. **Graph library:** Vis.js or D3.js? (recommend Vis.js: simpler, smaller)
2. **Display:** Modal, sidebar, or separate page?
3. **RSS content:** Full HTML or excerpt?
4. **Graph filtering:** All notes or only published?

---

*Created: 2026-06-14 22:15:00 · v01*
