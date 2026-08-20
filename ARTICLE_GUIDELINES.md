# Article Guidelines — didac-crst.com

Operational contract for drafting and reviewing articles on this site.
Use this file when an LLM assists with writing, editing, or review.

Full rationale: [`docs/writing-guidelines.md`](docs/writing-guidelines.md)

---

## The Zen of Writing

**Ideas before words.**  
**Concrete before abstract.**  
**Clarity before sophistication.**  
**Structure before volume.**  
**Principles before tools.**  
**Evidence before confidence.**  
**Determinism where possible. Judgment where necessary.**  
**Diagrams should explain, not decorate.**  
**Analogies should illuminate, not compete.**  
**Challenge your own argument.**  
**Write for humans. Preserve meaning for machines.**  
**AI may accelerate the writing. It must not replace the thinking.**  
**Finish with what matters.**  
**If it sounds like generic thought leadership, rewrite it.**

---

## Non-negotiables

1. **One thesis per article.** State it in one or two sentences. If you cannot, split the article.
2. **Practitioner voice.** Publish from experience, observation, failure, or architectural reasoning — not because a topic is trending.
3. **Principles before tools.** Tools are current implementation, not the intellectual center.
4. **Concrete opening.** Experience the problem before the theory. No dictionary definitions as openers unless the format is deliberately short.
5. **Sector- and company-agnostic.** No employer names, client names, confidential systems, or internal methodology acronyms.
6. **Publish the architecture. Keep the operational shortcuts.** No proprietary prompts, credentials, or security-sensitive details.
7. **Challenge the thesis.** Include limits, trade-offs, or failure modes.
8. **Human ownership.** AI may accelerate; the author must defend every claim, recommendation, and factual example.

---

## Site purpose

Build a coherent body of thinking around:

- AI engineering
- knowledge and information architecture
- software and system architecture
- reliable automation
- structured information
- engineering practice
- human and machine responsibility

Demonstrate:

1. How the author thinks
2. How abstract problems become architectures and methods
3. How those ideas influence what gets built

Core principles:

> Context before prompting.  
> Structure before automation.  
> Deterministic controls around probabilistic systems.  
> Evidence before confidence.  
> Human ownership of consequential decisions.

---

## Article types

Each article has one primary type (metadata/tags, not site hierarchy):

| Type | Question it answers | Typical length |
|------|---------------------|----------------|
| **Principle** | What do I believe about this problem, and why? | 2,000–4,000+ words |
| **Practice** | How do I apply the principle? | 1,500–3,000 words |
| **Field Note** | What did I observe or experiment with recently? | 800–1,500 words |

---

## Default narrative pattern

```
Experience → Problem → Model → Architecture → Practice → Limits → Principle
```

Chapter titles should carry meaning. A reader scanning headings should understand the argument.

Series forward links go in frontmatter (`seriesNext`), not as a bold closing line in the body.

---

## Preferred topic tags

Use cautiously. Do not create tool-specific tags unless justified by multiple articles.

- AI Engineering
- Knowledge Architecture
- Software Architecture
- Structured Information
- Reliability
- Context
- Engineering Practice

---

## Language and voice

**Target:** professional international English — clarity and precision, not generic corporate prose.

### Preserve

- technical vocabulary when load-bearing (*stochasticity*, *deterministic*, *schema enforcement*, *context gap*)
- conceptual contrasts (*probabilistic vs deterministic*, *guidance vs validation*, *workbench vs assembly line*)
- everyday analogies after technical concepts
- sentence rhythm variation — long reasoning, short pivots
- direct statements, restrained humor, rhetorical questions
- the pattern: technical concept → analogy → technical concept

Example rhythm:

> The prototype looked reliable.
>
> **Then came the 5%.**

### Correct freely

- grammar and idiom errors
- non-native constructions ("at what extent" → "to what extent")
- redundant phrasing
- overloaded sentences

### Do not

- simplify technical vocabulary by default
- add buzzwords, hype, or motivational language
- flatten prose into thought-leadership boilerplate
- remove personality or humor
- invent anecdotes to satisfy the format

### Vocabulary rule

Use the simplest word that preserves precision. Never use complexity to sound intelligent.

### Named concepts

Name only when the label will be reused (*context gap*, *workbench vs assembly line*). Avoid branding every intermediate idea.

### Emphasis

Bold and punctuation create hierarchy, not decoration. Use sparingly on the public site.

### Final voice check

> After editing, does this still sound like something the author would plausibly say?

If not, roll back the edit.

---

## Metaphors and visuals

- **One dominant metaphor per major idea.** Do not stack dragons, bridges, chefs, and skeletons in one article.
- **Diagrams explain or compare.** Remove decorative infographics.
- **Text stays in prose**, not inside images — keep content searchable and accessible.
- **Pattern:** intuitive explanation → technical representation (flow, schema, code).
- **Visual production:** follow [`VISUAL_GUIDELINES.md`](VISUAL_GUIDELINES.md) — Mermaid → SVG for technical diagrams; brief → Recraft for heroes/illustrations/covers; no architecture diagrams from image models. Flagship Principle articles should usually have an article hero.

---

## Technical honesty

Distinguish:

- evidence
- observation
- hypothesis
- analogy
- opinion

Do not present illustrative numbers (e.g. "95% accurate") as measured facts without saying so.

Prefer:

> Explicit structure can reduce ambiguity…

over unsupported claims like:

> Markdown reduces hallucinations.

---

## Closings and connections

- **Conclusion:** zoom out to one strong principle — do not repeat the introduction.
- **Questions:** intellectually meaningful only. No "What do you think?"
- **Links:** point to related articles and projects. Prefer Principle → Practice → Project chains.
- **Discussion:** optional GitHub Discussion link. No engagement bait.

---

## AI-assisted workflow

AI may: challenge thesis, find counterarguments, improve structure, edit language, suggest diagrams, review coherence.

AI must not: own the argument, invent unsupported claims, or replace engineering judgment.

Before publication the author must defend every central claim in front of an experienced engineer.

---

## Pre-publication checklist

### Purpose & thesis
- [ ] One-sentence reason this article exists
- [ ] Actual idea, not information recycling
- [ ] Clear thesis in 1–2 sentences; single thesis only

### Structure & opening
- [ ] Concrete opening connected to the argument
- [ ] Story before first `##` (automatic narrative lead) unless `storyLead: false`
- [ ] Each chapter advances the argument
- [ ] Headings alone tell the story
- [ ] Blockquotes reserved for theses/principles, not the whole opening story

### Integrity
- [ ] Claims defensible; illustrative vs measured clearly marked
- [ ] Limits and trade-offs acknowledged
- [ ] Principles separated from current tools

### Confidentiality
- [ ] No employer/client/system-specific content
- [ ] Rewritten for public durability, not sanitized copies

### Voice
- [ ] Still sounds like the author, not generic consultant prose
- [ ] Non-native errors fixed; technical vocabulary preserved
- [ ] One memorable closing principle

### Connections
- [ ] Related articles/projects linked where appropriate

---

## Final test

> If someone reads only this article, will they conclude the author understands how information, AI, and software systems interact — thinks architecturally, cares about reliability, and explains complex ideas clearly?

If yes → publish in Writing.

If no → revise or publish elsewhere.

---

## Exceptions

- **Field Notes** may be shorter, provisional, tool-focused.
- **Practice** articles may open directly on a concrete problem.
- **Data-driven** pieces may lead with evidence, not narrative.
- **Short-form** (≈700 words) is fine when the idea is complete.
- **Experimental formats** allowed when they serve clarity better than the default pattern.

Invariant: **clarity of thought**, not stylistic uniformity.
