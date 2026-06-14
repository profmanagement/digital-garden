# DONE-002: Generate RSS Feeds

**Refs:** TASK-002, PRD-001  
**Status:** Completed  
**Date:** 2026-06-14

---

## What Was Done

Successfully implemented **automatic RSS feed generation** for all languages (EN + DE) in the GitHub Actions build pipeline. Feeds are generated fresh with every push.

---

## Files Modified

### `.github/workflows/deploy.yml`
- **Added:** Complete RSS generation section (~90 lines)
- **New `# ── RSS Feeds` build step** that runs before search index
- **Helper functions:**
  - `to_rfc2822()` — converts YYYY-MM-DD dates to RFC 2822 format
  - `xml_escape()` — escapes XML special characters
  - `get_note_content()` — extracts HTML from generated notes
  - `generate_rss()` — main RSS generation function
- **Feed discovery links** injected into all HTML pages
  - Homepage (EN + DE)
  - All note pages (EN + DE)
  - All regular pages (EN + DE)

---

## Files Generated (on each build)

| File | Purpose |
|------|---------|
| `_site/en/feed.xml` | English RSS 2.0 feed |
| `_site/de/feed.xml` | German RSS 2.0 feed |

---

## Features Implemented

✅ Automatic generation on every push  
✅ Both languages (EN + DE)  
✅ Draft filtering (only published notes)  
✅ Feed discovery via `<link rel="alternate">` tags  
✅ RFC 2822 dates  
✅ Full HTML content per item  
✅ XML escaping (special characters)  
✅ Linux compatible (GNU date format)

---

## How to Subscribe

**Direct URLs:**
- English: `https://cooltunes.github.io/digital-garden/en/feed.xml`
- German: `https://cooltunes.github.io/digital-garden/de/feed.xml`

**Browser auto-discovery:** Feed readers detect `<link rel="alternate">` tags automatically

---

## RSS Structure

Each feed contains:
- Title, link, description, language
- Items sorted newest-first by `created` date
- Per-item: title, link, pubDate, author, category, full HTML description, guid

---

## Testing

After next build:
```bash
# Verify feeds exist
curl https://cooltunes.github.io/digital-garden/en/feed.xml
curl https://cooltunes.github.io/digital-garden/de/feed.xml
```

Validate with W3C Feed Validator: https://validator.w3.org/feed/

Test in feed reader (Feedly, Apple News+, etc.)

---

## Notes

- Feeds rebuild automatically on every git push
- Draft notes excluded (status=draft)
- Dates extracted from `created` frontmatter field
- Content includes Pandoc output + wikilink conversions
- All URLs are absolute (full domain path)

---

*Created: 2026-06-14 22:18:00 · v01*
