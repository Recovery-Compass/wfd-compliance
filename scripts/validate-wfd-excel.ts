import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import * as path from 'path';

// Wire Node fs for xlsx ESM in Node
(XLSX as any).set_fs?.(fs);

interface WFDRecord {
  [key: string]: any;
}

interface FieldCoverage {
  populated: number;
  percentage: number;
  target: number;
  status: 'PASS' | 'FAIL' | 'N/A';
  columnName: string | null;
}

interface ValidationResult {
  sheetName: string;
  totalRecords: number;
  fieldCoverage: { [key: string]: FieldCoverage };
  logicalErrors: string[];
  summary: string;
}

// MOU-required fields and their possible column names in the Excel file
const MOU_FIELD_MAPPINGS: { [key: string]: string[] } = {
  'Client ID': ['HMIS / CID', 'HMIS', 'CID', 'Client ID'],
  'Program Name': ['Site', 'Program', 'Program Name'],
  'Intake Date': ['Intake Date', 'Entry Date', 'UHA Date UHA Received Date', 'UHA Received Date'],
  'Exit Date': ['Exit Date', 'Date Exited', 'Exited'],
  'Exit Destination': ['Exit Destination', 'Destination', 'Exit To'],
  'Housing Placement Date': ['Date completed', 'Date completed ', 'Housed', 'Housing Placement Date', 'Move-in Date'],
  'Length of Stay': ['Length of Stay', 'LOS', 'Days in Program']
};

// MOU coverage targets (percentage)
const COVERAGE_TARGETS: { [key: string]: number } = {
  'Client ID': 80,
  'Program Name': 100,
  'Intake Date': 80,  // CRITICAL: Currently 0% in April data
  'Exit Date': 80,
  'Exit Destination': 80,
  'Housing Placement Date': 80,
  'Length of Stay': 0  // Calculated field, not directly populated
};

function findColumn(data: WFDRecord[], possibleNames: string[]): string | null {
  if (data.length === 0) return null;
  const columns = Object.keys(data[0]);
  for (const name of possibleNames) {
    const found = columns.find(col =>
      col.toLowerCase().trim() === name.toLowerCase().trim() ||
      col.toLowerCase().includes(name.toLowerCase())
    );
    if (found) return found;
  }
  return null;
}

function validateSheet(sheetName: string, data: WFDRecord[]): ValidationResult {
  const result: ValidationResult = {
    sheetName,
    totalRecords: data.length,
    fieldCoverage: {},
    logicalErrors: [],
    summary: ''
  };

  if (data.length === 0) {
    result.summary = '⚠️  EMPTY SHEET - No data to validate';
    return result;
  }

  // Calculate field coverage for each MOU-required field
  Object.entries(MOU_FIELD_MAPPINGS).forEach(([mouField, possibleNames]) => {
    const columnName = findColumn(data, possibleNames);

    if (!columnName) {
      result.fieldCoverage[mouField] = {
        populated: 0,
        percentage: 0,
        target: COVERAGE_TARGETS[mouField],
        status: 'FAIL',
        columnName: null
      };
      return;
    }

    const populated = data.filter(record => {
      const value = record[columnName];
      return value !== null && value !== undefined && value !== '' && value !== 'N/A';
    }).length;

    const percentage = (populated / data.length) * 100;
    const target = COVERAGE_TARGETS[mouField];

    result.fieldCoverage[mouField] = {
      populated,
      percentage: Math.round(percentage * 10) / 10,
      target,
      status: percentage >= target ? 'PASS' : 'FAIL',
      columnName
    };
  });

  // Logical validation (if Intake Date and Exit Date are present)
  const intakeDateCol = findColumn(data, MOU_FIELD_MAPPINGS['Intake Date']);
  const exitDateCol = findColumn(data, MOU_FIELD_MAPPINGS['Exit Date']);
  const housingDateCol = findColumn(data, MOU_FIELD_MAPPINGS['Housing Placement Date']);

  if (intakeDateCol && exitDateCol) {
    data.forEach((record, index) => {
      const intakeDate = record[intakeDateCol] ? new Date(record[intakeDateCol]) : null;
      const exitDate = record[exitDateCol] ? new Date(record[exitDateCol]) : null;

      if (intakeDate && exitDate && exitDate < intakeDate) {
        result.logicalErrors.push(
          `Row ${index + 2}: Exit Date (${record[exitDateCol]}) before Intake Date (${record[intakeDateCol]})`
        );
      }
    });
  }

  if (intakeDateCol && housingDateCol) {
    data.forEach((record, index) => {
      const intakeDate = record[intakeDateCol] ? new Date(record[intakeDateCol]) : null;
      const housingDate = record[housingDateCol] ? new Date(record[housingDateCol]) : null;

      if (intakeDate && housingDate && housingDate < intakeDate) {
        result.logicalErrors.push(
          `Row ${index + 2}: Housing Placement Date (${record[housingDateCol]}) before Intake Date (${record[intakeDateCol]})`
        );
      }
    });
  }

  // Generate summary
  const failedFields = Object.entries(result.fieldCoverage)
    .filter(([_, data]) => data.status === 'FAIL' && data.target > 0)
    .map(([field, _]) => field);

  if (failedFields.length === 0 && result.logicalErrors.length === 0) {
    result.summary = '✅ ALL VALIDATIONS PASSED';
  } else {
    const parts: string[] = [];
    if (failedFields.length > 0) {
      parts.push(`Field coverage issues: ${failedFields.join(', ')}`);
    }
    if (result.logicalErrors.length > 0) {
      parts.push(`${result.logicalErrors.length} logical errors`);
    }
    result.summary = `⚠️  ${parts.join(' | ')}`;
  }

  return result;
}

function printValidationReport(results: ValidationResult[]): void {
  console.log('\n' + '='.repeat(80));
  console.log('📊 WFD HOUSING TRACKER VALIDATION REPORT');
  console.log('='.repeat(80));

  let totalClients = 0;
  let totalSheets = 0;

  results.forEach(result => {
    if (result.totalRecords > 0) {
      totalClients += result.totalRecords;
      totalSheets++;
    }
  });

  console.log(`\n📈 Summary: ${totalClients} clients across ${totalSheets} sheets\n`);

  results.forEach(result => {
    console.log('─'.repeat(80));
    console.log(`📄 Sheet: ${result.sheetName}`);
    console.log(`   Total Records: ${result.totalRecords}`);

    if (result.totalRecords === 0) {
      console.log(`   ${result.summary}\n`);
      return;
    }

    console.log('\n   MOU Field Coverage:');
    console.log('   ' + '─'.repeat(76));

    Object.entries(result.fieldCoverage).forEach(([field, data]) => {
      const status = data.status === 'PASS' ? '✅' : (data.target === 0 ? '⚪' : '❌');
      const columnInfo = data.columnName ? ` [${data.columnName}]` : ' [NOT FOUND]';
      console.log(
        `   ${status} ${field.padEnd(25)} ${String(data.percentage).padStart(5)}% ` +
        `(${data.populated}/${result.totalRecords}) [Target: ${data.target}%]${columnInfo}`
      );
    });

    if (result.logicalErrors.length > 0) {
      console.log('\n   ⚠️  Logical Errors:');
      console.log('   ' + '─'.repeat(76));
      result.logicalErrors.slice(0, 5).forEach(error => {
        console.log(`   • ${error}`);
      });
      if (result.logicalErrors.length > 5) {
        console.log(`   ... and ${result.logicalErrors.length - 5} more errors`);
      }
    }

    console.log(`\n   ${result.summary}`);
  });

  console.log('\n' + '='.repeat(80) + '\n');
}

// Main execution
const excelPath = process.argv[2] || 
  path.join(process.env.HOME!, 'WFD-Local/Housing-Tracker/FirstDayHousingTracker.xlsx');

if (!fs.existsSync(excelPath)) {
  console.error(`\n❌ Error: Excel file not found at ${excelPath}\n`);
  console.log('Usage: tsx scripts/validate-wfd-excel.ts [path-to-excel-file]\n');
  console.log('Example: tsx scripts/validate-wfd-excel.ts ~/WFD-Local/Housing-Tracker/FirstDayHousingTracker.xlsx\n');
  process.exit(1);
}

console.log(`\n🔍 Validating WFD data from: ${excelPath}\n`);

const workbook = XLSX.readFile(excelPath);
const results: ValidationResult[] = [];

workbook.SheetNames.forEach(sheetName => {
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet) as WFDRecord[];
  const result = validateSheet(sheetName, data);
  results.push(result);
});

printValidationReport(results);

// Write detailed report to file
const reportPath = path.join(path.dirname(excelPath), 'validation-report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`📄 Detailed report saved to: ${reportPath}\n`);
