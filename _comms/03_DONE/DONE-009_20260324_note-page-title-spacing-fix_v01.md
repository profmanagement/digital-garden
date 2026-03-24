---
Refs: TASK-009

# DONE-009 — Note page: title split bug + spacing & typography fix

## What was done
Fixed a bug where note page titles with long headings were visually split by the byline (e.g. "We are all maintenance" / byline / "engineers now"). Corrected the spacing hierarchy between category label, title, and byline. Bumped supporting text sizes for better legibility on desktop and mobile.

## Files modified
- `.github/workflows/deploy.yml` — added `--wrap=none` to both EN and NL note pandoc calls
- `style.css` — updated `.note-category-label`, `.note-byline`, `.note-footer small`

## Decisions made

### Root cause
Pandoc wraps HTML output at 72 characters by default. The h1 tag for long titles exceeds this, causing the tag to span two lines. The awk injector matched only the first line and inserted the byline between the two h1 lines, producing invalid HTML (`<p>` inside `<h1>`). Browsers parsed this by implicitly closing the h1, leaving the second half of the title as orphaned text below the byline.

**Fix:** `--wrap=none` prevents pandoc from line-wrapping HTML output.

### CSS changes and design rules applied

| Element | Property | Before → After | Rationale |
|---|---|---|---|
| `.note-category-label` | `margin-bottom` | `0.3rem` → `0.15rem` | Micro gap — label and title are a semantic unit |
| `.note-category-label` | `font-size` | `0.76rem` → `0.78rem` | Minor legibility bump |
| `.note-byline` | `margin-top` | `-1rem` → `-0.75rem` | Net gap from title = 0.75rem (1.5rem h1 margin − offset) — associated but not glued |
| `.note-byline` | `font-size` | `0.8rem` → `0.875rem` | 14px at 16px base — proven mobile-safe minimum for metadata |
| `.note-footer small` | `font-size` | `0.75rem` → `0.8rem` | 12px was too small; 12.8px is more readable |

**Whitespace hierarchy:** Category → Title: 0.15rem / Title → Byline: 0.75rem / Byline → Body: 2rem

## Issues / troubleshooting
The negative `margin-top` hack on `.note-byline` was always fragile — it works correctly now that the pandoc wrapping bug is resolved.

## Next steps
- Monitor for any other long titles that might have been affected
- Consider wrapping note page header elements in a `.note-header` container to scope h1 margin overrides cleanly (currently the negative margin-top compensates for the global h1 margin-bottom)

---
*Created: 2026-03-24 · v01*
