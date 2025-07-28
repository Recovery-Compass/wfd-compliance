import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const ManagerSurvey = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Collect all form data
    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);
    const responses: Record<string, any> = {};
    
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
    
    // Format email body
    const emailBody = Object.entries(responses)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
      .join('\n');
    
    // Create mailto link
    const subject = encodeURIComponent('WFD Manager Survey Response');
    const body = encodeURIComponent(`WFD Manager Survey Response:\n\n${emailBody}`);
    const mailtoLink = `mailto:eric@recovery-compass.org?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-lg">
          {/* Header */}
          <div className="bg-primary px-4 sm:px-8 py-6 sm:py-8 rounded-t-xl text-center force-white-text">
            <h1 className="text-2xl sm:text-3xl lg:text-hero mb-3 force-white-text">
              Building Better Together
            </h1>
            <p className="text-sm sm:text-body force-white-text" style={{ opacity: 0.9 }}>
              Your Input Shapes Our Future
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-muted/30 px-4 sm:px-8 py-4 sm:py-6 border-b border-border">
            <p className="text-sm sm:text-body leading-relaxed">
              <strong className="block mb-3 sm:mb-4 text-base sm:text-title">Dear WFD Manager,</strong>
              As we implement our new compliance dashboard, we need your honest feedback about current data practices and challenges. This 5-minute survey will help us build tools that actually support your daily work.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Section 1: Current Reality */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 1: Your Current Reality
              </h2>
              
              <div className="space-y-8">
                <div>
                  <Label className="text-body font-medium mb-4 block">
                    1. How often do you currently track or review program data?
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
                    2. Where do you currently keep track of client information? <em>(Check all that apply)</em>
                  </Label>
                  <div className="space-y-3">
                    {[
                      { id: "paper", label: "Paper files/notebooks" },
                      { id: "excel-personal", label: "Excel spreadsheets I created" },
                      { id: "excel-shared", label: "Shared Excel files" },
                      { id: "memory", label: "Memory/mental notes" },
                      { id: "sticky", label: "Sticky notes/whiteboards" },
                      { id: "none", label: "No systematic tracking" }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                        <Checkbox id={item.id} name="tracking-methods" value={item.id} />
                        <Label htmlFor={item.id} className="flex-1 cursor-pointer">{item.label}</Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                      <Checkbox id="other" name="tracking-methods" value="other" />
                      <Label htmlFor="other" className="cursor-pointer">Other:</Label>
                      <Input className="ml-3 max-w-xs" placeholder="Please specify" name="tracking-other" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-body font-medium mb-4 block">
                    3. Rate your current confidence level (1-5 scale):
                  </Label>
                  
                  {[
                    "Interpreting program data",
                    "Meeting compliance requirements", 
                    "Using data to improve outcomes",
                    "Explaining our impact to others"
                  ].map((topic, index) => (
                    <div key={index} className="mb-6">
                      <p className="mb-3 text-body">{topic}</p>
                      <div className="flex gap-2 items-center">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex-1 text-center">
                            <input 
                              type="radio" 
                              id={`conf${index}-${num}`} 
                              name={`confidence-${index}`} 
                              value={num}
                              className="hidden"
                            />
                            <Label 
                              htmlFor={`conf${index}-${num}`}
                              className="block p-3 bg-muted/20 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium"
                            >
                              {num}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-caption text-muted-foreground">
                        <span>Not Confident</span>
                        <span>Very Confident</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Understanding Requirements */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 2: Understanding Requirements
              </h2>
              
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    4. Can you list your program's top 3 KPIs without looking them up?
                  </Label>
                  <Textarea 
                    className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base" 
                    placeholder="1.&#10;2.&#10;3."
                    name="top-kpis"
                  />
                </div>

                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    5. The 90-day shelter limit - how do you currently track it?
                  </Label>
                  <RadioGroup name="shelter-tracking" className="space-y-2 sm:space-y-3">
                    {[
                      { value: "system", label: "I have a system that alerts me before limits" },
                      { value: "periodic", label: "I check periodically but not systematically" },
                      { value: "client", label: "I rely on clients to tell me" },
                      { value: "aware", label: "I'm aware but don't actively track" },
                      { value: "unaware", label: "I wasn't fully aware of this requirement" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                        <RadioGroupItem value={item.value} id={`shelter${index + 1}`} />
                        <Label htmlFor={`shelter${index + 1}`} className="flex-1 cursor-pointer text-sm sm:text-base">{item.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    6. 5×5 Acuity Assessments - what's your current process?
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

            {/* Section 3: Barriers & Pain Points */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 3: Barriers & Pain Points
              </h2>
              
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    7. What stops you from using data more effectively? <em>(Check top 3)</em>
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
                    8. Describe your biggest data-related frustration in one sentence:
                  </Label>
                  <Input className="text-sm sm:text-base" placeholder="My biggest frustration is..." name="biggest-frustration" />
                </div>
              </div>
            </div>

            {/* Section 4: Looking Forward */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <h2 className="text-lg sm:text-xl lg:text-headline text-primary mb-4 sm:mb-6">
                Section 4: Looking Forward
              </h2>
              
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    9. If you had a magic dashboard, what would you see first each morning? <em>(Rank top 3)</em>
                  </Label>
                  <div className="bg-muted/20 p-4 sm:p-6 rounded-lg space-y-3">
                    {[
                      "Clients approaching 90-day limit",
                      "Overdue assessments",
                      "My performance vs. goals",
                      "Team comparison/rankings",
                      "Today's priority tasks",
                      "Success stories/wins",
                      "Available beds/resources"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 py-2">
                        <Input className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base" placeholder="#" name={`dashboard-rank-${index}`} />
                        <Label className="flex-1 text-sm sm:text-base">{item}</Label>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 py-2">
                      <Input className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base" placeholder="#" name="dashboard-rank-other-num" />
                      <Label className="text-sm sm:text-base">Other:</Label>
                      <Input className="flex-1 sm:max-w-xs text-sm sm:text-base" name="dashboard-rank-other" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    10. How could better data access change your work?
                  </Label>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      "Help me prevent problems before they happen",
                      "Show me where to focus my limited time",
                      "Make me more confident in decisions",
                      "Help me celebrate successes",
                      "Reduce my stress/uncertainty",
                      "Improve client outcomes"
                    ].map((change, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                        <Checkbox id={`change${index + 1}`} name="data-benefits" value={change} />
                        <Label htmlFor={`change${index + 1}`} className="flex-1 cursor-pointer text-sm sm:text-base">{change}</Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-3 p-3 sm:p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                      <Checkbox id="change-other" name="data-benefits" value="other" />
                      <Label htmlFor="change-other" className="cursor-pointer text-sm sm:text-base">Other:</Label>
                      <Input className="ml-3 flex-1 sm:max-w-xs text-sm sm:text-base" placeholder="Please specify" name="data-benefits-other" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    11. What's the best way to train you on a new system?
                  </Label>
                  <RadioGroup name="training-preference" className="space-y-2 sm:space-y-3">
                    {[
                      { value: "live-group", label: "Live group training session" },
                      { value: "live-one-on-one", label: "One-on-one coaching" },
                      { value: "videos", label: "Short video tutorials I can watch anytime" },
                      { value: "manual", label: "A detailed written manual" },
                      { value: "explore", label: "Let me explore on my own" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                        <RadioGroupItem value={item.value} id={`train${index + 1}`} />
                        <Label htmlFor={`train${index + 1}`} className="flex-1 cursor-pointer text-sm sm:text-base">{item.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm sm:text-body font-medium mb-3 sm:mb-4 block">
                    12. Any other ideas for making data useful for you?
                  </Label>
                  <Textarea 
                    className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base" 
                    placeholder="I wish we could..."
                    name="other-ideas"
                  />
                </div>
              </div>
            </div>

            {/* Baseline Metrics */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 border-b border-border">
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <p className="font-medium mb-3 sm:mb-4 text-sm sm:text-body">
                  Before you submit, please provide some baseline numbers. This is not a test! Your honest estimate helps us understand the starting point.
                </p>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <Label htmlFor="metric-caseload" className="flex-1 text-sm sm:text-base">Your current caseload:</Label>
                    <Input type="number" id="metric-caseload" name="metric-caseload" className="w-16 sm:w-20 text-center font-medium text-sm sm:text-base" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Label htmlFor="metric-housed" className="flex-1 text-sm sm:text-base">Clients housed this month:</Label>
                    <Input type="number" id="metric-housed" name="metric-housed" className="w-16 sm:w-20 text-center font-medium text-sm sm:text-base" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Label htmlFor="metric-90day" className="flex-1 text-sm sm:text-base">Clients near 90-day limit:</Label>
                    <Input type="number" id="metric-90day" name="metric-90day" className="w-16 sm:w-20 text-center font-medium text-sm sm:text-base" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Label htmlFor="metric-overdue" className="flex-1 text-sm sm:text-base">Overdue assessments:</Label>
                    <Input type="number" id="metric-overdue" name="metric-overdue" className="w-16 sm:w-20 text-center font-medium text-sm sm:text-base" />
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Contact */}
            <div className="px-4 sm:px-8 py-6 sm:py-8">
              <h3 className="text-base sm:text-title mb-3 sm:mb-4">Optional: Follow-up Contact</h3>
              <p className="text-sm sm:text-body text-muted-foreground mb-4 sm:mb-6">
                If you're willing to participate in a brief follow-up interview (15 minutes) to help us refine the dashboard design, please provide your contact information.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="contact-name" className="text-sm sm:text-body font-medium mb-2 block">Name (optional):</Label>
                  <Input id="contact-name" name="contact-name" placeholder="Your name" className="text-sm sm:text-base" />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-sm sm:text-body font-medium mb-2 block">Email (optional):</Label>
                  <Input type="email" id="contact-email" name="contact-email" placeholder="your.email@example.com" className="text-sm sm:text-base" />
                </div>
                <div>
                  <Label htmlFor="contact-phone" className="text-sm sm:text-body font-medium mb-2 block">Phone (optional):</Label>
                  <Input type="tel" id="contact-phone" name="contact-phone" placeholder="(555) 123-4567" className="text-sm sm:text-base" />
                </div>
                <div>
                  <Label htmlFor="contact-program" className="text-sm sm:text-body font-medium mb-2 block">Your program:</Label>
                  <Input id="contact-program" name="contact-program" placeholder="Program name" className="text-sm sm:text-base" />
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
                  Send Survey Response
                </Button>
                <p className="text-xs sm:text-caption text-muted-foreground mt-3">
                  This will open your email client with the completed survey
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