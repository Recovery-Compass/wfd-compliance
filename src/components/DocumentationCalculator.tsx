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
      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Documentation Impact Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <label className="text-lg font-medium text-gray-700">
              If each program documents just <span className="text-2xl font-bold text-purple-600">{servicesPerDay[0]}</span> more services per day...
            </label>
            <Slider
              value={servicesPerDay}
              onValueChange={setServicesPerDay}
              min={5}
              max={50}
              step={5}
              className="mt-4"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>5 services</span>
              <span>50 services</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">Daily Value</span>
                </div>
                <div className="text-3xl font-bold text-green-800">
                  ${dailyValue.toLocaleString()}
                </div>
                <div className="text-sm text-green-600 mt-1">
                  Per program per day
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-purple-700 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">Annual Impact</span>
                </div>
                <div className="text-3xl font-bold text-purple-800">
                  ${annualValue.toLocaleString()}
                </div>
                <div className="text-sm text-purple-600 mt-1">
                  Per program annually
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Time Investment</span>
                </div>
                <div className="text-3xl font-bold text-blue-800">
                  {Math.round(timeInvestmentMinutes)}
                </div>
                <div className="text-sm text-blue-600 mt-1">
                  Minutes per day
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-center text-amber-800 font-medium">
              With 6 programs documenting {servicesPerDay[0]} additional services daily:
            </p>
            <p className="text-center text-2xl font-bold text-amber-900 mt-2">
              ${(annualValue * 6).toLocaleString()} in annual funding captured
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};