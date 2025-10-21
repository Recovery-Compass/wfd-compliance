import { ClientRecord, OverviewMetrics, ProgramMetrics, DataQualityReport, FieldCoverage } from '@/types/compliance';
import { differenceInDays, parseISO, isValid } from 'date-fns';

const REQUIRED_COLUMNS = [
  'ClientID',
  'ProgramName',
  'IntakeDate',
  'ExitDate',
  'ExitDestination',
  'HousingPlacementDate',
  'LengthOfStay'
];

export function calculateLOS(intakeDate: string | null, exitDate: string | null): number | null {
  if (!intakeDate) return null;
  
  try {
    const intake = parseISO(intakeDate);
    if (!isValid(intake)) return null;
    
    const exit = exitDate ? parseISO(exitDate) : new Date();
    if (!isValid(exit)) return null;
    
    return differenceInDays(exit, intake);
  } catch {
    return null;
  }
}

export function calculateMetrics(records: ClientRecord[]): OverviewMetrics {
  const totalClients = new Set(records.map(r => r.ClientID)).size;
  const activeEnrollments = records.filter(r => !r.ExitDate).length;
  const exits = records.filter(r => r.ExitDate);
  const housingPlacements = records.filter(r => 
    r.ExitDestination && r.ExitDestination.toLowerCase().includes('permanent housing')
  ).length;
  
  const lengthsOfStay = records
    .map(r => r.LengthOfStay ?? calculateLOS(r.IntakeDate, r.ExitDate))
    .filter((los): los is number => los !== null && los >= 0);
  
  const avgLengthOfStay = lengthsOfStay.length > 0
    ? lengthsOfStay.reduce((sum, los) => sum + los, 0) / lengthsOfStay.length
    : null;
  
  const placementRate = exits.length > 0
    ? (housingPlacements / exits.length) * 100
    : 0;
  
  return {
    totalClients,
    activeEnrollments,
    housingPlacements,
    avgLengthOfStay,
    placementRate,
  };
}

export function calculateProgramMetrics(records: ClientRecord[]): ProgramMetrics[] {
  const programs = Array.from(new Set(records.map(r => r.ProgramName)));
  
  return programs.map(programName => {
    const programRecords = records.filter(r => r.ProgramName === programName);
    const metrics = calculateMetrics(programRecords);
    
    return {
      programName,
      ...metrics,
    };
  }).sort((a, b) => b.placementRate - a.placementRate);
}

export function validateDataQuality(records: ClientRecord[]): DataQualityReport {
  const fieldCoverages: FieldCoverage[] = REQUIRED_COLUMNS.map(fieldName => {
    const nonNullCount = records.filter(r => {
      const value = r[fieldName as keyof ClientRecord];
      return value !== null && value !== undefined && value !== '';
    }).length;
    
    const coverage = records.length > 0 ? (nonNullCount / records.length) * 100 : 0;
    const missingRecords = records
      .filter(r => {
        const value = r[fieldName as keyof ClientRecord];
        return !value || value === '';
      })
      .map(r => r.ClientID)
      .slice(0, 10);
    
    return {
      fieldName,
      coverage,
      status: coverage >= 80 ? 'green' : coverage >= 60 ? 'yellow' : 'red',
      missingCount: records.length - nonNullCount,
      missingRecords,
    };
  });
  
  const overallScore = fieldCoverages.reduce((sum, f) => sum + f.coverage, 0) / fieldCoverages.length;
  
  const criticalIssues: string[] = [];
  const intakeCoverage = fieldCoverages.find(f => f.fieldName === 'IntakeDate');
  const exitDestCoverage = fieldCoverages.find(f => f.fieldName === 'ExitDestination');
  
  if (intakeCoverage && intakeCoverage.coverage < 80) {
    criticalIssues.push(`IntakeDate coverage is ${intakeCoverage.coverage.toFixed(1)}% (needs ≥80%)`);
  }
  
  if (exitDestCoverage && exitDestCoverage.coverage < 80) {
    criticalIssues.push(`ExitDestination coverage is ${exitDestCoverage.coverage.toFixed(1)}% (needs ≥80%)`);
  }
  
  return {
    overallScore,
    fieldCoverages,
    criticalIssues,
    isCompliant: intakeCoverage!.coverage >= 80 && exitDestCoverage!.coverage >= 80,
  };
}
