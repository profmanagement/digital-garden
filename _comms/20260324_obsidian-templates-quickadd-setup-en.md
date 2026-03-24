---
title: "Obsidian Templates & QuickAdd Workflow Setup"
author: Bram
date: 2026-03-24
updated: 2026-03-24T13:26 CET
session_type: setup
status: Completed
tags: [obsidian, templater, quickadd, PKM, workflow, templates]
priority: medium
environments: [Mac, Obsidian]
tools_used: [Obsidian, Templater plugin, QuickAdd plugin, Core Templates plugin]
open_items:
  - "QuickAdd macro with link creation from selected text (future exploration)"
  - "Dutch (NL) variant of note-template-en.md"
  - "Auto-update modified date on save"
key_lessons:
  - "tp.file.cursor() requires 'Automatic jump to cursor' to be ON in Templater settings"
  - "QuickAdd Template Choice combines folder-routing + Templater in a single hotkey"
  - "Select text → CMD+N instantly creates a note named after your selection"
  - "tp.file.rename() in a script-block keeps filename and title in sync"
next_session_start_here: "Explore QuickAdd macro to create a linked note directly from selected text using a template."
wordcount: ~2300
version: 1.0
---

# Obsidian Templates & QuickAdd Workflow Setup

## 1. Summary

This session set up a complete note-creation workflow in Obsidian, starting from enabling the built-in Templates plugin through to an advanced integration of Templater and QuickAdd. The goal was to have new notes automatically land in the right vault folder, pre-filled with consistent frontmatter, auto-populated dates, and a cursor positioned directly at the writing area.

The workflow now works as follows: `CMD+N` triggers QuickAdd, prompts for a filename (title), creates the note in the configured folder, and runs the Templater template — including prompts for description and category. After all prompts are filled, the cursor jumps automatically to the writing position in the body.

The only open item is a future enhancement: creating a linked note directly from selected text via a QuickAdd macro. This was discovered as a powerful feature but not yet implemented.

---

## 2. Key Topics

- **Core Templates plugin** – The built-in Obsidian plugin for simple templates using `{{title}}`, `{{date}}`, and `{{time}}` variables; good as a starting point but limited in functionality.
- **Templater plugin** – Community plugin supporting full JavaScript expressions like `tp.file.title`, `tp.date.now()`, `tp.system.prompt()`, and `tp.file.cursor()`.
- **QuickAdd plugin** – Community plugin that combines note creation with folder-routing, template selection, and a configurable hotkey; replaces the default `CMD+N` behavior.
- **Frontmatter / YAML template** – Structured metadata at the top of every note: author, status, type, language, category, tags, version, and dates.
- **Cursor placement (`tp.file.cursor()`)** – Mechanism to automatically position the cursor at the right writing spot after template insertion; requires a specific Templater setting.
- **Filename synchronization** – Technique using `tp.file.rename()` to keep the filename in sync with the title entered in frontmatter.
- **Selected text as filename** – Discovered Obsidian feature: select any text and press `CMD+N` to instantly create a note using that text as the filename.

---

## 3. Key Insights

1. **"Automatic jump to cursor" is OFF by default** — Without this setting in `Settings → Templater`, `tp.file.cursor()` does nothing and the raw code appears literally in the note. Always turn this on when setting up a new Obsidian vault.

2. **QuickAdd fully replaces `CMD+N`** — By mapping QuickAdd to `CMD+N` (via Hotkeys), you get folder-routing + template + Templater prompts in a single action. No manual steps needed after note creation.

3. **`tp.file.cursor(1)` is more reliable than `tp.file.cursor()`** — When a note is created via a plugin like QuickAdd, the numbered variant works more consistently than the empty one.

4. **Selected text → `CMD+N` = instant named note** — This is a built-in Obsidian feature that is especially powerful with QuickAdd: select a concept in an existing note, press `CMD+N`, and the new note already has the right name and can be immediately linked back.

5. **`tp.file.rename()` inside a `<%* ... -%>` script-block** — If you want to set the title via a Templater prompt and sync it to the filename, use a script-block at the top of your template. Variables declared there are available throughout the rest of the template.

---

## 4. Architecture & Decisions

### Chosen approach: QuickAdd + Templater (combined)

| Option | Advantage | Disadvantage | Decision |
|---|---|---|---|
| Core Templates plugin | Built-in, no install needed | Only `{{date}}`, `{{title}}`, `{{time}}`; no folder-routing | ❌ Too limited |
| Templater only | Powerful, JS expressions | No automatic folder-routing on note creation | ⚠️ Partial |
| QuickAdd + Templater | Folder-routing + prompts + template in 1 hotkey | Slightly more configuration | ✅ Chosen |
| QuickAdd `{{NAME}}` for title | Simple; QuickAdd handles rename before template runs | No Templater prompt needed for title | ✅ Chosen for title |

**Decision:** The title is handled by QuickAdd's `{{NAME}}` prompt — this avoids double prompts. Description and category are requested via `tp.system.prompt()` inside the template itself.

---

## 5. Chronological Log

### Phase 1: Enable and understand the Core Templates plugin

**Goal:** Understand how the built-in Templates plugin works.

**Steps taken:**
1. Go to `Settings → Core plugins` → enable **Templates**
2. Create a `Templates/` folder in the vault
3. Go to `Settings → Templates → Template folder location` → enter `Templates`
4. Create a new note inside the `Templates/` folder
5. Add template variables:

```markdown
# {{title}}
Date: {{date}}
Time: {{time}}
```

6. Open any note → `CMD+P` → type `Insert template` → select your template

**Result:** ✅ Works. Template is inserted at cursor position with variables filled in.

**Lesson:** The core plugin works fine for simple cases but has no folder-routing or JavaScript logic.

---

### Phase 2: Convert note-template-en.md to Templater format

**Goal:** Convert the existing YAML frontmatter template to a Templater-compatible version.

**Context:** The template contained static placeholders (`YYYY-MM-DD`, empty fields) that had to be filled in manually every time.

**Steps taken:**
1. Install Templater via `Settings → Community plugins → Browse → Templater`
2. Enable the plugin
3. Go to `Settings → Templater → Template folder location` → enter `Templates`
4. Replace static fields in the template:

```markdown
<%*
// Script-block at the top (optional, for rename variant)
// Only use this if you are NOT using QuickAdd for the title
let title = await tp.system.prompt("Title?");
await tp.file.rename(title);
-%>
---
title: <% tp.file.title %>
description: <% await tp.system.prompt("Description (one-line summary)?") %>
author: Bram
written_by: 100% human
status: draft
type: seedling
category: <% await tp.system.prompt("Category? (e.g. PKM, AI, Design, Strategy)") %>
tags: [ ]
language: en
translation:
source:
related:
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
version: v01
---

# <% tp.file.title %>

<% tp.file.cursor(1) %>

## Related
**"Song Title" by Artist**, short bit of info about the song.
Listen on: [Apple Music](https://music.apple.com/) | [Spotify](https://open.spotify.com/track/) | [Youtube](https://www.youtube.com/watch)

---

*Short closing thought or location line (optional).*
```

**Result:** ✅ Template works. Prompts appear on creation, dates are auto-filled.

**Lesson:** Use `-%>` at the end of a script-block to suppress the blank line it would otherwise insert.

---

### Phase 3: Install and configure QuickAdd

**Goal:** Automatically create new notes in the right folder via a single hotkey.

**Steps taken:**
1. Install QuickAdd via `Settings → Community plugins → Browse → QuickAdd`
2. Go to `Settings → QuickAdd`
3. Type `New Note` in the name field, select **Template** from dropdown → click **Add Choice**
4. Click the ⚙️ gear icon next to `New Note`
5. Configure:
   - **Template Path:** `Templates/note-template-en.md`
   - **File Name:** `{{NAME}}` — QuickAdd prompts for the title and handles the rename before Templater runs
   - **Create in folder:** e.g. `Notes` or your preferred target folder
   - **Open:** on
   - **Use Templater:** on — this is the critical toggle for `<% ... %>` processing
6. Go to `Settings → Hotkeys` → search `QuickAdd: New Note` → assign `CMD+N`

**Result:** ✅ `CMD+N` triggers QuickAdd, prompts for filename, creates note in the correct folder, runs all Templater prompts.

**⚠️ Common pitfall:** The **Templater toggle inside QuickAdd** is off by default. Without it, all `<% %>` expressions appear as raw code in the note.

**Lesson:** QuickAdd's `{{NAME}}` prompt fires before Templater runs, so `tp.file.title` is already correct when the template processes.

---

### Phase 4: Fix tp.file.cursor() placement

**Goal:** Have the cursor automatically jump to the writing position after all prompts are filled.

**Problem:** After completing all prompts, the cursor appeared above the note title, and `<% tp.file.cursor() %>` was rendered as literal code in the body instead of being processed.

**Diagnosis:** "Automatic jump to cursor" was turned off in Templater settings.

**Steps taken:**
1. Go to `Settings → Templater`
2. Enable **"Automatic jump to cursor"** ✅
3. Replace `tp.file.cursor()` with `tp.file.cursor(1)` in the template for extra reliability
4. Note the **cursor jump hotkey**: `Option+Tab` (manual fallback if auto-jump doesn't fire)

**Result:** ✅ Cursor now correctly jumps to the writing position after all prompts are completed.

**⚠️ Common pitfall:** "Automatic jump to cursor" is OFF by default in Templater — this is one of the most frequently reported issues in the Obsidian community.

---

## 6. Full Settings & Template Reference

### In Obsidian (Settings)

```
# Enable Core Templates plugin
Settings → Core plugins → Templates → on

# Set templates folder (Core plugin)
Settings → Templates → Template folder location → "Templates"

# Install Templater
Settings → Community plugins → Browse → search "Templater" → Install → Enable

# Set Templater folder
Settings → Templater → Template folder location → "Templates"

# CRITICAL: fix cursor placement
Settings → Templater → Automatic jump to cursor → ON

# Cursor jump hotkey (manual fallback)
Settings → Templater → Jump to next cursor location hotkey → Option+Tab

# Install QuickAdd
Settings → Community plugins → Browse → search "QuickAdd" → Install → Enable

# Create QuickAdd Template Choice
Settings → QuickAdd → type "New Note" → dropdown: Template → Add Choice

# Configure QuickAdd Template Choice (⚙️ icon)
Template Path: Templates/note-template-en.md
File Name: {{NAME}}
Create in folder: [your target folder]
Open: on
Use Templater: on

# Assign hotkey
Settings → Hotkeys → search "QuickAdd: New Note" → assign CMD+N
```

### Templater variable reference

```markdown
<% tp.file.title %>                            # Current note filename
<% tp.date.now("YYYY-MM-DD") %>                # Today's date
<% tp.file.cursor(1) %>                        # Cursor position after template runs
<% await tp.system.prompt("Question?") %>      # Input dialog on note creation

# Script-block (for rename via Templater, without QuickAdd):
<%*
let title = await tp.system.prompt("Title?");
await tp.file.rename(title);
-%>
```

---

## 7. Open Items & Next Steps

| # | Item | Priority | Est. time | Dependency | Where to start |
|---|------|---------|-----------|------------|----------------|
| 1 | QuickAdd macro: select text → create linked note | Low | 30 min | QuickAdd + Templater working (✅) | QuickAdd → Add Choice → Macro |
| 2 | Create NL variant of note-template-en.md | Low | 15 min | Current template (✅) | Copy template, change `language: nl` and field labels |
| 3 | Auto-update `modified` date on save | Medium | 45 min | Templater or community plugin | Search: "Obsidian auto update modified date" |

---

## 8. Status Overview

| Component | Status | Location | Owner | Notes |
|-----------|--------|----------|-------|-------|
| Core Templates plugin | ✅ Done | Settings → Core plugins | Bram | Understanding gained; not actively used |
| Templater plugin | ✅ Done | Community plugins | Bram | Active; template working |
| note-template-en.md | ✅ Done | Templates/ folder | Bram | Fully Templater-compatible |
| QuickAdd plugin | ✅ Done | Community plugins | Bram | Mapped to CMD+N |
| QuickAdd Template Choice | ✅ Done | Settings → QuickAdd | Bram | Folder-routing + Templater on |
| tp.file.cursor() fix | ✅ Done | Settings → Templater | Bram | Auto jump to cursor enabled |
| Selected text → CMD+N macro | ⚠️ Discovered | Built-in Obsidian feature | Bram | Not yet built out as QuickAdd macro |

---

## 9. Fast Path (How to redo this from scratch)

If you need to replicate this setup on a fresh Obsidian vault:

1. `Settings → Core plugins → Templates` → on + set folder (for understanding; optional in practice)
2. Install **Templater** → set template folder → immediately enable **"Automatic jump to cursor"** — do not skip this
3. Create `Templates/note-template-en.md` with `tp.file.title`, `tp.date.now()`, `tp.system.prompt()`, and `tp.file.cursor(1)`
4. Install **QuickAdd** → create Template Choice → configure: template path, `{{NAME}}` as filename, target folder, Open on, **Templater on**
5. Assign `CMD+N` to QuickAdd in Hotkeys → test with a new note
6. Verify: prompts appear ✅, dates filled ✅, cursor at writing position ✅

Total cold setup time: **~20 minutes**

---

## 10. References & Sources

- [Obsidian Help — Templates plugin](https://help.obsidian.md/plugins/templates)
- [QuickAdd Template Choice documentation](https://quickadd.obsidian.guide/docs/Choices/TemplateChoice/)
- [Templater — tp.file module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/file-module.html)
- [Reddit — tp.file.cursor() not working](https://www.reddit.com/r/ObsidianMD/comments/10d0qv1/am_i_losing_my_mind_or_does_tpfilecursor_just/)
- [Obsidian Forum — Renaming files with text prompts in Templater](https://forum.obsidian.md/t/renaming-files-with-text-prompts-in-templater/48443)
