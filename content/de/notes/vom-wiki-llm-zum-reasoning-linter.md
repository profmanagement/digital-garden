---
title: "Vom wiki LLM zum Reasoning-Linter: Discourskaarten und Claimprüfung in meinem Setup"
description: Zwei neue Schichten über meinem wiki LLM — eine Discourse-Graph-Implementierung und Mike Caulfields Deep-Background-Superprompt — um die Lücke zwischen Informationsabruf und Informationsbewertung zu schließen.
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
language: de
translation: from-wiki-llm-to-reasoning-linter
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

# Vom wiki LLM zum Reasoning-Linter: Discourskaarten und Claimprüfung in meinem Setup

Diese Woche habe ich zwei neue Schichten auf das wiki LLM aufgebaut, das ich letzte Woche nach dem Ansatz von Andrej Karpathy entwickelt habe. Die eine ist eine Discourse-Graph-Implementierung von Joel Chan und Matt Akamatsu, die andere ist Mike Caulfields Deep-Background-Superprompt. Zusammen decken sie etwas ab, auf das ich immer wieder gestoßen bin: die Lücke zwischen dem Abrufen von Informationen und deren Bewertung.

## Das Problem, auf das ich immer wieder stieß

Das wiki LLM ist gut darin, Material aus meinen Notizen, Folien und Vorlesungstranskripten zu finden. Was es nicht tut — und Retrieval ist dafür schlicht nicht konzipiert — ist mir zu sagen, ob die Argumentation in diesem Material standhält.

Als ich begann, das Setup für die Entwicklung von OER-Material zu nutzen, lag der Engpass nicht im Finden von Inhalten. Es war das Herausarbeiten, welche Teile meines Quellmaterials Behauptungen waren und welche Evidenz. Das klingt nach einer sauberen Unterscheidung, bis man sie auf echte Vorlesungsnotizen anwenden möchte. Dann wird es kompliziert.

## Discoursgrafen: Behauptungen von Beobachtungen trennen

Das Discourse-Graph-Modell von Joel Chan und Matt Akamatsu behandelt Behauptungen und Evidenz als separate, verlinkbare Einheiten. Eine empirische Beobachtung von einer vorgeschlagenen Antwort zu unterscheiden lässt Raum für mehrere Interpretationen derselben Daten — was wichtig ist, wenn man über Quellen hinweg synthetisiert statt eine einzelne zusammenzufassen.

Ich habe das Obsidian-Plugin diese Woche eingerichtet. Das schwierige Teil, das ich nicht vorhergesehen hatte, ist das initiale Tagging. Eine Behauptung von ihrer Evidenz in einem Absatz fließenden Textes zu lösen, stellt sich als schwieriger heraus als es aussieht. Das ist kein Toolproblem — es ist eine Konsequenz der Toulmin-Logik. Das Toulmin-Framework macht die Struktur von Claim-Warrant-Backing explizit, und solange man nicht von Natur aus in diesen Kategorien denkt, widersetzen sich die Unterscheidungen.

Dieser Widerstand ist wahrscheinlich das Absitzen wert. Er erzwingt eine Neulektüre des eigenen Materials, die flüchtiges Lesen nicht auslöst.

## Deep Background: ein Linter für wissenschaftliches Denken

Die zweite Ergänzung ist Mike Caulfields Deep-Background-Superprompt — ein langer Anweisungsblock, den man in eine Claude- oder ChatGPT-Sitzung einfügt, um zu verändern, wie das Modell eine Behauptung angeht. Der Prompt baut auf der SIFT-Methode auf und organisiert die Ausgabe um verifizierte Fakten, Fehler und Korrekturen, Quellenbewertung und Hinweise auf das Informationsumfeld.

Das Bild, zu dem ich immer wieder zurückkehre, ist Linting. In der Softwareentwicklung prüft ein Linter Code gegen einen Regelsatz, bevor er ausgeführt wird — er erkennt strukturelle Probleme, nicht nur Tippfehler. Deep Background tut etwas Ähnliches für wissenschaftliches Denken: es prüft ein Argument, bevor man darauf aufbaut. Sind die Behauptungen tatsächlich verifiziert? Tun die Quellen, was sie zu tun scheinen? Gibt es eine widersprüchliche Lesart, die es wert wäre, aufzuzeigen?

Standard-LLMs tun das nicht von alleine. Sie synthetisieren gut, sind aber nicht reflexiv skeptisch gegenüber dem Material, mit dem sie arbeiten. Der Superprompt fügt diese Skepsis als Schicht hinzu.

## Was das dem Setup hinzufügt

Mein Ziel dabei ist, OER-Material aus Vorlesungsnotizen, Folien und Transkripten zu entwickeln, ohne dabei Argumentationsqualität in der Übersetzung zu verlieren. Das wiki LLM übernimmt den Abruf. Discoursgrafen regeln die Struktur — sie trennen, was behauptet wurde, von dem, was beobachtet wurde. Deep Background führt Gesundheitschecks an der Argumentationskette durch, bevor ich darauf aufbaue.

Der Toulmin-Schritt ist noch langsam und größtenteils manuell. Deep-Background-Sitzungen sind lang und benötigen ein bezahltes Modell mit aktivierter Suchfunktion. Aber das dreilagige Setup deckt nun etwas ab, das in den LLM-Workflows fehlte, die ich bisher verwendet hatte: eine Möglichkeit zu prüfen, ob das Argument, das ich aufbaue, tatsächlich trägt — nicht nur ob es kohärent klingt.

## Was ich noch nicht gelöst habe

Es gibt noch keine reibungslose Pipeline von Discourse-Graph-Knoten in das OER-Ausgabeformat. Im Moment ist es noch Copy-Paste zwischen den Tools. Und ich bin nicht sicher, ob die Linting-Metapher vollständig trägt — echtes Linting ist deterministisch, Claimprüfung mit einem LLM ist es nicht. Aber das Bild hilft mir, nachzudenken, was ich bei jedem Schritt eigentlich tue.

Ich werde hier weiter Notizen machen, wie sich das entwickelt.

---

## Verwandte Themen

**„Both Sides, Now" von Joni Mitchell** — aus *Clouds* (1969). Mit 23 geschrieben als Meditation über Fantasie und Wirklichkeit — Wolken, Liebe, Leben, von beiden Seiten betrachtet und noch immer nicht vollständig verstanden. Was ungefähr so ist, wie die Arbeit mit Behauptungen und Evidenz an einem guten Tag sich anfühlt. Discourse Graph und Deep Background zwingen dazu, die Behauptung und das Gegenbeweismaterial gleichzeitig zu halten, bevor man zu einem Schluss kommt.

Hören auf: [Spotify](https://open.spotify.com/track/3NW1YMA8kfNVTzGJCGBS8m) | [Apple Music](https://music.apple.com/us/album/clouds/74769392) | [YouTube — live bei The Johnny Cash Show, 1969](https://www.youtube.com/results?search_query=Joni+Mitchell+Both+Sides+Now+Johnny+Cash+Show+1969)
