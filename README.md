# Srimaan — Cut. Stitched. Worn.

A scroll-driven, Apple-style product page for Srimaan Uniform (authorized Mafatlal & Raymond fabric distributors, Vadodara). Built from scratch with React, TypeScript, GSAP ScrollTrigger, and Lenis smooth scroll.

The story is told across four chapters — cloth, the cut, the stitch, the finished shirt — rendered as scroll-scrubbed cinematic footage (generated with Higgsfield, decoded to frame sequences and scrubbed on `<canvas>`), with story cards, a custom cursor, and a stitched-thread scroll-progress rail tying it all together.

## Routes

- `/` — the classic cut: four independently looped video scrubbers, one per chapter.
- `/v2` — the continuous cut: the same four chapters concatenated into a single ~20s video that the entire page scrubs through forward and backward as one continuous take.

## Getting started

```bash
npm install
npm run dev
```

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Lenis (smooth scroll)
- Canvas-based frame-sequence scrubbing (no `<video>` element — frames are pre-extracted JPGs drawn to canvas in sync with scroll position)
