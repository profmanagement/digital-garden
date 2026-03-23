# DONE-007 — Refine Automated Note Listing (Clickable Card)

## What was done
Updated the automated note listing in `deploy.yml` and `style.css` to make the entire note card clickable, not just the title.

## Files modified
- `.github/workflows/deploy.yml`: Wrapped note summary HTML in `<a>` tag.
- `style.css`: Updated `.note-summary` for block link behavior and title hover underlining.

## Decisions made
- **UX Improvement:** Made the whole card clickable for better usability on mobile and desktop.
- **Visual Feedback:** Underlined the title on card hover to indicate interactivity.
