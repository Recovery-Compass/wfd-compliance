export interface ClientRecord {
  ClientID: string;
  ProgramName: string;
  IntakeDate: string | null;
  ExitDate: string | null;
  ExitDestination: string | null;
  HousingPlacementDate: string | null;
  LengthOfStay: number | null;
}

export type ProgramName = 
  | "Ted's Place"
  | "Hondo"
  | "Pathway Home"
  | "Midvale"
  | "A2C"
  | "ICMS";

export interface OverviewMetrics {
  totalClients: number;
  activeEnrollments: number;
  housingPlacements: number;
  avgLengthOfStay: number | null;
  placementRate: number;
}

export interface ProgramMetrics {
  programName: ProgramName | string;
  totalClients: number;
  activeEnrollments: number;
  housingPlacements: number;
  avgLengthOfStay: number | null;
  placementRate: number;
}

export interface FieldCoverage {
  fieldName: string;
  coverage: number;
  status: 'red' | 'yellow' | 'green';
  missingCount: number;
  missingRecords: string[];
}

export interface DataQualityReport {
  overallScore: number;
  fieldCoverages: FieldCoverage[];
  criticalIssues: string[];
  isCompliant: boolean;
}

export interface UploadValidation {
  isValid: boolean;
  error?: string;
  missingColumns?: string[];
  recordCount?: number;
}
