# Jobs Edition Style Guide

This guide documents the minimal design tokens and layout rules used in the Jobs dashboard.

- Colors (Tailwind tokens): bg-card, text-ink-900/700/600, border-line, bg-wfd-gold
- Typography: Inter as base; use text-h1-page, text-h3-card, text-data-large, text-label; apply tabular-nums to numbers
- Spacing: 8pt scale (4,8,16,24,32...). Container max-w-dashboard
- Tap targets: min-h-11 (44px). Buttons use inline-flex, center content
- Effects: shadow-enterprise only. No animations
- Imagery: monochrome SVG logos at 40px (WFD) and 28px (RC)

Usage principles:
- Single H1 per page including main keyword
- Semantic HTML: header, main, section, article
- Mobile first: grid stacks at 375px with no horizontal scroll
