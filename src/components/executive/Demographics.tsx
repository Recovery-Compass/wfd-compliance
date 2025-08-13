import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Calendar, Globe } from "lucide-react";
import { executiveMetrics } from "@/data/executiveMetrics";

interface DemographicChartProps {
  title: string;
  data: Record<string, number>;
  icon: React.ReactNode;
  unit?: string;
}

const DemographicChart: React.FC<DemographicChartProps> = ({ title, data, icon, unit = "%" }) => {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  const maxValue = Math.max(...Object.values(data));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-ink-secondary">{icon}</div>
        <h3 className="font-medium text-ink-primary">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => {
          const percentage = (value / total) * 100;
          const width = (value / maxValue) * 100;
          
          return (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-secondary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="tabular-nums font-medium text-ink-primary">
                  {percentage.toFixed(1)}{unit}
                </span>
              </div>
              <div className="w-full bg-ink-quaternary rounded-full h-2">
                <div 
                  className="bg-ink-primary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Demographics: React.FC = () => {
  const { demographics } = executiveMetrics;

  return (
    <Card className="bg-card border-line">
      <CardHeader>
        <CardTitle className="text-ink-primary">Client Demographics</CardTitle>
        <p className="text-sm text-ink-secondary">
          Current client population characteristics across all programs
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DemographicChart
            title="Gender Distribution"
            data={demographics.gender}
            icon={<Users className="w-4 h-4" />}
          />
          
          <DemographicChart
            title="Age Groups"
            data={demographics.age}
            icon={<Calendar className="w-4 h-4" />}
          />
          
          <DemographicChart
            title="Racial/Ethnic Identity"
            data={demographics.race}
            icon={<Globe className="w-4 h-4" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};