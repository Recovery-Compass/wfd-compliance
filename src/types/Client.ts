export interface Client {
  // MOU-required fields
  clientId: string;
  programName: string;
  intakeDate: string; // ISO date string (YYYY-MM-DD)
  exitDate: string | null; // ISO date or null
  exitDestination: string | null;
  housingPlacementDate: string | null; // ISO date or null
  lengthOfStay: number | null; // in days, computed downstream
}

export type ProgramName =
  | "Emergency Shelter"
  | "Interim Housing"
  | "Transitional Housing"
  | "Permanent Supportive Housing"
  | string;
