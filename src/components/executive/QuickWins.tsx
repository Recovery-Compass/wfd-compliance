import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Plus, TrendingUp } from "lucide-react";
import { executiveMetrics } from "@/data/executiveMetrics";

interface QuickWinItemProps {
  category: string;
  june: number;
  july: number;
  impact: string;
}

const QuickWinItem: React.FC<QuickWinItemProps> = ({ category, june, july, impact }) => {
  const isNew = june === 0 && july > 0;
  const change = july - june;

  return (
    <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex-shrink-0 mt-0.5">
        {isNew ? (
          <Plus className="w-5 h-5 text-green-600" />
        ) : (
          <TrendingUp className="w-5 h-5 text-green-600" />
        )}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-ink-primary">{category}</h4>
          {isNew && (
            <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
              New
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <span className="text-ink-tertiary">
            June: <span className="tabular-nums">{june}</span>
          </span>
          <span className="text-ink-secondary">
            July: <span className="tabular-nums font-medium">{july}</span>
          </span>
          <span className="text-green-600 font-medium">
            {change > 0 && '+'}{change}
          </span>
        </div>
        
        <p className="text-sm text-ink-secondary">{impact}</p>
      </div>
    </div>
  );
};

export const QuickWins: React.FC = () => {
  const { quickWins } = executiveMetrics;

  return (
    <Card className="bg-card border-line">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-ink-primary">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Quick Wins: New Service Categories
        </CardTitle>
        <p className="text-sm text-ink-secondary">
          New services launched in July 2025 demonstrating staff innovation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickWins.map((win, index) => (
          <QuickWinItem key={index} {...win} />
        ))}
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Innovation Impact</span>
          </div>
          <p className="text-sm text-blue-800">
            Staff identified service gaps and independently launched 4 new service categories, 
            demonstrating exceptional initiative despite documentation system limitations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};