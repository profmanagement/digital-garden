---
title: "OpenCode meets Academic Cloud: souveräne akademische KI-Workflows"
description: OpenCode als Agent-Harness plus OpenAI-kompatible LLM-Endpunkte der Academic Cloud – ein kontrollierbarer, dateinaher Zugang zu Modellen für akademische Workflows.
author: Maik
written_by: 75% human
status: published
type: growing
category: KI
aliases:
  - Academic Cloud mit OpenCode
  - OpenCode Academic Cloud API
tags:
  - llm
  - academic-cloud
  - opencode
  - dsgvo
  - digital-sovereignty
  - obsidian
  - rag
  - teaching
language: de
translation: 20261003_opencode-meets-academic-cloud
source:
related:
created: 2026-10-03
modified: 2026-10-03
version: v01
---

# OpenCode meets Academic Cloud: Auf dem Weg zu souveränen akademischen KI-Workflows

> **Zusammenfassung:** OpenCode wird als Arbeitsoberfläche bzw. Agent-Harness verwendet. Die Academic Cloud (SAIA mit API-Zugriff) stellt OpenAI-kompatible LLM-Endpunkte bereit, die in OpenCode unter Umständen DSGVO-orientiert genutzt werden können. Zusammen ermöglicht diese Kombination einen kontrollierbaren, desktopnahen und für akademische Workflows gut geeigneten Zugang zu leistungsfähigen Modellen – in Obsidian, im Terminal oder einer IDE (z. B. VS Code).

Die hier dokumentierte Konfiguration ist eine Momentaufnahme und Ergebnis einer Experimentalumgebung auf macOS (Golden Gate) und Linux (Mint). Modellkatalog, Kontextfenster, Limits, API-Parameter und OpenCode-Syntax können je nach Projekt angepasst werden. Vor einer produktiven Nutzung sollten deshalb `/models` und die aktuelle [SAIA-Dokumentation](https://docs.hpc.gwdg.de/services/ai-services/saia/index.html) geprüft werden.

## 1. DSGVO-orientierte Nutzung und digitale Souveränität

### Was die Kombination attraktiv macht

Die Kombination aus OpenCode und Academic Cloud ist aus verschiedenen Gründen interessant:

- **Providerwahl:** OpenCode bindet OpenAI-kompatible Endpunkte per API ein. Damit ist man nicht an einen einzelnen (US-)LLM-Chatdienst gebunden.
- **Arbeitsort und Dateikontrolle:** Markdown-Dateien, Skripte, Prompts und Wissensbasis bleiben in der eigenen Obsidian-Vault bzw. auf selbst gewähltem Speicher.
- **Transparenter Kontext:** Dateien werden gezielt übergeben (z. B. `@notiz.md`) oder von einem ausdrücklich erlaubten Tool gelesen. Das ist besser kontrollierbar als ein intransparenter Agent-Harness.
- **Austauschbare Architektur:** Modelle können je nach Aufgabe gewechselt werden, ohne den Workflow neu zu bauen. Lokale Modelle oder weitere kompatible akademische Endpunkte bleiben erweiterbar.

### DSGVO-orientiert heißt nicht automatisch DSGVO-konform

Ob ein konkreter Einsatz zulässig ist, entscheidet sich nicht am Modellnamen, sondern am gesamten Workflow. Vor dem Einsatz mit personenbezogenen, vertraulichen oder forschungsbezogenen Daten sind insbesondere zu klären:

1. **Rechtsgrundlage und Zweckbindung:** Darf die konkrete Information für diese Aufgabe verarbeitet werden?
2. **Vertragliche Grundlage:** Aktuelle Nutzungsbedingungen, Auftragsverarbeitungsvereinbarung bzw. institutionelle Freigabe der Hochschule, der Forschungspartner und weiterer Einrichtungen prüfen.
3. **Datenminimierung:** Nur den Datenausschnitt an das LLM schicken, der für die Aufgabe notwendig ist; Namen, Kontakt- und Identifikationsdaten am besten vorher pseudonymisieren oder entfernen.
4. **Keine voreilige Offenlegung:** Rohinterviews, Gutachten, Studierendenleistungen, Personal- und Projektdaten nicht einfach in einen externen Prompt kopieren.
5. **Human-in-the-loop:** KI-Ausgaben sind Entwürfe. Wissenschaftliche Interpretation, Zitate, Bewertungen und Entscheidungen bleiben menschlich verantwortet.
6. **Nachvollziehbarkeit:** Bei der Entwicklung für Forschung und Lehre immer Modell, Version, Parameter, Prompt, bereitgestellten Kontext und Prüfschritte knapp dokumentieren.

### Praktisches Schutzmodell

Tab. 1: Datensorten und Umgangsformen (eigene Darstellung)

| **Datensorten**                                                   | **Geeigneter Umgang**                                                                   |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Öffentliche Literatur, selbst verfasste Entwürfe                  | Kann nach normaler Qualitätsprüfung verarbeitet werden.                                 |
| Interne Lehrmaterialien, noch unveröffentlichte Manuskripte       | Nur bei geklärter institutioneller Grundlage; möglichst selektiv statt als ganze Vault. |
| Interviewdaten, Leistungsdaten, Gutachten, personenbezogene Fälle | Vorher konsequent pseudonymisieren; im Zweifel nicht extern verarbeiten.               |
| Besonders sensible Daten                                          | In der Regel lokale/abgeschottete Lösung oder ein ausdrücklich freigegebener Dienst.    |

## 2. Installation und Einrichtung: API + OpenCode

### 2.1 Voraussetzungen

- Eine aktuelle OpenCode-Installation.
- Ein API-Schlüssel der Academic Cloud mit Zugriff auf Chat-Modelle.
- Optional: Obsidian mit OpenCode-Integration, Arcana-Zugang oder lokale MCPs (z. B. Zotero, Anytype).

Die SAIA-API kann über diesen OpenAI-kompatiblen Basisendpunkt angesprochen werden: `https://chat-ai.academiccloud.de/v1`

Der Endpunkt und die verfügbaren Modelle müssen vor einer neuen Einrichtung geprüft werden.

### 2.2 Secrets als Umgebungsvariablen ablegen

API-Schlüssel und sonstige Zugangsdaten gehören **nie** in Git, Markdown-Notizen oder Screenshots. Eine lokale `.env`-Datei kann etwa so aussehen:

```
ACADEMIC_CLOUD_API_KEY="<dein-neuer-api-schluessel>"
ACADEMIC_CLOUD_ARCANA_ID="<arcana-collection-id>"  # nur falls Arcana genutzt wird
```

`chmod 600 .env` setzt auf macOS/Linux restriktive Leserechte. Die `.env`-Datei gehört auch in `.gitignore`.


> [!Important] Hinweis
> Ein früher offengelegter API-Key sollte rotiert werden. Ein neuer Key ist der billigste Sicherheitsgewinn dieser ganzen Architektur.

### 2.3 Academic Cloud als OpenCode-Provider eintragen

In `~/.config/opencode/opencode.json` müssen alle OpenAI-kompatiblen Provider bzw. Endpunkte und die Parameter der einzelnen Modelle eingetragen werden. Die genaue OpenCode-Schema-Version kann abweichen; dieses Muster zeigt die wesentlichen Felder:

```
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "academic-cloud": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Academic Cloud",
      "options": {
        "baseURL": "https://chat-ai.academiccloud.de/v1",
        "apiKey": "{env:ACADEMIC_CLOUD_API_KEY}"
      },
      "models": {
        "openai-gpt-oss-120b": {
          "name": "GPT-OSS 120B – Reasoning",
          "limit": { "context": 131072, "output": 32768 },
          "variants": {
            "low": { "reasoningEffort": "low" },
            "medium": { "reasoningEffort": "medium" },
            "high": { "reasoningEffort": "high" }
          }
        },
        "qwen3-coder-next": { "name": "Qwen 3 Coder Next" },
        "qwen3-30b-a3b-instruct-2507": { "name": "Qwen 3 30B A3B" }
      }
    }
  }
}
```

Die oben gezeigten Limits sind keine Absicherung für die Zukunft. Ein Modell kann möglicherweise ein großes nominelles Kontextfenster besitzen, während der effektiv nutzbare Kontext aufgrund von Output-Reserven, Tool-Aufrufen, Serverlimits oder Timeouts meist kleiner ist.

### 2.4 Umgebung laden und Verbindung testen

Um OpenCode mit allen Umgebungsvariablen und Keys zu laden, muss im Terminal Folgendes ausgeführt werden:

```
set -a
source /pfad/zur/.env
set +a
opencode
```

Wenn bis hierhin alles funktioniert, kann man in OpenCode folgende Tests ausführen:

1. Mit `/models` prüfen, ob der Provider und das gewünschte Modell in der Liste sichtbar sind (Achtung: häufiger aufgerufene Modelle erscheinen unter *Recent*).
2. Einen kurzen Prompt ausführen, z. B. `Antworte exakt mit: Verbindung erfolgreich.`
3. Danach eine kleine Datei explizit einbeziehen, z. B. `@test.md Fasse diese Notiz in drei Stichpunkten zusammen.`
4. Erst dann mit längeren Dokumenten, Tools oder Agenten arbeiten.

Bei GPT-OSS-Modellen kann man mit `Ctrl + T` auch zwischen den definierten Performancevarianten `low`, `medium` und `high` wechseln. Diese Belegung bitte in der aktuellen OpenCode-Oberfläche gegenprüfen.

### 2.5 Obsidian-Integration robust machen

#### Laden der `.env`-Datei

Ein typischer Stolperstein: Das Obsidian-Plugin lädt eine `.env`-Datei nicht zwingend selbst. Ein lokaler Wrapper kann die Variablen laden und anschließend OpenCode starten (*Beispiel für macOS mit Homebrew-Installation von OpenCode*):

```
#!/usr/bin/env bash
set -a
source "$HOME/.config/opencode/.env"
set +a
exec /opt/homebrew/bin/opencode "$@"
```

#### Alternative: `.env` dauerhaft über die `~/.zshrc` laden

Wer OpenCode nur im Terminal nutzt und den Wrapper nicht möchte, kann die Variablen bei jedem Shell-Start laden. Dafür in `~/.zshrc` (unter Linux Mint mit Bash: `~/.bashrc`) ergänzen:

```
# OpenCode / Academic Cloud: Keys aus .env laden
if [ -f "$HOME/.config/opencode/.env" ]; then
  set -a
  source "$HOME/.config/opencode/.env"
  set +a
fi
```

Danach die Shell neu starten oder `source ~/.zshrc` ausführen und mit `echo ${ACADEMIC_CLOUD_API_KEY:+gesetzt}` prüfen, ob die Variable verfügbar ist (die Ausgabe zeigt nur „gesetzt“, nicht den Schlüssel).

Dabei gibt es einige Einschränkungen:

- **Nur Terminal-Sitzungen:** Programme, die per Dock, Spotlight oder Finder gestartet werden (z. B. Obsidian), lesen die `~/.zshrc` nicht. Das Obsidian-Plugin findet die Variablen deshalb nur, wenn Obsidian aus einem Terminal heraus gestartet wird (`open -a Obsidian`). Für den Obsidian-Betrieb bleibt der Wrapper die robustere Lösung.
- **Breitere Sichtbarkeit der Schlüssel:** Jeder Prozess, der aus dieser Shell gestartet wird, erbt den API-Key. Das ist bei einem Schlüssel für eine einzelne Hochschul-API vertretbar, sollte aber bewusst entschieden werden.
- **Nur vertrauenswürdige Inhalte:** `source` führt die Datei als Shell-Code aus. Werte mit Leerzeichen oder Sonderzeichen müssen deshalb in Anführungszeichen stehen, und die `.env` darf nur Inhalte enthalten, denen man vertraut (`chmod 600` nicht vergessen).
- **Änderungen wirken verzögert:** Wird der Key rotiert, greift die neue `.env` erst in neuen Shells.

Den Pfad zum OpenCode-Binary ggf. mit `which opencode` bestimmen. Der Wrapper wird dann im Plugin als OpenCode-Kommando hinterlegt.


> [!TIP] Staging-Workflow für automatische Änderungen in der Vault
> Für automatisierte Änderungen an der Vault ist ein Staging-Workflow sinnvoll: `00_Inbox` → `_Staging` → menschliche Prüfung → endgültige Ablage. Das verhindert, dass ein Agent gut gemeinte, aber falsche Ordnung direkt in den Garden schreibt.

### 2.6 Sinnvolle Modellwahl aus dem bisherigen Benchmark

Tab. 2: Ausgewählte Modelle der Academic Cloud für unterschiedliche Einsatzformen (eigene Darstellung)

| **Aufgabe**                                | **Option**           | **Auswahlgrund**                                                                                   |
| ------------------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------- |
| Allgemeine, schnelle Arbeit                | GPT-OSS 120B, `low`  | Sehr vielseitig und bei bisherigen Tests schnell                                                   |
| Anspruchsvolle qualitative Analyse         | GPT-OSS 120B, `high` | Beste getestete Qualität des Ergebnisses                                                           |
| Coding                                     | Qwen 3 Coder Next    | Im Coding-Test sehr schnell; Qualität separat weiter testen. Auch für agentische Aufgaben geeignet |
| Recherche und wissenschaftliches Schreiben | Qwen 3 30B A3B       | Im Test sehr schnell bei durchschnittlicher Qualität                                               |

*Hinweis*: Dabei handelt es sich nicht um einen Performance- und Qualitätstest im engeren Sinne, sondern um heuristische bzw. experimentelle Tests.

## 3. Use Cases

Im Folgenden möchte ich ein paar Einsatzmöglichkeiten beschreiben, mit denen ich bisher herumgespielt habe.

### A. Akademische Texte recherchieren und analysieren

**Ziel:** Literatur nicht einfach zusammenfassen, sondern transparent zu Evidenz aufbereiten, (kritische) Gegenpositionen ausfindig machen und Anwendbarkeit prüfen.

**Workflow:**

1. Recherche in fachlichen Datenbanken oder über [[Zotero]]; eine LLM-Antwort ist kein Literaturverzeichnis.
2. Relevante Volltexte/Notizen lokal ablegen und nur die benötigten Dateien gezielt an OpenCode geben.
3. Eine strukturierte Evidenzmatrix erzeugen lassen: Befund, Studiendesign, Sample/Setting, zentrale Einschränkung, unterstützende und konträre Position, Übertragbarkeit.
4. Jede wichtige Behauptung an der Originalquelle kontrollieren; Seitenzahlen und DOI nicht raten lassen.
5. Ergebnis als Markdown-Notiz mit [[Wikilinks]] und Quellenangaben in Zotero/LaTeX übernehmen.

**Beispielprompt:**

```
Lies @artikel.md. Erstelle eine Evidenznotiz auf Deutsch mit:
1) Forschungsfrage und Design,
2) belastbaren Befunden mit Fundstelle im Text,
3) Grenzen und Gegenpositionen,
4) Einschätzung der Übertragbarkeit auf Sozialmanagement/Lehre.
Erfinde keine Literaturangaben oder Seitenzahlen. Markiere fehlende Evidenz ausdrücklich.
```

*Hinweis*: Es ist ratsam, zunächst nur mit Markdown-Dateien zu arbeiten. PDFs lassen sich ohne entsprechende Konvertierung (z. B. mit `docling`) nicht ohne Weiteres in der Academic Cloud verarbeiten.

**Ergänzung mit lokalem Zotero-MCP:**

```
Zotero-PDF → lokaler Beaver-Zotero-MCP → OpenCode → LLM → Evidenznotiz
```

Eine entsprechende Installationsanleitung muss später nachgeliefert werden. Der Retrieval-Schritt bleibt damit lokal kontrollierbar; das LLM erhält nur den für die Anfrage notwendigen Textausschnitt.

### **B. Lehrveranstaltungen organisieren und entwickeln**

**Ziel:** Von einem Modulauftrag zu einer konsistenten, evidenzbasierten Lehrveranstaltung gelangen – ohne die fachliche und didaktische Entscheidung auszulagern.

**Geeignete Teilaufgaben:**

- Modulbeschreibung in Lernziele, Sitzungen, Prüfungsformate und Materialien übersetzen.
- Literatur und Praxisfälle als recherchierbare Einheiten strukturieren.
- Moodle-Wiki-Beiträge, Peer-Feedback-Rubriken, Arbeitsaufträge und Präsentationsentwürfe erstellen.
- Konsistenzcheck: Decken Aktivitäten und Prüfungen die Lernziele ab?
- Nach dem Semester: Evaluationen clustern, aber nicht unkritisch „auswerten lassen“.

**Robuster Workflow:**

```
flowchart TD
    A[Modulauftrag & Rahmen] --> B[Didaktisches Konzept]
    B --> C[Material- und Quellenbasis]
    C --> D[Entwürfe: Sitzungen, Aufgaben, Rubriken]
    D --> E[Lehrendenreview]
    E --> F[Moodle / Excalidraw / Präsentation]
    F --> G[Evaluation & nächste Iteration]
```

**Beispielprompt:**

```
Nutze @modulbeschreibung.md und @lehrkonzept.md. Entwickle einen ersten Plan
für 14 Sitzungen. Gib pro Sitzung Lernziel, Vorbereitungslektüre, Aktivität,
Ergebnisartefakt und Bezug zur Prüfungsleistung an. Kennzeichne alle Annahmen,
die nicht aus den Dateien hervorgehen. Formatiere als Markdown-Tabelle.
```

*Didaktische Leitplanke*: Der Agent erzeugt Material und Varianten im jeweiligen Arbeitsverzeichnis. Es sind anschließend Lernniveau, Passung zur Gruppe, Prüfungsalignment und fachliche Richtigkeit zu prüfen.

### **C. Obsidian-RAG mit Arcana**

**Ziel:** Eine dokumentierte Sammlung (z. B. Projektmaterial, Literatur- oder Kurskorpus) semantisch durchsuchen und die Treffer in OpenCode weiterverarbeiten.

Arcana ist ein Retrieval-Augmented-Generation-(RAG-)Dienst, mit dem du Dokumente wie Forschungsarbeiten, Handbücher oder Lernmaterialien in natürlicher Sprache befragen kannst. Eine ausführliche Dokumentation findet sich unter: https://docs.hpc.gwdg.de/services/ai-services/arcana/index.html

Arcana wurde über die Chat-Completions-Schnittstelle mit zwei besonderen Angaben angebunden:

- Tool-/Erweiterungsnutzung aktivieren: `"enable-tools": true`
- Collection/Arcana-ID gezielt mitgeben: `"arcana": { "id": "…" }`

Da OpenCode diese zusätzliche Anfrage-Logik nicht automatisch abbildet, kann ein eigenes Tool, z. B. `arcana_search.ts`, die natürliche Anfrage weiterreichen. Die IDs werden ausschließlich über Umgebungsvariablen eingebunden:

```
OpenCode → arcana_search.ts → Academic Cloud + Arcana-Korpus → Treffer → LLM-Synthese → Markdown-Entwurf
```

**Arbeitsregeln für gutes RAG:**

1. Korpus klar eingrenzen und sauber benennen; keine gesamte private Vault indexieren.
2. In der Ausgabe Quellen/Dateinamen bzw. Textstellen verlangen.
3. Retrieval und Synthese trennen: Erst Treffer prüfen, dann interpretieren lassen.
4. Fehlende Treffer als Ergebnis akzeptieren; RAG ersetzt keine Evidenz.
5. Änderungen als Diff oder in `_Staging` ausgeben, nicht direkt in Notizen schreiben lassen.

**Beispielprompt:**

```
Suche im Arcana-Korpus nach Positionen zu „digital gardening als reflektierende
Lehrpraxis“. Gib zuerst maximal acht Treffer mit Quelle und Relevanz aus.
Schreibe erst danach eine Synthese. Trenne Befund, Interpretation und offene
Fragen. Keine Aussage ohne rückverfolgbare Quelle.
```


> [!TIP] ARCANA/RAG mit Obsidian
> Für viele Obsidian-Aufgaben ist RAG nicht zwingend: Eine gut verlinkte, atomare Markdown-Vault lässt sich oft über Dateisuche, Wikilinks und gezielte Kontextübergabe besser nachvollziehen. RAG lohnt sich vor allem für größere, weniger gut erschlossene Korpora.


## 4. Grenzen und typische Probleme

### Der Engpass ist oft Kontext und Performance – nicht zwingend das Modell

- **Kontextbudget:** Ein großes Kontextfenster bedeutet nicht, dass eine ganze Vault oder viele PDFs sinnvoll in einen Prompt passen.
- **Chunking und Vorselektion:** Zuerst suchen, filtern, zusammenfassen und dann gezielt vertiefen. Das ist häufig besser als „alles in das LLM hineinwerfen“.
- **Serverlast und Rate Limits:** Laufzeiten schwanken. In den Tests zeigte ein und dasselbe Modell große Ausreißer bei der Performance; einzelne Runs sind daher kein belastbarer Vergleich. Es empfiehlt sich, neue Anfragen immer mit `/new` in einer neuen Session zu beginnen.
- **Reasoning-Budget:** Bei Qwen und Mistral konnte internes Reasoning das gesamte Completion-Budget aufbrauchen, sodass keine nutzbare Antwort erschien. Mehr Reasoning ist nicht automatisch besser.
- **Tool-Harness:** OpenCode, Plugin, MCP, Netzwerk, API-Timeout und Promptstruktur beeinflussen das Ergebnis stark. Ein gutes Modell in einer schlechten Toolkette wirkt schlecht.
- **Halluzination und Quellenfehler:** Das Modell kann überzeugend formulieren und dennoch falsche Referenzen, Seitenzahlen oder Schlussfolgerungen liefern.

### Praktische Gegenmaßnahmen

Für folgende Probleme gibt es einige Umgehungsstrategien:

Tab. 3: Probleme und Gegenmaßnahmen bei der Nutzung von OpenCode und Academic Cloud (eigene Darstellung)

| **Problem**                  | **Gegenmaßnahme**                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| Zu viel Material             | Recherche → Auswahl → Chunks → Synthese statt Vollkorpus im Prompt.                                 |
| Langsame/instabile Antworten | Kleinen Kontrollprompt, Modellwechsel, Streaming und Wiederholungstest nutzen.                      |
| Antwort bleibt leer          | Reasoning-Einstellung und `max_tokens` prüfen; bei Qwen/Mistral ggf. Thinking/Reasoning reduzieren. |
| Unklare Quellenbasis         | Zitate/Fundstellen verpflichtend machen und an Primärquelle prüfen.                                 |
| Riskante Vault-Änderungen    | Staging, Diff, Backup und explizite Freigabe.                                                       |

## 5. Arbeitsprinzipien – anstatt einer Kurzzusammenfassung

Anstatt dieses Tutorial noch einmal zusammenzufassen, kann man von diesen Tests verschiedene Prinzipien ableiten, die auch auf andere Workflows und Entwicklungsumgebungen übertragbar sein können:

1. **Sensible Daten minimieren und klassifizieren.**
2. **Secrets außerhalb von Notizen und Git halten.**
3. **Kontext gezielt geben, nicht Masse laden.**
4. **Modell nach Aufgabe wählen; Geschwindigkeit und Qualität getrennt testen.**
5. **Retrieval, Analyse und Entscheidung sichtbar trennen.**
6. **Ausgaben prüfen, insbesondere Quellen, Zitate, Bewertungen und Code.**
7. **Die eigene Vault bleibt das System of Record; das LLM liefert Vorschläge.**

> [!todo] Noch offen: Arcana
> Arcana ist ein Retrieval-Augmented-Generation-(RAG-)Dienst, mit dem sich Dokumente wie Forschungsarbeiten, Handbücher oder Lernmaterialien in natürlicher Sprache befragen lassen. Ich will prüfen, wie sich Arcana in diesen Workflow einbinden lässt – als Ergänzung zur Vault, ohne dass sensible Dokumente ungeprüft hochgeladen werden.


