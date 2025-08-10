export interface Program {
  id: string;
  name: string;
  clients: number;
  compliance: number;
  trend: "improving" | "declining" | "stable";
  siteType: "DHS" | "NONHDS";
  fundingSource: string;
  specificRequirements: string[];
  lastAudit?: string;
  nextReview?: string;
}

export const programs: Program[] = [
  {
    id: "teds-place",
    name: "Ted's Place",
    clients: 37,
    compliance: 58,
    trend: "improving",
    siteType: "DHS",
    fundingSource: "Department of Health Services",
    specificRequirements: [
      "5x5 Acuity Assessments",
      "90-day shelter limit",
      "Medical compliance tracking"
    ],
    lastAudit: "2024-06-15",
    nextReview: "2024-09-15"
  },
  {
    id: "hondo",
    name: "Hondo",
    clients: 122,
    compliance: 72,
    trend: "improving",
    siteType: "DHS", 
    fundingSource: "Department of Health Services",
    specificRequirements: [
      "5x5 Acuity Assessments",
      "90-day shelter limit",
      "Mental health referrals"
    ],
    lastAudit: "2024-07-01",
    nextReview: "2024-10-01"
  },
  {
    id: "pathway-home",
    name: "Pathway Home",
    clients: 108,
    compliance: 85,
    trend: "stable",
    siteType: "NONHDS",
    fundingSource: "County Community Development",
    specificRequirements: [
      "Quarterly progress reports",
      "Housing outcomes tracking",
      "Employment assistance metrics"
    ],
    lastAudit: "2024-05-20",
    nextReview: "2024-11-20"
  },
  {
    id: "midvale",
    name: "Midvale",
    clients: 0,
    compliance: 0,
    trend: "stable",
    siteType: "DHS",
    fundingSource: "Department of Health Services",
    specificRequirements: [
      "5x5 Acuity Assessments",
      "90-day shelter limit",
      "Initial setup compliance"
    ],
    lastAudit: "N/A",
    nextReview: "2024-08-15"
  },
  {
    id: "a2c",
    name: "A2C",
    clients: 9,
    compliance: 92,
    trend: "stable",
    siteType: "NONHDS",
    fundingSource: "Housing Authority",
    specificRequirements: [
      "Housing placement focus",
      "Rapid rehousing metrics",
      "Landlord relationship tracking"
    ],
    lastAudit: "2024-07-10",
    nextReview: "2024-10-10"
  },
  {
    id: "icms",
    name: "ICMS",
    clients: 0,
    compliance: 0,
    trend: "stable",
    siteType: "NONHDS",
    fundingSource: "State Mental Health",
    specificRequirements: [
      "Mental health integration",
      "Clinical documentation",
      "Therapeutic outcomes"
    ],
    lastAudit: "N/A",
    nextReview: "2024-09-01"
  }
];

export const getProgramsBySiteType = (siteType: string) => {
  if (siteType === "ALL") return programs;
  return programs.filter(program => program.siteType === siteType);
};

export const getComplianceStatsBySiteType = (siteType: string) => {
  const relevantPrograms = getProgramsBySiteType(siteType);
  const activePrograms = relevantPrograms.filter(p => p.clients > 0);
  
  if (activePrograms.length === 0) return { average: 0, total: 0 };
  
  const totalCompliance = activePrograms.reduce((sum, program) => sum + program.compliance, 0);
  const average = Math.round(totalCompliance / activePrograms.length);
  
  return {
    average,
    total: activePrograms.length,
    improving: activePrograms.filter(p => p.trend === "improving").length,
    declining: activePrograms.filter(p => p.trend === "declining").length
  };
};