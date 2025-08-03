import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { enhancedPrograms } from "@/data/enhanced-programs";

export const ScenarioBuilder = () => {
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [currentRate, setCurrentRate] = useState([65]);
  const [targetRate, setTargetRate] = useState([85]);
  const [dailyServices, setDailyServices] = useState(100);
  const [timeline, setTimeline] = useState("60");

  const calculateResults = () => {
    const rateImprovement = targetRate[0] - currentRate[0];
    const additionalServices = Math.floor((dailyServices * rateImprovement) / 100);
    const annualFunding = additionalServices * 365 * 87;
    const roiDays = Math.floor(365 / (targetRate[0] / 10));
    const staffTime = Math.floor(additionalServices / 10);
    const breakEven = Math.floor(parseInt(timeline) / 2);

    return {
      additionalFunding: annualFunding,
      roiDays,
      staffTime,
      breakEven
    };
  };

  const results = calculateResults();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Build Your Funding Recovery Scenario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Select Your Program</Label>
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a program" />
                </SelectTrigger>
                <SelectContent>
                  {enhancedPrograms.map((program) => (
                    <SelectItem key={program.name} value={program.name}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Current Documentation Rate: {currentRate[0]}%</Label>
              <Slider
                value={currentRate}
                onValueChange={setCurrentRate}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Target Documentation Rate: {targetRate[0]}%</Label>
              <Slider
                value={targetRate}
                onValueChange={setTargetRate}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Average Daily Services</Label>
              <Input
                type="number"
                value={dailyServices}
                onChange={(e) => setDailyServices(parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Implementation Timeline</Label>
              <Select value={timeline} onValueChange={setTimeline}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Your Custom Results</h3>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <div className="text-2xl font-bold text-success">
                  ${results.additionalFunding.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Additional Annual Funding</div>
              </div>
              
              <div className="border-b pb-2">
                <div className="text-xl font-bold">{results.roiDays} days</div>
                <div className="text-sm text-muted-foreground">ROI Timeline</div>
              </div>
              
              <div className="border-b pb-2">
                <div className="text-xl font-bold">{results.staffTime} min/day</div>
                <div className="text-sm text-muted-foreground">Staff Time Investment</div>
              </div>
              
              <div>
                <div className="text-xl font-bold">{results.breakEven} weeks</div>
                <div className="text-sm text-muted-foreground">Break-even Point</div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button className="flex-1" size="sm">Save Scenario</Button>
              <Button variant="outline" className="flex-1" size="sm">Share</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};