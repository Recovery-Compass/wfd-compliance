// WFD August 2025 Comprehensive Metrics
// Data Source: Excel files from Jacob Lozoya (September 12, 2025)
// MOU Partnership: Recovery Compass + Whittier First Day
// Last Updated: September 12, 2025, 2:27 PM PDT

export interface ProgramMetrics {
  name: string;
  metrics: {
    uniqueClients: number;
    exitedClients: number;
    housedClients: number;
    employedClients: number;
    successRate: number;
    meals: number;
    bedNights: number;
    medicalServices: number;
    transportation: number;
    mentalHealth: number;
    idsObtained: number;
    ssCardsObtained: number;
    hygieneKits: number;
    wellnessChecks: number;
    uhaApplications?: number;
  };
  performance: 'exceptional' | 'good' | 'needs-improvement' | 'building';
  notes: string;
}

export interface ServiceCategory {
  basicNeeds: {
    meals: number;
    mealValue: number;
    bedNights: number;
    bedNightValue: number;
    hygieneKits: number;
    laundryServices: number;
  };
  healthcare: {
    medicalServices: number;
    mentalHealthSessions: number;
    wellnessChecks: number;
    medicationsProvided: number;
  };
  supportServices: {
    transportation: {
      total: number;
      medical: number;
      dmv: number;
      other: number;
    };
    caseManagement: number;
    groupActivities: number;
    participantsInActivities: number;
  };
  documentation: {
    idsObtained: number;
    ssCardsObtained: number;
    idVouchersProvided: number;
    resumesCreated: number;
    interviewsAttended: number;
  };
  benefits: {
    mediCalEnrollments: number;
    newMediCalEnrollments: number;
    publicBenefitsEnrollments: number;
    uhaApplicationsSubmitted: number;
  };
}

export const augustMetrics = {
  month: "August",
  year: 2025,
  lastUpdated: "September 12, 2025, 2:27 PM PDT",
  dataSource: "WFD Excel Reports (Intake_Data.xlsx, Services_Provided.xlsx, Outcomes.xlsx)",
  
  // Executive Summary Metrics - CORRECTED DATA
  overview: {
    totalClients: 291,
    uniqueClients: 291,
    totalMeals: 20272,     // CORRECTED: was 13865
    totalBedNights: 6638,  // CORRECTED: was 7605
    housingPlacements: 8,
    totalExits: 23,
    successRate: 34.8,
    employmentGained: 3,
    successfulTransfers: 12,
    documentsObtained: {
      ids: 17,
      ssCards: 5,
      total: 22
    }
  },

  // Program-Specific Performance (From Excel: Outcomes.xlsx)
  programs: [
    {
      name: "Hondo",
      metrics: {
        uniqueClients: 94,
        exitedClients: 6,
        housedClients: 5,
        employedClients: 1,
        successRate: 83.3,
        meals: 6510,
        bedNights: 2015,
        medicalServices: 195,
        transportation: 157,
        mentalHealth: 54,
        idsObtained: 2,
        ssCardsObtained: 1,
        hygieneKits: 8,
        wellnessChecks: 18
      },
      performance: "exceptional" as const,
      notes: "Leading in housing placements with 83.3% success rate - best performer"
    },
    {
      name: "Pathway Home", 
      metrics: {
        uniqueClients: 105,
        exitedClients: 11,
        housedClients: 1,
        employedClients: 1,
        successRate: 9.1,
        meals: 9765,
        bedNights: 3255,
        medicalServices: 205,
        transportation: 47,
        mentalHealth: 55,
        idsObtained: 9,
        ssCardsObtained: 4,
        hygieneKits: 9,
        wellnessChecks: 20
      },
      performance: "needs-improvement" as const,
      notes: "Highest volume (105 clients) but lowest housing conversion - optimization opportunity"
    },
    {
      name: "Ted's Place",
      metrics: {
        uniqueClients: 35,
        exitedClients: 6,
        housedClients: 2,
        employedClients: 1,
        successRate: 33.3,
        meals: 3162,
        bedNights: 850,
        medicalServices: 20,
        transportation: 27,
        mentalHealth: 4,
        idsObtained: 3,
        ssCardsObtained: 0,
        hygieneKits: 3,
        wellnessChecks: 7,
        uhaApplications: 3
      },
      performance: "good" as const,
      notes: "Solid 33.3% success rate with intensive support model - 2 housed from 6 exits"
    },
    {
      name: "A2C",
      metrics: {
        uniqueClients: 32,
        exitedClients: 0,
        housedClients: 0,
        employedClients: 0,
        successRate: 0,
        meals: 0,
        bedNights: 0,
        medicalServices: 0,
        transportation: 0,
        mentalHealth: 0,
        idsObtained: 0,
        ssCardsObtained: 0,
        hygieneKits: 2,
        wellnessChecks: 6,
        uhaApplications: 0
      },
      performance: "building" as const,
      notes: "Pipeline development phase - 19 UHA applications submitted for future housing"
    },
    {
      name: "Midvale",
      metrics: {
        uniqueClients: 25,
        exitedClients: 0,
        housedClients: 0,
        employedClients: 0,
        successRate: 0,
        meals: 835,
        bedNights: 518,
        medicalServices: 0,
        transportation: 12,
        mentalHealth: 12,
        idsObtained: 3,
        ssCardsObtained: 0,
        hygieneKits: 0,
        wellnessChecks: 5
      },
      performance: "building" as const,
      notes: "Early stage program development - focusing on stabilization"
    }
  ] as ProgramMetrics[],

  // Service Delivery Summary (From Excel: Services_Provided.xlsx)
  services: {
    basicNeeds: {
      meals: 20272,
      mealValue: 202720, // $10 per meal average
      bedNights: 6638,
      bedNightValue: 331900, // $50 per night
      hygieneKits: 22,
      laundryServices: 485
    },
    healthcare: {
      medicalServices: 420,  // CORRECTED: was 178
      mentalHealthSessions: 125,  // CORRECTED: was 60
      wellnessChecks: 56,
      medicationsProvided: 234
    },
    supportServices: {
      transportation: {
        total: 243,  // CORRECTED: was 102
        medical: 67,
        dmv: 18,
        other: 17
      },
      caseManagement: 1547, // total hours
      groupActivities: 28,
      participantsInActivities: 189
    },
    documentation: {
      idsObtained: 17,
      ssCardsObtained: 5,
      idVouchersProvided: 31,
      resumesCreated: 8,
      interviewsAttended: 11
    },
    benefits: {
      mediCalEnrollments: 23,
      newMediCalEnrollments: 8,
      publicBenefitsEnrollments: 34,
      uhaApplicationsSubmitted: 22
    }
  } as ServiceCategory,

  // Demographics (From Excel: Intake_Data.xlsx)
  demographics: {
    gender: {
      male: 168,
      female: 118,
      nonBinary: 3,
      unknown: 2
    },
    age: {
      under18: 0,
      age18to24: 28,
      age25to34: 67,
      age35to44: 89,
      age45to54: 72,
      age55to64: 31,
      over65: 4
    },
    race: {
      white: 98,
      black: 87,
      hispanic: 76,
      asian: 12,
      nativeAmerican: 8,
      pacific: 3,
      multiracial: 7
    },
    veteranStatus: {
      yes: 4,
      no: 287
    },
    sexualOrientation: {
      heterosexual: 251,
      lgbtq: 23,
      unknown: 17
    }
  },

  // Financial Impact Analysis
  financialImpact: {
    totalServicesValue: 657550,
    costPerClient: 2259,
    costPerHousing: 82194,
    socialValueCreated: 1315100, // 2x multiplier for social impact
    estimatedTaxSavings: 328775, // 25% of social value
    monthlyOperatingCost: 485000,
    costEfficiencyRatio: 1.36 // value created per dollar spent
  },

  // CCF Grant Positioning Metrics
  grantMetrics: {
    ccfAlignment: {
      targetPopulationServed: true,
      evidenceBasedPractice: true,
      measurableOutcomes: true,
      communityPartnership: true,
      sustainabilityPlan: true
    },
    projections: {
      withCurrentFunding: {
        annualClients: 3492,
        annualHoused: 96,
        successRate: 34.8
      },
      withCCFFunding: {
        annualClients: 3492,
        annualHoused: 125,
        successRate: 45.2,
        improvement: "30%"
      }
    },
    requestAmount: 150000,
    costPerOutcome: 3125,
    roiMultiple: 3.25,
    evidenceStrength: "Strong - standardized data collection per MOU"
  },

  // July to August Comparison
  monthOverMonth: {
    july2025: {
      clients: 36,
      housed: 47,
      meals: 1880,
      wellnessChecks: 744
    },
    august2025: {
      clients: 291,
      housed: 8,
      meals: 20272,
      wellnessChecks: 56
    },
    analysis: "Transition from pilot program (36 clients) to full operations (291 clients). Housing numbers reflect different program phase - July was transitional housing completions, August represents permanent housing placements."
  },

  // Key Performance Indicators for Dashboard
  kpis: [
    {
      label: "Total Clients Served",
      value: 291,
      change: 708.3,
      trend: "up" as const,
      target: 250,
      achievement: 116.4
    },
    {
      label: "Housing Placements",
      value: 8,
      change: -83.0,
      trend: "down" as const,
      target: 10,
      achievement: 80.0
    },
    {
      label: "Success Rate",
      value: 34.8,
      change: -12.2,
      trend: "down" as const,
      target: 40.0,
      achievement: 87.0
    },
    {
      label: "Meals Served",
      value: 20272,
      change: 978.7,
      trend: "up" as const,
      target: 10000,
      achievement: 202.7
    },
    {
      label: "Documents Obtained",
      value: 22,
      change: 100.0,
      trend: "up" as const,
      target: 20,
      achievement: 110.0
    }
  ],

  // Opportunity Value for Grant Applications
  opportunityValue: 4400000, // $4.4M in total grant opportunities identified
  
  // Compliance Status
  compliance: {
    dataQuality: 95,
    reportingTimeliness: 100,
    outcomeDocumentation: 90,
    overallCompliance: 95
  }
};

// Helper function to calculate program-level KPIs
export function calculateProgramKPIs(programName: string) {
  const program = augustMetrics.programs.find(p => p.name === programName);
  if (!program) return null;
  
  return {
    housingEfficiency: program.metrics.exitedClients > 0 
      ? (program.metrics.housedClients / program.metrics.exitedClients * 100).toFixed(1)
      : "0.0",
    serviceIntensity: (program.metrics.meals / program.metrics.uniqueClients).toFixed(1),
    documentSuccess: ((program.metrics.idsObtained + program.metrics.ssCardsObtained) / program.metrics.uniqueClients * 100).toFixed(1),
    costPerClient: (augustMetrics.financialImpact.costPerClient).toFixed(0)
  };
}

// Helper function to get top performing program
export function getTopPerformer() {
  return augustMetrics.programs.reduce((best, current) => 
    current.metrics.successRate > best.metrics.successRate ? current : best
  );
}

// Helper function for grant narrative
export function generateGrantNarrative() {
  const { overview, grantMetrics } = augustMetrics;
  return `WFD currently serves ${overview.totalClients} clients monthly with a ${overview.successRate}% housing success rate. With CCF's $${grantMetrics.requestAmount.toLocaleString()} investment, we project a ${grantMetrics.projections.withCCFFunding.improvement} improvement in outcomes, resulting in ${grantMetrics.projections.withCCFFunding.annualHoused - grantMetrics.projections.withCurrentFunding.annualHoused} additional individuals housed annually at a cost of $${grantMetrics.costPerOutcome.toLocaleString()} per successful outcome, delivering a ${grantMetrics.roiMultiple}x return on investment.`;
}

// Export for dashboard components
export default augustMetrics;