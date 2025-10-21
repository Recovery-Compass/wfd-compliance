# WFD × RC — OneDrive/SharePoint Sync Reconciliation Checklist

**Purpose:** Confirm Step 1 (folder access + sync parity) before proceeding to Phase 2 (dashboards)  
**Date:** October 2, 2025  
**Owner:** Eric Jones (RC) + Randall Trice + Jacob Lozoya (WFD)

---

## Pre-Sync Verification

### 1. Canonical Folder Path Confirmation

- [ ] **Obtain master folder URL** from Randall (the direct-share link that worked in the 10/2 meeting)
- [ ] **Document the path structure:**
  ```
  Example: /Shared Documents/WFD Data/Master Folders/
  ```
- [ ] **Verify folder naming convention:**
  - [ ] Master folder exists (e.g., "Master October" or "October 2025")
  - [ ] Contains subfolders if needed (e.g., /Data, /Reports)

**Status:** ⏳ Pending  
**Action Owner:** Randall Trice  
**Blocker:** External sharing disabled for Jacob's folder link per 10/2 meeting transcript

---

## Required File Inventory (October Master Folder)

### 2. Confirm File Presence

Verify the following files exist in the shared master folder:

- [ ] **Housing_Tracker_2025-10.xlsx**
  - [ ] Contains client-level data (one row per person)
  - [ ] Has MOU-required fields: ClientID, ProgramName, IntakeDate, ExitDate, ExitDestination, HousingPlacementDate, LoS
  
- [ ] **Program_Data_2025-10.xlsx** (or similar name)
  - [ ] Contains aggregated site-level metrics (NOT client rows)
  - [ ] Fields match Program Data Sheet Intake Spec
  
- [ ] **MOU.txt** (or .pdf)
  - [ ] Signed agreement (Aug 29, 2025)
  - [ ] Sections 2-3 define required data fields

**Status:** ⏳ Pending  
**Action Owner:** Jacob Lozoya (upload) + Randall Trice (verify access)

---

## Sync Parity Test

### 3. Verify OneDrive Sync (Eric's End)

- [ ] **Click sync button** in OneDrive web interface
- [ ] **Wait for "Up to date" status** (screenshot this)
- [ ] **Open OneDrive desktop folder** (~/OneDrive/...)
- [ ] **Confirm file timestamps** match web version

### 4. Download & Compare (XLSX + CSV)

For **Housing_Tracker_2025-10.xlsx**:

- [ ] **Download XLSX** from web interface → Save to `/Downloads/Housing_Tracker_Web.xlsx`
- [ ] **Export CSV** from same file → Save to `/Downloads/Housing_Tracker_Web.csv`
- [ ] **Open synced file** from desktop OneDrive folder → Save copy to `/Downloads/Housing_Tracker_Sync.xlsx`
- [ ] **Compare:**
  - [ ] Column names identical (case-sensitive)
  - [ ] Row count matches
  - [ ] Sample 5 client records match exactly
  - [ ] Date formats preserved (YYYY-MM-DD)
  - [ ] LoS formula intact in XLSX; LoS value present in CSV

**Parity Check Command (optional—for tech validation):**
```bash
diff <(head -5 Housing_Tracker_Web.csv) <(head -5 Housing_Tracker_Sync.csv)
```
If output is empty → files are identical ✅

---

## Access Issue Troubleshooting

### 5. If "Access Denied" or "External Sharing Disabled" Error

**Observed in 10/2 meeting:** Jacob's folder link returned "external sharing is disabled for this site."

**Resolution paths:**

**Option A (Temporary Workaround):**
- [ ] Randall shares folder directly with eric@recovery-compass.org using his account
- [ ] Eric verifies access within 5 minutes
- [ ] Document this as interim solution until IT resolves

**Option B (Permanent Fix):**
- [ ] WFD IT enables external sharing for the specific master folder
- [ ] Test with a non-WFD email address (e.g., personal Gmail)
- [ ] Confirm Eric can access via both web and desktop sync

**Option C (Download-Only Workflow):**
- [ ] If sync cannot be enabled, establish download + email protocol:
  - Jacob downloads folder as ZIP weekly
  - Emails to eric@recovery-compass.org
  - Eric confirms receipt and extracts locally
- [ ] **Not preferred** (introduces manual step and version control risk)

**Status:** ⏳ Pending  
**Action Owner:** WFD IT (Option B) or Randall (Option A)

---

## Acceptance Criteria (Step 1 Complete)

All boxes below must be checked before proceeding to Phase 2 (dashboard build):

- [ ] Eric has direct access to master folder (web or desktop sync)
- [ ] October Housing Tracker downloaded successfully
- [ ] October Program Data Sheet downloaded successfully
- [ ] MOU file accessible
- [ ] Parity test passed (web = sync = CSV for Housing Tracker)
- [ ] No access errors for 48 hours (stability confirmation)

**Once complete, Eric will send confirmation email to Randall + Jacob with:**
- Screenshot of sync status ("Up to date")
- CSV/XLSX comparison summary
- Green light to proceed to Outcomes Dashboard build

---

## Contact & Escalation

**Primary Contact:** eric@recovery-compass.org  
**WFD Leads:** Randall Trice (randall@whittierfirstday.org), Jacob Lozoya (jacob@whittierfirstday.org)  
**IT Support:** (WFD IT team—contact TBD)

**Escalation Path (if blockers persist >48 hours):**
1. Eric → Randall (operational)
2. Randall → Donna Gallup (executive)
3. Donna → WFD IT (technical fix mandate)

---

**Change Log:**
- **2025-10-02:** Initial checklist created based on 10/2 meeting transcript and access issues observed

