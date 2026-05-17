---
title: "Wissenssynthese aus PDFs: Discourse Graph & strukturiertes Parsing mit Claude Code"
description: "Wie man PDFs mit Claude Code und LLM-Automation strukturiert auswertet und dabei wissenschaftliche Methoden (Discourse Graph, Strauss-Corbin) nutzt, um aus Informationsmüll echte Erkenntnisse zu extrahieren."
author: Maik
written_by: 95% human
status: published
type: seedling
category: Forschung
tags:
  - knowledge-management
  - ai
  - research
  - grounded-theory
  - discourse-graph
  - llm
  - claude-code
language: de
translation: 20260517_discourse-graph-pdf-synthesis
created: 2026-05-17
modified: 2026-05-17
version: v01
related:
  - "[[20260410_vom-wiki-llm-zum-reasoning-linter]]"
  - "[[20260510_everything-claude-code]]"
  - "[[20260401_von-pkm-zu-ckm]]"
  - "[[20260502_wikipedia-projekt-pkm]]"
  - "[[20260426_warum-wir-oeffentlich-schreiben]]"
---

# Wissenssynthese mittels PDFs im LLM Wiki: Discourse Graph & strukturiertes Parsing mit Claude Code

## Das Problem: Informationsballast in wissenschaftlichen Papern

Im Rahmen des "Ingest-Workflows" von wissenschaftlichen Papers (PDFs) in mein LLM Wiki sollen keine Zusammenfassungen erstellt werden, die **alles** enthalten, sondern nur die wirklich relevanten Informationen extrahieren. Der Kontext "verstopft" dann meist die Verarbeitung, es entsteht enormer Noise. Viele Informationen in einem Paper sind für spezifische Forschungsfragen meist sogar irrelevant, aber das Modell weiß das nicht von allein.

In der analogen Welt ist die Lösung einfach: Lineares Lesen, markieren, extrahieren. Zeitaufwändig. Fehleranfällig. Nicht skalierbar.

Es gibt aber eine Möglichkeit: die Extraktion von Informationen durch strukturiertes Parsing mittels der Methode [Discourse Graph](https://discoursegraphs.com/).

## Der Discourse Graph: Eine Methode für strukturierte Wissenssynthese

Der Discourse Graph ist nicht nur ein ontologisches Wissenskonzept, sondern eine praktische Methode für die systematische Extraktion und Vernetzung von Wissen aus unstrukturierten Quellen. Die Idee: Zerlege jeden Text in granulare, vernetzte Einheiten anstatt alles als Block zu betrachten.

Die **fünf Kernkomponenten** des Discourse Graph habe ich wie folgt auf mein Wiki angewendet:

### 1. **Quellen (Sources)**
Das Primärdokument selbst. Wer hat es geschrieben? Wann? In welchem Kontext? Dies ist der Anker für alle nachgelagerten Informationen.

### 2. **Evidenzen (Evidence)**
Alle verwertbaren Informationen aus der Quelle: 

- Methodische Details (Forschungsdesign, Sample Size, Instrumente)

- Theoretische Grundlagen (Konzepte, Frameworks)

- Empirische Befunde (Ergebnisse, Metriken, Beobachtungen)

**Wichtig:** Evidenzen sind *Fakten oder Beobachtungen*, noch keine Interpretationen.

### 3. **Claims (Behauptungen/Erkenntnisse)**
Die Schlussfolgerungen, die die Autoren aus den Evidenzen ziehen: "Wenn Evidenz X zeigt, dann folgt Aussage Y". Claims sind die wissenschaftlichen Erkenntnisse, die das Paper propagiert.

### 4. **Fragen (Questions)**
Die wissenschaftlichen Fragen, die der Text beantwortet oder aufwirft. Diese entstehen **induktiv** aus den Evidenzen und Claims. Sie bilden den Forschungsraum ab.

### 5. **Konzepte (Concepts)**
Übergeordnete Ideen, Theorien, Konstrukte, die mehrere Claims und Evidenzen verbinden. Sie sind die "Bausteine" meines Wissensgraphen.


Diese Struktur nennt sich auch **Atomisierung** oder **Granularisierung** von Wissen. Jede Einheit ist klein genug, um isoliert verständlich zu sein, aber groß genug, um einen Informationsgehalt zu haben.

### Der theoretische Hintergrund: Toulmin's Argument Pattern

Diese Struktur fußt auf [Stephen Toulmin's Argumentationstheorie](https://searchworks.stanford.edu/view/13362780) (*The Uses of Argument*, 1958). Toulmin zeigte, dass gültige Argumente nicht nur aus "These + Beweis" bestehen, sondern aus:

- **Claim** (Behauptung)

- **Data/Evidence** (Belege)

- **Warrant** (Garantie, warum die Evidenz den Claim stützt)

- **Backing** (Untermauerung der Garantie)

- **Qualifier** (Einschränkung, Sicherheit)

- **Rebuttal** (Gegenargumente)

Der Discourse Graph ist eine praktische Anwendung dieses Modells auf die Wissensvernetzung und sehr nützlich für die Analyse von wissenschaftlichen Texten.

## Die Implementierung: Strukturiertes Parsing mit Claude Code

Den folgenden Workflow habe ich sukzessive entwickelt. Statt PDFs einfach zu laden und eine Zusammenfassung zu erstellen, kann man im LLM Wiki ein strukturiertes Parsing umsetzen. Wie ich in meinem bereits beschriebenen System (siehe hier [Vom Wiki-LLM zum Reasoning Linter](/de/notes/20260410_vom-wiki-llm-zum-reasoning-linter)) dargelegt habe, sieht die Pipeline wie folgt aus:


```
PDF Input
    ↓
[1] Strukturiertes Parsing
    → Textabschnitte & Segmente
    → Jedes Segment indexierbar & verlinkt
    ↓
[2] Evidenz-Extraktion
    → Methodische Evidenzen
    → Theoretische Evidenzen
    → Ergebnisbezogene Evidenzen
    ↓
[3] Claim-Identifikation
    → Claims basierend auf Evidenzen
    → Claims als Interpretationen/Schlussfolgerungen
    ↓
[4] Question Generation (induktiv)
    → Welche Fragen beantwortet dieser Text?
    → Welche neuen Fragen entstehen?
    ↓
[5] Knowledge Graph Assembly
    → Bidirektionale Links zwischen allen Komponenten
    → Relation-Typen definieren
    → Graph-Speicherung (Tana, ObsidianMD, Neo4j, etc.)
    ↓
Output: Queryable Knowledge Graph
```
Abb. 1: Die Pipeline (Flussdiagramm) (eigene Darstellung)

Das führt zu folgendem Ergebnis:

1. **Keine Zusammenfassungen, sondern Strukturen**: Der Prozess erzeugt nicht "Das Paper sagt X", sondern "Evidenz A stützt Claim B, welcher Frage C beantwortet".

2. **Kontext-Reduktion durch Granularität**: Jedes Segment ist klein genug, um auf seinen Punkt beschränkt zu sein.

3. **Verlinkung als Qualitätssicherung**: Wenn Evidenz und Claim nicht verlinkt werden können, fehlt etwas.

4. **Bidirektionale Verbindungen**: Ich kann nicht nur "Welche Claims stützt diese Evidenz?" fragen, sondern auch "Welche Evidenzen habe ich für diesen Claim?" abfragen.

### Claude Code zur Automatisierung

Das Parsing-Pattern in Python wurde auf diese Weise erstellt (nicht perfekt, aber ein guter Start):

```python
def parse_pdf_to_discourse_graph(pdf_path):
    # 1. PDF in Segments zerlegen
    segments = extract_segments(pdf_path)
    
    # 2. Für jedes Segment: Evidenzen identifizieren
    for segment in segments:
        evidences = extract_evidences(segment, types=[
            "methodological",
            "theoretical", 
            "empirical"
        ])
        
        # 3. Claims aus Evidenzen ableiten
        claims = derive_claims(segment, evidences)
        
        # 4. Fragen induktiv generieren
        questions = generate_questions(segment, evidences, claims)
        
        # 5. In Graph speichern mit Relationen
        save_to_knowledge_graph({
            "source": pdf_metadata,
            "segment": segment,
            "evidences": evidences,
            "claims": claims,
            "questions": questions,
            "links": create_bidirectional_links(...)
        })
```

### Erweiterungen geplant, *beyond claims*

Zukünftig können die o.g. Notiztypen über Claims, Evidence, Questions und Concepts hinaus erweitert werden, wie z.B. mit:

- **Hypothesen (Hypotheses)**: Vermutungen, die aus den Daten abgeleitet werden und zwar nicht nur, was das Paper sagt, sondern was es *sein könnte*.

- **Didaktische Patterns (Didactical Patterns)**: Für Lehrentwicklung und Lehrforschung sind auch didaktische Konzepte von Interesse.

- **Methodische Innovationen**: Neue Methoden, die sich aus den Erkenntnissen ableiten.

Außerdem braucht es noch eine ausgefeiltere Grammatik für die **Relationen** zwischen den Wissenstypen. Denn sie beschreiben nicht nur "diese Dinge sind verbunden", sondern *wie* sie verbunden sind.

### Verwandte Inhalte

Es gibt Verbindungen zu folgenden anderen Beiträgen in diesem Digital Garden:

- [**Von PKM zu CKM**](/de/notes/20260401_von-pkm-zu-ckm.html): Collaborative Knowledge Management statt Personal Knowledge Management — genau das, was ein Wissensgraph ermöglicht.

- [**Wikipedia-Projekt: PKM**](/de/notes/20260502_wikipedia-projekt-pkm.html): Die Idee, öffentliches Wissen strukturiert zu kuratieren.

- [**Warum wir öffentlich schreiben**](/de/notes/20260426_warum-wir-oeffentlich-schreiben.html): Weil öffentliches Wissen durch Vernetzung wertvoller wird.

- [**Vom Wiki-LLM zum Reasoning Linter**](/de/notes/20260410_vom-wiki-llm-zum-reasoning-linter.html): Die technische Realisation — automatisierter "Linting" von Argumentationen.

- [**Everything Claude Code**](/de/notes/20260510_everything-claude-code.html): Die Werkzeuge, um das zu automatisieren.

## Nächste Schritte: Was kommt nach dem Graph?

1. **Granularisierung als Standard**: Wie wäre es, wenn in der Wissenschaft von Forschenden anstatt Bücher und Papers zu schreiben, **erwartet** wird, Erkenntnisse in granularer Form zu veröffentlichen?

2. **Forschung als Graphabfrage**: Statt "Schreib ein Review", könnten Forscher folgende Aufgabe umsetzen: "Erstelle eine Query auf Basis des Graphen: Welche Evidenzen unterstützen These X? Welche Konzepte sind kontrovers? Wo gibt es Lücken?"

3. **Automatisierte Synthesisierung**: Mit LLMs kann ich nicht nur Papiere lesen, sondern den Graphen direkt abfragen und Synthesen *generieren*. Statt sie manuell zu schreiben, kann ein vorstrukturierter Text mit einer Auswertung der bisherigen Erkenntnisse erstellt werden, der als Inspiration für neuen Text dient.

4. **Interdisziplinäre Erkenntnis**: Wenn ich Wissensgraphen über Disziplinen hinweg verbinde, entstehen neue Erkenntnisse einfach durch die *Architektur* des Graphen, neben dem manuellen Denken.

Das alles klingt danach, dass die Extraktion von Informationen aus wissenschaftlichen Texten automatisiert werden kann und diese Arbeit zukünftig von Maschinen übernommen wird. Ja, ein wenig hoffe ich auch darauf, **bestimmte** manuelle Arbeiten abzugeben. Gleichzeitig sind wir Forschende aber auch für die Qualitätssicherung verantwortlich. Die Ergebnisse müssen am Ende überprüft werden. Das ist vermutlich eine Idee für einen späteren Beitrag.

## Literatur & Ressourcen

- **Discourse Graph**: [GitHub Repository](https://github.com/DiscourseGraphs/discourse-graph) | [Protocol Labs: "Discourse Graphs and the Future of Science"](https://www.protocol.ai/blog/discourse-graph-qa/)
- **Toulmin, Stephen**: *The Uses of Argument* (1958) — [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/toulmin-logic/)
- **Open-Source Knowledge Graphs**: [GitHub - Awesome Knowledge Graph](https://github.com/totogo/awesome-knowledge-graph)

---
*Created: 2026-05-17 · v01*
