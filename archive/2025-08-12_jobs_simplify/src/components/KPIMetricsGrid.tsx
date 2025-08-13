import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, Users, FileText, Calendar, CheckCircle } from "lucide-react";

interface KPIMetric {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: '%' | 'days' | 'count';
  trend: 'up' | 'down' | 'stable';
  icon: 'users' | 'files' | 'calendar' | 'check';
  description: string;
}

interface KPIMetricsGridProps {
  metrics: KPIMetric[];
  className?: string;
}

export const KPIMetricsGrid = ({ metrics, className = "" }: KPIMetricsGridProps) => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'users': return Users;
      case 'files': return FileText;
      case 'calendar': return Calendar;
      case 'check': return CheckCircle;
      default: return Users;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-wfd-blue';
      case 'down': return 'text-wfd-purple';
      default: return 'text-wfd-gold';
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage < 70) return 'bg-wfd-purple';
    if (percentage < 90) return 'bg-wfd-gold';
    return 'bg-wfd-blue';
  };

  const getProgressValue = (current: number, target: number, unit: string) => {
    if (unit === '%') return current;
    return (current / target) * 100;
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg ${className}`}>
      {metrics.map((metric) => {
        const IconComponent = getIcon(metric.icon);
        const TrendComponent = getTrendIcon(metric.trend);
        const progressValue = getProgressValue(metric.current, metric.target, metric.unit);
        const progressColorClass = getProgressColor(metric.current, metric.target);

        return (
          <Card key={metric.id} className="card-enterprise">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-xs">
              <CardTitle className="text-label text-muted-foreground">
                {metric.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-wfd-purple" />
            </CardHeader>
            
            <CardContent className="space-y-sm">
              {/* Current Value */}
              <div className="flex items-baseline space-x-micro">
                <div className="text-data-large text-primary">
                  {metric.current}
                </div>
                <div className="text-body-base text-muted-foreground">
                  {metric.unit}
                </div>
                <div className="text-body-base text-muted-foreground">
                  / {metric.target}{metric.unit}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-micro">
                <Progress 
                  value={progressValue} 
                  className="h-2"
                />
                <div className="flex justify-between text-label text-muted-foreground">
                  <span>Current</span>
                  <span>Target: {metric.target}{metric.unit}</span>
                </div>
              </div>

              {/* Trend and Description */}
              <div className="flex items-center justify-between">
                <p className="text-body-base text-muted-foreground">
                  {metric.description}
                </p>
                <div className={`flex items-center space-x-micro ${getTrendColor(metric.trend)}`}>
                  <TrendComponent className="h-3 w-3" />
                  <span className="text-label font-medium">
                    {metric.trend === 'up' ? 'Improving' : 
                     metric.trend === 'down' ? 'Declining' : 'Stable'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};