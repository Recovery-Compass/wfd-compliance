# WFD × RC — Phase 2 Dashboard Plan

**Status:** Draft (pending Step 1 completion)  
**Date:** October 2, 2025  
**Prerequisites:** Folder access confirmed + Housing Tracker with MOU fields + Program Data Sheet available

---

## Dashboard 1: Outcomes Dashboard

**Purpose:** Visualize client housing outcomes, placement trends, and program success metrics

**Data Source:** Housing Tracker (client-level)

**Key Metrics:**

1. **Housing Placement Rate**
   - Formula: `(Clients with HousingPlacementDate / Total Clients) × 100`
   - Visual: Large percentage tile + trend line (monthly)

2. **Average Length of Stay**
   - Formula: `AVERAGE(LengthOfStayDays)` for clients with Exit Date
   - Breakdown: By exit destination, by program site

3. **Exit Destinations (Pie Chart)**
   - Categories: Permanent Housing, Program Transfer, Self-Exit, Hospitalization, Incarceration, Other
   - Count and percentage for each

4. **Time to Housing (Histogram)**
   - Formula: `HousingPlacementDate - IntakeDate` (in days)
   - Bins: 0-30 days, 31-60, 61-90, 90+

5. **Active Enrollments vs. Exits**
   - Stacked bar: Clients still enrolled (no Exit Date) vs. exited clients
   - By month

**Tech Stack:** Lovable.dev (React + Recharts) or Tableau/Power BI

**Refresh Cadence:** Real-time (if CSV updates) or weekly batch

---

## Dashboard 2: Activity Dashboard

**Purpose:** Show operational activity, service delivery, and demographics across all WFD sites

**Data Source:** Program Data Sheet (aggregated)

**Key Metrics:**

1. **Service Delivery Summary (Cards)**
   - Unduplicated Clients Served
   - Total Meals Served
   - Services Provided
   - Transportation Trips

2. **Services by Site (Grouped Bar)**
   - X-axis: Program sites (Ted's Place, Hondo, Pathway, etc.)
   - Y-axis: Service counts
   - Grouped by: Meals, Services, Transportation

3. **Demographics Overview**
   - **Age Distribution (Pie):** 18-24, 25-54, 55+
   - **Gender Distribution (Donut):** Male, Female, Non-Binary
   - **Race/Ethnicity (Horizontal Bar):** Hispanic, Black, White, Asian, Other

4. **Month-over-Month Trends (Line Chart)**
   - Unduplicated clients trend
   - Meals served trend
   - Services provided trend

5. **Site Comparison Table**
   - Columns: Site, Clients, Meals, Services, Housing Placements
   - Sortable by any column

**Tech Stack:** Same as Outcomes Dashboard (for consistency)

**Refresh Cadence:** Monthly (locked data)

---

## Design Principles

**Judy Test Applied:**
- Use plain language labels ("People Served" not "Unduplicated Clients")
- Lead with the main point (big number tiles at top)
- Celebrate wins visually (green fills for housing placements)
- No jargon without tooltips

**Brand Alignment:**
- WFD palette primary (blues, greens per brand guide)
- RC subtle shell (footer/watermark only)

**Accessibility:**
- WCAG AA contrast ratios
- Screen reader-friendly labels
- Keyboard navigation enabled

---

## Acceptance Tests (Pre-Launch)

Before sharing dashboards with WFD board or funders:

- [ ] All metrics recompute correctly from latest CSV
- [ ] Filters work (date range, program site)
- [ ] Export to PDF functions
- [ ] Mobile-responsive on iPad/phone
- [ ] Board routes carry noindex meta tag (privacy)
- [ ] Sample data QA'd against source spreadsheet (5-row spot check)

---

## Implementation Timeline (Post-Step 1)

| Milestone | Estimated Duration | Dependencies |
|-----------|-------------------|--------------|
| **Outcomes Dashboard v1** | 3-5 days | Housing Tracker with complete MOU fields |
| **Activity Dashboard v1** | 2-3 days | Program Data Sheet with standardized field names |
| **User Acceptance Testing** | 1-2 days | WFD team availability for feedback |
| **Board Packet Integration** | 1 day | PDF export + email template |
| **Launch (Soft)** | Day 0 | Board preview link shared via email |

**Total estimated time:** 7-11 business days from Step 1 completion

---

## Known Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Housing Tracker still missing Intake/Exit dates | Cannot compute LoS | WFD populates retroactively; dashboard shows "TBD" for incomplete records |
| Schema drift (field names change) | Dashboard breaks | Implement schema validation script; fail loud if headers mismatch |
| Sync still unreliable | Stale data in dashboards | Establish download + manual upload protocol as backup |

---

## Contact

**Dashboard questions:** eric@recovery-compass.org  
**MOU reference:** Section 3 (EBP Validation & Case Study)

**Next Action:** Await Step 1 confirmation, then begin Outcomes Dashboard build.

