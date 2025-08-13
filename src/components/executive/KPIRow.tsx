import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Home, Clock, Activity } from "lucide-react";
import { executiveMetrics } from "@/data/executiveMetrics";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, icon, trend }) => (
  <Card className="bg-card border-line">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-ink-secondary">
          {icon}
        </div>
        {trend && (
          <span className="text-xs text-ink-tertiary">{trend}</span>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold tabular-nums text-ink-primary">{value}</div>
        <div className="text-sm text-ink-secondary">{subtitle}</div>
        <div className="text-xs text-ink-tertiary">{title}</div>
      </div>
    </CardContent>
  </Card>
);

export const KPIRow: React.FC = () => {
  const { kpis } = executiveMetrics;

  const kpiData = [
    {
      title: "All Programs",
      value: kpis.activeClients.toLocaleString(),
      subtitle: "Active Clients",
      icon: <Users className="w-5 h-5" />,
      trend: "Current"
    },
    {
      title: "Housing Outcomes",
      value: `${kpis.housingSuccessRate}%`,
      subtitle: "Success Rate",
      icon: <Home className="w-5 h-5" />,
      trend: "YTD"
    },
    {
      title: "Engagement Quality",
      value: kpis.avgEngagementDays.toLocaleString(),
      subtitle: "Avg Days",
      icon: <Clock className="w-5 h-5" />,
      trend: "Current"
    },
    {
      title: "Clinical Services",
      value: kpis.clinicalContacts.toLocaleString(),
      subtitle: "Contacts",
      icon: <Activity className="w-5 h-5" />,
      trend: "Monthly"
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