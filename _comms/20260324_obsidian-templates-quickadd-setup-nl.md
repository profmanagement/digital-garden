---
title: "Obsidian Templates & QuickAdd Workflow Setup"
author: Bram
date: 2026-03-24
updated: 2026-03-24T13:26 CET
session_type: setup
status: Completed
tags: [obsidian, templater, quickadd, PKM, workflow, templates]
priority: middel
environments: [Mac, Obsidian]
tools_used: [Obsidian, Templater plugin, QuickAdd plugin, Core Templates plugin]
open_items:
  - "QuickAdd macro with link creation from selected text (future exploration)"
  - "Bilingual template variant (NL version of note-template-en.md)"
key_lessons:
  - "tp.file.cursor() vereist 'Automatic jump to cursor' aan in Templater settings"
  - "QuickAdd Template Choice combineert folder-routing + Templater in één hotkey"
  - "Selecteer tekst → CMD+N maakt direct een note met die tekst als bestandsnaam"
  - "tp.file.rename() in een script-block laat je bestandsnaam en titel synchroon houden"
next_session_start_here: "Verken QuickAdd macro om vanuit geselecteerde tekst direct een gelinkte note aan te maken met template."
wordcount: ~2200
version: 1.0
---

# Obsidian Templates & QuickAdd Workflow Setup

## 1. Samenvatting

In deze sessie is een volledige note-aanmaak workflow opgezet in Obsidian, startend bij het activeren van de ingebouwde Templates plugin tot aan een geavanceerde integratie met Templater en QuickAdd. Het doel was om nieuwe notes automatisch op de juiste plek in de vault aan te maken, voorzien van consistente frontmatter, automatische datum-invulling en een cursor die direct op de schrijfpositie belandt.

De workflow werkt nu als volgt: `CMD+N` triggert QuickAdd, vraagt om een bestandsnaam (titel), maakt de note aan in de gewenste map en vult het Templater-template in — inclusief prompts voor description en category. Na het invullen springt de cursor automatisch naar de schrijfpositie in de body.

Het enige openstaande punt is een toekomstige uitbreiding: vanuit geselecteerde tekst direct een gelinkte note aanmaken via QuickAdd. Dit is ontdekt als een interessante mogelijkheid maar nog niet uitgewerkt.

---

## 2. Kernonderwerpen

- **Core Templates plugin** – De ingebouwde Obsidian plugin voor eenvoudige templates met `{{title}}`, `{{date}}` en `{{time}}` variabelen; goed als startpunt maar beperkt in functionaliteit.
- **Templater plugin** – Community plugin die volledige JavaScript-expressies ondersteunt zoals `tp.file.title`, `tp.date.now()`, `tp.system.prompt()` en `tp.file.cursor()`.
- **QuickAdd plugin** – Community plugin die note-aanmaak combineert met folder-routing, template-keuze en een instelbare hotkey; vervangt het standaard `CMD+N` gedrag.
- **Frontmatter / YAML template** – Gestructureerde metadata bovenaan elke note: auteur, status, type, taal, categorie, tags, versie en datums.
- **Cursor placement (`tp.file.cursor()`)** – Mechanisme om de cursor na template-invulling automatisch op de juiste schrijfpositie te zetten; vereist specifieke instelling in Templater.
- **Bestandsnaam synchronisatie** – Techniek om via `tp.file.rename()` de bestandsnaam synchroon te houden met de ingevoerde titel in de frontmatter.
- **Geselecteerde tekst als bestandsnaam** – Ontdekte Obsidian-functie: selecteer tekst en druk `CMD+N` om direct een note te maken met die tekst als naam.

---

## 3. Belangrijkste Inzichten

1. **"Automatic jump to cursor" staat standaard uit** — Zonder deze instelling in `Settings → Templater` doet `tp.file.cursor()` niets en verschijnt de code letterlijk in de note. Zet dit altijd aan bij een nieuwe Obsidian-installatie.

2. **QuickAdd vervangt `CMD+N` volledig** — Door QuickAdd te koppelen aan `CMD+N` (via Hotkeys) krijg je folder-routing + template + Templater-prompts in één actie. Geen losse stappen meer na aanmaken.

3. **`tp.file.cursor(1)` is betrouwbaarder dan `tp.file.cursor()`** — Wanneer een note via een plugin (QuickAdd) wordt aangemaakt, werkt de genummerde variant consistenter dan de lege variant.

4. **Geselecteerde tekst → `CMD+N` = directe note met die naam** — Dit is een ingebouwde Obsidian-feature die bijzonder krachtig is in combinatie met QuickAdd: selecteer een begrip in een bestaande note, druk `CMD+N`, en de nieuwe note heeft al de juiste naam én kan direct gelinkt worden.

5. **`tp.file.rename()` in een `<%* ... -%>` script-block** — Als je de titel via een Templater-prompt wilt instellen én de bestandsnaam wilt synchroniseren, gebruik dan een script-block bovenaan de template. Variabelen die je daar aanmaakt zijn beschikbaar in de rest van de template.

---

## 4. Architectuur & Beslissingen

### Gekozen aanpak: QuickAdd + Templater (gecombineerd)

| Optie | Voordeel | Nadeel | Keuze |
|---|---|---|---|
| Core Templates plugin | Ingebouwd, geen installatie | Alleen `{{date}}`, `{{title}}`, `{{time}}`; geen folder-routing | ❌ Te beperkt |
| Templater alleen | Krachtig, JS-expressies | Geen automatische folder-routing bij aanmaken | ⚠️ Gedeeltelijk |
| QuickAdd + Templater | Folder-routing + prompts + template in 1 hotkey | Iets meer configuratie | ✅ Gekozen |
| QuickAdd `{{NAME}}` voor titel | Simpel, QuickAdd handelt rename af vóór template | Geen Templater-prompt nodig voor titel | ✅ Gekozen voor titel |

**Beslissing:** Titel wordt afgehandeld door QuickAdd `{{NAME}}` prompt — dit voorkomt dubbele prompts. Description en category worden gevraagd via `tp.system.prompt()` in de template zelf.

---

## 5. Chronologisch Logboek

### Fase 1: Core Templates Plugin activeren en begrijpen

**Doel:** Begrijpen hoe de ingebouwde Templates plugin werkt.

**Uitgevoerde stappen:**
1. Ga naar `Settings → Core plugins` → zet **Templates** aan
2. Maak een map `Templates/` aan in de vault
3. Ga naar `Settings → Templates → Template folder location` → vul `Templates` in
4. Maak een nieuwe note aan in de `Templates/` map
5. Voeg template-variabelen toe:

```markdown
# {{title}}
Date: {{date}}
Time: {{time}}
```

6. Open een willekeurige note → `CMD+P` → type `Insert template` → selecteer template

**Resultaat:** ✅ Werkt. Template wordt ingevoegd op cursorpositie met ingevulde variabelen.

**Les:** De core plugin is geschikt voor eenvoudige gevallen maar kent geen folder-routing of JS-logica.

---

### Fase 2: Bestaande note-template-en.md converteren naar Templater-format

**Doel:** De bestaande YAML-frontmatter template omzetten naar een Templater-compatible versie.

**Context:** De template bevatte statische placeholders (`YYYY-MM-DD`, lege velden) die handmatig ingevuld moesten worden.

**Uitgevoerde stappen:**
1. Installeer Templater via `Settings → Community plugins → Browse → Templater`
2. Activeer de plugin
3. Ga naar `Settings → Templater → Template folder location` → vul `Templates` in
4. Vervang statische velden in de template:

```markdown
<%*
// Script-block bovenaan (optioneel, voor rename-variant)
// Gebruik dit alleen als je QuickAdd NIET gebruikt voor de titel
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

**Resultaat:** ✅ Template werkt. Prompts verschijnen bij aanmaken, datums worden automatisch ingevuld.

**Les:** Gebruik `-%>` na een script-block om een lege regel te onderdrukken.

---

### Fase 3: QuickAdd installeren en koppelen

**Doel:** Nieuwe notes automatisch in de juiste map aanmaken via één hotkey.

**Uitgevoerde stappen:**
1. Installeer QuickAdd via `Settings → Community plugins → Browse → QuickAdd`
2. Ga naar `Settings → QuickAdd`
3. Typ naam `New Note` in het tekstveld, kies **Template** in dropdown → klik **Add Choice**
4. Klik op het ⚙️-icoon naast `New Note`
5. Stel in:
   - **Template Path:** `Templates/note-template-en.md`
   - **File Name:** `{{NAME}}` (QuickAdd vraagt om titel, handelt rename af vóór Templater)
   - **Create in folder:** bijv. `Notes` of gewenste doelmap
   - **Open:** aan
   - **Templater:** aan (cruciale toggle voor `<% ... %>` verwerking)
6. Ga naar `Settings → Hotkeys` → zoek `QuickAdd: New Note` → wijs `CMD+N` toe

**Resultaat:** ✅ `CMD+N` triggert QuickAdd, vraagt om bestandsnaam, maakt note aan in juiste map, voert Templater-prompts uit.

**Les:** De **Templater-toggle in QuickAdd** is niet standaard aan — zonder dit worden `<% %>` expressies niet uitgevoerd en verschijnen ze letterlijk in de note.

---

### Fase 4: tp.file.cursor() fixen

**Doel:** Cursor na template-invulling automatisch op schrijfpositie zetten.

**Probleem:** Na invullen van alle prompts verscheen de cursor bóven de titel, en `<% tp.file.cursor() %>` werd letterlijk weergegeven als code in de note.

**Diagnose:** "Automatic jump to cursor" stond uit in Templater settings.

**Uitgevoerde stappen:**
1. Ga naar `Settings → Templater`
2. Zet **"Automatic jump to cursor"** aan ✅
3. Vervang `tp.file.cursor()` door `tp.file.cursor(1)` in de template voor extra betrouwbaarheid
4. Noteer de **cursor jump hotkey**: `Option+Tab` (handmatige fallback)

**Resultaat:** ✅ Cursor springt nu correct naar de schrijfpositie na invullen van alle prompts.

**⚠️ Veelvoorkomende valkuil:** "Automatic jump to cursor" staat standaard UIT in Templater. Dit is een van de meest gerapporteerde issues in de Obsidian community.

---

## 6. Volledige Commando Referentie

### In Obsidian (Settings)

```
# Core Templates plugin activeren
Settings → Core plugins → Templates → aan

# Templates map instellen (Core plugin)
Settings → Templates → Template folder location → "Templates"

# Templater installeren
Settings → Community plugins → Browse → zoek "Templater" → Install → Enable

# Templater map instellen
Settings → Templater → Template folder location → "Templates"

# Templater: cursor fix (BELANGRIJK)
Settings → Templater → Automatic jump to cursor → AAN

# Templater: cursor jump hotkey (fallback)
Settings → Templater → Jump to next cursor location hotkey → Option+Tab

# QuickAdd installeren
Settings → Community plugins → Browse → zoek "QuickAdd" → Install → Enable

# QuickAdd Template Choice aanmaken
Settings → QuickAdd → typ "New Note" → dropdown: Template → Add Choice

# QuickAdd Template Choice configureren (⚙️ icoon)
Template Path: Templates/note-template-en.md
File Name: {{NAME}}
Create in folder: [jouw doelmap]
Open: aan
Use Templater: aan

# QuickAdd hotkey instellen
Settings → Hotkeys → zoek "QuickAdd: New Note" → wijs CMD+N toe
```

### Template variabelen referentie

```markdown
<% tp.file.title %>              # Bestandsnaam van de huidige note
<% tp.date.now("YYYY-MM-DD") %>  # Datum van vandaag
<% tp.file.cursor(1) %>          # Cursorpositie na template-invulling
<% await tp.system.prompt("Vraag?") %>  # Prompt-dialoog bij aanmaken

# Script-block (voor rename vanuit Templater zelf):
<%*
let title = await tp.system.prompt("Title?");
await tp.file.rename(title);
-%>
```

---

## 7. Open Punten & Vervolgstappen

| # | Item | Prioriteit | Geschatte tijd | Afhankelijkheid | Waar te beginnen |
|---|------|-----------|----------------|-----------------|-----------------|
| 1 | QuickAdd macro: selecteer tekst → maak gelinkte note | Laag | 30 min | QuickAdd + Templater werkend (✅) | QuickAdd → Add Choice → Macro |
| 2 | NL variant van note-template-en.md aanmaken | Laag | 15 min | Huidige template (✅) | Kopieer template, verander `language: nl` en veldlabels |
| 3 | `modified` datum automatisch updaten bij opslaan | Middel | 45 min | Templater of community plugin | Zoek: "Obsidian auto update modified date" |

---

## 8. Status Overzicht

| Component | Status | Locatie | Eigenaar | Notities |
|-----------|--------|---------|---------|---------|
| Core Templates plugin | ✅ Klaar | Settings → Core plugins | Bram | Begrip opgedaan, niet actief in gebruik |
| Templater plugin | ✅ Klaar | Community plugins | Bram | Actief, template werkt |
| note-template-en.md | ✅ Klaar | Templates/ map | Bram | Volledig Templater-compatible |
| QuickAdd plugin | ✅ Klaar | Community plugins | Bram | Gekoppeld aan CMD+N |
| QuickAdd Template Choice | ✅ Klaar | Settings → QuickAdd | Bram | Folder-routing + Templater aan |
| tp.file.cursor() fix | ✅ Klaar | Settings → Templater | Bram | Auto jump to cursor aan |
| Geselecteerde tekst → CMD+N | ⚠️ Ontdekt | Ingebouwde Obsidian feature | Bram | Nog niet uitgewerkt als macro |

---

## 9. Lessen voor Herhaling (Fast Path)

Als je dit opnieuw moet opzetten op een nieuwe Obsidian vault:

1. `Settings → Core plugins → Templates` aan + map instellen (begrip, niet verplicht in gebruik)
2. Installeer **Templater** → stel template map in → zet **"Automatic jump to cursor" AAN** (doe dit direct, sla dit niet over)
3. Maak `Templates/note-template-en.md` aan met `<% tp.file.title %>`, `tp.date.now()`, `tp.system.prompt()` en `tp.file.cursor(1)`
4. Installeer **QuickAdd** → maak Template Choice aan → stel in: template path, `{{NAME}}` als bestandsnaam, doelmap, Open aan, **Templater aan**
5. Wijs `CMD+N` toe aan QuickAdd → test met een nieuwe note
6. Controleer: prompts verschijnen ✅, datums ingevuld ✅, cursor op schrijfpositie ✅

Totale setup tijd (koud): **~20 minuten**

---

## 10. Referenties & Bronnen

- [Obsidian Help — Templates plugin](https://help.obsidian.md/plugins/templates)
- [QuickAdd Template Choice documentatie](https://quickadd.obsidian.guide/docs/Choices/TemplateChoice/)
- [Templater — tp.file module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/file-module.html)
- [Reddit — tp.file.cursor() werkt niet](https://www.reddit.com/r/ObsidianMD/comments/10d0qv1/am_i_losing_my_mind_or_does_tpfilecursor_just/)
- [Obsidian Forum — Renaming files with text prompts in Templater](https://forum.obsidian.md/t/renaming-files-with-text-prompts-in-templater/48443)
