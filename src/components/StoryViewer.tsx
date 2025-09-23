import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Share2, Download } from "lucide-react";

interface ClientStory {
  day: string;
  title: string;
  content: string;
  services: number;
  documented: number;
  value: string;
}

interface ExecutiveStory {
  day: string;
  title: string;
  content: string;
  visual: string;
  impact: string;
}

interface StaffStory {
  day: string;
  title: string;
  content: string;
  impact: string;
}

interface FunderStory {
  day: string;
  title: string;
  content: string;
  impact: string;
}

interface StoryViewerProps {
  perspective: "client" | "executive" | "staff" | "funder";
}

export const StoryViewer = ({ perspective }: StoryViewerProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const stories = {
    client: [
      {
        day: "Day 1",
        title: "I arrived at Ted's Place with nothing...",
        content: "Scared, alone, carrying everything I owned in a torn backpack.",
        services: 0,
        documented: 0,
        value: "$0"
      },
      {
        day: "Day 30",
        title: "Case management, meals, a safe bed...",
        content: "For the first time in years, I felt human again. Three meals a day, weekly case management, mental health support.",
        services: 90,
        documented: 52,
        value: "$4,524 documented (missing $3,306)"
      },
      {
        day: "Day 82",
        title: "Housed and employed!",
        content: "I have my own apartment and a job. 246 services received, but only 143 were counted.",
        services: 246,
        documented: 143,
        value: "$12,441 documented (missing $8,961)"
      }
    ] as ClientStory[],
    executive: [
      {
        day: "July 15, 2025",
        title: "Compliance Audit Results - 65%",
        content: "Subject line that changed everything. I thought we were failing our clients...",
        visual: "📧",
        impact: "Potential loss of $11M funding"
      },
      {
        day: "July 25, 2025",
        title: "Wait, we're serving 5,000 but only documenting 552?",
        content: "The forensic audit revealed we were delivering 10x more services than we were counting.",
        visual: "📊",
        impact: "Hidden value discovered"
      },
      {
        day: "August 5, 2025",
        title: "We discovered our data architecture was fundamentally flawed!",
        content: "Not a service problem - a data problem. We fixed it before it destroyed our grant applications.",
        visual: "🛡️",
        impact: "Prevented funding disasters, protected credibility"
      }
    ] as ExecutiveStory[],
    staff: [
      {
        day: "Before Discovery",
        title: "\"We're too busy to document everything\"",
        content: "I was focused on helping clients. Paperwork felt like it took away from real work.",
        impact: "Services delivered but uncounted"
      },
      {
        day: "During Training",
        title: "\"Each service is worth $87?\"",
        content: "Learning that every meal, every case management session, every bed night had real funding value.",
        impact: "Understanding the financial impact"
      },
      {
        day: "After Implementation",
        title: "\"10 seconds to log = $87 captured\"",
        content: "The mobile app made it so easy. Quick tap, service logged, funding secured.",
        impact: "Sustainable documentation habits"
      }
    ] as StaffStory[],
    funder: [
      {
        day: "Q2 2025",
        title: "Compliance Concerns",
        content: "WFD was at 65% compliance. We were considering funding reduction.",
        impact: "$11M at risk"
      },
      {
        day: "July 2025",
        title: "The Discovery",
        content: "They weren't failing - they were serving 5x more than they were counting.",
        impact: "Paradigm shift"
      },
      {
        day: "Q4 2025",
        title: "Model Program",
        content: "WFD became our case study for documentation excellence. 95% compliance achieved.",
        impact: "Replication across network"
      }
    ] as FunderStory[]
  };

  const currentStory = stories[perspective];
  const story = currentStory[currentStep];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {currentStory.length}
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{story.day}</h2>
            <h3 className="text-xl text-primary">{story.title}</h3>
            <p className="text-lg text-muted-foreground">{story.content}</p>
            
            {perspective === "client" && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{(story as ClientStory).services}</div>
                    <div className="text-sm text-muted-foreground">Services Received</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">{(story as ClientStory).documented}</div>
                    <div className="text-sm text-muted-foreground">Documented</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{(story as ClientStory).value}</div>
                    <div className="text-sm text-muted-foreground">Value</div>
                  </div>
                </div>
              </div>
            )}

            {perspective !== "client" && (story as any).impact && (
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="font-semibold text-primary">Impact: {(story as any).impact}</div>
              </div>
            )}

            {perspective === "executive" && (story as ExecutiveStory).visual && (
              <div className="text-center text-6xl py-4">
                {(story as ExecutiveStory).visual}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(currentStory.length - 1, currentStep + 1))}
            disabled={currentStep === currentStory.length - 1}
          >
            Next Story
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};