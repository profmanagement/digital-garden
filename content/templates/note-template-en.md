---
title: <% tp.file.title %>
description: <% tp.system.prompt("Description (one-line summary)?") %>

# Authorship
author: Bram
written_by: 100% human         # 100% human | ai-collab | ai-generated

# Publication
status: draft                  # draft | published
type: seedling                 # seedling | growing | evergreen

# Classification
category: <% tp.system.prompt("Category? (e.g. PKM, AI, Design, Strategy)") %>
tags: [ ]

# Language & translation
language: en                   # en | nl
translation:                   # Slug of the equivalent note in the other language (optional)

# References
source:                        # URL or bibliographic reference (optional)
related:                       # [[wikilinks]] to related notes (optional)

# Versioning & dates
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
version: v01
---

# <% tp.file.title %>

<% tp.file.cursor() %>



## Related
**"Song Title" by Artist**, short bit of info about the song.
Listen on: [Apple Music](https://music.apple.com/) | [Spotify](https://open.spotify.com/track/) | [Youtube](https://www.youtube.com/watch)

---

*Short closing thought or location line (optional).*
