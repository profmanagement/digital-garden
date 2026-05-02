---
Refs: TASK-011

# DONE-011 — Sidenotes: Fußnoten als Randnotizen

## What was done
Sidenote-Feature implementiert: Pandoc-Fußnoten (`[^1]`) auf Note-Seiten werden auf Viewports ≥ 1150px rechts neben dem Text auf Höhe der jeweiligen Referenz dargestellt. Auf kleineren Viewports bleiben Fußnoten am Seitenende sichtbar (Fallback).

## Files created
- `sidenotes.js` — JavaScript; liest `<section class="footnotes">`, erstellt `<aside class="sidenote">` und positioniert via `offsetTop`; kollisionsfreies Stacking bei mehreren aufeinanderfolgenden Fußnoten

## Files modified
- `style.css` — `.sidenote`, `.sidenote-number` Stile; `position: relative` auf body; Media-Query-Fallback für < 1150px
- `.github/workflows/deploy.yml` — `cp sidenotes.js _site/sidenotes.js` + `<script>` Tag in `_note_footer.html` (EN + DE)
- `content/en/notes/20260323_starting-a-digital-garden.md` — Beispiel-Fußnote `[^1]` eingefügt (Testdaten)

## Decisions made
- **JS-Ansatz statt Lua-Filter:** Pandoc-Output bleibt unverändert; JS repositioniert Footnotes im Browser. Kein Eingriff in die Build-Pipeline nötig.
- **Breakpoint 1150px:** Mindest-Viewport damit 640px Textbreite + 2rem Gap + 210px Sidenote + Restrand rechts passt: `(1150 + 640) / 2 + 32 + 210 = 1127 < 1150`.
- **Overlap-Prevention:** `lastBottom`-Tracking schiebt nachfolgende Sidenotes bei Bedarf nach unten.

## Issues / troubleshooting
- Datei `20260323_starting-a-digital-garden.md` enthält Non-Breaking Spaces (`\xa0`) — Edit-Tool kann diese nicht matchen; Ersetzung via Python-Skript.

## Next steps
- Sidenote-Styling verfeinern (Farbe, Schriftgröße) nach Review auf der Live-Site
- Ggf. max-height + overflow:hidden für sehr lange Fußnoten ergänzen

---
*Created: 2026-05-02 21:54:56 · v01*
