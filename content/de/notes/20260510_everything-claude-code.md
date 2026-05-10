---
title: Auf dem Weg zu einem Agentic OS — Erste Schritte mit dem "Everything Claude Code Repo"
description: Das GitHub-Repo "Everything Claude Code" macht implizite Entwicklungs-Best-Practices zu installierbaren, KI-gesteuerten Workflows. Was das über das Verhältnis von Werkzeug und Urteilsvermögen sagt.
author: Maik
written_by: 80% human
status: published
type: seedling
category: KI
tags:
  - claude-code
  - ki-werkzeuge
  - pkm
  - software-entwicklung
  - workflows
language: de
translation: 20260510_everything-claude-code
source: https://www.youtube.com/watch?v=Mio6wD5uyCg
related:
  - "[[20260410_vom-wiki-llm-zum-reasoning-linter]]"
created: 2026-05-10
modified: 2026-05-10
version: v01
---

# Einen Schritt näher zum eigenen Agentic OS für Forschung und Lehre

Seit einiger Weile beschäftigt mich die Frage, wie ich Teile von Routineaufgaben und zur Unterstützung der Kreativität in Forschung und Lehre ein Agentic OS bzw. OS-Kernel für die Forschung einsetzen kann. Es sollte in der Lage sein, valide Workflows mit definierten Skills ausführen können und über lernfähige Bibliotheken mit Skills, Plugins, Routinen etc. (sog. research stacks) verfügen. Das hat gewisse Ähnlichkeiten mit der Architektur von AIOS, einem „AI Agent Operating System, which embeds large language model (LLM) into the operating system and facilitates the development and deployment of LLM-based AI Agents" ([Agiresearch/Aios auf GitHub](https://github.com/agiresearch/AIOS)).

![Abb. 1. Architektur von AIOS](../images/aios-architecture.png){width=100%}

Im Rahmen der Recherche bin ich auf [Everything Claude Code](https://github.com/anthropics/everything-claude-code) (ECC) gestoßen, das eine Sammlung von 75 Skills, 71 Agents, 33 Hooks und unzähligen Commands in Claude Code einbringt. Das Repo ist in der Lage, professionelle Forschungsaufgaben semi-autonom auszuführen.

![Abb. 2. Everything Claude Code](../images/ecc-hero.png){width=100%}

## Plan first, code later — als Plugin

Zum Kern-Workflow gehört der Befehl `/everything-claude-code:plan`, der einen spezialisierten Skill startet, der Rückfragen stellt, Optionen abwägt und auf explizite Bestätigung wartet, bevor eine einzige Zeile Code entsteht. Das kann für die Planung eines neuen Features im aktuellen Projekt als auch für das Design einer neuen Systemarchitektur genutzt werden. 

Dasselbe gilt für testgetriebene Entwicklung: Der `/tdd`Workflow richtet automatisch ein Test-Framework ein, schreibt die Tests *vor* der Implementierung, und setzt 80 % Coverage als Zielwert. Er wiederholt die Prozedur, bis der gewünschte Zielwert erreicht ist, und bessert von Schritt zu Schritt nach.

## Externalisierung von Urteilsvermögen

Eine interessante Frage wirft das ECC aber noch auf: Wenn ein solches Werkzeug ermöglicht, gute Praktiken für Arbeitsroutinen zu externalisieren, ersetzt es dann nicht mein Urteilsvermögen? Was ist der eigentliche Mehrwert außer Zeitersparnis?

Ich tendiere zu einer differenzierten Antwort. Tools wie ECC senken die Hürde für strukturiertes Arbeiten erheblich. Wer gerade anfängt, bekommt ein professionelles Scaffold ohne jahrelange Lernerfahrung. Wer schon lange dabei ist, muss weniger Disziplin aufbringen, um bekannte Muster einzuhalten.

Was kein Werkzeug ersetzen kann: das Wissen, *wann* man von der Vorlage abweicht und einen anderen Weg einschlägt, z. B. um neue wissenschaftliche Seitenwege einzuschlagen. Tests in einem Loop durchzuführen, ist sehr wertvoll, aber das LLM weiß jedoch nicht, welche Tests tatsächlich sinnvoll sind. Auch die Erreichung irgendeines prozentualen Qualitätsziels könnte täuschen. Die menschliche Arbeit bleibt in der Überprüfung von Zielen, eingesetzten Mitteln und dem Ergebnis.

## Die Parallele zum digitalen Garten

Was mich daran besonders interessiert: Das Grundprinzip ist dasselbe wie beim digitalen Gärtnern. Ein Wissensmanagement-System externalisiert implizites Denken in sichtbare Struktur – damit es navigierbar, teilbar und überprüfbar wird. ECC macht dasselbe mit Lernerfahrung: Es externalisiert Intuition in ausführbare Schritte.

Beides funktioniert am zuverlässigsten, wenn die Person dahinter versteht, *warum* die Struktur so ist, wie sie ist. Ein digitaler Garten ohne Urteilsvermögen ist nur eine Ablage. Ein KI-Workflow ohne Verständnis ist nur Automation.

## Verwandte Inhalte

Eine ähnliche Fragestellung hatte ich schon einmal in dem Beitrag [Vom wiki LLM zum Reasoning-Linter](20260410_vom-wiki-llm-zum-reasoning-linter.html) – KI als Denkpartner, nicht Denkersatz – entwickelt. 

---

*Notizen entwickelt nach Ansehen des [Videos von Andrew Korshak](https://www.youtube.com/watch?v=Mio6wD5uyCg&t=70s).*
