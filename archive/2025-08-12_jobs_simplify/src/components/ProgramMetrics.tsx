import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, AlertCircle, Info } from "lucide-react";
import { CalculationModal } from "./CalculationModal";

interface ProgramMetricsProps {
  program: {
    name: string;
    documentationRate: number;
    servicesDelivered: number;
    servicesDocumented: number;
    documentationGap: string;
  };
}

export const ProgramMetrics = ({ program }: ProgramMetricsProps) => {
  const [todayServices, setTodayServices] = useState(184);
  const [todayDocumented, setTodayDocumented] = useState(107);
  const [showCalculation, setShowCalculation] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayServices(prev => prev + Math.floor(Math.random() * 3));
      setTodayDocumented(prev => prev + Math.floor(Math.random() * 2));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const todayRate = Math.round((todayDocumented / todayServices) * 100);
  const todayFunding = todayDocumented * 87;
  const todayMissed = (todayServices - todayDocumented) * 87;

  return (
    <>
      <Card>
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardTitle className="text-2xl">
            PROGRAM SPOTLIGHT: {program.name.toUpperCase()}
          </CardTitle>
          <p className="text-muted-foreground">
            Documentation Journey: {program.documentationRate}% → 80% Target
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <span className="font-semibold text-success">Services Today</span>
                </div>
                <div className="text-2xl font-bold text-success">
                  {todayServices} delivered
                </div>
                <div className="text-lg text-success/80">
                  {todayDocumented} documented ({todayRate}%)
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">Funding Captured Today</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  ${todayFunding.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <span className="font-semibold text-destructive">Left on Table</span>
                </div>
                <div className="text-2xl font-bold text-destructive">
                  ${todayMissed.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 relative">
            <button
              onClick={() => setShowCalculation(true)}
              className="absolute top-2 right-2 p-1 hover:bg-warning/20 rounded"
            >
              <Info className="w-4 h-4 text-warning" />
            </button>
            <h3 className="font-semibold text-warning mb-2">THIS MONTH'S DISCOVERY:</h3>
            <p className="text-warning/90">
              "We found {(program.servicesDelivered - program.servicesDocumented).toLocaleString()} services 
              that weren't being logged. That's {program.documentationGap} in annual funding we were already earning!"
            </p>
          </div>
        </CardContent>
      </Card>

      <CalculationModal 
        open={showCalculation} 
        onOpenChange={setShowCalculation}
        program={program}
      />
    </>
  );
};