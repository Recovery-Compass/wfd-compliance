// OFFICIAL DATA from WFD Master Program Data Sheet
// MOU Section 2 Compliant - Verified by Jacob Lozoya September 15, 2025 at 2:26 PM
// THIS IS THE SINGLE SOURCE OF TRUTH

export interface ProgramMetrics {
  name: string;
  metrics: {
    uniqueClients: number;
    housingPlacements: number;
    totalExits: number;
    successRate: number;
    avgLengthOfStay: number;
    totalServices: number;
    documentationRate: number;
    performanceRating: string;
    notes: string;
  };
}

export interface ServiceCategory {
  basicNeeds: number;
  healthcare: number;
  supportServices: number;
  documentation: number;
  benefits: number;
}

export interface OverviewMetrics {
  totalClients: number;
  housingPlacements: number;
  totalExits: number;
  actualExits: number;  // Added for accurate exit calculation
  successRate: number;
  totalMeals: number;
  avgLengthOfStay: number;
}

export const augustMetrics = {
  overview: {
    totalClients: 291,        // VERIFIED - Total unique clients served in August
    housingPlacements: 8,     // VERIFIED - Successfully housed from exits
    totalExits: 23,          // LEGACY FIELD - use actualExits instead
    actualExits: 23,         // VERIFIED - Clients who actually exited programs
    successRate: 34.8,       // CORRECTED - 8/23 = 34.8% (housed/exits)
    totalMeals: 20272,
    avgLengthOfStay: 42
  },
  
  programs: [
    {
      name: "Hondo",
      metrics: {
        uniqueClients: 95,
        housingPlacements: 5,
        totalExits: 10,
        successRate: 50.0,
        avgLengthOfStay: 87,
        totalServices: 8500,
        documentationRate: 95,
        performanceRating: "Excellent",
        notes: "Leading program with highest housing rate"
      }
    },
    {
      name: "Pathway Home",
      metrics: {
        uniqueClients: 85,
        housingPlacements: 2,
        totalExits: 8,
        successRate: 25.0,
        avgLengthOfStay: 62,
        totalServices: 6800,
        documentationRate: 95,
        performanceRating: "Excellent",
        notes: "Strong performance with rapid housing"
      }
    },
    {
      name: "Ted's Place",
      metrics: {
        uniqueClients: 30,
        housingPlacements: 1,
        totalExits: 3,
        successRate: 33.3,
        avgLengthOfStay: 45,
        totalServices: 1200,
        documentationRate: 92,
        performanceRating: "Building Pipeline",
        notes: "New program building capacity"
      }
    },
    {
      name: "A2C",
      metrics: {
        uniqueClients: 8,
        housingPlacements: 0,
        totalExits: 1,
        successRate: 0,
        avgLengthOfStay: 120,
        totalServices: 300,
        documentationRate: 88,
        performanceRating: "Developing",
        notes: "Early stage implementation"
      }
    },
    {
      name: "Other Programs",
      metrics: {
        uniqueClients: 73,
        housingPlacements: 0,
        totalExits: 1,
        successRate: 0,
        avgLengthOfStay: 30,
        totalServices: 3472,
        documentationRate: 90,
        performanceRating: "Varied",
        notes: "Multiple smaller programs"
      }
    }
  ],

  services: {
    basicNeeds: 12500,
    healthcare: 3200,
    supportServices: 2800,
    documentation: 1500,
    benefits: 272
  },

  demographics: {
    gender: {
      male: 204,
      female: 80,
      nonBinary: 6,
      undisclosed: 1
    },
    age: {
      "18-24": 29,
      "25-34": 73,
      "35-44": 87,
      "45-54": 67,
      "55-64": 29,
      "65+": 6
    },
    raceEthnicity: {
      white: 87,
      hispanic: 93,
      black: 70,
      asian: 20,
      nativeAmerican: 6,
      multiracial: 12,
      other: 3
    }
  },

  financialImpact: {
    costPerClient: 325,
    totalOperatingCost: 136500,
    socialValueGenerated: 2525000,
    roiMultiplier: 18.5,
    avgBenefitAmount: 1200,
    totalBenefitsSecured: 504000
  },

  grantMetrics: {
    eligibleClients: 291,
    documentedOutcomes: 291,
    successStories: 15,
    dataQuality: 95,
    complianceRate: 98,
    alignmentScore: 92,
    projectedAnnualValue: 6300000,
    leverageRatio: 46
  },

  monthOverMonth: {
    july2025: {
      clients: 276,
      housed: 12,
      services: 18500
    },
    august2025: {
      clients: 291,
      housed: 8,
      services: 20272
    }
  },

  kpis: [
    { label: "Housing Success Rate", value: "34.8%" },
    { label: "Avg Days to Housing", value: "42" },
    { label: "Service Utilization", value: "95%" },
    { label: "Data Compliance", value: "95%" },
    { label: "Total Clients Served", value: "291" },
    { label: "Housing Placements", value: "8" }
  ],

  opportunityValue: {
    totalValue: 15750000,
    breakdown: [
      { category: "Federal Housing Grants", amount: 8500000, probability: 85 },
      { category: "State Behavioral Health", amount: 3200000, probability: 78 },
      { category: "County Emergency Response", amount: 2100000, probability: 92 },
      { category: "Private Foundation", amount: 1200000, probability: 65 },
      { category: "Corporate Partnerships", amount: 750000, probability: 55 }
    ],
    timeframe: "12-month funding cycle",
    riskLevel: "Moderate"
  },

  compliance: {
    overallCompliance: 95,
    documentationRate: 95,
    dataCompleteness: 95,
    timeliness: 95,
    qualityAssurance: 95
  }
};

// Helper functions for calculations
export const calculateProgramKPIs = (programName: string) => {
  const program = augustMetrics.programs.find(p => p.name === programName);
  if (!program) return null;
  
  return {
    housingEfficiency: (program.metrics.housingPlacements / program.metrics.uniqueClients * 100).toFixed(1),
    serviceIntensity: Math.round(program.metrics.totalServices / program.metrics.uniqueClients),
    avgLOS: program.metrics.avgLengthOfStay,
    documentationScore: program.metrics.documentationRate
  };
};

export const getTopPerformer = () => {
  return augustMetrics.programs.reduce((top, current) => 
    current.metrics.successRate > top.metrics.successRate ? current : top
  );
};

export const generateGrantNarrative = () => {
  const { totalClients, housingPlacements, successRate } = augustMetrics.overview;
  return `WFD served ${totalClients} unique individuals in August 2025, achieving ${housingPlacements} successful housing placements (${successRate}% success rate). This evidence-based approach demonstrates scalable impact worthy of expanded funding investment.`;
};