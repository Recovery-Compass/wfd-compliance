import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Home, Clock, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { executiveMetrics, formatTrendChange } from "@/data/executiveMetrics";

interface KPICardProps {
  title: string;
  currentValue: string | number;
  previousValue: string | number;
  subtitle: string;
  icon: React.ReactNode;
  unit?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, currentValue, previousValue, subtitle, icon, unit = "" }) => {
  const numCurrent = typeof currentValue === 'string' ? parseFloat(currentValue.replace(/[^\d.-]/g, '')) : currentValue;
  const numPrevious = typeof previousValue === 'string' ? parseFloat(previousValue.replace(/[^\d.-]/g, '')) : previousValue;
  const trendData = formatTrendChange(numCurrent, numPrevious);

  return (
    <Card className="bg-card border-line">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-ink-secondary">
            {icon}
          </div>
          <div className="flex items-center gap-1">
            {trendData.isPositive ? (
              <TrendingUp className="w-3 h-3 text-green-600" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-600" />
            )}
            <span className={`text-xs font-medium ${trendData.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trendData.formatted}
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold tabular-nums text-ink-primary">{currentValue}{unit}</div>
          <div className="text-sm text-ink-secondary">{subtitle}</div>
          <div className="text-xs text-ink-tertiary">
            {title} • Previous: {previousValue}{unit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const KPIRow: React.FC = () => {
  const { kpis, juneKpis } = executiveMetrics;

  const kpiData = [
    {
      title: "All Programs",
      currentValue: kpis.activeClients.toLocaleString(),
      previousValue: juneKpis.activeClients.toLocaleString(),
      subtitle: "Active Clients",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Housing Outcomes",
      currentValue: kpis.housingSuccessRate,
      previousValue: juneKpis.housingSuccessRate,
      subtitle: "Success Rate",
      icon: <Home className="w-5 h-5" />,
      unit: "%"
    },
    {
      title: "Engagement Quality",
      currentValue: kpis.avgEngagementDays,
      previousValue: juneKpis.avgEngagementDays,
      subtitle: "Avg Days",
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: "Clinical Services",
      currentValue: kpis.clinicalContacts.toLocaleString(),
      previousValue: juneKpis.clinicalContacts.toLocaleString(),
      subtitle: "Contacts",
      icon: <Activity className="w-5 h-5" />
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};