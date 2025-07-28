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
    console.log("Survey submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-enterprise">
        {/* Header */}
        <div className="bg-wfd-purple text-white px-xl py-xl text-center">
          <h1 className="text-h1-page font-poppins font-bold mb-micro">
            Building Better Together
          </h1>
          <p className="text-body-large opacity-90">
            Your Input Shapes Our Future
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-gray-100 px-xl py-lg border-b border-gray-300">
          <p className="text-body-base leading-relaxed">
            <strong className="block mb-sm">Dear WFD Manager,</strong>
            As we implement our new compliance dashboard, we need your honest feedback about current data practices and challenges. This 5-minute survey will help us build tools that actually support your daily work.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Current Reality */}
          <div className="px-xl py-xl border-b border-gray-300">
            <h2 className="text-h2-section font-poppins font-semibold text-wfd-purple mb-md">
              Section 1: Your Current Reality
            </h2>
            
            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                1. How often do you currently track or review program data?
              </Label>
              <RadioGroup className="space-y-sm">
                <div className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                  <RadioGroupItem value="multiple-daily" id="freq1" />
                  <Label htmlFor="freq1" className="flex-1 cursor-pointer">Multiple times daily</Label>
                </div>
                <div className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                  <RadioGroupItem value="once-daily" id="freq2" />
                  <Label htmlFor="freq2" className="flex-1 cursor-pointer">Once daily</Label>
                </div>
                <div className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                  <RadioGroupItem value="few-weekly" id="freq3" />
                  <Label htmlFor="freq3" className="flex-1 cursor-pointer">Few times per week</Label>
                </div>
                <div className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                  <RadioGroupItem value="weekly" id="freq4" />
                  <Label htmlFor="freq4" className="flex-1 cursor-pointer">Weekly</Label>
                </div>
                <div className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                  <RadioGroupItem value="less" id="freq5" />
                  <Label htmlFor="freq5" className="flex-1 cursor-pointer">Less than weekly</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                2. Where do you currently keep track of client information? <em>(Check all that apply)</em>
              </Label>
              <div className="space-y-sm">
                {[
                  { id: "paper", label: "Paper files/notebooks" },
                  { id: "excel-personal", label: "Excel spreadsheets I created" },
                  { id: "excel-shared", label: "Shared Excel files" },
                  { id: "memory", label: "Memory/mental notes" },
                  { id: "sticky", label: "Sticky notes/whiteboards" },
                  { id: "none", label: "No systematic tracking" }
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                    <Checkbox id={item.id} />
                    <Label htmlFor={item.id} className="flex-1 cursor-pointer">{item.label}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                  <Checkbox id="other" />
                  <Label htmlFor="other" className="cursor-pointer">Other:</Label>
                  <Input className="ml-sm w-48" placeholder="Please specify" />
                </div>
              </div>
            </div>

            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                3. Rate your current confidence level (1-5 scale):
              </Label>
              
              {[
                "Interpreting program data",
                "Meeting compliance requirements", 
                "Using data to improve outcomes",
                "Explaining our impact to others"
              ].map((topic, index) => (
                <div key={index} className="mb-md">
                  <p className="mb-xs text-body-base">{topic}</p>
                  <div className="flex gap-xs items-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="flex-1 text-center">
                        <input 
                          type="radio" 
                          id={`conf${index}-${num}`} 
                          name={`conf-${index}`} 
                          value={num}
                          className="hidden"
                        />
                        <Label 
                          htmlFor={`conf${index}-${num}`}
                          className="block p-sm bg-gray-100 rounded-lg cursor-pointer transition-all hover:bg-gray-300 font-medium"
                        >
                          {num}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-xs text-label text-gray-500">
                    <span>Not Confident</span>
                    <span>Very Confident</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Understanding Requirements */}
          <div className="px-xl py-xl border-b border-gray-300">
            <h2 className="text-h2-section font-poppins font-semibold text-wfd-purple mb-md">
              Section 2: Understanding Requirements
            </h2>
            
            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                4. Can you list your program's top 3 KPIs without looking them up?
              </Label>
              <Textarea 
                className="min-h-[80px]" 
                placeholder="1.&#10;2.&#10;3."
              />
            </div>

            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                5. The 90-day shelter limit - how do you currently track it?
              </Label>
              <RadioGroup className="space-y-sm">
                {[
                  { value: "system", label: "I have a system that alerts me before limits" },
                  { value: "periodic", label: "I check periodically but not systematically" },
                  { value: "client", label: "I rely on clients to tell me" },
                  { value: "aware", label: "I'm aware but don't actively track" },
                  { value: "unaware", label: "I wasn't fully aware of this requirement" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                    <RadioGroupItem value={item.value} id={`shelter${index + 1}`} />
                    <Label htmlFor={`shelter${index + 1}`} className="flex-1 cursor-pointer">{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                6. 5×5 Acuity Assessments - what's your current process?
              </Label>
              <RadioGroup className="space-y-sm">
                {[
                  { value: "scheduled", label: "I complete them on schedule with reminders" },
                  { value: "sometimes", label: "I do them but sometimes miss deadlines" },
                  { value: "unsure", label: "I'm unsure about timing requirements" },
                  { value: "training", label: "I need more training on these" },
                  { value: "unaware", label: "I wasn't aware these were required" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                    <RadioGroupItem value={item.value} id={`acuity${index + 1}`} />
                    <Label htmlFor={`acuity${index + 1}`} className="flex-1 cursor-pointer">{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Section 3: Barriers & Pain Points */}
          <div className="px-xl py-xl border-b border-gray-300">
            <h2 className="text-h2-section font-poppins font-semibold text-wfd-purple mb-md">
              Section 3: Barriers & Pain Points
            </h2>
            
            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                7. What stops you from using data more effectively? <em>(Check top 3)</em>
              </Label>
              <div className="space-y-sm">
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
                  <div key={index} className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                    <Checkbox id={`barrier${index + 1}`} />
                    <Label htmlFor={`barrier${index + 1}`} className="flex-1 cursor-pointer">{barrier}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                8. Describe your biggest data-related frustration in one sentence:
              </Label>
              <Input placeholder="My biggest frustration is..." />
            </div>
          </div>

          {/* Section 4: Looking Forward */}
          <div className="px-xl py-xl border-b border-gray-300">
            <h2 className="text-h2-section font-poppins font-semibold text-wfd-purple mb-md">
              Section 4: Looking Forward
            </h2>
            
            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                9. If you had a magic dashboard, what would you see first each morning? <em>(Rank top 3)</em>
              </Label>
              <div className="bg-gray-100 p-md rounded-lg space-y-xs">
                {[
                  "Clients approaching 90-day limit",
                  "Overdue assessments",
                  "My performance vs. goals",
                  "Team comparison/rankings",
                  "Today's priority tasks",
                  "Success stories/wins",
                  "Available beds/resources"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-sm py-xs">
                    <Input className="w-10 text-center font-medium" placeholder="#" />
                    <Label className="flex-1">{item}</Label>
                  </div>
                ))}
                <div className="flex items-center gap-sm py-xs">
                  <Input className="w-10 text-center font-medium" placeholder="#" />
                  <Label>Other:</Label>
                  <Input className="w-48" />
                </div>
              </div>
            </div>

            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                10. How could better data access change your work?
              </Label>
              <div className="space-y-sm">
                {[
                  "Help me prevent problems before they happen",
                  "Show me where to focus my limited time",
                  "Make me more confident in decisions",
                  "Help me celebrate successes",
                  "Reduce my stress/uncertainty",
                  "Improve client outcomes"
                ].map((change, index) => (
                  <div key={index} className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                    <Checkbox id={`change${index + 1}`} />
                    <Label htmlFor={`change${index + 1}`} className="flex-1 cursor-pointer">{change}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                  <Checkbox id="change-other" />
                  <Label htmlFor="change-other" className="cursor-pointer">Other:</Label>
                  <Input className="ml-sm w-48" placeholder="Please specify" />
                </div>
              </div>
            </div>

            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                11. What's the best way to train you on a new system?
              </Label>
              <RadioGroup className="space-y-sm">
                {[
                  { value: "live-group", label: "Live group training session" },
                  { value: "live-one-on-one", label: "One-on-one coaching" },
                  { value: "videos", label: "Short video tutorials I can watch anytime" },
                  { value: "manual", label: "A detailed written manual" },
                  { value: "explore", label: "Let me explore on my own" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-sm p-sm bg-gray-100 rounded-lg hover:bg-gray-300 transition-colors">
                    <RadioGroupItem value={item.value} id={`train${index + 1}`} />
                    <Label htmlFor={`train${index + 1}`} className="flex-1 cursor-pointer">{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="mb-lg">
              <Label className="text-body-base font-medium mb-sm block">
                12. Any other ideas for making data useful for you?
              </Label>
              <Textarea 
                className="min-h-[80px]" 
                placeholder="I wish we could..."
              />
            </div>
          </div>

          {/* Baseline Metrics */}
          <div className="px-xl py-xl border-b border-gray-300">
            <Card className="border-warning bg-warning-light p-md mb-md">
              <p className="font-medium mb-sm">
                Before you submit, please provide some baseline numbers. This is not a test! Your honest estimate helps us understand the starting point.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                <div className="flex items-center gap-xs">
                  <Label htmlFor="metric-caseload" className="flex-1">Your current caseload:</Label>
                  <Input type="number" id="metric-caseload" name="metric-caseload" className="w-20 text-center font-medium" />
                </div>
                <div className="flex items-center gap-xs">
                  <Label htmlFor="metric-hours" className="flex-1">Avg. hours/week on data entry:</Label>
                  <Input type="number" id="metric-hours" name="metric-hours" className="w-20 text-center font-medium" />
                </div>
              </div>
            </Card>
          </div>

          {/* Footer */}
          <div className="bg-wfd-purple text-white px-xl py-lg text-center">
            <h3 className="text-h3-card font-poppins mb-xs">Thank You!</h3>
            <p className="text-body-base">Your feedback is the first step to a better system.</p>
          </div>

          <div className="p-xl text-center">
            <Button 
              type="submit"
              className="bg-wfd-blue hover:bg-wfd-blue-dark text-white px-xl py-sm text-body-large font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-enterprise-hover"
            >
              Submit My Answers
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerSurvey;