import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator, Clock, DollarSign } from "lucide-react";

export const DocumentationCalculator = () => {
  const [servicesPerDay, setServicesPerDay] = useState([10]);
  const serviceValue = 87;
  const secondsPerService = 10;
  
  const dailyValue = servicesPerDay[0] * serviceValue;
  const annualValue = dailyValue * 365;
  const timeInvestmentMinutes = (servicesPerDay[0] * secondsPerService) / 60;
  
  return (
    <Card className="mb-8 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-wfd-purple to-wfd-blue text-white">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Documentation Impact Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <label className="text-lg font-medium text-foreground">
              If each program documents just <span className="text-2xl font-bold text-wfd-purple">{servicesPerDay[0]}</span> more services per day...
            </label>
            <Slider
              value={servicesPerDay}
              onValueChange={setServicesPerDay}
              min={5}
              max={50}
              step={5}
              className="mt-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>5 services</span>
              <span>50 services</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-success-light border-success">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">Daily Value</span>
                </div>
                <div className="text-3xl font-bold text-success">
                  ${dailyValue.toLocaleString()}
                </div>
                <div className="text-sm text-success/80 mt-1">
                  Per program per day
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-wfd-purple/10 border-wfd-purple">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-wfd-purple mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">Annual Impact</span>
                </div>
                <div className="text-3xl font-bold text-wfd-purple">
                  ${annualValue.toLocaleString()}
                </div>
                <div className="text-sm text-wfd-purple/80 mt-1">
                  Per program annually
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-wfd-blue/10 border-wfd-blue">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-wfd-blue mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Time Investment</span>
                </div>
                <div className="text-3xl font-bold text-wfd-blue">
                  {Math.round(timeInvestmentMinutes)}
                </div>
                <div className="text-sm text-wfd-blue/80 mt-1">
                  Minutes per day
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="p-4 bg-wfd-gold/10 rounded-lg border border-wfd-gold">
            <p className="text-center text-wfd-gold font-medium">
              With 6 programs documenting {servicesPerDay[0]} additional services daily:
            </p>
            <p className="text-center text-2xl font-bold text-wfd-gold mt-2">
              ${(annualValue * 6).toLocaleString()} in annual funding captured
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};