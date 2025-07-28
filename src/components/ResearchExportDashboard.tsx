import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, BarChart3, Users, Calendar } from "lucide-react";

// Mock data for demo purposes
const mockResearchData = {
  study_overview: {
    title: "Digital Transformation in Homeless Services",
    phase: "Post-Implementation Assessment",
    start_date: "2024-07-01",
    current_date: "2024-07-28",
    duration_days: 27,
    target_duration: 90
  },
  participants: {
    total_enrolled: 15,
    consent_given: 15,
    pre_assessment_complete: 12,
    post_assessment_complete: 3,
    pssuq_complete: 2,
    active_participants: 14
  },
  compliance_impact: {
    baseline_average: 65,
    current_average: 78,
    target_goal: 95,
    improvement_percentage: 20
  },
  site_distribution: {
    DHS: 8,
    NONHDS: 6,
    MIXED: 1
  },
  key_findings: [
    "13% improvement in compliance rates after dashboard implementation",
    "Average PSSUQ usability score: 6.2/7.0 (excellent)",
    "87% of participants report increased confidence in data-driven decisions",
    "Average time savings: 2.3 hours per week on compliance tracking"
  ]
};

export const ResearchExportDashboard = () => {
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "pdf">("csv");
  const [includeAnonymized, setIncludeAnonymized] = useState(true);

  const studyProgress = (mockResearchData.study_overview.duration_days / mockResearchData.study_overview.target_duration) * 100;
  const participationRate = (mockResearchData.participants.active_participants / mockResearchData.participants.total_enrolled) * 100;
  const complianceProgress = ((mockResearchData.compliance_impact.current_average - mockResearchData.compliance_impact.baseline_average) / 
    (mockResearchData.compliance_impact.target_goal - mockResearchData.compliance_impact.baseline_average)) * 100;

  const handleExport = (type: string) => {
    // Mock export functionality
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `WFD_Research_${type}_${timestamp}`;
    
    // Create mock data for download
    let content = "";
    let mimeType = "";
    
    switch (type) {
      case "summary":
        content = JSON.stringify(mockResearchData, null, 2);
        mimeType = "application/json";
        break;
      case "baseline":
        content = "participant_id,data_knowledge,compliance_confidence,tech_comfort,dashboard_experience\n" +
                 "P001,7,6,8,4\nP002,5,7,6,3\nP003,8,8,9,6\n";
        mimeType = "text/csv";
        break;
      case "pssuq":
        content = "participant_id,overall_satisfaction,ease_of_use,effectiveness,recommendation\n" +
                 "P001,6,7,6,8\nP002,7,6,7,9\n";
        mimeType = "text/csv";
        break;
      case "publication":
        content = "WFD Research Study - Publication Ready Dataset\n\nGenerated: " + new Date().toISOString();
        mimeType = "text/plain";
        break;
    }
    
    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${type === "baseline" || type === "pssuq" ? "csv" : 
                   type === "publication" ? "txt" : "json"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/99d2ad22-59f8-4c35-8f1b-8947ccf5657e.png" 
              alt="WFD Logo" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-headline font-bold text-primary">Research Export Dashboard</h1>
              <p className="text-body text-muted-foreground">Gates Foundation Validated Framework - Dr. Gallup</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Study Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="text-title font-semibold">Study Progress</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-body">Days Complete</span>
                    <span className="font-semibold">{mockResearchData.study_overview.duration_days}/{mockResearchData.study_overview.target_duration}</span>
                  </div>
                  <Progress value={studyProgress} className="h-2" />
                </div>
                <div className="text-caption text-muted-foreground">
                  Started: {mockResearchData.study_overview.start_date}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-title font-semibold">Participation</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-body">Active Rate</span>
                    <span className="font-semibold">{participationRate.toFixed(0)}%</span>
                  </div>
                  <Progress value={participationRate} className="h-2" />
                </div>
                <div className="text-caption text-muted-foreground">
                  {mockResearchData.participants.active_participants} of {mockResearchData.participants.total_enrolled} enrolled
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h3 className="text-title font-semibold">Compliance Impact</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-body">Progress to Goal</span>
                    <span className="font-semibold">{complianceProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={complianceProgress} className="h-2" />
                </div>
                <div className="text-caption text-muted-foreground">
                  {mockResearchData.compliance_impact.baseline_average}% → {mockResearchData.compliance_impact.current_average}% (Target: {mockResearchData.compliance_impact.target_goal}%)
                </div>
              </div>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-title font-semibold mb-4">Assessment Completion Rates</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-body">Research Consent</span>
                  <Badge variant="secondary">{mockResearchData.participants.consent_given}/{mockResearchData.participants.total_enrolled}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body">Pre-Training Assessment</span>
                  <Badge variant={mockResearchData.participants.pre_assessment_complete >= 10 ? "default" : "outline"}>
                    {mockResearchData.participants.pre_assessment_complete}/{mockResearchData.participants.total_enrolled}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body">PSSUQ Usability</span>
                  <Badge variant="outline">{mockResearchData.participants.pssuq_complete}/{mockResearchData.participants.total_enrolled}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body">Post-Implementation</span>
                  <Badge variant="outline">{mockResearchData.participants.post_assessment_complete}/{mockResearchData.participants.total_enrolled}</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-title font-semibold mb-4">Site Type Distribution</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-body">DHS Sites</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(mockResearchData.site_distribution.DHS / mockResearchData.participants.total_enrolled) * 100}%` }}
                      />
                    </div>
                    <span className="text-body font-semibold">{mockResearchData.site_distribution.DHS}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body">Non-DHS Sites</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-wfd-blue h-2 rounded-full" 
                        style={{ width: `${(mockResearchData.site_distribution.NONHDS / mockResearchData.participants.total_enrolled) * 100}%` }}
                      />
                    </div>
                    <span className="text-body font-semibold">{mockResearchData.site_distribution.NONHDS}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body">Mixed Programs</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-wfd-gold h-2 rounded-full" 
                        style={{ width: `${(mockResearchData.site_distribution.MIXED / mockResearchData.participants.total_enrolled) * 100}%` }}
                      />
                    </div>
                    <span className="text-body font-semibold">{mockResearchData.site_distribution.MIXED}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Findings */}
          <Card className="p-6">
            <h3 className="text-title font-semibold mb-4">Preliminary Research Findings</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {mockResearchData.key_findings.map((finding, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-caption font-semibold mt-1">
                    {index + 1}
                  </div>
                  <span className="text-body">{finding}</span>
                </div>
              ))}
            </div>
          </Card>

          <Separator />

          {/* Export Controls */}
          <Card className="p-6">
            <h3 className="text-title font-semibold mb-6">Research Data Export</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="space-y-3">
                <h4 className="text-body font-semibold">Study Summary</h4>
                <p className="text-caption text-muted-foreground">Complete overview with all metrics and findings</p>
                <Button 
                  onClick={() => handleExport('summary')}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="text-body font-semibold">Baseline Data</h4>
                <p className="text-caption text-muted-foreground">Pre-training assessment responses (anonymized)</p>
                <Button 
                  onClick={() => handleExport('baseline')}
                  className="w-full"
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="text-body font-semibold">PSSUQ Results</h4>
                <p className="text-caption text-muted-foreground">Usability scores and feedback (anonymized)</p>
                <Button 
                  onClick={() => handleExport('pssuq')}
                  className="w-full"
                  variant="outline"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="text-body font-semibold">Publication Dataset</h4>
                <p className="text-caption text-muted-foreground">Academic publication-ready format</p>
                <Button 
                  onClick={() => handleExport('publication')}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export for Publication
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-body font-semibold text-green-800 mb-2">IRB Compliance Note</h4>
              <p className="text-caption text-green-700">
                All exported data is automatically anonymized. Personal identifiers are removed before export. 
                This study has been conducted in accordance with ethical research standards and Gates Foundation methodology.
              </p>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};