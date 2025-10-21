# WFD COMPLIANCE DASHBOARD - LOVABLE.DEV BUILD PROMPT
**Complete Rebuild with Brand Alignment**

---

## PASTE THIS INTO LOVABLE.DEV:

Build a data compliance dashboard for Whittier First Day (WFD), a homeless services nonprofit in partnership with Recovery Compass.

---

## CRITICAL REQUIREMENTS:

### 1. FILE UPLOAD INTERFACE (PRIORITY #1)
- **Drag-and-drop Excel/CSV upload area**
- Accept files with these 7 columns: ClientID, ProgramName, IntakeDate, ExitDate, ExitDestination, HousingPlacementDate, LengthOfStay
- Validate columns on upload (show error if missing required columns)
- Parse using SheetJS (xlsx library)
- Display data preview table after upload (first 10 rows)
- Show upload success message with record count

### 2. CLIENT-LEVEL DATA TABLE
- **Show ALL client records from uploaded file (NOT aggregated data)**
- Display all 7 columns in table format
- Sortable by clicking any column header
- Filterable by ProgramName dropdown (6 programs: Ted's Place, Hondo, Pathway Home, Midvale, A2C, ICMS)
- Search bar to filter by ClientID
- Pagination (25 records per page)
- Export to CSV button
- Show total record count

### 3. OVERVIEW DASHBOARD
Calculate these metrics FROM UPLOADED DATA (not hardcoded):
- **Total Clients Served** (count unique ClientIDs)
- **Active Enrollments** (count records with blank/null ExitDate)
- **Housing Placements** (count where ExitDestination = "Permanent Housing")
- **Average Length of Stay** (mean of LengthOfStay column, in days)
- **Housing Placement Rate** (percentage: placements ÷ total exits)

Display as metric cards with icons and trend indicators.

### 4. PROGRAM PERFORMANCE VIEW
- Table showing all 6 programs side-by-side
- Columns: Program Name | Total Clients | Active Enrollments | Housing Placements | Avg LoS (days) | Placement Rate (%)
- Calculate ALL metrics per program from uploaded data
- Sort programs by any metric
- Highlight top-performing program

### 5. DATA QUALITY VALIDATION
- **Count missing IntakeDate fields** (critical - cannot calculate LoS)
- **Count missing ExitDestination fields** (required for MOU compliance)
- Calculate field coverage percentage for each of the 7 columns
- Display color-coded alerts:
  - **Red (<60%):** Critical - MOU non-compliant
  - **Yellow (60-79%):** Warning - needs improvement
  - **Green (≥80%):** Compliant - meets MOU standards
- Show list of specific records with missing critical fields
- Overall data quality score (0-100)

### 6. MONTHLY REPORT GENERATOR
- Select month/year from uploaded data
- Generate downloadable PDF report with:
  - Summary metrics (total clients, placements, avg LoS)
  - Program-level breakdown table
  - Exit destination pie chart
  - Data quality status (pass/fail based on ≥80% coverage)
  - WFD and Recovery Compass logos
  - Report generation date
- One-click "Generate Report" button

---

## CRITICAL RULES - NO EXCEPTIONS:

### ❌ ABSOLUTELY NO HARDCODED DATA
- NO hardcoded client records
- NO hardcoded metrics (36 clients, 1,880 meals, etc.)
- NO hardcoded month/year (July 2025, etc.)
- NO hardcoded program-specific views (Ted's Place only)
- ALL data must come from uploaded file
- If no file uploaded yet, show empty state with upload prompt

### ✅ DYNAMIC DATA ONLY
- All metrics calculated from uploaded file in real-time
- Month/year extracted from IntakeDate or ExitDate in uploaded data
- Program names from ProgramName column in uploaded data
- Client count from actual ClientID count in uploaded data

---

## BRAND ALIGNMENT:

### Recovery Compass Brand
**Colors:**
- Primary: `#1A365D` (deep blue - trust, stability)
- Secondary: `#2C5282` (medium blue)
- Accent: `#3182CE` (bright blue - action)
- Success: `#38A169` (green - growth, hope)
- Warning: `#D69E2E` (yellow)
- Error: `#E53E3E` (red)
- Background: `#F7FAFC` (light gray-blue)
- Text: `#1A202C` (near black)

**Typography:**
- Headers: Inter, system-ui, sans-serif (bold, clean)
- Body: Inter, system-ui, sans-serif (readable, professional)

**Tone:**
- Professional yet compassionate
- Data-driven but human-centered
- "We see you. We fight for you."

### Whittier First Day Brand
**Colors:**
- Primary: `#004B87` (WFD blue - established, trustworthy)
- Accent: `#F5A623` (WFD gold - warmth, optimism)

**Visual Elements:**
- Dual-logo header: Recovery Compass (left) + Whittier First Day (right)
- "Partnership between Recovery Compass and Whittier First Day" tagline
- Clean, minimal design (not cluttered)

---

## TECH STACK:

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5+
- **Styling:** Tailwind CSS (use brand colors above)
- **Data Parsing:** SheetJS (xlsx) library for Excel/CSV
- **Charts:** Recharts for visualizations
- **State Management:** React Context or Zustand (lightweight)
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages compatible

---

## DASHBOARD NAVIGATION:

Simple sidebar or top navigation with 5 sections:

1. **📊 Home** - Overview Dashboard (metrics cards, upload status)
2. **📋 Client Data** - Client-level data table (sortable, filterable)
3. **🏢 Programs** - Program performance comparison
4. **✅ Data Quality** - Validation dashboard (field coverage, alerts)
5. **📄 Reports** - Monthly report generator

---

## UI/UX DESIGN:

### Layout
- Clean, spacious design (not cramped)
- Card-based layout for metrics
- Clear visual hierarchy
- Responsive (desktop-first, mobile-friendly)

### Upload Interface
- Large drag-and-drop zone with icon
- "Drag Excel/CSV file here or click to browse"
- Show file name and size after selection
- Upload button (blue, prominent)
- Clear error messages if file is invalid

### Data Table
- Striped rows for readability
- Hover effects on rows
- Fixed header on scroll
- Clear column headers with sort icons
- Search and filter controls above table

### Metrics Cards
- Large, readable numbers
- Icon representing each metric
- Subtle gradient backgrounds
- Trend indicator (up/down arrow if applicable)

### Color-Coded Alerts
- Red badge: Critical issues
- Yellow badge: Warnings
- Green badge: All good
- Clear text explaining what the color means

---

## EDGE CASES TO HANDLE:

1. **No file uploaded yet:**
   - Show empty state with upload prompt
   - "Upload your Housing Tracker file to begin"
   - Large upload button/area

2. **Missing IntakeDate:**
   - Display "N/A" for Length of Stay
   - Flag in data quality report
   - Still show record in table

3. **Active enrollments (blank ExitDate):**
   - Calculate LoS as: Today's Date - IntakeDate
   - Show as "Active" in table
   - Count separately in metrics

4. **Invalid file format:**
   - Show error: "Invalid file. Please upload Excel (.xlsx) or CSV (.csv) with required columns."
   - List missing columns

5. **Duplicate ClientIDs:**
   - Flag in data quality report
   - Show warning but still display data

---

## VALIDATION RULES:

### Required Columns (must exist in file):
- ClientID
- ProgramName
- IntakeDate
- ExitDate
- ExitDestination
- HousingPlacementDate
- LengthOfStay

### Data Quality Checks:
- IntakeDate coverage ≥80% (critical)
- ExitDestination coverage ≥80% (critical)
- Valid date formats (YYYY-MM-DD or MM/DD/YYYY)
- No blank ClientIDs
- LengthOfStay matches (ExitDate - IntakeDate)

---

## TESTING CHECKLIST:

After building in Lovable, verify:

1. ✅ Homepage shows file upload interface (NO hardcoded data)
2. ✅ Upload sample Excel file successfully
3. ✅ Client data table displays all records from file
4. ✅ Overview metrics calculate correctly from uploaded data
5. ✅ Program performance shows all 6 programs
6. ✅ Data quality validation identifies missing fields
7. ✅ Export to CSV works
8. ✅ Monthly report generates PDF
9. ✅ No references to "July 2025" or hardcoded months
10. ✅ Dual-logo header displays (RC + WFD)
11. ✅ Brand colors match spec
12. ✅ Mobile responsive

---

## SAMPLE DATA FORMAT:

The uploaded Excel/CSV should look like this:

| ClientID | ProgramName | IntakeDate | ExitDate | ExitDestination | HousingPlacementDate | LengthOfStay |
|----------|-------------|------------|----------|-----------------|---------------------|--------------|
| WFD-1234 | Ted's Place | 2025-10-01 | 2025-10-15 | Permanent Housing | 2025-10-15 | 14 |
| 865AB47F8 | Hondo | 2025-10-05 | | Still Enrolled | | |
| WFD-5678 | Pathway Home | 2025-09-20 | 2025-10-10 | Self-Exit | | 20 |

---

## AFTER LOVABLE GENERATES:

1. **Test in Lovable preview** with sample data
2. **Verify file upload works** and data displays
3. **Check brand colors** match specification
4. **Confirm NO hardcoded data** appears anywhere

Then sync to local repo:
```bash
cd ~/Projects/recovery-compass/wfd-compliance
bash sync-from-lovable.sh
```

Test locally with actual data:
```bash
npm run dev
# Upload: Housing_Tracker_2025-10_MOU_Template.xlsx
```

Deploy to production:
```bash
npm run deploy:cloudflare
```

---

**CRITICAL SUCCESS FACTORS:**
1. File upload interface is the FIRST thing users see
2. ALL data is dynamic from uploaded file
3. NO hardcoded July 2025 data or Ted's Place-only views
4. Dual-brand alignment (Recovery Compass + WFD)
5. Data quality validation with color-coded alerts
6. Client-level data table (not aggregated)
7. All 6 programs supported

Build this dashboard to empower Jacob Lozoya and the WFD team to track their impact and achieve MOU compliance for the Recovery Compass partnership.
