import { Card } from "@/components/ui/card";
import { Sun, Home, Mountain } from "lucide-react";

interface ComplianceGaugeProps {
  currentCompliance: number;
  targetCompliance: number;
  className?: string;
}

export const ComplianceGauge = ({ currentCompliance, targetCompliance, className = "" }: ComplianceGaugeProps) => {
  const getComplianceColor = (compliance: number) => {
    if (compliance < 70) return "text-wfd-purple";
    if (compliance < 90) return "text-wfd-gold";
    return "text-wfd-blue";
  };

  const getComplianceGradient = (compliance: number) => {
    if (compliance < 70) return "from-wfd-purple to-wfd-purple-light";
    if (compliance < 90) return "from-wfd-purple via-wfd-gold to-wfd-gold-light";
    return "from-wfd-purple via-wfd-gold to-wfd-blue";
  };

  const progressPercentage = (currentCompliance / 100) * 180; // 180 degrees for semicircle

  return (
    <Card className={`p-8 bg-gradient-to-br from-wfd-gold/5 to-wfd-blue/5 border-wfd-purple/20 ${className}`}>
      <div className="text-center space-y-6">
        {/* Logo Area */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sun className="h-8 w-8 text-wfd-gold sun-rays" />
          <Home className="h-6 w-6 text-wfd-purple" />
          <Mountain className="h-6 w-6 text-wfd-blue" />
        </div>

        {/* Sunrise Arc Gauge */}
        <div className="relative">
          <div className="sunrise-arc">
            {/* Progress overlay */}
            <div 
              className="absolute inset-0 sunrise-arc compliance-fill"
              style={{
                background: `conic-gradient(from 180deg at 50% 100%, 
                  hsl(var(--wfd-purple)) 0deg, 
                  hsl(var(--wfd-gold)) ${progressPercentage * 0.5}deg, 
                  hsl(var(--wfd-blue)) ${progressPercentage}deg,
                  transparent ${progressPercentage}deg)`
              }}
            />
          </div>
          
          {/* Current compliance percentage */}
          <div className="absolute inset-0 flex items-end justify-center pb-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getComplianceColor(currentCompliance)}`}>
                {currentCompliance}%
              </div>
              <div className="text-sm text-muted-foreground">Current Compliance</div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <div className="h-3 w-full bg-gray-200 rounded-full mb-2">
              <div className="h-3 bg-wfd-purple rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="text-sm text-wfd-purple font-semibold">Crisis Zone</div>
            <div className="text-xs text-muted-foreground">&lt; 70%</div>
          </div>
          
          <div className="text-center">
            <div className="h-3 w-full bg-gray-200 rounded-full mb-2">
              <div className="h-3 bg-wfd-gold rounded-full" style={{ width: '80%' }}></div>
            </div>
            <div className="text-sm text-wfd-gold font-semibold">Dawn Zone</div>
            <div className="text-xs text-muted-foreground">70-90%</div>
          </div>
          
          <div className="text-center">
            <div className="h-3 w-full bg-gray-200 rounded-full mb-2">
              <div className="h-3 bg-wfd-blue rounded-full" style={{ width: '95%' }}></div>
            </div>
            <div className="text-sm text-wfd-blue font-semibold">Sunrise Zone</div>
            <div className="text-xs text-muted-foreground">&gt; 90%</div>
          </div>
        </div>

        {/* Target Message */}
        <div className="bg-gradient-to-r from-wfd-purple/10 via-wfd-gold/10 to-wfd-blue/10 p-4 rounded-lg">
          <h3 className="font-semibold text-primary">Journey to {targetCompliance}%</h3>
          <p className="text-sm text-muted-foreground">
            Every day is a first day - from sunset to sunrise
          </p>
        </div>
      </div>
    </Card>
  );
};