export interface Metrics {
  totalClients: number;
  housedCount: number;
  avgLengthOfStayDays: number | null;
  intakeCoveragePct: number; // 0-100
  validationErrors?: number;
}
