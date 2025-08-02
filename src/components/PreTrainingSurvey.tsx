import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { PreAssessmentData } from "@/data/researchFramework";

interface PreTrainingSurveyProps {
  participantId: string;
  onSurveyComplete: (data: Partial<PreAssessmentData>) => void;
}

export const PreTrainingSurvey = ({ participantId, onSurveyComplete }: PreTrainingSurveyProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [surveyData, setSurveyData] = useState<Partial<PreAssessmentData>>({
    participantId,
    timestamp: new Date(),
    baselineKnowledge: {
      dataSystemKnowledge: 5,
      complianceConfidence: 5,
      techComfort: 5,
      dashboardExperience: 5
    },
    currentPractices: {
      trackingFrequency: "",
      trackingMethods: [],
      confidenceLevels: [3, 3, 3, 3],
      kpiAwareness: "",
      interimHousingTracking: "",
      acuityProcess: ""
    },
    barriers: [],
    expectations: []
  });

  const sections = [
    "Baseline Knowledge Assessment",
    "Current Data Practices", 
    "Compliance & Requirements",
    "Barriers & Expectations",
    "Complete Assessment"
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  const updateBaselineKnowledge = (key: keyof typeof surveyData.baselineKnowledge, value: number) => {
    setSurveyData(prev => ({
      ...prev,
      baselineKnowledge: {
        ...prev.baselineKnowledge!,
        [key]: value
      }
    }));
  };

  const updateCurrentPractices = (key: keyof typeof surveyData.currentPractices, value: any) => {
    setSurveyData(prev => ({
      ...prev,
      currentPractices: {
        ...prev.currentPractices!,
        [key]: value
      }
    }));
  };

  const updateConfidenceLevel = (index: number, value: number) => {
    const newLevels = [...(surveyData.currentPractices?.confidenceLevels || [3, 3, 3, 3])];
    newLevels[index] = value;
    updateCurrentPractices('confidenceLevels', newLevels);
  };

  const toggleBarrier = (barrier: string) => {
    const currentBarriers = surveyData.barriers || [];
    const newBarriers = currentBarriers.includes(barrier)
      ? currentBarriers.filter(b => b !== barrier)
      : [...currentBarriers, barrier];
    setSurveyData(prev => ({ ...prev, barriers: newBarriers }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onSurveyComplete(surveyData);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-headline font-semibold text-primary mb-2">Baseline Knowledge Assessment</h2>
              <p className="text-body text-muted-foreground">
                Please rate your current knowledge and comfort level on a scale of 1-10
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-body font-medium mb-4 block">
                  How would you rate your knowledge of data systems and compliance tracking?
                </Label>
                <div className="px-4">
                  <Slider
                    value={[surveyData.baselineKnowledge?.dataSystemKnowledge || 5]}
                    onValueChange={(value) => updateBaselineKnowledge('dataSystemKnowledge', value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-caption text-muted-foreground">
                    <span>1 - No knowledge</span>
                    <span className="font-semibold text-primary">
                      {surveyData.baselineKnowledge?.dataSystemKnowledge}/10
                    </span>
                    <span>10 - Expert level</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-body font-medium mb-4 block">
                  How confident are you in meeting compliance requirements?
                </Label>
                <div className="px-4">
                  <Slider
                    value={[surveyData.baselineKnowledge?.complianceConfidence || 5]}
                    onValueChange={(value) => updateBaselineKnowledge('complianceConfidence', value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-caption text-muted-foreground">
                    <span>1 - Not confident</span>
                    <span className="font-semibold text-primary">
                      {surveyData.baselineKnowledge?.complianceConfidence}/10
                    </span>
                    <span>10 - Very confident</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-body font-medium mb-4 block">
                  How comfortable are you with technology and digital tools?
                </Label>
                <div className="px-4">
                  <Slider
                    value={[surveyData.baselineKnowledge?.techComfort || 5]}
                    onValueChange={(value) => updateBaselineKnowledge('techComfort', value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-caption text-muted-foreground">
                    <span>1 - Not comfortable</span>
                    <span className="font-semibold text-primary">
                      {surveyData.baselineKnowledge?.techComfort}/10
                    </span>
                    <span>10 - Very comfortable</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-body font-medium mb-4 block">
                  How much experience do you have with data dashboards?
                </Label>
                <div className="px-4">
                  <Slider
                    value={[surveyData.baselineKnowledge?.dashboardExperience || 5]}
                    onValueChange={(value) => updateBaselineKnowledge('dashboardExperience', value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-caption text-muted-foreground">
                    <span>1 - No experience</span>
                    <span className="font-semibold text-primary">
                      {surveyData.baselineKnowledge?.dashboardExperience}/10
                    </span>
                    <span>10 - Extensive experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-headline font-semibold text-primary mb-2">Current Data Practices</h2>
              <p className="text-body text-muted-foreground">
                Tell us about your current approaches to data and compliance tracking
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-body font-medium mb-4 block">
                  How often do you currently track or review program data?
                </Label>
                <RadioGroup 
                  value={surveyData.currentPractices?.trackingFrequency} 
                  onValueChange={(value) => updateCurrentPractices('trackingFrequency', value)}
                  className="space-y-3"
                >
                  {[
                    "multiple-daily", "once-daily", "few-weekly", "weekly", "less-weekly"
                  ].map((freq, index) => {
                    const labels = [
                      "Multiple times daily", "Once daily", "Few times per week", "Weekly", "Less than weekly"
                    ];
                    return (
                      <div key={freq} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
                        <RadioGroupItem value={freq} id={freq} />
                        <Label htmlFor={freq} className="flex-1 cursor-pointer">{labels[index]}</Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-body font-medium mb-4 block">
                  Where do you currently keep track of client information? (Check all that apply)
                </Label>
                <div className="space-y-3">
                  {[
                    "Paper files/notebooks",
                    "Excel spreadsheets I created", 
                    "Shared Excel files",
                    "Memory/mental notes",
                    "Sticky notes/whiteboards",
                    "No systematic tracking"
                  ].map((method) => (
                    <div key={method} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
                      <Checkbox 
                        checked={(surveyData.currentPractices?.trackingMethods || []).includes(method)}
                        onCheckedChange={(checked) => {
                          const current = surveyData.currentPractices?.trackingMethods || [];
                          const updated = checked 
                            ? [...current, method]
                            : current.filter(m => m !== method);
                          updateCurrentPractices('trackingMethods', updated);
                        }}
                      />
                      <Label className="flex-1 cursor-pointer">{method}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-headline font-semibold text-primary mb-2">Compliance & Requirements</h2>
              <p className="text-body text-muted-foreground">
                Rate your current confidence in key compliance areas
              </p>
            </div>

            <div className="space-y-6">
              {[
                "Interpreting program data",
                "Meeting compliance requirements", 
                "Using data to improve outcomes",
                "Explaining our impact to others"
              ].map((topic, index) => (
                <div key={index}>
                  <Label className="text-body font-medium mb-4 block">{topic}</Label>
                  <div className="px-4">
                    <Slider
                      value={[surveyData.currentPractices?.confidenceLevels?.[index] || 3]}
                      onValueChange={(value) => updateConfidenceLevel(index, value[0])}
                      max={5}
                      min={1}
                      step={1}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-caption text-muted-foreground">
                      <span>1 - Not confident</span>
                      <span className="font-semibold text-primary">
                        {surveyData.currentPractices?.confidenceLevels?.[index] || 3}/5
                      </span>
                      <span>5 - Very confident</span>
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <Label className="text-body font-medium mb-4 block">
                  Can you list your program's top 3 KPIs without looking them up?
                </Label>
                <Textarea 
                  value={surveyData.currentPractices?.kpiAwareness || ""}
                  onChange={(e) => updateCurrentPractices('kpiAwareness', e.target.value)}
                  placeholder="1.&#10;2.&#10;3."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label className="text-body font-medium mb-4 block">
                  The 90-day interim housing limit - how do you currently track it?
                </Label>
                <RadioGroup 
                  value={surveyData.currentPractices?.interimHousingTracking} 
                  onValueChange={(value) => updateCurrentPractices('interimHousingTracking', value)}
                  className="space-y-3"
                >
                  {[
                    { value: "system", label: "I have a system that alerts me before limits" },
                    { value: "periodic", label: "I check periodically but not systematically" },
                    { value: "client", label: "I rely on clients to tell me" },
                    { value: "aware", label: "I'm aware but don't actively track" },
                    { value: "unaware", label: "I wasn't fully aware of this requirement" }
                  ].map((item) => (
                    <div key={item.value} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
                      <RadioGroupItem value={item.value} id={item.value} />
                      <Label htmlFor={item.value} className="flex-1 cursor-pointer">{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-headline font-semibold text-primary mb-2">Barriers & Expectations</h2>
              <p className="text-body text-muted-foreground">
                Help us understand what prevents effective data use and what you hope to achieve
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-body font-medium mb-4 block">
                  What stops you from using data more effectively? (Check top 3)
                </Label>
                <div className="space-y-3">
                  {[
                    "Too time-consuming to collect/enter",
                    "Don't have the right tools",
                    "Unclear which metrics matter most",
                    "Not confident analyzing data",
                    "No regular feedback on my performance",
                    "System changes too frequently",
                    "Not enough training",
                    "Other priorities take precedence"
                  ].map((barrier) => (
                    <div key={barrier} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
                      <Checkbox 
                        checked={(surveyData.barriers || []).includes(barrier)}
                        onCheckedChange={() => toggleBarrier(barrier)}
                      />
                      <Label className="flex-1 cursor-pointer">{barrier}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-body font-medium mb-4 block">
                  What are your top expectations for the new dashboard? (Describe in detail)
                </Label>
                <Textarea 
                  value={surveyData.expectations?.join('\n') || ""}
                  onChange={(e) => setSurveyData(prev => ({ 
                    ...prev, 
                    expectations: e.target.value.split('\n').filter(line => line.trim())
                  }))}
                  placeholder="Describe what you hope the dashboard will help you accomplish..."
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-headline font-semibold text-primary mb-2">Assessment Complete</h2>
              <p className="text-body text-muted-foreground">
                Thank you for completing the pre-training assessment!
              </p>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg">
              <h3 className="text-title font-semibold text-primary mb-4">What Happens Next?</h3>
              <ul className="space-y-3 text-body">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span>Your responses have been recorded for research analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span>You'll receive dashboard training and begin using the new tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span>In 60 days, you'll complete a brief usability assessment (PSSUQ)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <span>Your contribution will help improve services for the entire sector</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-body text-muted-foreground mb-4">
                Questions about the research study? Contact Dr. Donna Gallup at donna@wfd.org
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-survey-bg-start via-white to-survey-bg-end">
      {/* Header with warm gradient */}
      <header className="bg-gradient-to-r from-wfd-orange to-wfd-gold shadow-lg border-b border-wfd-orange/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <img 
                src="/lovable-uploads/afbdd2d6-a84b-471a-a0cb-05b4a50829ee.png" 
                alt="First Day Logo" 
                className="w-14 h-14 object-contain"
              />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-1">Gates Foundation Research Study</h1>
              <p className="text-white/90 text-lg">Pre-Training Baseline Assessment</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar with warm styling */}
          <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/40">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-wfd-purple">Section {currentSection + 1} of {sections.length}</span>
              <span className="text-base text-wfd-orange font-medium">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3 bg-wfd-gold-light/30" />
            <p className="text-sm text-wfd-purple/80 mt-3 font-medium">{sections[currentSection]}</p>
          </div>

          {/* Survey Content with enhanced card */}
          <Card className="p-10 mb-8 shadow-xl bg-white/90 backdrop-blur-sm border-0 rounded-2xl">
            {renderSection()}
          </Card>

          {/* Navigation with warm styling */}
          <div className="flex justify-between gap-4">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className="px-8 py-3 text-base bg-white/80 border-wfd-orange/40 text-wfd-purple hover:bg-wfd-orange/10 hover:border-wfd-orange disabled:opacity-50"
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              className="px-8 py-3 text-base bg-gradient-to-r from-wfd-orange to-wfd-gold text-white hover:from-wfd-orange/90 hover:to-wfd-gold/90 shadow-lg border-0"
            >
              {currentSection === sections.length - 1 ? "Complete Assessment" : "Next Section"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};