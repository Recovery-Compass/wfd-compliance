# WFD Program Data Sheet — Monthly Intake Specification

**Document Version:** 1.0  
**Effective Date:** October 2, 2025  
**Owner:** Recovery Compass (Data Architecture) + WFD (Data Population)  
**Authority:** MOU Section 2 (Data Architecture & Standardization)

---

## Purpose

This specification defines the required fields, naming conventions, and update cadence for the **Program Data Sheet**—the aggregated monthly summary of WFD operations across all sites.

This sheet is **separate** from the Housing Tracker (which tracks individual client journeys). Do not commingle client-level rows with program-level aggregates.

---

## Required Monthly Fields

### A. Site-Level Metrics (one row per site per month)

| Field Name | Data Type | Definition | Example |
|-----------|-----------|------------|---------|
| **ProgramName** | Text | Official site name | Ted's Place, Hondo Center, Pathway Homes |
| **MonthYear** | Date (YYYY-MM) | Reporting month | 2025-10 |
| **UnduplicatedClients** | Integer | Unique clients served this month | 37 |
| **MealsServed** | Integer | Total meals provided | 1,245 |
| **ServicesProvided** | Integer | Total service interactions | 89 |
| **TransportationTrips** | Integer | Rides to appointments, DMV, etc. | 12 |
| **BenefitsAssistance** | Integer | SSI/SSDI/CalFresh applications assisted | 8 |

### B. Demographics (aggregate counts, not client-level)

| Field Name | Data Type | Definition |
|-----------|-----------|------------|
| **Age_18to24** | Integer | Count of clients aged 18-24 |
| **Age_25to54** | Integer | Count of clients aged 25-54 |
| **Age_55Plus** | Integer | Count of clients aged 55+ |
| **Gender_Male** | Integer | Count identifying as male |
| **Gender_Female** | Integer | Count identifying as female |
| **Gender_NonBinary** | Integer | Count identifying as non-binary |
| **Race_Hispanic** | Integer | Count identifying as Hispanic/Latino |
| **Race_Black** | Integer | Count identifying as Black/African American |
| **Race_White** | Integer | Count identifying as White |
| **Race_Asian** | Integer | Count identifying as Asian |
| **Race_Other** | Integer | All other race categories |

---

## Naming Conventions

**Format:** TitleCase with no punctuation (spaces allowed)

✅ **Correct:**  
- `UnduplicatedClients`  
- `Meals Served` (if space needed for readability)

❌ **Incorrect:**  
- `Unduplicated Clients` (inconsistent casing)  
- `meals_served` (snake_case)  
- `Meals-Served` (hyphens)

**Rationale:** Standardized field names enable deterministic CSV parsing and prevent schema drift.

---

## Update Cadence & Lock Protocol

| Frequency | Action | Owner |
|-----------|--------|-------|
| **Weekly** | Update in-progress month data | WFD Program Managers |
| **Monthly** (by 5th of next month) | Lock prior month; move to archive tab | Jacob Lozoya |
| **Quarterly** | Reconcile with HMIS exports | RC + WFD |

**Example:** October data is updated weekly throughout October. On November 5, the October tab is locked and a new November tab is created.

---

## CSV Export Instructions (for downstream systems)

1. Open the Program Data Sheet in Excel/Google Sheets
2. Select the **locked month tab** (e.g., "Oct 2025")
3. **File → Download → CSV** (or "Publish to web → CSV" in Google Sheets)
4. Name file: `Program_Data_YYYY-MM.csv`
5. Upload to shared master folder: `/Master October/Program_Data_2025-10.csv`

**Critical:** Always export from the **locked tab**, not the in-progress tab, to ensure data integrity.

---

## Glossary (Derived from WFD Master Program Data Sheet)

| Term | Definition |
|------|------------|
| **Unduplicated Clients** | Unique individuals served (counted once regardless of visit frequency) |
| **Meals Served** | Total meal transactions (breakfast, lunch, dinner, snacks) |
| **Services Provided** | All case management, counseling, benefits assistance, transportation interactions |
| **Benefits Assistance** | Applications or renewals for SSI, SSDI, CalFresh, Medi-Cal, General Relief |
| **Transportation** | Rides to DMV, medical appointments, job interviews, housing viewings |

---

## Acceptance Criteria

Before considering a monthly report "complete":

- [ ] All required fields populated (no blank cells for core metrics)
- [ ] Field names match this spec exactly
- [ ] Row-level data is aggregated (one row per site, not per client)
- [ ] Month is locked and archived
- [ ] CSV export successfully generated and uploaded

---

## Contact

**Questions or schema change requests:** eric@recovery-compass.org  
**MOU reference:** Section 2 (Data Architecture & Standardization)

---

**Change Log:**
- **2025-10-02:** Initial spec created based on MOU requirements and Master Data Spreadsheet analysis

