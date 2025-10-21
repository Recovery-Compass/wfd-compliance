import fs from 'fs';
import path from 'path';

type FieldName =
  | 'Client ID'
  | 'Program Name'
  | 'Intake Date'
  | 'Exit Date'
  | 'Exit Destination'
  | 'Housing Placement Date'
  | 'Length of Stay';

interface FieldCoverage {
  populated: number;
  percentage: number;
  target: number;
  status: 'PASS' | 'FAIL' | 'N/A';
  columnName: string | null;
}

interface SheetResult {
  sheetName: string;
  totalRecords: number;
  fieldCoverage: Record<FieldName, FieldCoverage>;
  logicalErrors: string[];
  summary: string;
}

function monthKeyFromSheet(name: string): string {
  const key = name.toLowerCase();
  for (const m of ['april','may','june','july','august','september','october','november','december','january','february','march']) {
    if (key.includes(m)) return m[0].toUpperCase() + m.slice(1);
  }
  return name.trim();
}

function summarize(reportPath: string, outPath: string) {
  const raw = fs.readFileSync(reportPath, 'utf8');
  const data = JSON.parse(raw) as SheetResult[];
  const fields: FieldName[] = [
    'Client ID','Program Name','Intake Date','Exit Date',
    'Exit Destination','Housing Placement Date','Length of Stay'
  ];

  let totals = { clients: 0, sheets: 0 };
  const monthly: Record<string, number> = {};
  const agg: Record<FieldName, { populated: number; total: number; target: number; n0: number }> = {
    'Client ID': { populated:0,total:0,target:80,n0:0 },
    'Program Name': { populated:0,total:0,target:100,n0:0 },
    'Intake Date': { populated:0,total:0,target:80,n0:0 },
    'Exit Date': { populated:0,total:0,target:80,n0:0 },
    'Exit Destination': { populated:0,total:0,target:80,n0:0 },
    'Housing Placement Date': { populated:0,total:0,target:80,n0:0 },
    'Length of Stay': { populated:0,total:0,target:0,n0:0 },
  };

  for (const sheet of data) {
    if (sheet.totalRecords > 0) {
      totals.clients += sheet.totalRecords;
      totals.sheets += 1;
      const mk = monthKeyFromSheet(sheet.sheetName);
      monthly[mk] = (monthly[mk] || 0) + sheet.totalRecords;
    }
    for (const f of fields) {
      const fc = sheet.fieldCoverage?.[f];
      if (!fc) continue;
      agg[f].populated += fc.populated || 0;
      agg[f].total += sheet.totalRecords || 0;
      if ((fc.percentage || 0) === 0) agg[f].n0 += 1;
    }
  }

  const coverage_by_field: Record<string, any> = {};
  for (const f of fields) {
    const a = agg[f];
    if (a.target === 0) {
      coverage_by_field[f] = { status: 'N/A' };
      continue;
    }
    const pct = a.total > 0 ? Math.round((a.populated / a.total) * 1000) / 10 : 0;
    coverage_by_field[f] = {
      percentage: pct,
      populated: a.populated,
      total: a.total,
      target: a.target
    };
  }

  const snapshot = {
    updated_at: new Date().toISOString(),
    roots: ['/Users/ericjones/WFD-Local'],
    totals,
    monthly_intake: monthly,
    coverage_by_field,
    notes: [
      'Snapshot derived from validation-report.json',
      'Re-run validator before regenerating snapshot for freshest metrics'
    ]
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2));
  console.log(`Wrote unified context: ${outPath}`);
}

const report = path.join(process.env.HOME || '', 'WFD-Local/Housing-Tracker/validation-report.json');
const out = path.join(process.env.HOME || '', 'WFD-Local/context/unified-context.json');
if (!fs.existsSync(report)) {
  console.error(`Missing: ${report}`);
  process.exit(1);
}
summarize(report, out);
