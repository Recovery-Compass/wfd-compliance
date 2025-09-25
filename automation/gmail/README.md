# Gmail Automation (Apps Script) — Weekly Summaries + Follow-ups

This folder contains a Google Apps Script to automate:
- Personalized follow-ups
- Weekly dashboard summaries
- Attaching the latest impact story cards

## Prerequisites
- A Google account (Apps Script runs under your account and prompts for consent)
- The three SVG cards are hosted by the site at:
  - https://<your-domain>/impact-cards/impact-card-1.svg
  - https://<your-domain>/impact-cards/impact-card-2.svg
  - https://<your-domain>/impact-cards/impact-card-3.svg
- Optionally convert SVG to PNG locally if the recipients require PNG (see notes below)

## Setup
1) Open https://script.google.com/ and create a new project.
2) Create two files:
   - Code.gs (paste from this repo)
   - appsscript.json (paste from this repo)
3) Update RECIPIENTS, DASHBOARD_URL, and CARDS in Code.gs.
4) Run: setUpTriggers() once to schedule a weekly summary (e.g., Fridays 3pm).
5) Use sendFollowUp(sampleName) to trigger a one-off personalized follow-up.

## Conversion (SVG → PNG) on macOS (optional)
If you need PNGs, install librsvg and convert:

  brew install librsvg
  rsvg-convert -w 1080 -h 1080 impact-card-1.svg > impact-card-1.png

## Notes
- The script uses simple URL attachments; for Drive-hosted assets, replace with DriveApp APIs.
- For domain-wide sending, use a Workspace admin account. Domain delegation is not required for personal use.