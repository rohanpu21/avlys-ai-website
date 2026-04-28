# Avlys AI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished xAI-inspired Avlys AI landing page and categorized portfolio page.

**Architecture:** Keep the existing Next.js App Router project. Shared visual tokens live in `app/globals.css`, landing composition stays in `app/page.tsx`, reusable sections live in `app/components`, and the portfolio filter stays in `app/portfolio/page.tsx`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Geist Sans, Geist Mono.

---

### Task 1: Global Design System

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] Update global CSS tokens, selection styling, body rendering, and focus outline behavior.
- [ ] Update metadata to describe Avlys AI as an AI automation and enterprise software partner.
- [ ] Run `npm run lint` and confirm exit code 0.

### Task 2: Landing Page

**Files:**
- Modify: `app/components/Navbar.tsx`
- Modify: `app/components/Hero.tsx`
- Modify: `app/components/ProblemSolution.tsx`
- Modify: `app/components/SolutionsGrid.tsx`
- Create: `app/components/Process.tsx`
- Modify: `app/components/WhyAvlys.tsx`
- Modify: `app/components/CallToAction.tsx`
- Modify: `app/components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] Replace navigation with landing anchors, portfolio link, and mail CTA.
- [ ] Replace hero with large monospace headline, Avlys-specific value proposition, CTAs, and proof panel.
- [ ] Update old-way/new-way comparison, core solutions, process, proof categories, differentiators, and final CTA.
- [ ] Run `npm run lint` and confirm exit code 0.

### Task 3: Portfolio Page

**Files:**
- Modify: `app/portfolio/page.tsx`

- [ ] Clean portfolio data from the supplied Markdown into typed static data.
- [ ] Add category filters, project count, sharp project cards, and scannable metadata rows.
- [ ] Run `npm run lint` and confirm exit code 0.

### Task 4: Build and Preview

**Files:**
- No source edits expected.

- [ ] Run `npm run build` and confirm exit code 0.
- [ ] Start `npm run dev` and open the site locally.
- [ ] Check landing and portfolio at desktop and mobile widths, including portfolio filters.
