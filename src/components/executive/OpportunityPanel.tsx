import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, AlertTriangle, Target, TrendingUp } from "lucide-react";
import { executiveMetrics } from "@/data/executiveMetrics";

export const OpportunityPanel: React.FC = () => {
  const { opportunityValue } = executiveMetrics;

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-900">
          <DollarSign className="w-6 h-6" />
          Data Governance Value Achievement
        </CardTitle>
        <p className="text-sm text-orange-800 font-medium">
          Quantifying Your Team's Unseen Impact
        </p>
        <p className="text-xs text-orange-700 mt-1">
          Annual revenue potential hidden by system barriers
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Problem Statement */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="font-medium text-orange-900">The Challenge</h3>
          </div>
          <p className="text-sm text-orange-800 leading-relaxed">
            {opportunityValue.narrative.problem}
          </p>
        </div>

        {/* Value Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600" />
            <h3 className="font-medium text-orange-900">Revenue Breakdown</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(opportunityValue.breakdown).map(([key, value]) => (
              <div key={key} className="bg-white/60 p-3 rounded-lg border border-orange-200">
                <div className="text-lg font-bold text-orange-900 tabular-nums">
                  {typeof value === 'string' && value.includes('%') ? value : `✓ ${value}`}
                </div>
                <div className="text-xs text-orange-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Path */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-green-900">The Solution</h3>
          </div>
          <p className="text-sm text-green-800 leading-relaxed bg-green-50 p-3 rounded-lg border border-green-200">
            {opportunityValue.narrative.solution}
          </p>
        </div>

        {/* Impact Summary */}
        <div className="bg-white/80 p-4 rounded-lg border border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-900 tabular-nums">
              {opportunityValue.total}
            </div>
            <div className="text-sm text-orange-700">
              Data governance achievement
            </div>
            <div className="text-xs text-orange-600 mt-1">
              Immediate action required to capture value
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};