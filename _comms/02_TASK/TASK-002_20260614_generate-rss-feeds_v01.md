# TASK-002: Generate RSS Feeds

**Refs:** PRD-001  
**Status:** Open  
**Estimate:** 1 hour  

---

## Goal

Generate RSS 2.0 feeds for each language (EN + DE) that expose recent notes to feed readers. Auto-update on every build.

---

## Scope

- Generate `feed.xml` per language
- Include note metadata (title, author, category, date)
- Include full HTML content
- Valid RSS 2.0 structure
- Validate with W3C Feed Validator

---

## Steps

- [ ] **2.1** — Design RSS structure
  - Content: full HTML or excerpt?
  - Publication date: `created` field
  - Include all notes or last 50?

- [ ] **2.2** — Write bash function for RSS generation
  - Loop through notes sorted by `created` (newest first)
  - Extract: title, description, author, category, created, HTML content
  - Build RSS items
  - Wrap in RSS channel

- [ ] **2.3** — Add to deploy.yml
  - Call function after notes convert to HTML
  - Output: `_site/{en,de}/feed.xml`

- [ ] **2.4** — Add feed discovery to HTML
  - Add `<link rel="alternate" type="application/rss+xml">` to `<head>`
  - Point to `feed.xml` (language-aware)

- [ ] **2.5** — Validate feeds
  - Test XML structure
  - Test in feed reader (Feedly, etc.)
  - Verify all notes appear
  - Check UTF-8 encoding works

- [ ] **2.6** — Add feed link to homepage
  - Update nav or about page with feed URL

---

## Files to Modify

| File | Change |
|------|--------|
| `.github/workflows/deploy.yml` | Add RSS section |
| `_note_nav.html` | Add feed discovery link |
| `content/en/pages/about.md` | (Optional) Feed link |

---

## Files to Create (Generated)

- `_site/en/feed.xml`
- `_site/de/feed.xml`

---

## RSS 2.0 Item Format

```xml
<item>
  <title>Note Title</title>
  <link>https://...en/slug.html</link>
  <pubDate>Mon, 14 Jun 2026 00:00:00 +0000</pubDate>
  <author>author@example.com</author>
  <category>PKM</category>
  <description>Full HTML content</description>
  <guid>https://...en/slug.html</guid>
</item>
```

---

## Validation

- [ ] W3C Feed Validator passes
- [ ] Feed readers can subscribe
- [ ] All notes appear
- [ ] Dates valid (RFC 2822)
- [ ] Links absolute (full URLs)
- [ ] No XML errors
- [ ] UTF-8 encoding works

---

*Created: 2026-06-14 22:17:00 · v01*
