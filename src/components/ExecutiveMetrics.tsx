import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, DollarSign, Target } from "lucide-react";

export const ExecutiveMetrics = () => {
  const metrics = [
    {
      title: "Funding Secured",
      value: "$11M",
      subtitle: "protected",
      status: "success",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Documentation Rate",
      value: "77%",
      subtitle: "↑12% this month",
      status: "success",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Monthly Recovery",
      value: "$367,000",
      subtitle: "annualized impact",
      status: "success",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "90-Day Target",
      value: "ON TRACK",
      subtitle: "95% by Oct 15",
      status: "success",
      icon: <Target className="w-6 h-6" />
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Board Report Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <div key={idx} className="text-center p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex justify-center mb-2 text-success">
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-success">{metric.value}</div>
              <div className="text-sm text-success/80">{metric.subtitle}</div>
              <div className="text-xs text-muted-foreground mt-1">{metric.title}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};