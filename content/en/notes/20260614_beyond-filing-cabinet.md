---
title: "Beyond the Filing Cabinet: Do Organisation Methods Actually Solve the Retrieval Paradox?"
description: Testing whether PKM organisation methods address the encoding–retrieval gap or support recognition over navigation.
author: Maik
written_by: 60% human
status: published
type: growing
category: PKM
tags:
  - retrieval-paradox
  - pkm
  - organisation
  - encoding-specificity
  - semantic-search
  - zettelkasten
  - latch
  - para
  - johnny-decimal
language: en
translation: 20260614_jenseits-des-aktenschranks
source:
related:
  - 20260607_the-retrieval-paradox
created: 2026-06-14
modified: 2026-06-14
version: v01
---

# Beyond the Filing Cabinet: Do Organisation Methods Actually Solve the Retrieval Paradox?
## Where the last post left off

In my last note about the [The Retrieval Paradox](https://profmanagement.github.io/digital-garden/en/20260607_the-retrieval-paradox.html), I argued that the uncertainty in my PKM and second brain does not lie in storage, meaning that the notes are still available where they should be, but in the gap between the way I encoded a note in the past and the way I try to retrieve it in the present. Tulving and Thompson's (1973) encoding specificity principle says retrieval succeeds when present cues simply resemble the cues that were present at encoding. It often happens that, months later, my cues have changed, so the note stays *available but not accessible*. And I made one further claim that matters here: links solve **navigation** (getting from a known note to another known note), but the paradox lives one step earlier, in **recognition** — realising that a relevant note exists at all.

After discussion, a dear colleague suggested I have a look at the **LATCH method** as a possible future pathway to solve this issue. That intrigued me to do a little research on PKM organisation schemes. This post is the result, but not in the sense of "here are five ways to better organise your life," but as a test. An organisation method only addresses *my* retrieval paradox if it does at least one of two things — *bridge the encoding–retrieval gap*, or *support recognition* rather than mere navigation.

1. **Encoding–retrieval match** — Does the method help when my *present* search cue differs from the *past* term, tag, or context I filed under? Or does it assume I already remember the dimension I stored it on?
2. **Recognition vs. navigation** — Does the method help me *realise a forgotten note exists* (recognition / recall)? Or does it only help me *travel* efficiently once I already know what I'm looking for (navigation)?

It turns out: Most of them, it turns out, do neither. Most organisation approaches are build for something different. Some are storage architectures wearing only the costume of a retrieval solution.

## The comparison

**Table 1**

*Assessing PKM Organization Methods in Light of the Retrieval Paradox*

| Approach | Organises by | Encoding–retrieval match | Recognition vs. navigation | Verdict against the paradox |
|---|---|:---:|:---:|---|
| **LATCH** (Wurman) — Location, Alphabet, Time, Category, Hierarchy | A fixed, finite axis chosen at filing time | ○ | ○ | A storage grammar, not a recall aid. Assumes I remember *which* axis and *which* value. Only *Time* has mild episodic value ("I noted this around spring"). |
| **Johnny.Decimal** | A numeric address (10 areas × 10 categories) | ○ | ○ | The purest navigation scheme: "two clicks away." A decimal ID carries zero content cue. Brilliant for not getting lost; useless for remembering something exists. |
| **PARA** (Forte) — Projects, Areas, Resources, Archives | Actionability, not topic | ◐ | ○ | Current-project material surfaces because it's in active attention. But *Resources* and *Archives* are exactly the fog the paradox describes — filed by past usefulness, not present cue. |
| **Tags / folksonomy** | Keywords chosen at encoding | ○ | ○ | This *is* the paradox in miniature: the tag freezes my past vocabulary. If present-me reaches for a different word, the tag is invisible. |
| **MOCs** (Milo / LYT) — Maps of Content | Curated topic "hubs" you revisit | ◐ | ◐ | Opening a MOC re-exposes me to everything under a theme — genuine recognition support. But a note on no MOC stays lost, and I still have to remember the MOC exists. |
| **Zettelkasten** (Luhmann) | Emergent links between atomic notes | ◐ | ◐ | The "communication partner": following links surfaces relationships I didn't plan — recognition as a side effect. But only *once I'm already navigating from an entry point*; it surfaces near neighbours, not distant strangers. |
| **Semantic / AI surfacing** (embeddings, RAG, related-note suggestion) | Meaning, plus proactive resurfacing | ● | ● | The only approach aimed squarely at the gap: it matches on *meaning*, so a present query in different words still finds the past note — and paired with automatic surfacing it can tell me a note exists before I recall it. |

*Note:* This comparison table was produced by Claude (Cowork mode, Opus 4.8) at my direction after analysing the references mentioned below; the scoring lens, framing, and conclusions are mine. The model gathered the source material and applied the two evaluation criteria I defined.

*Legend:* ● strong · ◐ partial · ○ weak / by design doesn't address it.

## How to make sense of the table

There is a gradient running top to bottom, and it is the whole argument. The methods at the top (LATCH, Johnny.Decimal, PARA, etc.) are **filing systems**: they optimise navigation through structuring that work as presets in our (human) brains. They are very good at reducing clutter and making it easier to decide where something belongs. They solve an organisational problem, but not the deeper problem raised by the retrieval paradox. Reorganising storage cannot close a gap that lives between my past-me's encoding and present-me's cue.

The methods improve precisely as they stop being filing cabinets and start being **surfacing layers**. MOCs and Zettelkasten earn their ◐ marks not because they are better-organised but because they help us to re-expose us to the notes we have created before: a *MOC* by being a browsable overview and a *Zettelkasten* by making link-following an act of rediscovery. They convert some navigation into recognition. But both still depend on my effort and capacity to remember the exact entry point. Speaking with a metaphor: They turn down the noise, but they do not make the signal clear.

Only the last row addresses both columns at once, and not by coincidence: semantic search relaxes Tulving and Thompson's (1973) matching requirement directly. Retrieval cue and encoding cue no longer have to be the "same words", only close in meaning. And proactive resurfacing, e.g., related-note nudges, daily re-exposure, or RAG that brings in notes I did not ask for, is the first thing on the list that can answer the question the paradox actually poses: *what might be useful to remember right now?*

## A cautious conclusion

Two caveats, because I do not want this to read as a critique that's secretly an ad for AI. *First*, the filing methods are not useless against the retrieval paradox. A smaller, well-bounded haystack makes every other technique work better, and LATCH's time axis quietly leans on episodic memory, the one cue that tends to survive even when my vocabulary changes. *Second*, semantic surfacing has its own ways of failing. It still usually waits for me to ask a question. It will hand me the plausibly relevant when I needed the actually relevant. And "the answer is in your notes" is precisely the trust I said I had lost; automation that's confidently wrong burns through it faster than a bad tag ever did. So I am not claiming AI retrieval is the fix. The fix, whatever it turns out to be, lives in the recollection column, not in a tidier "cabinet". Maybe what comes after PKM is not a better second brain at all. Maybe it is one that occasionally taps me on the shoulder. That, too, is noted for another piece.

## Related

This is a sequel to [The Retrieval Paradox](https://profmanagement.github.io/digital-garden/en/20260607_the-retrieval-paradox.html)

## References

Ahrens, S. (2017). *How to take smart notes: One simple technique to boost writing, learning and thinking – for students, academics and nonfiction book writers*. CreateSpace.

Anthropic. (2024, September 19). *Introducing contextual retrieval*. https://www.anthropic.com/news/contextual-retrieval

Forte, T. (2023). *The PARA method: Simplify, organize, and master your digital life*. Atria Books.

Godden, D. R., & Baddeley, A. D. (1975). Context-dependent memory in two natural environments: On land and underwater. *British Journal of Psychology, 66*(3), 325–331. https://doi.org/10.1111/j.2044-8295.1975.tb01468.x

Johnny.Decimal. (n.d.). *A system to organise your life*. Retrieved June 14, 2026, from https://johnnydecimal.com/

Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W., Rocktäschel, T., Riedel, S., & Kiela, D. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. In H. Larochelle, M. Ranzato, R. Hadsell, M. F. Balcan, & H. Lin (Eds.), *Advances in neural information processing systems* (Vol. 33, pp. 9459–9474). Curran Associates.

Luhmann, N. (1981). Kommunikation mit Zettelkästen: Ein Erfahrungsbericht. In H. Baier, H. M. Kepplinger, & K. Reumann (Eds.), *Öffentliche Meinung und sozialer Wandel / Public opinion and social change* (pp. 222–228). Westdeutscher Verlag.

Milo, N. (n.d.). *MOCs overview*. Linking Your Thinking. Retrieved June 14, 2026, from https://notes.linkingyourthinking.com/Cards/MOCs+Overview

Tulving, E., & Pearlstone, Z. (1966). Availability versus accessibility of information in memory for words. *Journal of Verbal Learning and Verbal Behavior, 5*(4), 381–391. https://doi.org/10.1016/S0022-5371(66)80048-8

Tulving, E., & Thomson, D. M. (1973). Encoding specificity and retrieval processes in episodic memory. *Psychological Review, 80*(5), 352–373. https://doi.org/10.1037/h0020071

Wurman, R. S. (1989). *Information anxiety*. Doubleday.
