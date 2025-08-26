import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { executiveMetrics, formatTrendChange } from "@/data/executiveMetrics";

interface TrendItemProps {
  label: string;
  juneValue: number;
  julyValue: number;
  unit?: string;
}

const TrendItem: React.FC<TrendItemProps> = ({ label, juneValue, julyValue, unit = "" }) => {
  const trend = formatTrendChange(julyValue, juneValue);
  const maxValue = Math.max(juneValue, julyValue);
  const juneWidth = (juneValue / maxValue) * 100;
  const julyWidth = (julyValue / maxValue) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink-primary">{label}</span>
        <div className="flex items-center gap-2">
          {trend.isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.formatted}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-ink-tertiary">
          <span className="w-16">June</span>
          <div className="flex-1 bg-ink-quaternary rounded-full h-2">
            <div 
              className="bg-ink-tertiary rounded-full h-2 transition-all duration-300"
              style={{ width: `${juneWidth}%` }}
            />
          </div>
          <span className="w-20 text-right tabular-nums">{juneValue.toLocaleString()}{unit}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <span className="w-16 text-ink-secondary">July</span>
          <div className="flex-1 bg-ink-quaternary rounded-full h-2">
            <div 
              className={`rounded-full h-2 transition-all duration-300 ${
                trend.isPositive ? 'bg-green-600' : 'bg-red-600'
              }`}
              style={{ width: `${julyWidth}%` }}
            />
          </div>
          <span className="w-20 text-right tabular-nums text-ink-primary font-medium">
            {julyValue.toLocaleString()}{unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export const TrendsComparison: React.FC = () => {
  const { trends } = executiveMetrics;

  const trendData = [
    {
      label: "Meals Served",
      juneValue: trends.june.mealsServed,
      julyValue: trends.july.mealsServed
    },
    {
      label: "Wellness Checks",
      juneValue: trends.june.wellnessChecks,
      julyValue: trends.july.wellnessChecks
    },
    {
      label: "Laundry Services",
      juneValue: trends.june.laundryServices,
      julyValue: trends.july.laundryServices
    },
    {
      label: "People Housed",
      juneValue: trends.june.peopleHoused,
      julyValue: trends.july.peopleHoused
    },
    {
      label: "Successful Exits",
      juneValue: trends.june.successfulExits,
      julyValue: trends.july.successfulExits
    }
  ];

  return (
    <Card className="bg-card border-line">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-ink-primary">
          <ArrowRight className="w-5 h-5" />
          Service Delivery Excellence
        </CardTitle>
        <p className="text-sm text-ink-secondary">
          Your Team's Measurable Impact in Action — Highlighting 1,880 meals served (+14.6% increase)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {trendData.map((trend, index) => (
          <TrendItem key={index} {...trend} />
        ))}
      </CardContent>
    </Card>
  );
};