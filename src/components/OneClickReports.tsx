import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Building, Users } from "lucide-react";

export const OneClickReports = () => {
  const reports = [
    {
      title: "Board Packet",
      icon: <FileText className="w-5 h-5" />,
      description: "Executive summary with key metrics"
    },
    {
      title: "County Compliance Report",
      icon: <Building className="w-5 h-5" />,
      description: "Official documentation status"
    },
    {
      title: "Gates Foundation Update", 
      icon: <Mail className="w-5 h-5" />,
      description: "Grant progress report"
    },
    {
      title: "All-Staff Victory Email",
      icon: <Users className="w-5 h-5" />,
      description: "Celebrate documentation wins"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>One-Click Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reports.map((report, idx) => (
            <Button 
              key={idx} 
              variant="outline" 
              className="w-full justify-start h-auto p-3 md:p-4 touch-manipulation"
            >
              <div className="flex items-start gap-3">
                <div className="text-primary mt-1">{report.icon}</div>
                <div className="text-left">
                  <div className="font-semibold">{report.title}</div>
                  <div className="text-xs text-muted-foreground">{report.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};