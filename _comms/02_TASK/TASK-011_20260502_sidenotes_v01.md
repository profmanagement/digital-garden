---
Refs: —

# TASK-011 — Sidenotes: Fußnoten als Randnotizen

## Goal
Pandoc-Fußnoten (`[^1]`) auf Note-Seiten nicht am Seitenende anzeigen, sondern auf breiten Viewports rechts neben dem Text auf Höhe der jeweiligen Referenz.

## Scope

**In scope:**
- `sidenotes.js` — liest Pandoc-generierte `<section class="footnotes">`, erstellt `<aside class="sidenote">` und positioniert diese vertikal per JS
- `style.css` — Sidenote-Stile + `position: relative` auf body
- `deploy.yml` — `sidenotes.js` nach `_site/` kopieren + Script-Tag in `_note_footer.html` einbinden (EN + DE)

**Out of scope:**
- Seiten (pages), Index-Seiten, Suchseiten
- Mobile-Darstellung: Fußnoten bleiben am Ende sichtbar (Fallback via CSS)

## Steps
- [x] TASK-Datei erstellen
- [x] `sidenotes.js` erstellen
- [x] `style.css` aktualisieren (Sidenote-CSS)
- [x] `deploy.yml` aktualisieren (cp + footer-Include)
- [x] Beispiel-Fußnote in eine Note einfügen (manueller Test)
- [x] DONE-011 erstellen + INDEX.md aktualisieren

## Files
| Action | Path |
|--------|------|
| Create | `sidenotes.js` |
| Modify | `style.css` |
| Modify | `.github/workflows/deploy.yml` |

## Open Questions
- Keine — Anforderung ist klar.

---
*Created: 2026-05-02 21:54:56 · v01*
