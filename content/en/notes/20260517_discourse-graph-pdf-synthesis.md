---
title: "Knowledge Synthesis from PDFs: Discourse Graph & Structured Parsing with Claude Code"
description: "How to systematically evaluate PDFs using Claude Code and LLM automation, leveraging scientific methods (Discourse Graph, Strauss-Corbin) to extract genuine insights from information noise."
author: Maik
written_by: 95% human
status: published
type: seedling
category: Research
tags:
  - knowledge-management
  - ai
  - research
  - grounded-theory
  - discourse-graph
  - llm
  - claude-code
language: en
translation: 20260517_discourse-graph-pdf-synthesisierung
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

# Knowledge Synthesis from PDFs in the LLM Wiki: Discourse Graph & Structured Parsing with Claude Code

## The Problem: Information Overload in Scientific Papers

When building an "ingest workflow" for scientific papers (PDFs) into my LLM wiki, I realized summaries that contain **everything** are counterproductive. Instead, I needed to extract only genuinely relevant information. The context "clogs" processing, creating enormous noise. Many details in a paper are simply irrelevant to specific research questions, but the model doesn't know that on its own.

In the analogue world, the solution is straightforward: linear reading, highlighting, extracting. Time-consuming. Error-prone. Not scalable.

But there is an approach: extracting information through structured parsing using the [Discourse Graph](https://discoursegraphs.com/) methodology.

## The Discourse Graph: A Method for Structured Knowledge Synthesis

The Discourse Graph is not merely an ontological knowledge concept—it's a practical method for systematically extracting and linking knowledge from unstructured sources. The idea: decompose every text into granular, interconnected units rather than treating it as a monolithic block.

I applied the **five core components** of the Discourse Graph to my wiki as follows:

### 1. **Sources**
The primary document itself. Who wrote it? When? In what context? This anchors all downstream information.

### 2. **Evidence**
All usable information from the source:

- Methodological details (research design, sample size, instruments)

- Theoretical foundations (concepts, frameworks)

- Empirical findings (results, metrics, observations)

**Important:** Evidence is *facts or observations*, not yet interpretations.

### 3. **Claims (Assertions/Findings)**
The conclusions authors draw from evidence: "If evidence X shows, then statement Y follows." Claims are the scientific findings a paper propagates.

### 4. **Questions**
The scientific questions the text answers or raises. These emerge **inductively** from evidence and claims. They map the research space.

### 5. **Concepts**
Overarching ideas, theories, constructs linking multiple claims and evidence. They are the "building blocks" of my knowledge graph.

This structure is also called **atomization** or **granularization** of knowledge. Each unit is small enough to be understood in isolation, yet large enough to carry information content.

### Theoretical Background: Toulmin's Argument Pattern

This structure builds on [Stephen Toulmin's argumentation theory](https://searchworks.stanford.edu/view/13362780) (*The Uses of Argument*, 1958). Toulmin showed that valid arguments don't consist merely of "thesis + proof," but of:

- **Claim** (assertion)

- **Data/Evidence** (support)

- **Warrant** (why evidence supports the claim)

- **Backing** (support for the warrant)

- **Qualifier** (limitation, certainty)

- **Rebuttal** (counter-arguments)

The Discourse Graph is a practical application of this model to knowledge networking and proves very useful for analyzing scientific texts.

## The Implementation: Structured Parsing with Claude Code

I developed this workflow iteratively. Rather than simply loading PDFs and generating summaries, I implemented structured parsing in the LLM wiki. As I outlined in my [earlier work on the Wiki-LLM to Reasoning Linter](/de/notes/20260410_vom-wiki-llm-zum-reasoning-linter), the pipeline looks like this:

```
PDF Input
    ↓
[1] Structured Parsing
    → Text sections & segments
    → Each segment indexable & linked
    ↓
[2] Evidence Extraction
    → Methodological evidence
    → Theoretical evidence
    → Results-based evidence
    ↓
[3] Claim Identification
    → Claims based on evidence
    → Claims as interpretations/conclusions
    ↓
[4] Question Generation (inductive)
    → Which questions does this text answer?
    → Which new questions emerge?
    ↓
[5] Knowledge Graph Assembly
    → Bidirectional links between all components
    → Define relation types
    → Graph storage (Tana, ObsidianMD, Neo4j, etc.)
    ↓
Output: Queryable Knowledge Graph
```
Fig. 1: The Pipeline (Flowchart) (author's own)

This yields several advantages:

1. **Structures, not summaries**: The process doesn't generate "The paper says X," but rather "Evidence A supports Claim B, which answers Question C."

2. **Context reduction through granularity**: Each segment is small enough to stay focused on its point.

3. **Linking as quality assurance**: If evidence and claim can't be linked, something's missing.

4. **Bidirectional connections**: I can ask not only "Which claims does this evidence support?" but also "What evidence do I have for this claim?"

### Claude Code for Automation

I developed a Python parsing pattern (imperfect, but a solid start):

```python
def parse_pdf_to_discourse_graph(pdf_path):
    # 1. Decompose PDF into segments
    segments = extract_segments(pdf_path)
    
    # 2. For each segment: identify evidence
    for segment in segments:
        evidences = extract_evidences(segment, types=[
            "methodological",
            "theoretical", 
            "empirical"
        ])
        
        # 3. Derive claims from evidence
        claims = derive_claims(segment, evidences)
        
        # 4. Generate questions inductively
        questions = generate_questions(segment, evidences, claims)
        
        # 5. Store in graph with relations
        save_to_knowledge_graph({
            "source": pdf_metadata,
            "segment": segment,
            "evidences": evidences,
            "claims": claims,
            "questions": questions,
            "links": create_bidirectional_links(...)
        })
```

### Planned Extensions: *Beyond Claims*

Future note types can extend beyond claims, evidence, questions, and concepts:

- **Hypotheses**: Conjectures derived from the data—not just what the paper says, but what it *could mean*.

- **Didactical Patterns**: For educational development and learning research, didactical concepts also matter.

- **Methodological Innovations**: New methods emerging from the findings.

I also need more sophisticated **relation grammar** between knowledge types. Relations should describe not just "these things are linked," but *how* they're linked.

### Related Content

This connects to several other posts in this digital garden:

- [**From PKM to CKM**](/de/notes/20260401_von-pkm-zu-ckm): Collaborative Knowledge Management instead of Personal Knowledge Management—exactly what a knowledge graph enables.

- [**Wikipedia Project: PKM**](/de/notes/20260502_wikipedia-projekt-pkm): The idea of structurally curating public knowledge.

- [**Why We Write Publicly**](/de/notes/20260426_warum-wir-oeffentlich-schreiben): Because public knowledge becomes more valuable through networking.

- [**From Wiki-LLM to Reasoning Linter**](/de/notes/20260410_vom-wiki-llm-zum-reasoning-linter): The technical realization—automated "linting" of arguments.

- [**Everything Claude Code**](/de/notes/20260510_everything-claude-code): The tools to automate this.

## Next Steps: What Comes After the Graph?

1. **Granularization as Standard**: What if academic research expected scholars to publish findings in granular form rather than writing books and papers?

2. **Research as Graph Query**: Instead of "Write a review," researchers could frame tasks like: "Create a query on the graph: Which evidence supports thesis X? Which concepts are controversial? Where are the gaps?"

3. **Automated Synthesis**: With LLMs, I can not only read papers but query the graph directly and *generate* syntheses. Rather than writing them manually, a pre-structured text with an evaluation of existing findings can be created as inspiration for new writing.

4. **Interdisciplinary Insight**: When I link knowledge graphs across disciplines, new insights emerge simply through the *architecture* of the graph itself, alongside manual thinking.

All this sounds like information extraction from scientific texts can be fully automated—work machines will eventually handle. Yes, I do hope to offload **certain** manual tasks. Yet we as researchers remain responsible for quality assurance. Results must be verified in the end. That's probably an idea for a later post.

## Literature & Resources

- **Discourse Graph**: [GitHub Repository](https://github.com/DiscourseGraphs/discourse-graph) | [Protocol Labs: "Discourse Graphs and the Future of Science"](https://www.protocol.ai/blog/discourse-graph-qa/)
- **Toulmin, Stephen**: *The Uses of Argument* (1958) — [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/toulmin-logic/)
- **Open-Source Knowledge Graphs**: [GitHub - Awesome Knowledge Graph](https://github.com/totogo/awesome-knowledge-graph)

---
*Created: 2026-05-17 · v01*
