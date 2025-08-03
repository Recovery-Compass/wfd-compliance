import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, Trophy } from "lucide-react";

export const ValueMetrics = () => {
  const metrics = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Overall Documentation Rate",
      current: "77%",
      target: "90%",
      trend: "+12% this month",
      status: "STRONG",
      statusColor: "text-green-600 bg-green-50",
      detail: "$3.4M properly documented | $1.0M opportunity remaining",
      color: "border-green-500"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Service Capture Velocity",
      current: "2,847",
      target: "4,000",
      unit: "services/week",
      detail: "Every service logged = $87 in funding secured",
      trend: "↗️ Accelerating",
      color: "border-blue-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Hidden Value Discovered",
      current: "$4.4M",
      breakdown: {
        week: "$127,000",
        month: "$510,000",
        annual: "$4.4M Projected"
      },
      color: "border-purple-500"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Documentation Champions",
      champions: ["A2C (92%)", "Pathway Homes (90%)"],
      rising: "Hondo Center (77% ↗️)",
      nextUp: "Ted's Place (targeting 80%)",
      color: "border-amber-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, idx) => (
        <Card key={idx} className={`border-t-4 ${metric.color} hover:shadow-lg transition-shadow`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-lg ${metric.color.replace('border', 'bg').replace('500', '100')}`}>
                {metric.icon}
              </div>
              {metric.status && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${metric.statusColor}`}>
                  {metric.status}
                </span>
              )}
            </div>
            
            <h3 className="font-semibold text-gray-700 mb-3">{metric.title}</h3>
            
            {metric.breakdown ? (
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">{metric.current}</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week:</span>
                    <span className="font-semibold">{metric.breakdown.week}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month:</span>
                    <span className="font-semibold">{metric.breakdown.month}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual:</span>
                    <span className="font-bold text-purple-600">{metric.breakdown.annual}</span>
                  </div>
                </div>
              </div>
            ) : metric.champions ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  {metric.champions.map((champ, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-2xl">🏆</span>
                      <span className="font-semibold text-sm">{champ}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-gray-600">Rising Star:</div>
                  <div className="font-semibold text-amber-600">{metric.rising}</div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{metric.current}</span>
                  {metric.unit && <span className="text-sm text-gray-600">{metric.unit}</span>}
                </div>
                {metric.target && (
                  <div className="text-sm text-gray-600 mb-2">
                    Target: <span className="font-semibold">{metric.target}</span>
                  </div>
                )}
                {metric.trend && (
                  <div className="text-sm font-medium text-green-600">{metric.trend}</div>
                )}
              </>
            )}
            
            {metric.detail && (
              <div className="mt-4 pt-4 border-t text-xs text-gray-600">
                {metric.detail}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};