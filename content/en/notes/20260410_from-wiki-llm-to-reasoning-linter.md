---
title: "From wiki LLM to reasoning linter: adding discourse maps and claim checking to my setup"
description: Two new layers on top of my wiki LLM — a Discourse Graph implementation and Mike Caulfield's Deep Background superprompt — to cover the gap between retrieving information and evaluating it.
author: Maik
written_by: 80% human
status: published
type: seedling
category: PKM
tags:
  - wiki-llm
  - discourse-graph
  - deep-background
  - OER
  - toulmin
  - linting
  - PKM
  - AI
language: en
translation: 20260410_vom-wiki-llm-zum-reasoning-linter
source:
related:
  - "[[wiki-llm]]"
  - "[[discourse-graph]]"
  - "[[deep-background]]"
  - "[[OER]]"
  - "[[toulmin]]"
  - "[[linting]]"
created: 2026-04-10
modified: 2026-04-10
version: v01
---

# From wiki LLM to reasoning linter: adding discourse maps and claim checking to my setup

This week, I added two new layers on top of the wiki LLM I built last week following the Andrej Karpathy approach. One is a Joal Chan's and Matt Akamatsu's Discourse Graph implementation, the other is Mike Caulfield's Deep Background superprompt. Together they cover something I kept bumping into: the gap between retrieving information and evaluating it.

## The problem I kept hitting

The wiki LLM is good at surfacing material from my notes, slide decks, and lecture transcripts. What it does not do — and retrieval is just not designed for this — is tell me whether the reasoning in that material holds up.

When I started using the setup to draft OER material, the bottleneck was not finding content. It was figuring out which parts of my source material were claims and which parts were evidence. That sounds like a clean distinction until you try to enforce it on actual lecture notes. Then it gets complicated.

## Discourse graphs: separating claims from observations

The Discourse Graph model, developed by Joel Chan and Matt Akamatsu, treats claims and evidence as separate, linkable units. Distinguishing an empirical observation from a proposed answer leaves room for multiple interpretations of the same data — which matters when you are synthesising across sources rather than summarising one.

I set up the Obsidian plugin this week. The difficult part, which I did not anticipate, is the initial tagging. Pulling a claim apart from its evidence inside a paragraph of running prose turns out to be harder to detect than it looks. And this is not a tool problem, it is a consequence from the Toulmin logic. The Toulmin framework makes the claim-warrant-backing structure explicit, and until you think in those categories naturally, the distinctions resist each other.

That resistance is probably worth sitting with. It forces a re-read of my own material that skimming does not.

## Deep Background: a linter for scientific reasoning

The second addition is Mike Caulfield's Deep Background superprompt — a lengthy instruction block you paste into a Claude or ChatGPT session to change how the model approaches a claim. The prompt draws on the SIFT method and organises output around verified facts, errors and corrections, source assessment, and notes on the information environment.

The framing I keep returning to is linting. In software development, a linter checks code against a set of rules before it runs — it catches structural problems, not just typos. Deep Background does something similar for scientific reasoning: it checks an argument before you build on it. Are the claims actually verified? Are the sources doing what they appear to be doing? Is there a contradictory reading worth surfacing?

Standard LLMs do not do this on their own. They synthesise well, but they are not reflexively sceptical of the material they are working from. The superprompt adds that scepticism as a layer.

## What this adds to the setup

My goal with all of this is to develop OER material from lecture notes, slides, and transcripts without losing reasoning quality in the translation. The wiki LLM takes care of retrieval. Discourse graphs handle structure — separating what was claimed from what was observed. Deep Background runs health checks on the reasoning chain before I build on it.

The Toulmin step is still slow and mostly manual. Deep Background sessions are long and need a paid model with search enabled. But the three-layer setup now covers something that was missing from the LLM workflows I had been using: a way to check whether the argument I am building actually holds, not just whether it sounds coherent.

## What I have not worked out yet

There is no smooth pipeline from Discourse Graph nodes into OER output format yet. Right now it is still copy-paste between tools. And I am not sure the linting metaphor fully holds — real linting is deterministic, claim checking with an LLM is not. But the framing helps me think about what I am actually doing at each step.

## Related

**"Both Sides, Now" by Joni Mitchell** — from *Clouds* (1969). Written at 23 as a meditation on fantasy and reality — clouds, love, life, seen from both directions and still not fully understood. Which is more or less what working with claims and evidence feels like on a good day. The Discourse Graph and Deep Background force you to hold the claim and the counter-evidence at the same time before concluding anything.

Listen on: [Spotify](https://open.spotify.com/track/3NW1YMA8kfNVTzGJCGBS8m) | [Apple Music](https://music.apple.com/us/album/clouds/74769392) | [YouTube — live on The Johnny Cash Show, 1969](https://www.youtube.com/results?search_query=Joni+Mitchell+Both+Sides+Now+Johnny+Cash+Show+1969)
