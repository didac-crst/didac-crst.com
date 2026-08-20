# Editorial Guidelines — didac-crst.com

This document defines what an article on didac-crst.com is supposed to achieve, what good looks like, and when breaking the rules is justified.

For a compact operational contract suitable for LLM-assisted drafting and review, see [`ARTICLE_GUIDELINES.md`](../ARTICLE_GUIDELINES.md) at the repository root.

---

## The Zen of Writing

**Ideas before words.**  
An article exists because there is something worth understanding, not because something needs to be published.

**Concrete before abstract.**  
Let the reader experience the problem before naming the concept.

**Clarity before sophistication.**  
Use complexity when the idea requires it, never to make the writing sound intelligent.

**Structure before volume.**  
A clear hierarchy beats a longer explanation.

**Principles before tools.**  
Technologies change. Good architecture survives them.

**Evidence before confidence.**  
Distinguish what is known, observed, inferred, assumed, and believed.

**Determinism where possible. Judgment where necessary.**  
Do not ask AI—or prose—to hide uncertainty that actually exists.

**Diagrams should explain, not decorate.**  
If a visual does not make the idea easier to understand or remember, remove it.

**Analogies should illuminate, not compete.**  
One strong metaphor is better than five clever ones.

**Challenge your own argument.**  
A useful idea includes where it fails, what it costs, and when not to use it.

**Write for humans. Preserve meaning for machines.**  
Good information should remain understandable, structured, portable, and reusable.

**AI may accelerate the writing. It must not replace the thinking.**  
Correct the language. Sharpen the argument. Keep the intellectual ownership human.

**Finish with what matters.**  
Do not merely summarize. Leave the reader with one idea, one tension, or one question worth carrying forward.

**If it sounds like generic thought leadership, rewrite it.**

---

## 1. Purpose of the Writing Section

The Writing section is not a conventional personal blog, a news feed, or a collection of tutorials.

Its purpose is to build a coherent body of thinking around:

- AI engineering
- knowledge and information architecture
- software and system architecture
- reliable automation
- structured information
- engineering practices
- human and machine responsibility

Articles should progressively demonstrate three things:

1. **How I think**
2. **How I translate abstract problems into architectures and methods**
3. **How those ideas influence what I build**

The objective is not to appear knowledgeable about every new technology.

The objective is to develop a recognizable point of view.

A reader should gradually understand that my approach is based on principles such as:

> Context before prompting.  
> Structure before automation.  
> Deterministic controls around probabilistic systems.  
> Evidence before confidence.  
> Human ownership of consequential decisions.

---

## 2. Editorial Positioning

### 2.1 Write as a practitioner, not as an influencer

Articles should emerge from:

- something I built;
- something I observed;
- a recurring engineering problem;
- an architectural decision;
- an experiment;
- a failure;
- a conceptual model that clarified a problem.

Avoid writing an article merely because a topic is currently popular.

**Weak reason to publish**

> Everyone is talking about AI agents, so I should write about AI agents.

**Strong reason to publish**

> While building software with several AI agents, I noticed that generating code became cheap but verifying intent became the bottleneck. This changes how I think about software engineering.

The second contains an actual idea.

### 2.2 Prefer durable ideas over temporary tools

Tools may appear in articles, but they should rarely be the intellectual center of an article.

Prefer:

> Schema validation around probabilistic extraction

over:

> How to use Pydantic with Gemini

Prefer:

> Engineering software when agents write part of the code

over:

> My Codex workflow

Tools change.

Architectural problems change much more slowly.

When a tool is important, present it as the **current implementation of a broader principle**.

---

## 3. Types of Writing

Articles remain structurally flat on the website. Classification is handled through metadata and tags rather than a rigid hierarchy.

Each article should have one primary **type**.

### Principle

An article that develops a durable conceptual position.

Examples:

- AI Doesn't Need Better Prompts. It Needs Better Context.
- From Probabilistic AI to Reliable Systems.
- When AI Shouldn't Be Used.

A Principle article should answer:

> What do I believe about this problem, and why?

### Practice

An article describing a reusable engineering method.

Examples:

- Structure Before Intelligence.
- Engineering Software With AI Agents.
- Using text-based diagrams as executable documentation.

A Practice article should answer:

> How do I apply the principle?

### Field Note

A narrower, more time-sensitive observation or experiment.

Examples:

- What I learned using coding agents on a specific project.
- An experiment comparing two document-classification strategies.
- A workflow that currently works well but may evolve.

Field Notes may explicitly include the publication date in their framing.

They do not need to pretend to be timeless.

---

## 4. Topic Tags

Articles may have several topic tags.

Tags are relational rather than hierarchical.

Initial preferred vocabulary:

- AI Engineering
- Knowledge Architecture
- Software Architecture
- Structured Information
- Reliability
- Context
- Engineering Practice

New tags should be created cautiously.

### Tag quality rule

A new tag should normally exist only if:

- several articles could reasonably use it; or
- it represents a durable area of expertise I intentionally want to develop.

Avoid creating first-class tags for individual tools such as:

- Gemini
- ChatGPT
- Codex
- Pydantic
- Mermaid

unless the site later develops enough content around that specific technology to justify it.

---

## 5. The Core Article Pattern

Not every article must follow exactly the same structure, but important articles should usually follow this progression:

> **Experience → Problem → Model → Architecture → Practice → Limits → Principle**

This is the default narrative architecture.

---

## 6. Opening an Article

### 6.1 Prefer a concrete opening

Whenever possible, begin with:

- a real experience;
- a small failure;
- a surprising result;
- an ordinary human problem;
- a concrete technical situation.

Examples of effective patterns:

- a model that confidently gives a wrong answer;
- a bicycle chain breaking;
- a debugging session;
- an apparently successful prototype failing on an edge case;
- an engineer repeatedly copy-pasting between systems.

The reader should first **experience the problem** before receiving the theory.

### Narrative lead (automatic)

On didac-crst.com, everything **before the first `##` heading** is wrapped as a narrative lead (`.article-story`): fuller text colour, slightly larger type, muted left rule.

**Authoring rule:** write the story first, then start analysis at the first `##`. No special Markdown required.

Opt out when an article should not use a story band:

```yaml
storyLead: false
```

Reserve `>` blockquotes for theses and principles — not for the whole opening story.

### 6.2 Avoid dictionary openings

Do not normally begin with:

> Context engineering is defined as...

> Large Language Models are...

> Markdown is a lightweight markup language...

These introductions are technically safe but editorially weak.

The article should earn the abstraction.

### 6.3 The opening must lead somewhere

A story is not decoration.

Within the first section, the reader should understand why the story matters.

Use a pivot such as:

> The interesting part wasn't that the model failed. The interesting part was why.

or:

> What looked like an AI problem was actually an information problem.

The story should expose the architectural question.

### Exception

A concrete opening is optional when:

- the article is deliberately short;
- a visual or data point provides a stronger opening;
- the subject is already inherently concrete;
- forcing a story would feel artificial.

Never invent personal anecdotes merely to satisfy the format.

---

## 7. Establish a Clear Thesis

Every substantial article should contain one central proposition that could be expressed in one or two sentences.

Examples:

> Better prompting cannot compensate for missing context.

> The goal is not to make the LLM deterministic. It is to make the system around it reliable.

> When code generation becomes cheap, specifications and verification become more valuable.

If the thesis cannot be stated clearly, the article probably contains several articles competing with each other.

---

## 8. Chapters Should Advance the Argument

Chapters are not containers for unrelated information.

Each chapter should move the reader one conceptual step forward.

Good progression:

1. Why the problem exists
2. What mental model explains it
3. Where conventional approaches fail
4. What architecture addresses it
5. How it works in practice
6. Where it stops working
7. What broader principle follows

Avoid chapter structures such as:

1. Introduction
2. Background
3. More Background
4. Tools
5. Conclusion

Chapter titles should preferably carry meaning.

Examples:

- The Context Gap
- The 95% Problem
- Workbench vs Assembly Line
- Guidance vs Validation
- The Deterministic Skeleton
- When Structure Becomes a Constraint

A reader scanning only the headings should roughly understand the argument.

---

## 9. Use Metaphors Deliberately

Metaphors are an important part of the writing style.

They make complex ideas accessible and memorable.

Useful examples include:

- workbench vs assembly line;
- coach vs referee;
- pantry of modular context;
- aerodynamic drag;
- blueprint vs narrative;
- bridge between human language and deterministic systems.

### Metaphor quality gate

A metaphor should:

- clarify a relationship;
- reduce cognitive effort;
- survive more than one paragraph;
- map reasonably well to the underlying technical concept.

Avoid metaphor accumulation.

One article should not require the reader to simultaneously reason about:

- dragons;
- bridges;
- chefs;
- referees;
- skeletons;
- subcontractors;
- aircraft.

Prefer one dominant metaphor for each major idea.

---

## 10. Diagrams Are Part of the Reasoning

Visuals are not decoration.

A diagram should normally do at least one of four things:

1. explain a system;
2. externalize logic;
3. compare alternatives;
4. make an abstract concept memorable.

There are two legitimate visual types.

### Information diagrams

Examples:

- decision trees;
- system architecture;
- data flows;
- sequence diagrams;
- entity relationships;
- validation loops.

These carry actual information and should remain understandable without artistic embellishment.

### Conceptual illustrations

Examples:

- tectonic fault;
- assembly line;
- aerodynamic drag;
- modular pantry.

These are primarily mnemonic devices.

They help the reader remember the argument.

### Visual quality rule

Prefer:

> one visual that explains an idea

over:

> one image every few paragraphs.

Too many elaborate infographics can make an article feel like corporate training material.

The text should remain the primary narrative.

### Text inside images

Keep embedded text limited.

Detailed explanations should remain in HTML/text whenever possible because they are:

- searchable;
- selectable;
- accessible;
- responsive;
- easier to update;
- easier for machines to process.

Let the graphic show the model.

Let the prose explain it.

Canonical dimensions, Mermaid → SVG production, illustration workflow, colour grammar, and file naming are defined in [`docs/visual-guidelines.md`](visual-guidelines.md).

---

## 11. Technical Depth

Articles should be understandable to an intelligent professional without requiring specialist knowledge of every technology mentioned.

However, they should not be oversimplified merely to maximize accessibility.

The preferred pattern is:

> intuitive explanation → technical representation

For example:

Explain why validation matters.

Then show:

```text
Unstructured input
        ↓
LLM interpretation
        ↓
Structured candidate
        ↓
Schema validation
        ↓
Deterministic rules
        ↓
Accepted result
```

A manager should understand the principle.

An engineer should see that the principle can actually be implemented.

---

## 12. Avoid False Precision

Do not present illustrative numbers as measured facts.

If an article discusses something like "95% accuracy," clarify whether this is:

- experimentally measured;
- anecdotal;
- illustrative;
- approximate.

Likewise, avoid unsupported claims such as:

> Markdown reduces hallucinations.

Prefer:

> Explicit structure can reduce ambiguity and make relationships easier for both machines and humans to interpret.

The writing should distinguish:

- evidence;
- observation;
- hypothesis;
- analogy;
- opinion.

---

## 13. Challenge the Article's Own Thesis

Strong articles should usually contain some form of counter-pressure.

Possible chapter:

### Where This Breaks

or:

### The Limits of the Model

Ask questions such as:

- When is this approach unnecessary?
- What are the trade-offs?
- What failure modes remain?
- When does structure become rigidity?
- When is human review still necessary?
- What happens when the schema itself is wrong?
- What does the approach cost?

This is important.

The goal is not to prove that an idea is universally correct.

The goal is to demonstrate engineering judgment.

### Exception

A short Practice article or Field Note does not need a dedicated limitations chapter if the limitations can be stated clearly in a few sentences.

---

## 14. Strategic and Tactical Content Should Reinforce Each Other

The Writing section should contain both.

A site containing only strategic essays risks communicating:

> This person has opinions.

A site containing only tutorials risks communicating:

> This person knows tools.

The combination should communicate:

> This person understands the principle and can implement it.

A healthy pattern is:

> **Principle → Practice → Project**

For example:

**Principle**  
From Probabilistic AI to Reliable Systems

↓

**Practice**  
Schema validation and verification loops

↓

**Project**  
AtlasDocs implementation

Projects provide evidence that the ideas are operational rather than theoretical.

---

## 15. Relationship With Projects

Whenever appropriate, articles should link to relevant projects.

Likewise, projects should link back to the ideas behind them.

Example:

> **Applied in:** AtlasDocs

or:

> **Ideas behind this project:**  
> From Probabilistic AI to Reliable Systems  
> Structure Before Intelligence

The site should gradually behave less like a collection of pages and more like a network of connected ideas and implementations.

---

## 16. Writing About Current Tools

It is acceptable to write about contemporary tools and workflows.

Examples:

- ChatGPT
- Codex
- Cursor
- CodeRabbit
- Gemini
- specific libraries or frameworks

But the article should distinguish between:

### Durable principle

> Independent verification is useful when AI generates implementation code.

and:

### Current implementation

> Today I use Tool X for the independent review stage.

This protects the article from becoming obsolete when tooling changes.

---

## 17. What Should Remain Private

Publishing a method does not normally destroy a consulting advantage.

The valuable capability is usually not knowing that a technique exists, but knowing:

- when to use it;
- when not to use it;
- how to adapt it;
- how to integrate it;
- how to handle edge cases;
- how to make architectural trade-offs.

Therefore:

> **Publish the architecture. Keep the operational shortcuts.**

Reasonable things to keep private include:

- reusable proprietary prompts;
- personal automation shortcuts;
- credentials or infrastructure details;
- confidential client/employer information;
- internal templates that provide disproportionate execution leverage;
- private datasets;
- security-sensitive implementation details.

---

## 18. Employer and Confidentiality Boundary

Public articles should be written as independent intellectual work.

Internal employer-specific articles should not simply be copied externally.

When adapting an idea:

- remove internal terminology;
- remove confidential examples;
- replace internal systems with neutral examples;
- recreate diagrams where necessary;
- rewrite rather than merely sanitize;
- ensure the public article stands on its own.

The public version should normally be broader and more durable than the internal version.

Articles must be sector- and company-agnostic. Do not name employers, clients, or industry-specific systems unless the article explicitly requires it and the reference is public knowledge.

Avoid invented methodology acronyms that read like internal branding.

---

## 19. Article Length

There is no mandatory word count.

Length should follow the argument.

As a rough guide:

### Field Note

800–1,500 words

### Practice

1,500–3,000 words

### Principle / flagship essay

2,000–4,000+ words when justified

Do not inflate articles to meet a target.

Do not split an argument merely to produce more content.

Conversely, if an article contains two independent theses, split it.

---

## 20. Tone

The preferred tone is:

- technically serious;
- curious;
- pragmatic;
- occasionally playful;
- confident without pretending certainty;
- accessible without becoming simplistic.

Humor is welcome when it comes naturally from the situation.

Avoid:

- exaggerated AI hype;
- marketing jargon;
- motivational language;
- unnecessary buzzwords;
- artificial controversy;
- pretending every idea is revolutionary.

---

## 21. Closing an Article

The conclusion should not merely repeat the introduction.

It should **zoom back out**.

A good conclusion answers:

> After everything we explored, what should the reader now believe differently?

Prefer ending on one strong principle.

Example:

> The goal isn't to make the model deterministic. It's to make the system around it reliable.

---

## 22. Throwing the Ball Back to the Reader

Articles may end with an open question, but it should be intellectually meaningful.

Avoid generic engagement prompts such as:

> What do you think?

> Let me know in the comments!

> Agree or disagree?

Prefer a specific unresolved question.

Example:

> If every AI-generated result still requires human verification, at what point have we actually automated the process?

or:

> Where should the boundary lie between probabilistic reasoning and deterministic control?

The question should remain valuable even if nobody answers it.

---

## 23. Discussion and Community

The website should not attempt to recreate a social network.

Initially:

- no likes;
- no reaction counters;
- no visible empty comment sections;
- no engagement metrics.

When an article raises a genuine discussion opportunity, it may link to a corresponding GitHub Discussion.

Preferred pattern:

> **Discuss this idea →**

The discussion invitation should be secondary to the article itself.

If meaningful conversations eventually emerge consistently, embedded discussions may be considered later.

Do not build community infrastructure before there is evidence of a community.

---

## 24. Connecting Articles

Important articles should preferably point forward or sideways.

**Series forward links** belong in frontmatter, not in the article body — they render as layout chrome after the prose:

```yaml
seriesNext:
  title: "Structure Before Intelligence"
  description: "Why shape, hierarchy, and explicit relationships matter as much as content itself."
  slug: structure-before-intelligence   # optional until the next piece is published
```

The closing paragraphs may still foreshadow the next idea in prose. Do not append a bold “Next in this series” line inside the markdown — it reads as part of the argument.

For non-series related reading, the site footer / related cards handle discovery. Explicit sideways mentions inside the body are fine when they serve the argument.

---

## 25. AI-Assisted Writing

AI may be used extensively during writing.

Appropriate uses include:

- challenging the thesis;
- finding counterarguments;
- identifying missing edge cases;
- improving structure;
- reducing repetition;
- editing language;
- generating alternative explanations;
- producing initial diagrams;
- reviewing technical coherence.

However:

> AI may accelerate the article. It does not own the argument.

Before publication, I must be able to defend:

- every central claim;
- every architectural recommendation;
- every conclusion;
- every diagram;
- every example presented as factual.

If I would be uncomfortable defending a sentence in front of an experienced engineer, it should not be published.

---

## 26. Language and Authorial Voice

Articles are written in professional international English.

The objective is **clarity and precision, not imitation of generic native corporate prose**.

The author's natural style combines:

- advanced technical vocabulary where precision requires it;
- conceptual contrasts to structure arguments;
- concrete everyday analogies;
- alternating long explanatory sentences with short emphatic statements;
- occasional rhetorical questions;
- restrained humor;
- direct statements rather than excessive hedging.

### Conceptual contrast

A recognizable rhetorical pattern is opposition:

> probabilistic vs deterministic  
> workbench vs assembly line  
> guidance vs validation  
> narrative vs blueprint  
> AI-generated vs AI-accelerated

Another common move:

> X appears to be the problem.  
> But actually Y is the problem.

These patterns are part of how the author reasons in prose. Preserve them.

### Three registers

The writing moves comfortably between:

**Technical** — schema, deterministic, API, entities, validation, architecture

**Conceptual** — context gap, cognitive tax, information decay, drift

**Everyday** — pantry, frozen meal, bike chain, rubber duck, traffic jams, referee

The typical pattern:

> technical concept → ordinary analogy → technical concept again

### Sentence rhythm

Prefer variation.

Longer sentences may develop reasoning.

Short sentences may mark pivots or conclusions.

Example:

> The prototype looked reliable.

> **Then came the 5%.**

### Punctuation and emphasis

Colons, em dashes, parenthetical comments, rhetorical questions, and occasional one-line statements are part of the voice.

**Emphasis should create hierarchy, not decoration.**

For the public site, use bold and capitalization more sparingly than in internal drafts. Quieter typography makes the ideas feel more confident.

### Named concepts

Name concepts only when the name will be reused or genuinely helps the reader reason about the idea.

"Context gap" and "workbench vs assembly line" are worth keeping.

Not every intermediate idea needs a branded label.

### Vocabulary principle

Use the simplest word that preserves the intended precision.

Do not use simple language at the expense of a useful distinction.

Do not use sophisticated language merely to sound sophisticated.

Do not systematically simplify technical vocabulary during editing.

Terms such as *stochasticity*, *deterministic*, *cognitive tax*, *schema enforcement*, and *context gap* are often load-bearing. Keep them when they carry meaning.

### International English

The target is not colloquial British or American English.

Prefer internationally understandable professional English and avoid unnecessary:

- regional idioms;
- slang;
- cultural references requiring explanation.

### Non-native language correction

Second-language constructions are not considered part of the author's voice and should be corrected freely.

Examples to fix:

- "at what extent" → "to what extent"
- "I have one question I have…" → "I have one question…"
- redundant phrasing such as "it gives me, provides me…"

Preserve the **thinking**, not the grammatical error.

### What AI editing should do

- correct grammar, idiom and non-native constructions;
- remove unnecessary repetition;
- improve sentence rhythm;
- challenge unclear vocabulary;
- shorten sentences that have become structurally overloaded.

### What AI editing should not do

- systematically simplify technical vocabulary;
- replace direct language with corporate jargon;
- introduce fashionable buzzwords;
- remove personality or humor;
- make every sentence syntactically uniform;
- transform the text into generic "thought leadership" prose.

### Anti-pattern

Reject prose like:

> In today's rapidly evolving technological landscape, organizations increasingly face the challenge of leveraging artificial intelligence while maintaining robust governance frameworks.

Prefer:

> It worked. Until it didn't.

### Voice quality gate

> **After AI editing, does this still sound like something I would plausibly say, or has it become generic consultant prose?**

If the answer is the latter, roll the editing back.

The model is: **You provide the intellectual fingerprint; AI removes the linguistic noise.**

---

## 27. Quality Gate — Before Publication

An important article should not be published until the following questions can be answered satisfactorily.

### A. Purpose

- [ ] Can I explain in one sentence why this article exists?
- [ ] Does it contain an actual idea rather than merely information?
- [ ] Does it contribute to the themes I want to be known for?
- [ ] Am I writing this because I have something to say rather than because I need content?

### B. Thesis

- [ ] Can the central argument be expressed clearly in one or two sentences?
- [ ] Does the article actually support that argument?
- [ ] Have I avoided combining several unrelated theses?

### C. Opening

- [ ] Does the opening give the reader a reason to continue?
- [ ] Is any story directly connected to the argument?
- [ ] Have I avoided generic textbook exposition where a concrete example would work better?

### D. Structure

- [ ] Does each chapter advance the argument?
- [ ] Could someone scanning only the headings understand the progression?
- [ ] Have I removed redundant chapters or repetitions?
- [ ] Is the progression logical rather than chronological by accident?

### E. Technical Integrity

- [ ] Are factual claims defensible?
- [ ] Are illustrative examples clearly distinguishable from measured results?
- [ ] Are calculations and technical claims checked?
- [ ] Have I avoided presenting probabilistic behavior as deterministic?
- [ ] Have I distinguished observation, inference and opinion?

### F. Critical Thinking

- [ ] Have I considered where the approach fails?
- [ ] Have I acknowledged meaningful trade-offs?
- [ ] Could a competent engineer disagree with me for a legitimate reason?
- [ ] If so, have I represented that disagreement fairly?

### G. Visuals

- [ ] Does every major visual serve a purpose?
- [ ] Could any decorative infographic be removed without loss?
- [ ] Are technical diagrams understandable independently?
- [ ] Is important explanatory text available outside images?
- [ ] Are there too many competing metaphors?

### H. Tool Independence

- [ ] Is the central idea more durable than the tools mentioned?
- [ ] If a tool disappears next year, does most of the article remain useful?
- [ ] Have I separated principles from current implementation?

### I. Confidentiality

- [ ] Is everything safe to publish publicly?
- [ ] Have employer/client-specific details been properly removed or rewritten?
- [ ] Am I publishing my reasoning rather than confidential implementation material?

### J. Closing

- [ ] Does the conclusion produce a stronger idea rather than merely summarize?
- [ ] Is there one sentence worth remembering?
- [ ] If I ask the reader a question, is it a real intellectual question?
- [ ] Are relevant articles or projects linked?

### K. Voice

- [ ] After AI editing, does this still sound like something I would plausibly say?
- [ ] Have non-native constructions been corrected without flattening the author's rhythm?
- [ ] Is technical vocabulary preserved where it carries meaning?
- [ ] Does the prose avoid generic thought-leadership tone?

---

## 28. Exceptions to the Quality Gate

The gate is not intended to make publishing impossible.

Different content types can legitimately break different rules.

### Field Note exception

A Field Note may:

- be shorter;
- contain fewer diagrams;
- explore an unresolved idea;
- be explicitly provisional;
- focus heavily on a current tool.

It should clearly signal its provisional nature.

### Tutorial exception

A Practice article may start directly with a problem rather than a narrative.

For example:

> I needed one architecture diagram to remain editable by humans, reviewable in Git and readable by AI.

That is already concrete enough.

### Data-driven exception

If a strong dataset or experiment provides the natural opening, lead with the evidence rather than inventing a story.

### Short-form exception

Some ideas deserve 700 words, not 3,000.

A short, precise article is preferable to an artificially inflated flagship essay.

### Experimental exception

Occasionally, an article may deliberately test a different format.

Possible experiments:

- annotated architecture;
- visual essay;
- dialogue;
- teardown;
- experiment log;
- hypothesis/result format.

Breaking the format is acceptable when the alternative structure better serves the idea.

The invariant is **clarity of thought**, not stylistic uniformity.

---

## 29. Final Editorial Test

Before publication, ask:

> **If someone reads only this article and nothing else about me, what will they conclude about how I think?**

The desired answer is not:

> He knows AI tools.

It should be closer to:

> He understands how information, AI and software systems interact; he thinks architecturally; he is careful about reliability; and he can explain complex ideas clearly.

If the article reinforces that impression, it belongs in Writing.

If it does not, it may still be useful — but it probably belongs somewhere else.

---

## Related files

- [`ARTICLE_GUIDELINES.md`](../ARTICLE_GUIDELINES.md) — compact operational contract for LLM-assisted drafting and review
- [`docs/visual-guidelines.md`](visual-guidelines.md) — visual language for diagrams, illustrations, and covers
- [`VISUAL_GUIDELINES.md`](../VISUAL_GUIDELINES.md) — compact visual production contract
- [`_drafts/`](../_drafts/) — working outlines (gitignored)
- [`src/content/writing/`](../src/content/writing/) — published articles
- [`visuals/`](../visuals/) — editable visual sources
