# TASK-010 — Switch second language from NL (Dutch) to DE (German)

**Refs:** none

## Goal
Replace all Dutch (nl) language infrastructure with German (de) throughout the project.

## Scope
- Rename `content/nl/` directory tree → `content/de/`
- Rename `content/templates/note-template-nl.md` → `note-template-de.md`
- Update `deploy.yml`: all `nl` path references, Dutch UI strings → German
- Update Obsidian plugin configs (QuickAdd, Templater)
- Update German template content (Dutch comments/placeholders → German)
- Update frontmatter in existing notes (`language: nl` → `language: de`)

## Steps
- [x] Create TASK file
- [ ] Rename content directories (git mv)
- [ ] Rename template file
- [ ] Update deploy.yml
- [ ] Update Obsidian QuickAdd config
- [ ] Update Obsidian Templater config
- [ ] Update template file content
- [ ] Update existing note frontmatter
- [ ] Update INDEX.md
- [ ] Write DONE file

## Files to modify
- `.github/workflows/deploy.yml`
- `.obsidian/plugins/quickadd/data.json`
- `.obsidian/plugins/templater-obsidian/data.json`
- `content/templates/note-template-nl.md` (rename + rewrite)
- `content/nl/**` (rename tree)

---
*Created: 2026-03-25 00:00:00 · v01*
