export interface EnhancedProgram {
  name: string;
  type: string;
  clients: number;
  compliance: number;
  trend: 'up' | 'down' | 'stable';
  // New fields for value discovery
  servicesDelivered: number;
  servicesDocumented: number;
  documentationRate: number;
  documentationGap: string;
  quickWin: string;
  status: 'champion' | 'strong' | 'improving' | 'priority' | 'critical';
  siteType: string;
  fundingSource: string;
}

export const enhancedPrograms: EnhancedProgram[] = [
  {
    name: "A2C",
    type: "DHS",
    clients: 127,
    compliance: 92,
    servicesDelivered: 3810,
    servicesDocumented: 3521,
    documentationRate: 92,
    documentationGap: "$25,000",
    quickWin: "Share best practices with other programs",
    status: "champion",
    trend: "stable",
    siteType: "DHS",
    fundingSource: "DHS"
  },
  {
    name: "Pathway Homes",
    type: "DHS",
    clients: 132,
    compliance: 90,
    servicesDelivered: 6356,
    servicesDocumented: 5720,
    documentationRate: 90,
    documentationGap: "$55,000",
    quickWin: "Nearly there! Final push to 95%",
    status: "champion",
    trend: "up",
    siteType: "DHS",
    fundingSource: "DHS"
  },
  {
    name: "Hondo Center",
    type: "DHS",
    clients: 72,
    compliance: 77,
    servicesDelivered: 2628,
    servicesDocumented: 2024,
    documentationRate: 77,
    documentationGap: "$52,000",
    quickWin: "Focus on meal documentation",
    status: "strong",
    trend: "up",
    siteType: "DHS",
    fundingSource: "DHS"
  },
  {
    name: "Ted's Place",
    type: "DHS",
    clients: 45,
    compliance: 58,
    servicesDelivered: 5520,
    servicesDocumented: 3202,
    documentationRate: 58,
    documentationGap: "$202,000",
    quickWin: "PRIORITY - Schedule documentation training THIS WEEK",
    status: "priority",
    trend: "stable",
    siteType: "DHS",
    fundingSource: "DHS"
  },
  {
    name: "Midvale Tiny Homes",
    type: "NONHDS",
    clients: 35,
    compliance: 0,
    servicesDelivered: 1050,
    servicesDocumented: 0,
    documentationRate: 0,
    documentationGap: "$91,000",
    quickWin: "Install daily log sheets TODAY - Quick 5-min setup",
    status: "critical",
    trend: "stable",
    siteType: "NONHDS",
    fundingSource: "NONHDS"
  },
  {
    name: "ICMS",
    type: "NONHDS",
    clients: 48,
    compliance: 0,
    servicesDelivered: 1440,
    servicesDocumented: 0,
    documentationRate: 0,
    documentationGap: "$125,000",
    quickWin: "Connect data system - IT can help this week",
    status: "critical",
    trend: "stable",
    siteType: "NONHDS",
    fundingSource: "NONHDS"
  }
];

export const getEnhancedProgramsBySiteType = (siteType: string) => {
  if (siteType === "ALL") return enhancedPrograms;
  return enhancedPrograms.filter(program => program.siteType === siteType);
};