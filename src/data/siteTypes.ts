export interface SiteRequirements {
  assessmentType: string;
  timingRequirement: string;
  maxStay: number | string;
  additionalMetrics: string[];
}

export interface SiteType {
  id: string;
  name: string;
  description: string;
  requirements: SiteRequirements;
  complianceTarget: number;
  primaryColor: string;
}

export const siteTypes: Record<string, SiteType> = {
  DHS: {
    id: "DHS",
    name: "DHS Sites",
    description: "Department of Health Services funded programs",
    requirements: {
      assessmentType: "5x5 Acuity Assessment",
      timingRequirement: "Within specified timeframe",
      maxStay: 90,
      additionalMetrics: ["Medical compliance", "Mental health referrals", "90-day shelter limit"]
    },
    complianceTarget: 95,
    primaryColor: "primary"
  },
  NONHDS: {
    id: "NONHDS", 
    name: "Non-DHS Sites",
    description: "Alternative funding source programs",
    requirements: {
      assessmentType: "Varies by funding source",
      timingRequirement: "Per contract requirements", 
      maxStay: "Varies by program",
      additionalMetrics: ["Program-specific KPIs", "Funder requirements"]
    },
    complianceTarget: 85,
    primaryColor: "wfd-blue"
  },
  ALL: {
    id: "ALL",
    name: "All Sites",
    description: "Combined view of all programs",
    requirements: {
      assessmentType: "Mixed assessment types",
      timingRequirement: "Varies by site type",
      maxStay: "Program dependent",
      additionalMetrics: ["Overall performance", "Cross-program metrics"]
    },
    complianceTarget: 90,
    primaryColor: "wfd-gold"
  }
};

export const getMetricsForSiteType = (siteTypeId: string) => {
  const siteType = siteTypes[siteTypeId];
  if (!siteType) return siteTypes.ALL.requirements.additionalMetrics;
  
  if (siteTypeId === "DHS") {
    return [
      "5x5 Assessment Compliance",
      "90-day Limit Tracking", 
      "Medical Documentation",
      "Housing Placement Rate"
    ];
  } else if (siteTypeId === "NONHDS") {
    return [
      "Contract Compliance",
      "Funding Requirements",
      "Program-Specific Goals",
      "Outcome Metrics"
    ];
  }
  
  return [
    "Overall Compliance",
    "Cross-Program Performance", 
    "Aggregate Outcomes",
    "System-wide Metrics"
  ];
};