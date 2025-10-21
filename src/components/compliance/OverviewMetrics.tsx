import React from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Home, Clock, TrendingUp, Activity } from 'lucide-react';

export function OverviewMetrics() {
  const overviewMetrics = useComplianceStore(state => state.overviewMetrics);
  
  if (!overviewMetrics) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Upload a data file to view metrics
      </div>
    );
  }
  
  const metrics = [
    {
      title: 'Total Clients Served',
      value: overviewMetrics.totalClients,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Active Enrollments',
      value: overviewMetrics.activeEnrollments,
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Housing Placements',
      value: overviewMetrics.housingPlacements,
      icon: Home,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Average Length of Stay',
      value: overviewMetrics.avgLengthOfStay !== null
        ? `${Math.round(overviewMetrics.avgLengthOfStay)} days`
        : 'N/A',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Housing Placement Rate',
      value: `${overviewMetrics.placementRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
