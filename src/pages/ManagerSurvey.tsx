import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ManagerSurvey = () => {
  const [programType, setProgramType] = useState("");
  const [formData, setFormData] = useState({});
  const [currentSection] = useState(1);
  const [totalSections, setTotalSections] = useState(8);

  useEffect(() => {
    setTotalSections(8 + (programType ? 1 : 0));
  }, [programType]);

  const progressPercentage = (currentSection / totalSections) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Collect all form data
    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);
    const responses: Record<string, any> = {};
    
    // Add program type
    responses['program-type'] = programType;
    
    // Convert FormData to object
    for (const [key, value] of formDataObj.entries()) {
      if (responses[key]) {
        // Handle multiple values (checkboxes)
        if (Array.isArray(responses[key])) {
          responses[key].push(value);
        } else {
          responses[key] = [responses[key], value];
        }
      } else {
        responses[key] = value;
      }
    }
    
    // Format email body - handle gracefully even with empty/partial data
    const emailBody = Object.entries(responses)
      .filter(([key, value]) => value && value !== '') // Only include non-empty values
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
      .join('\n');
    
    // Create mailto link
    const subject = encodeURIComponent('WFD Manager Survey Response - ORIC-12 Baseline');
    const completionStatus = Object.keys(responses).length > 1 ? 'Partial' : 'Partial';
    const body = encodeURIComponent(`WFD Manager Survey Response (${completionStatus} Completion):\n\nProgram Type: ${programType || 'Not specified'}\n\n${emailBody}\n\nThank you for your participation in this research study.`);
    const mailtoLink = `mailto:eric@recovery-compass.org?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
  };

  // ORIC-12 Questions
  const oric12Questions = {
    efficacy: [
      "People who work here feel confident that the organization can get people invested in implementing this change.",
      "People who work here feel confident that they can keep track of progress in implementing this change.",
      "People who work here feel confident that the organization can support people as they adjust to this change.",
      "People who work here feel confident that they can keep the momentum going in implementing this change.",
      "People who work here feel confident that they can handle the challenges that might arise in implementing this change.",
      "People who work here feel confident that they can coordinate tasks so that implementation goes smoothly.",
      "People who work here feel confident that they can manage the politics of implementing this change."
    ],
    commitment: [
      "People who work here are committed to implementing this change.",
      "People who work here will do whatever it takes to implement this change.",
      "People who work here want to implement this change.",
      "People who work here are determined to implement this change.",
      "People who work here are motivated to implement this change."
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/99d2ad22-59f8-4c35-8f1b-8947ccf5657e.png" 
              alt="Whittier First Day Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="text-lg sm:text-headline font-bold text-primary">Whittier First Day</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-lg">
          {/* Header with Progress */}
          <div className="bg-primary px-4 sm:px-8 py-6 sm:py-8 rounded-t-xl text-center force-white-text">
            <h1 className="text-2xl sm:text-3xl lg:text-hero mb-3 force-white-text">
              Manager Readiness Assessment
            </h1>
            <p className="text-sm sm:text-body force-white-text" style={{ opacity: 0.9 }}>
              6-Month Pilot Study on Organizational Change Through Data Utilization
            </p>
            
            {/* Progress Bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="flex justify-between text-xs force-white-text mb-2">
                <span>Progress</span>
                <span>Section 1 of {totalSections}</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-white/20">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPercentage}%` }} />
              </Progress>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-muted/30 px-4 sm:px-8 py-4 sm:py-6 border-b border-border">
            <p className="text-sm sm:text-body leading-relaxed">
              <strong className="block mb-3 sm:mb-4 text-base sm:text-title">Dear WFD Manager,</strong>
              This baseline assessment uses the validated ORIC-12 (Organizational Readiness for Implementing Change) instrument plus custom questions specific to WFD's data transformation journey. Your responses will help us understand current practices and design a dashboard that actually supports your daily work.
            </p>
            <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-xs sm:text-caption text-primary font-medium">
                🔬 Validated Instrument: ORIC-12 © Shea et al. (2014) Implementation Science
              </p>
            </div>
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs sm:text-caption text-green-700 font-medium">
                ✓ All questions optional | ✓ Partial completion allowed | ✓ Responses aggregated for research
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Program Type Selection */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 1: Program Type
              </h2>
              <div>
                <Label className="text-body font-medium mb-4 block">
                  Which type of program do you manage? (Optional - helps customize questions)
                </Label>
                <RadioGroup 
                  name="program-type" 
                  value={programType} 
                  onValueChange={setProgramType}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                    <RadioGroupItem value="community-services" id="prog1" />
                    <Label htmlFor="prog1" className="flex-1 cursor-pointer">Community Services/Outreach</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                    <RadioGroupItem value="interim-housing" id="prog2" />
                    <Label htmlFor="prog2" className="flex-1 cursor-pointer">Interim Housing</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* SECTION 2: ORIC-12 VALIDATED INSTRUMENT */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 2: Organizational Readiness Assessment (ORIC-12)
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Please rate your agreement with each statement about implementing the new data dashboard system.
              </p>
              
              {/* Efficacy Items */}
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-4">Change Efficacy</h3>
                {oric12Questions.efficacy.map((question, index) => (
                  <div key={`e${index + 1}`} className="mb-6 p-4 bg-muted/10 rounded-lg">
                    <p className="mb-3 text-body">{question}</p>
                    <RadioGroup name={`oric-e${index + 1}`} className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="text-center">
                          <RadioGroupItem 
                            value={value.toString()} 
                            id={`oric-e${index + 1}-${value}`}
                            className="sr-only"
                          />
                          <Label 
                            htmlFor={`oric-e${index + 1}-${value}`}
                            className="block p-3 bg-muted/20 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Strongly Disagree</span>
                      <span>Strongly Agree</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Commitment Items */}
              <div>
                <h3 className="text-base font-semibold mb-4">Change Commitment</h3>
                {oric12Questions.commitment.map((question, index) => (
                  <div key={`c${index + 1}`} className="mb-6 p-4 bg-muted/10 rounded-lg">
                    <p className="mb-3 text-body">{question}</p>
                    <RadioGroup name={`oric-c${index + 1}`} className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="text-center">
                          <RadioGroupItem 
                            value={value.toString()} 
                            id={`oric-c${index + 1}-${value}`}
                            className="sr-only"
                          />
                          <Label 
                            htmlFor={`oric-c${index + 1}-${value}`}
                            className="block p-3 bg-muted/20 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Strongly Disagree</span>
                      <span>Strongly Agree</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: Biopsychosocial Assessment Baseline */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 3: Biopsychosocial Assessment Baseline
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Rate your current confidence in assessing each domain (1=Not confident, 5=Very confident)
              </p>
              
              {/* Biological Factors */}
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-4 text-primary">Biological Factors</h3>
                {["Medical conditions", "Medications", "Physical health", "Substance use", "Sleep patterns"].map((item, index) => (
                  <div key={`bio${index + 1}`} className="mb-4 p-4 bg-muted/10 rounded-lg">
                    <p className="mb-3 text-body">{item}</p>
                    <RadioGroup name={`bio-${index + 1}`} className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="text-center">
                          <RadioGroupItem 
                            value={value.toString()} 
                            id={`bio-${index + 1}-${value}`}
                            className="sr-only"
                          />
                          <Label 
                            htmlFor={`bio-${index + 1}-${value}`}
                            className="block p-2 bg-muted/20 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium text-sm"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>

              {/* Psychological Factors */}
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-4 text-primary">Psychological Factors</h3>
                {["Mental health", "Trauma history", "Coping skills", "Cognitive function", "Emotional regulation"].map((item, index) => (
                  <div key={`psych${index + 1}`} className="mb-4 p-4 bg-muted/10 rounded-lg">
                    <p className="mb-3 text-body">{item}</p>
                    <RadioGroup name={`psych-${index + 1}`} className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="text-center">
                          <RadioGroupItem 
                            value={value.toString()} 
                            id={`psych-${index + 1}-${value}`}
                            className="sr-only"
                          />
                          <Label 
                            htmlFor={`psych-${index + 1}-${value}`}
                            className="block p-2 bg-muted/20 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium text-sm"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>

              {/* Social Factors */}
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-4 text-primary">Social Factors</h3>
                {["Housing stability", "Family support", "Employment", "Community connections", "Legal issues"].map((item, index) => (
                  <div key={`social${index + 1}`} className="mb-4 p-4 bg-muted/10 rounded-lg">
                    <p className="mb-3 text-body">{item}</p>
                    <RadioGroup name={`social-${index + 1}`} className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="text-center">
                          <RadioGroupItem 
                            value={value.toString()} 
                            id={`social-${index + 1}-${value}`}
                            className="sr-only"
                          />
                          <Label 
                            htmlFor={`social-${index + 1}-${value}`}
                            className="block p-2 bg-muted/20 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium text-sm"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>

              {/* Environmental Factors */}
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-4 text-primary">Environmental Factors</h3>
                {["Safety", "Accessibility", "Triggers", "Supports", "Barriers"].map((item, index) => (
                  <div key={`env${index + 1}`} className="mb-4 p-4 bg-muted/10 rounded-lg">
                    <p className="mb-3 text-body">{item}</p>
                    <RadioGroup name={`env-${index + 1}`} className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="text-center">
                          <RadioGroupItem 
                            value={value.toString()} 
                            id={`env-${index + 1}-${value}`}
                            className="sr-only"
                          />
                          <Label 
                            htmlFor={`env-${index + 1}-${value}`}
                            className="block p-2 bg-muted/20 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium text-sm"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>

              {/* Spiritual/Cultural Factors */}
              <div>
                <h3 className="text-base font-semibold mb-4 text-primary">Spiritual/Cultural Factors</h3>
                {["Beliefs", "Practices", "Identity", "Meaning", "Values"].map((item, index) => (
                  <div key={`spirit${index + 1}`} className="mb-4 p-4 bg-muted/10 rounded-lg">
                    <p className="mb-3 text-body">{item}</p>
                    <RadioGroup name={`spirit-${index + 1}`} className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="text-center">
                          <RadioGroupItem 
                            value={value.toString()} 
                            id={`spirit-${index + 1}-${value}`}
                            className="sr-only"
                          />
                          <Label 
                            htmlFor={`spirit-${index + 1}-${value}`}
                            className="block p-2 bg-muted/20 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium text-sm"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: Service Documentation Awareness */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 4: Service Documentation Awareness
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                How does your program currently track these service categories?
              </p>
              
              <div className="space-y-6">
                {[
                  "Bed nights",
                  "Meals served", 
                  "Medical services",
                  "Wellness checks",
                  "Laundry services",
                  "Employment stages (resume→interview→employed)"
                ].map((service, index) => (
                  <div key={index}>
                    <Label className="text-body font-medium mb-3 block">
                      How does your program track {service.toLowerCase()}?
                    </Label>
                    <Select name={`service-tracking-${index}`}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select tracking method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily-log">Daily log</SelectItem>
                        <SelectItem value="weekly-summary">Weekly summary</SelectItem>
                        <SelectItem value="monthly-report">Monthly report</SelectItem>
                        <SelectItem value="not-tracked">Not currently tracked</SelectItem>
                        <SelectItem value="unsure">Unsure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: Documentation Readiness Assessment */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 5: Documentation Readiness Assessment
              </h2>
              
              <div className="space-y-8">
                <div>
                  <Label className="text-body font-medium mb-4 block">
                    How many hours per week do you spend on documentation?
                  </Label>
                  <RadioGroup name="documentation-hours" className="space-y-3">
                    {["0-2", "3-5", "6-10", "11-15", "16+"].map((range) => (
                      <div key={range} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                        <RadioGroupItem value={range} id={`hours-${range}`} />
                        <Label htmlFor={`hours-${range}`} className="flex-1 cursor-pointer">{range} hours</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-body font-medium mb-4 block">
                    What percentage of services delivered do you think goes undocumented?
                  </Label>
                  <RadioGroup name="undocumented-percentage" className="space-y-3">
                    {["0-10%", "11-25%", "26-50%", "51-75%", "76%+"].map((range) => (
                      <div key={range} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                        <RadioGroupItem value={range} id={`undoc-${range}`} />
                        <Label htmlFor={`undoc-${range}`} className="flex-1 cursor-pointer">{range}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-body font-medium mb-4 block">
                    Do you understand how documentation connects to reimbursement?
                  </Label>
                  <RadioGroup name="reimbursement-understanding" className="space-y-3">
                    {[
                      { value: "very-well", label: "Very well" },
                      { value: "somewhat", label: "Somewhat" },
                      { value: "not-really", label: "Not really" },
                      { value: "not-at-all", label: "Not at all" }
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                        <RadioGroupItem value={option.value} id={`reimb-${option.value}`} />
                        <Label htmlFor={`reimb-${option.value}`} className="flex-1 cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-body font-medium mb-4 block">
                    Rate your comfort with technology (1=Very uncomfortable, 5=Very comfortable)
                  </Label>
                  <RadioGroup name="technology-comfort" className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="text-center">
                        <RadioGroupItem 
                          value={value.toString()} 
                          id={`tech-comfort-${value}`}
                          className="sr-only"
                        />
                        <Label 
                          htmlFor={`tech-comfort-${value}`}
                          className="block p-3 bg-muted/20 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium"
                        >
                          {value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Very uncomfortable</span>
                    <span>Very comfortable</span>
                  </div>
                </div>

                <div>
                  <Label className="text-body font-medium mb-4 block">
                    Do you have access to a smartphone/tablet for documentation?
                  </Label>
                  <RadioGroup name="device-access" className="space-y-3">
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      { value: "sometimes", label: "Sometimes" }
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                        <RadioGroupItem value={option.value} id={`device-${option.value}`} />
                        <Label htmlFor={`device-${option.value}`} className="flex-1 cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* SECTION 6: Current Data Practices */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 6: Your Current Data Practices
              </h2>
              
              <div className="space-y-8">
                <div>
                  <Label className="text-body font-medium mb-4 block">
                    How often do you currently track or review program data?
                  </Label>
                  <RadioGroup name="tracking-frequency" className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                      <RadioGroupItem value="multiple-daily" id="freq1" />
                      <Label htmlFor="freq1" className="flex-1 cursor-pointer">Multiple times daily</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                      <RadioGroupItem value="once-daily" id="freq2" />
                      <Label htmlFor="freq2" className="flex-1 cursor-pointer">Once daily</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                      <RadioGroupItem value="few-weekly" id="freq3" />
                      <Label htmlFor="freq3" className="flex-1 cursor-pointer">Few times per week</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                      <RadioGroupItem value="weekly" id="freq4" />
                      <Label htmlFor="freq4" className="flex-1 cursor-pointer">Weekly</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                      <RadioGroupItem value="less" id="freq5" />
                      <Label htmlFor="freq5" className="flex-1 cursor-pointer">Less than weekly</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-body font-medium mb-4 block">
                    Can you list your program's top 3 KPIs without looking them up?
                  </Label>
                  <Textarea 
                    className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base" 
                    placeholder="1.&#10;2.&#10;3."
                    name="top-kpis"
                  />
                </div>

                <div>
                  <Label className="text-body font-medium mb-4 block">
                    Where do you currently keep track of client information? <em>(Check all that apply)</em>
                  </Label>
                  <div className="space-y-3">
                    {[
                      { id: "paper", label: "Paper files/notebooks" },
                      { id: "excel-personal", label: "Excel spreadsheets I created" },
                      { id: "excel-shared", label: "Shared Excel files" },
                      { id: "hmis", label: "HMIS system" },
                      { id: "memory", label: "Memory/mental notes" },
                      { id: "none", label: "No systematic tracking" }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                        <Checkbox id={item.id} name="tracking-methods" value={item.id} />
                        <Label htmlFor={item.id} className="flex-1 cursor-pointer">{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 7: Program-Specific Questions (with skip logic) */}
            {programType === "interim-housing" && (
              <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
                <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                  Section 7: Interim Housing Specific
                </h2>
                
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                      The 90-day interim housing goal - how do you currently track it?
                    </Label>
                    <RadioGroup name="housing-tracking" className="space-y-2 sm:space-y-3">
                      {[
                        { value: "system", label: "I have a system that alerts me before limits" },
                        { value: "periodic", label: "I check periodically but not systematically" },
                        { value: "client", label: "I rely on clients to tell me" },
                        { value: "aware", label: "I'm aware but don't actively track" },
                        { value: "unaware", label: "I wasn't fully aware of this requirement" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                          <RadioGroupItem value={item.value} id={`housing${index + 1}`} />
                          <Label htmlFor={`housing${index + 1}`} className="flex-1 cursor-pointer text-sm sm:text-base">{item.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                      5×5 Acuity Assessments - what's your current process?
                    </Label>
                    <RadioGroup name="acuity-process" className="space-y-2 sm:space-y-3">
                      {[
                        { value: "scheduled", label: "I complete them on schedule with reminders" },
                        { value: "sometimes", label: "I do them but sometimes miss deadlines" },
                        { value: "unsure", label: "I'm unsure about timing requirements" },
                        { value: "training", label: "I need more training on these" },
                        { value: "unaware", label: "I wasn't aware these were required" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                          <RadioGroupItem value={item.value} id={`acuity${index + 1}`} />
                          <Label htmlFor={`acuity${index + 1}`} className="flex-1 cursor-pointer text-sm sm:text-base">{item.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {programType === "community-services" && (
              <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
                <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                  Section 7: Community Services Specific
                </h2>
                
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                      How do you currently track service touches and referrals?
                    </Label>
                    <RadioGroup name="service-tracking" className="space-y-2 sm:space-y-3">
                      {[
                        { value: "realtime", label: "I enter them in real-time or same day" },
                        { value: "batch", label: "I batch enter them weekly" },
                        { value: "monthly", label: "I update records monthly" },
                        { value: "sporadic", label: "I update when I have time" },
                        { value: "none", label: "I don't systematically track these" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                          <RadioGroupItem value={item.value} id={`service${index + 1}`} />
                          <Label htmlFor={`service${index + 1}`} className="flex-1 cursor-pointer text-sm sm:text-base">{item.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                      What percentage of your service interactions do you estimate get documented?
                    </Label>
                    <RadioGroup name="documentation-rate" className="space-y-2 sm:space-y-3">
                      {[
                        { value: "90-100", label: "90-100% - Nearly all" },
                        { value: "70-89", label: "70-89% - Most" },
                        { value: "50-69", label: "50-69% - About half" },
                        { value: "30-49", label: "30-49% - Some" },
                        { value: "0-29", label: "Less than 30%" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                          <RadioGroupItem value={item.value} id={`doc${index + 1}`} />
                          <Label htmlFor={`doc${index + 1}`} className="flex-1 cursor-pointer text-sm sm:text-base">{item.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 7: Barriers & Looking Forward */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 8: Barriers & Future Vision
              </h2>
              
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    What stops you from using data more effectively? <em>(Check top 3)</em>
                  </Label>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      "Too time-consuming to collect/enter",
                      "Don't have the right tools",
                      "Unclear which metrics matter most",
                      "Not confident analyzing data",
                      "No regular feedback on my performance",
                      "System changes too frequently",
                      "Not enough training",
                      "Other priorities take precedence"
                    ].map((barrier, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                        <Checkbox id={`barrier${index + 1}`} name="barriers" value={barrier} />
                        <Label htmlFor={`barrier${index + 1}`} className="flex-1 cursor-pointer text-sm sm:text-base">{barrier}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    If you had a magic dashboard, what would you see first each morning? <em>(Rank top 3)</em>
                  </Label>
                  <div className="bg-muted/20 p-4 sm:p-6 rounded-lg space-y-3">
                    {programType === "interim-housing" ? [
                      "Clients approaching 90-day goal",
                      "Overdue 5×5 assessments",
                      "Pending biopsychosocial assessments",
                      "My performance vs. goals",
                      "Available beds/resources",
                      "Housing placement opportunities",
                      "Today's priority tasks"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 py-2">
                        <Input className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base" placeholder="#" name={`dashboard-rank-${index}`} />
                        <Label className="flex-1 text-sm sm:text-base">{item}</Label>
                      </div>
                    )) : [
                      "Service touches this week",
                      "Referral outcomes",
                      "My performance vs. goals",
                      "Community resources available",
                      "Follow-up reminders",
                      "Success stories/wins"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 py-2">
                        <Input className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base" placeholder="#" name={`dashboard-rank-${index}`} />
                        <Label className="flex-1 text-sm sm:text-base">{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    Describe your biggest data-related frustration in one sentence:
                  </Label>
                  <Input className="text-sm sm:text-base" placeholder="My biggest frustration is..." name="biggest-frustration" />
                </div>

                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    Any other ideas for making data useful for you?
                  </Label>
                  <Textarea 
                    className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base" 
                    placeholder="I wish we could..."
                    name="other-ideas"
                  />
                </div>
              </div>
            </div>

            {/* Demographics (Optional) */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h3 className="text-base sm:text-title mb-3 sm:mb-4">Section 9: Demographics (Optional)</h3>
              <p className="text-sm sm:text-body text-muted-foreground mb-4 sm:mb-6">
                This information helps us understand patterns across different roles and experience levels.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="role" className="text-sm sm:text-body font-medium mb-2 block">Current Role:</Label>
                  <Input id="role" name="role" placeholder="e.g., Program Manager, Case Manager" className="text-sm sm:text-base" />
                </div>
                <div>
                  <Label htmlFor="tenure" className="text-sm sm:text-body font-medium mb-2 block">Time in current role:</Label>
                  <Input id="tenure" name="tenure" placeholder="e.g., 2 years" className="text-sm sm:text-base" />
                </div>
                <div>
                  <Label htmlFor="education" className="text-sm sm:text-body font-medium mb-2 block">Highest education level:</Label>
                  <Input id="education" name="education" placeholder="e.g., Bachelor's, Master's" className="text-sm sm:text-base" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 bg-muted/10 rounded-b-xl">
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-light text-white px-6 sm:px-8 py-3 text-sm sm:text-body font-medium w-full sm:w-auto"
                >
                  Submit Survey Response
                </Button>
                <p className="text-xs sm:text-caption text-green-600 mt-2 font-medium">
                  ✓ All questions optional - submit anytime with partial completion
                </p>
                <p className="text-xs sm:text-caption text-muted-foreground mt-3">
                  This will open your email client with your responses
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Thank you for participating in this important research study
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerSurvey;