---
title: "Deterministic Systems Before Probabilistic AI"
description: "Why the most capable model is not always the right architectural choice."
published: 2027-03-12
updated: 2027-03-12
language: en
tags:
  - architecture
  - artificial-intelligence
  - knowledge-systems
draft: false
featured: true
living: true
version: "v1"
discussionUrl: "https://github.com/didac-crst/didac-crst.com/discussions"
sourceUrl: "https://github.com/didac-crst/didac-crst.com/blob/main/src/content/writing/example-article.md"
resources:
  - label: "Article source"
    url: "https://github.com/didac-crst/didac-crst.com/blob/main/src/content/writing/example-article.md"
versionHistory:
  - version: "v1"
    date: 2027-03-12
    notes: "Initial placeholder version for validating article structure."
---

Technical systems often improve when the uncertain parts are isolated instead of made central.

This placeholder article exists to validate typography, metadata, routing, code blocks, lists, tables, blockquotes, images, captions, and diagrams. Replace it with a finished article when the writing is ready.

## Start With The Stable Surface

Before adding probabilistic behavior, define what can be represented, checked, and transformed deterministically.

- Normalize input where rules are clear.
- Preserve source references and provenance.
- Use classifiers when the decision boundary is well understood.
- Reserve language models for tasks that need semantic interpretation.

> The architectural question is not whether a model is powerful. It is whether uncertainty belongs at that point in the system.

## A Small Decision Table

<div class="article-wide">
  <table>
    <thead>
      <tr>
        <th>Problem shape</th>
        <th>Better first option</th>
        <th>Reason</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Exact identifiers</td>
        <td>Parser or rules</td>
        <td>Deterministic behavior is inspectable.</td>
      </tr>
      <tr>
        <td>Repeated categories</td>
        <td>Classifier</td>
        <td>Training data can make boundaries explicit.</td>
      </tr>
      <tr>
        <td>Semantic synthesis</td>
        <td>Language model</td>
        <td>Meaning may be implicit in the text.</td>
      </tr>
    </tbody>
  </table>
</div>

## Example Pipeline

```ts
type SourceFragment = {
  id: string;
  text: string;
  sourceUrl: string;
};

export function normalize(fragment: SourceFragment) {
  return {
    ...fragment,
    text: fragment.text.trim().replace(/\s+/g, " ")
  };
}
```

## Diagram Placeholder

The article system should support inline SVG diagrams with captions.

<figure class="article-wide">
  <svg viewBox="0 0 760 220" role="img" aria-labelledby="diagram-title diagram-desc">
    <title id="diagram-title">Knowledge pipeline diagram</title>
    <desc id="diagram-desc">A simple flow from source material to structured knowledge.</desc>
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="currentColor"></path>
      </marker>
    </defs>
    <g fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#arrow)">
      <path d="M190 110 H275"></path>
      <path d="M430 110 H515"></path>
    </g>
    <g fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="2">
      <rect x="40" y="58" width="150" height="104" rx="8"></rect>
      <rect x="280" y="58" width="150" height="104" rx="8"></rect>
      <rect x="520" y="58" width="180" height="104" rx="8"></rect>
    </g>
    <g fill="currentColor" font-family="system-ui, sans-serif" font-size="17" text-anchor="middle">
      <text x="115" y="105">Fragments</text>
      <text x="355" y="105">Structure</text>
      <text x="610" y="105">Traceable</text>
      <text x="610" y="130">Knowledge</text>
    </g>
  </svg>
  <figcaption>A lightweight editorial diagram using the same color tokens as the site.</figcaption>
</figure>

## Footnote

This placeholder includes a footnote to confirm Markdown rendering support.[^scope]

[^scope]: The final article can take a stronger position once examples and references are added.
