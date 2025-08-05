import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, DollarSign, Target } from "lucide-react";

export const ExecutiveMetrics = () => {
  const metrics = [
    {
      title: "Assessment Phase",
      value: "ACTIVE",
      subtitle: "Baseline Survey",
      status: "active",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Survey Status",
      value: "In-Progress",
      subtitle: "Manager responses",
      status: "active",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Opportunity Scope",
      value: "$4.4M",
      subtitle: "identified value",
      status: "active",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "Next Milestone",
      value: "ANALYSIS",
      subtitle: "Data processing",
      status: "active",
      icon: <Target className="w-6 h-6" />
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Status Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {metrics.map((metric, idx) => (
            <div key={idx} className="text-center p-3 md:p-4 bg-wfd-blue/10 border border-wfd-blue/20 rounded-lg">
              <div className="flex justify-center mb-2 text-wfd-blue">
                {metric.icon}
              </div>
              <div className="text-lg md:text-2xl font-bold text-wfd-blue">{metric.value}</div>
              <div className="text-sm text-wfd-blue/80">{metric.subtitle}</div>
              <div className="text-xs text-muted-foreground mt-1">{metric.title}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};