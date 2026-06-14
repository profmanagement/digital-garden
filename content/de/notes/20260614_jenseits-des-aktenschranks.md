---
title: "Jenseits des Aktenschranks: Lösen Organisationsmethoden das Retrieval-Paradox wirklich?"
description: Prüfung, ob PKM-Organisationsmethoden die Encoding-Retrieval-Lücke überbrücken oder Erkennung gegenüber Navigation unterstützen.
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
language: de
translation: 20260614_beyond-filing-cabinet
source:
related:
  - 20260607_das-retrieval-paradox
created: 2026-06-14
modified: 2026-06-14
version: v01
---

# Jenseits des Aktenschranks: Lösen Organisationsmethoden das Retrieval-Paradox wirklich?
## Wo der letzte Post endete

In meiner letzten Notiz über das [Retrieval-Paradox](https://profmanagement.github.io/digital-garden/de/20260607_das-retrieval-paradox.html) habe ich argumentiert, dass die Unsicherheit in meinem PKM und meinem „second brain" nicht in der Speicherung liegt – die Notizen sind immer noch dort, wo sie sein sollten – sondern in der Lücke zwischen der Art, wie ich eine Notiz in der Vergangenheit codiert habe, und der Art, wie ich versuche, sie in der Gegenwart abzurufen. Tulving und Thompsons (1973) Encoding-Specificity-Prinzip besagt, dass der Abruf gelingt, wenn aktuelle Hinweise einfach den Hinweisen ähneln, die beim Codieren vorhanden waren. Es kommt oft vor, dass sich meine Hinweise Monate später geändert haben – die Notiz bleibt *verfügbar, aber nicht zugänglich*. Und ich habe noch eine weitere Behauptung gemacht, die hier wichtig ist: Links lösen **Navigation** (von einer bekannten Note zu einer anderen bekannten Note), aber das Paradox lebt einen Schritt früher, bei der **Erkennung** – zu realisieren, dass eine relevante Notiz überhaupt existiert.

Nach Diskussionen schlug mir ein lieber Kollege vor, die **LATCH-Methode** zu betrachten als möglichen zukünftigen Weg zur Lösung dieses Problems. Das spornte mich dazu an, ein wenig über PKM-Organisationsschemata zu recherchieren. Dieser Post ist das Ergebnis, aber nicht im Sinne von „hier sind fünf Wege, um dein Leben besser zu organisieren", sondern als Test. Eine Organisationsmethode adressiert mein Retrieval-Paradox nur, wenn sie mindestens eines von zwei Dingen tut – *die Encoding-Retrieval-Lücke überbrücken*, oder *Erkennung statt nur Navigation unterstützen*.

1. **Encoding–Retrieval-Match** – Hilft die Methode, wenn sich mein *aktueller* Suchhinweis vom *vergangenen* Begriff, Tag oder Kontext unterscheidet, unter dem ich es abgelegt habe? Oder geht sie davon aus, dass ich mich bereits an die Dimension erinnere, unter der ich es gespeichert habe?
2. **Erkennung vs. Navigation** – Hilft die Methode mir zu *erkennen, dass eine vergessene Notiz existiert* (Erkennung/Abruf)? Oder hilft sie mir nur, *effizient zu navigieren*, wenn ich bereits weiß, wonach ich suche (Navigation)?

Es stellt sich heraus: Die meisten tun weder das eine noch das andere. Die meisten Organisationsansätze sind für etwas anderes gebaut. Einige sind Speicherarchitekturen, die nur das Kostüm einer Abruflösung tragen.

## Der Vergleich

**Tabelle 1**

*Bewertung von PKM-Organisationsmethoden gegen das Retrieval-Paradox*

| Ansatz | Organisiert nach | Encoding–Retrieval-Match | Erkennung vs. Navigation | Bewertung |
|:---|:---|:---:|:---:|:---|
| LATCH (Wurman) | Feste Achse (Ort, Alphabet, Zeit, Kategorie, Hierarchie) | ○ | ○ | Speichergrammatik, keine Abrufhilfe. Geht davon aus, dass ich mich an Achse und Wert erinnere; nur *Zeit* bietet milde episodische Unterstützung. |
| Johnny.Decimal | Numerische Adresse (10 × 10 Kategorien) | ○ | ○ | Reine Navigation: „zwei Klicks entfernt." Dezimal-ID trägt keine inhaltlichen Hinweise; nutzlos, um sich zu erinnern, dass etwas existiert. |
| PARA (Forte) | Handlungsfähigkeit (Projekte, Bereiche, Ressourcen, Archive) | ◐ | ○ | Aktuelles Projektmaterial wird durch Aufmerksamkeit sichtbar. *Ressourcen* und *Archive* reproduzieren genau den Nebel, den das Paradox beschreibt. |
| Tags / Folksonomy | Schlüsselwörter, die beim Codieren ausgewählt wurden | ○ | ○ | Das Paradox im Miniaturformat: Tags frieren mein vergangenes Vokabular ein. Wenn ich mit anderen Worten suche, bleibt der Tag unsichtbar. |
| MOCs (Milo / LYT) | Kuratierte Themen-„Hubs" | ◐ | ◐ | Echte Erkennungsunterstützung durch Neuexposition. Notizen außerhalb von MOCs bleiben verloren; erfordert, dass ich mich erinnere, dass die MOC existiert. |
| Zettelkasten (Luhmann) | Emergente Verknüpfungen zwischen atomaren Notizen | ◐ | ◐ | „Kommunikationspartner" surfaced unerwartete Beziehungen. Erkennung als Nebeneffekt; surfaced nur nahe Nachbarn von Einstiegspunkten. |
| Semantische / KI-Oberflächengestaltung | Bedeutung + proaktive Neuexposition (Embeddings, RAG) | ● | ● | Passt auf *Bedeutung*, tolleriert Unterschiede zwischen Gegenwart und Vergangenheit im Vokabular. Proaktive Neuexposition beantwortet die zentrale Frage des Paradox. |

*Hinweis*: Diese Vergleichstabelle wurde unter meiner Anleitung mit Claude im Cowork-Modus unter Verwendung von Opus 4.8 erstellt. Grundlage war eine Analyse der unten aufgeführten Literatur. Die Bewertungslogik, die konzeptionelle Rahmung und die Schlussfolgerungen stammen von mir. Das Modell wurde eingesetzt, um das Quellenmaterial zusammenzutragen und die beiden von mir definierten Bewertungskriterien anzuwenden.

*Legende: ● = starke Unterstützung; ◐ = teilweise Unterstützung; ○ = schwach oder konzeptionell nicht adressiert.

## Wie man die Tabelle verstehen kann

Es gibt einen Gradienten von oben nach unten, und das ist das ganze Argument. Die Methoden oben (LATCH, Johnny.Decimal, PARA, etc.) sind **Ablagemethoden**: Sie optimieren Navigation durch Strukturierung, die als Voreinstellungen in unseren (menschlichen) Gehirnen wirken. Sie sind sehr gut darin, Unordnung zu reduzieren und es einfacher zu machen, zu entscheiden, wo etwas hingehört. Sie lösen ein organisatorisches Problem, aber nicht das tiefere Problem, das das Retrieval-Paradox aufwirft. Das Umorganisieren von Speicherung kann nicht die Lücke schließen, die zwischen meinem Vergangenheits-Ich-Encoding und meinem Gegenwarts-Ich-Hinweis lebt.

Die Methoden verbessern sich genau dann, wenn sie aufhören, Aktenschränke zu sein, und zu **Oberflächenschichten** werden. MOCs und Zettelkasten verdienen ihre ◐-Bewertungen nicht, weil sie besser organisiert sind, sondern weil sie uns helfen, uns von Notizen, die wir zuvor erstellt haben, neu auszusetzen: eine *MOC* durch eine durchsuchbare Übersicht und ein *Zettelkasten* dadurch, dass das Folgen von Links eine Wiederentdeckung wird. Sie wandeln einige Navigation in Erkennung um. Aber beide hängen immer noch von meinem Aufwand und meiner Kapazität ab, den genauen Einstiegspunkt zu erinnern. Mit einer Metapher gesprochen: Sie reduzieren das Rauschen, aber sie machen das Signal nicht klar.

Nur die letzte Reihe adressiert beide Spalten auf einmal, und nicht zufällig: semantische Suche lockert Tulvings Übereinstimmungsanforderung direkt auf. Abrufhinweis und Codierungshinweis müssen nicht mehr die „gleichen Wörter" sein, nur bedeutungsmäßig ähnlich. Und proaktive Neuexposition, z.B. verwandte Notiz-Vorschläge, tägliche Neuexposition oder RAG, die Notizen bringt, die ich nicht gefordert habe, ist das erste auf der Liste, das die Frage, die das Paradox eigentlich stellt, beantworten kann: *was könnte mir jetzt nützlich sein, mich zu erinnern?*

## Eine vorsichtige Schlussfolgerung

Zwei Vorbehalte, weil ich nicht möchte, dass dies als Kritik gelesen wird, die heimlich eine Anzeige für KI ist. *Erstens* sind die Ablagemethoden nicht nutzlos gegen das Retrieval-Paradox. Ein kleinerer, gut abgegrenzter Heuhaufen macht jede andere Technik besser, und LATCHs Zeitachse lehnt sich leise auf episodisches Gedächtnis an – den Hinweis, der tendenziell überdauert, auch wenn sich mein Vokabular ändert. *Zweitens* hat semantische Oberflächengestaltung ihre eigenen Fehlerweisen. Sie wartet normalerweise immer noch, bis ich eine Frage stelle. Sie gibt mir die plausibel relevante, wenn ich tatsächlich benötigte. Und „die Antwort ist in deinen Notizen" ist genau das Vertrauen, das ich gesagt habe, ich hätte verloren; Automation, die zuversichtlich unrecht hat, brennt es schneller ab, als ein schlechter Tag-Name je könnte. Ich behaupte also nicht, dass KI-Abruf die Lösung ist. Die Lösung, was auch immer sie sich herausstellt, lebt in der Erinnerungsspalte, nicht in einem ordentlicheren „Aktenschrank". Vielleicht ist das, was nach PKM kommt, gar nicht ein besseres zweites Gehirn. Vielleicht ist es eines, das mir gelegentlich auf die Schulter tippt. Auch das ist für ein anderes Stück notiert.

## Verwandt

Dies ist eine Fortsetzung zum [Retrieval-Paradox](https://profmanagement.github.io/digital-garden/de/20260607_das-retrieval-paradox.html)

## Referenzen

Ahrens, S. (2017). *How to take smart notes: One simple technique to boost writing, learning and thinking – for students, academics and nonfiction book writers*. CreateSpace.

Anthropic. (2024, 19. September). *Introducing contextual retrieval*. [https://www.anthropic.com/news/contextual-retrieval](https://www.anthropic.com/news/contextual-retrieval)

Forte, T. (2023). *The PARA method: Simplify, organize, and master your digital life*. Atria Books.

Godden, D. R., & Baddeley, A. D. (1975). Context-dependent memory in two natural environments: On land and underwater. *British Journal of Psychology, 66*(3), 325–331. [https://doi.org/10.1111/j.2044-8295.1975.tb01468.x](https://doi.org/10.1111/j.2044-8295.1975.tb01468.x)

Johnny.Decimal. (n.d.). *A system to organise your life*. Abgerufen am 14. Juni 2026, von [https://johnnydecimal.com/](https://johnnydecimal.com/)

Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W., Rocktäschel, T., Riedel, S., & Kiela, D. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. In H. Larochelle, M. Ranzato, R. Hadsell, M. F. Balcan, & H. Lin (Eds.), *Advances in neural information processing systems* (Vol. 33, pp. 9459–9474). Curran Associates.

Luhmann, N. (1981). Kommunikation mit Zettelkästen: Ein Erfahrungsbericht. In H. Baier, H. M. Kepplinger, & K. Reumann (Eds.), *Öffentliche Meinung und sozialer Wandel / Public opinion and social change* (pp. 222–228). Westdeutscher Verlag.

Milo, N. (n.d.). *MOCs overview*. Linking Your Thinking. Abgerufen am 14. Juni 2026, von [https://notes.linkingyourthinking.com/Cards/MOCs+Overview](https://notes.linkingyourthinking.com/Cards/MOCs+Overview)

Tulving, E., & Pearlstone, Z. (1966). Availability versus accessibility of information in memory for words. *Journal of Verbal Learning and Verbal Behavior, 5*(4), 381–391. [https://doi.org/10.1016/S0022-5371(66)80048-8](https://doi.org/10.1016/S0022-5371(66)80048-8)

Tulving, E., & Thomson, D. M. (1973). Encoding specificity and retrieval processes in episodic memory. *Psychological Review, 80*(5), 352–373. [https://doi.org/10.1037/h0020071](https://doi.org/10.1037/h0020071)

Wurman, R. S. (1989). *Information anxiety*. Doubleday.
