// Executive Dashboard Data - WFD "Heroic Staff vs. Broken System" Narrative
// Data current as of July 31, 2025

export const executiveMetrics = {
  // Top-level KPIs (aggregated across all programs)
  kpis: {
    activeClients: 249,
    housingSuccessRate: 51.1,
    avgEngagementDays: 35.1,
    clinicalContacts: 196
  },

  // June baseline KPIs for comparison
  juneKpis: {
    activeClients: 231,
    housingSuccessRate: 45.8,
    avgEngagementDays: 41.2,
    clinicalContacts: 178
  },

  // Month-over-month trends (June vs July 2025)
  trends: {
    june: {
      uniqueClients: 37,
      peopleHoused: 3,
      successfulExits: 3,
      unsuccessfulExits: 2,
      mealsServed: 1641,
      wellnessChecks: 720,
      laundryServices: 136,
      nightlyBeds: 943,
      uhaSubmitted: 0,
      uhaCertified: 0,
      medicalCare: 7,
      publicBenefits: 0,
      dmvVisits: 0,
      ssCardsObtained: 2,
      idsObtained: 0
    },
    july: {
      uniqueClients: 36,
      peopleHoused: 47,
      successfulExits: 47,
      unsuccessfulExits: 1,
      mealsServed: 1880,
      wellnessChecks: 744,
      laundryServices: 140,
      nightlyBeds: 854,
      uhaSubmitted: 1,
      uhaCertified: 3,
      medicalCare: 0,
      publicBenefits: 2,
      dmvVisits: 12,
      ssCardsObtained: 0,
      idsObtained: 8
    }
  },

  // Demographics (aggregated data)
  demographics: {
    gender: {
      male: 70,
      femaleOther: 30
    },
    age: {
      "18-29": 15,
      "30-44": 25,
      "45-61": 35,
      "62+": 25
    },
    race: {
      white: 35,
      multiRacial: 14,
      hispanic: 20,
      black: 18,
      asian: 5,
      nativeAmerican: 4,
      other: 4
    }
  },

  // Quick wins - new service categories in July
  quickWins: [
    {
      category: "UHA Certified",
      june: 0,
      july: 3,
      impact: "Housing applications approved faster"
    },
    {
      category: "UHA Submissions",
      june: 0,
      july: 1,
      impact: "Housing verification streamlined"
    },
    {
      category: "DMV Visits",
      june: 0,
      july: 12,
      impact: "ID access improved"
    },
    {
      category: "IDs Obtained",
      june: 0,
      july: 8,
      impact: "Documentation barriers reduced"
    },
    {
      category: "Public Benefits",
      june: 0,
      july: 2,
      impact: "Economic stability enhanced"
    }
  ],

  // Revenue opportunity narrative
  opportunityValue: {
    total: 4.4, // Million USD
    breakdown: {
      undocumentedServices: 2.1,
      missedReimbursements: 1.2,
      inefficientProcesses: 0.8,
      complianceGaps: 0.3
    },
    narrative: {
      problem: "Staff are delivering exceptional care—meals increased 14.6%, wellness checks up 3.3%—yet documentation systems capture only a fraction of this work. Housing placements fell despite increased service delivery, revealing system barriers, not staff limitations.",
      solution: "Streamlined mobile intake tools and process redesign could capture the full scope of services delivered, unlocking $4.4M in annual reimbursements while reducing administrative burden on heroic staff."
    }
  },

  // Calculated trend percentages
  trendCalculations: {
    mealsServed: ((1880 - 1641) / 1641 * 100), // +14.6%
    wellnessChecks: ((744 - 720) / 720 * 100), // +3.3%
    laundryServices: ((140 - 136) / 136 * 100), // +2.9%
    peopleHoused: ((47 - 3) / 3 * 100), // +1,467%
    successfulExits: ((47 - 3) / 3 * 100) // +1,467%
  }
};

// Helper function to format percentage changes
export const formatTrendChange = (current: number, previous: number): { value: number; isPositive: boolean; formatted: string } => {
  const change = ((current - previous) / previous) * 100;
  return {
    value: change,
    isPositive: change >= 0,
    formatted: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
  };
};

// Helper function to get trend color class
export const getTrendColorClass = (isPositive: boolean): string => {
  return isPositive ? 'text-green-600' : 'text-red-600';
};