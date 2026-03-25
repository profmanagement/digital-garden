# DONE-010 — Switch second language NL → DE

**Refs:** TASK-010

## What was done
Replaced all Dutch (nl) language infrastructure with German (de) throughout the forked project. Updated the build pipeline, Obsidian plugin configs, templates, and all content files. Also changed `author` and `written_by` from "Bram"/"100% human" to "Maik" across all templates and existing notes.

## Files created
- `content/de/` (renamed from `content/nl/`)
- `content/de/de/` (renamed from `content/de/nl/`)
- `content/templates/note-template-de.md` (renamed + rewritten in German)
- `_comms/03_DONE/DONE-010_20260325_nl-to-de-language-switch_v01.md`

## Files modified
- `.github/workflows/deploy.yml` — all `nl` → `de`, Dutch UI strings → German ("OVER MIJ" → "ÜBER MICH", "Terug" → "Zurück", "Door" → "Von", "gewijzigd" → "geändert"), `notities` → `notizen`
- `.obsidian/plugins/quickadd/data.json` — "New note (NL)" → "New note (DE)", paths updated
- `.obsidian/plugins/templater-obsidian/data.json` — folder/template paths updated
- `content/de/de/index.md` — Dutch content replaced with German, h2 `Notities` → `Notizen`
- `content/de/notes/note-1.md`, `note-2.md` — language: nl → de, author/written_by updated
- `content/de/pages/about.md` — Dutch content replaced with German placeholder
- `content/de/pages/search.md` — "Zoeken" → "Suche"
- `content/templates/note-template-en.md` — author: Bram → Maik, written_by updated, language comment updated
- `content/en/notes/*.md` (3 files) — author/written_by updated

## Decisions made
- German UI labels: "ÜBER MICH" (about), "Zurück" (back), "Von" (by), "geändert" (modified), "Notizen" (notes heading)
- `written_by` field changed from `100% human` to just the author name `Maik` as requested

## Issues / troubleshooting
None.

## Next steps
- Update `about.md` (DE) with real bio content
- Replace placeholder notes (note-1, note-2) with actual German content

---
*Created: 2026-03-25 00:00:00 · v01*
