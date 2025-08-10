import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Smartphone, Calendar, TrendingUp } from "lucide-react";

interface QuickWinTutorialsProps {
  program: {
    name: string;
    documentationRate: number;
    quickWin: string;
  };
}

export const QuickWinTutorials = ({ program }: QuickWinTutorialsProps) => {
  const resources = [
    {
      title: "5-Minute Video: 'The $87 Service Log'",
      description: "Why each entry matters ($202K at stake!)",
      icon: <Play className="w-5 h-5" />,
      action: "Watch Now"
    },
    {
      title: "Mobile App Setup (2 minutes)",
      description: "Download WFD Logger and start logging immediately",
      icon: <Smartphone className="w-5 h-5" />,
      action: "Get App Link"
    },
    {
      title: "Schedule Group Training",
      description: "Documentation Champions Workshop",
      icon: <Calendar className="w-5 h-5" />,
      action: "Book Your Spot"
    },
    {
      title: "Your Progress Tracker",
      description: `Current: ${program.documentationRate}% → Target: 80%`,
      icon: <TrendingUp className="w-5 h-5" />,
      action: "Start Logging Now"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation Training Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
          <h4 className="font-semibold text-warning mb-1">Quick Win Priority:</h4>
          <p className="text-sm text-warning/90">{program.quickWin}</p>
        </div>

        <div className="space-y-3">
          {resources.map((resource, idx) => (
            <div key={idx} className="border rounded-lg p-3">
              <div className="flex items-start gap-3">
                <div className="text-primary mt-1">{resource.icon}</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-sm">{resource.title}</h5>
                  <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                  <Button size="sm" variant="outline" className="text-xs">
                    {resource.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
          <p className="text-sm text-success">
            Log 10 more services daily = $31,755/year additional funding
          </p>
        </div>
      </CardContent>
    </Card>
  );
};