export interface ResearchParticipant {
  id: string;
  email: string;
  role: string;
  program: string;
  siteType: "DHS" | "NONHDS" | "MIXED";
  consentGiven: boolean;
  consentDate?: Date;
  preAssessmentComplete: boolean;
  postAssessmentComplete: boolean;
  pssuqComplete: boolean;
}

export interface PreAssessmentData {
  participantId: string;
  timestamp: Date;
  baselineKnowledge: {
    dataSystemKnowledge: number; // 1-10 scale
    complianceConfidence: number; // 1-10 scale
    techComfort: number; // 1-10 scale
    dashboardExperience: number; // 1-10 scale
  };
  currentPractices: {
    trackingFrequency: string;
    trackingMethods: string[];
    confidenceLevels: number[]; // array of 1-5 ratings
    kpiAwareness: string;
    interimHousingTracking: string;
    acuityProcess: string;
  };
  barriers: string[];
  expectations: string[];
}

export interface PSSSUQData {
  participantId: string;
  timestamp: Date;
  responses: {
    overall_satisfaction: number; // 1-7 scale
    ease_of_use: number;
    effectiveness: number;
    learning_speed: number;
    information_quality: number;
    interface_quality: number;
    system_capabilities: number;
    // Additional WFD-specific questions
    compliance_improvement: number;
    workflow_efficiency: number;
    decision_confidence: number;
  };
  qualitative_feedback: string;
  recommendation_likelihood: number; // 1-10 scale
}

export interface PostAssessmentData {
  participantId: string;
  timestamp: Date;
  knowledge_improvement: {
    dataSystemKnowledge: number; // 1-10 scale post
    complianceConfidence: number;
    techComfort: number;
    dashboardExperience: number;
  };
  behavior_changes: string[];
  effectiveness_rating: number; // 1-5 scale
  usage_frequency: string;
  impact_stories: string;
  recommendations: string;
}

export const gatesResearchFramework = {
  studyTitle: "Digital Transformation in Homeless Services: A Research Study",
  studyDescription: "Investigating the impact of data dashboard implementation on compliance and operational effectiveness",
  phases: [
    {
      name: "Pre-Training Baseline",
      duration: "Week 1",
      activities: ["Consent collection", "Pre-assessment survey", "Current practice documentation"],
      deliverables: ["Baseline data", "Participant profiles", "Current state analysis"]
    },
    {
      name: "Dashboard Implementation",
      duration: "Weeks 2-8",
      activities: ["Training delivery", "Dashboard rollout", "Usage monitoring", "Support provision"],
      deliverables: ["Training completion rates", "Usage analytics", "Support logs"]
    },
    {
      name: "Post-Implementation Assessment",
      duration: "Week 9-10",
      activities: ["PSSUQ completion", "Post-assessment survey", "Impact documentation"],
      deliverables: ["Usability scores", "Knowledge improvement", "Behavior change evidence"]
    },
    {
      name: "Longitudinal Follow-up",
      duration: "6 months",
      activities: ["Sustained usage tracking", "Long-term impact assessment", "Publication preparation"],
      deliverables: ["Research findings", "Academic publication", "Best practices guide"]
    }
  ],
  ethicalConsiderations: {
    ethical_review: true,
    informed_consent: true,
    data_anonymization: true,
    participant_withdrawal: true,
    confidentiality: true
  },
  targetOutcomes: [
    "Improved compliance rates from 65% to 95%",
    "Enhanced manager confidence in data usage",
    "Streamlined assessment and tracking processes",
    "Evidence-based best practices for sector replication",
    "Peer-reviewed publication in homeless services or public administration journal"
  ]
};

export const validateSurveyResponse = (data: Partial<PreAssessmentData>): string[] => {
  const errors: string[] = [];
  
  if (!data.baselineKnowledge?.dataSystemKnowledge) {
    errors.push("Data system knowledge rating is required");
  }
  
  if (!data.currentPractices?.trackingFrequency) {
    errors.push("Current tracking frequency is required");
  }
  
  if (!data.currentPractices?.confidenceLevels?.length) {
    errors.push("Confidence level ratings are required");
  }
  
  return errors;
};

export const generateResearchExport = (participants: ResearchParticipant[], assessments: PreAssessmentData[]) => {
  const summary = {
    total_participants: participants.length,
    consent_rate: (participants.filter(p => p.consentGiven).length / participants.length) * 100,
    completion_rates: {
      pre_assessment: (participants.filter(p => p.preAssessmentComplete).length / participants.length) * 100,
      post_assessment: (participants.filter(p => p.postAssessmentComplete).length / participants.length) * 100,
      pssuq: (participants.filter(p => p.pssuqComplete).length / participants.length) * 100
    },
    site_type_distribution: {
      DHS: participants.filter(p => p.siteType === "DHS").length,
      NONHDS: participants.filter(p => p.siteType === "NONHDS").length,
      MIXED: participants.filter(p => p.siteType === "MIXED").length
    },
    baseline_averages: assessments.length > 0 ? {
      data_knowledge: assessments.reduce((sum, a) => sum + a.baselineKnowledge.dataSystemKnowledge, 0) / assessments.length,
      compliance_confidence: assessments.reduce((sum, a) => sum + a.baselineKnowledge.complianceConfidence, 0) / assessments.length,
      tech_comfort: assessments.reduce((sum, a) => sum + a.baselineKnowledge.techComfort, 0) / assessments.length
    } : null
  };
  
  return {
    summary,
    raw_data: {
      participants: participants.map(p => ({
        ...p,
        email: "ANONYMIZED" // Remove PII for export
      })),
      assessments: assessments.map(a => ({
        ...a,
        participantId: "ANONYMIZED"
      }))
    },
    generated_at: new Date().toISOString(),
    study_phase: "baseline_collection"
  };
};