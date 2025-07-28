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
    <Card className={`card-enterprise hover-lift bg-white ${className}`}>
      <div className="h-gauge flex flex-col justify-center p-xl">
        {/* Header */}
        <div className="text-center mb-lg">
          <div className="flex items-center justify-center space-x-sm mb-sm">
            <Sun className="h-8 w-8 text-wfd-gold sun-rays" />
            <Home className="h-6 w-6 text-wfd-purple" />
            <Mountain className="h-6 w-6 text-wfd-blue" />
          </div>
          <h2 className="text-h3-card text-gray-900 font-semibold">Compliance Gauge</h2>
          <p className="text-label text-gray-500">CURRENT STATUS</p>
        </div>

        {/* Main Gauge */}
        <div className="relative flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Background arc */}
            <div className="w-80 h-40 relative">
              <div 
                className="absolute inset-0 rounded-t-full border-[16px] border-gray-300"
                style={{ borderBottomColor: 'transparent' }}
              />
              
              {/* Progress arc */}
              <div 
                className="absolute inset-0 rounded-t-full border-[16px] border-transparent compliance-fill"
                style={{
                  borderTopColor: currentCompliance < 70 ? 'hsl(var(--danger))' : 
                                  currentCompliance < 90 ? 'hsl(var(--warning))' : 'hsl(var(--success))',
                  borderLeftColor: currentCompliance < 70 ? 'hsl(var(--danger))' : 
                                   currentCompliance < 90 ? 'hsl(var(--warning))' : 'hsl(var(--success))',
                  borderRightColor: currentCompliance < 70 ? 'hsl(var(--danger))' : 
                                    currentCompliance < 90 ? 'hsl(var(--warning))' : 'hsl(var(--success))',
                  borderBottomColor: 'transparent',
                  transform: `rotate(${-90 + (currentCompliance / 100) * 180}deg)`,
                  transformOrigin: '50% 100%'
                }}
              />
            </div>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-lg">
              <div className="text-center">
                <div className={`text-data-xl font-bold mb-micro ${getComplianceColor(currentCompliance)}`}>
                  {currentCompliance}%
                </div>
                <div className="text-body-base text-gray-700 font-medium">Current Compliance</div>
                <div className="text-label text-gray-500 mt-micro">Target: {targetCompliance}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-3 gap-md mt-lg">
          <div className="text-center">
            <div className="progress-enterprise mb-sm">
              <div className="progress-fill progress-critical" style={{ width: '65%' }}></div>
            </div>
            <div className="text-body-base text-danger font-semibold mb-micro">Crisis Zone</div>
            <div className="text-label text-gray-500">&lt; 70%</div>
          </div>
          
          <div className="text-center">
            <div className="progress-enterprise mb-sm">
              <div className="progress-fill progress-warning" style={{ width: '80%' }}></div>
            </div>
            <div className="text-body-base text-warning font-semibold mb-micro">Dawn Zone</div>
            <div className="text-label text-gray-500">70-90%</div>
          </div>
          
          <div className="text-center">
            <div className="progress-enterprise mb-sm">
              <div className="progress-fill progress-success" style={{ width: '95%' }}></div>
            </div>
            <div className="text-body-base text-success font-semibold mb-micro">Sunrise Zone</div>
            <div className="text-label text-gray-500">&gt; 90%</div>
          </div>
        </div>

        {/* Journey Message */}
        <div className="mt-lg text-center bg-gradient-to-r from-wfd-purple/5 via-wfd-gold/5 to-wfd-blue/5 p-md rounded-lg">
          <h3 className="text-h3-card font-semibold text-gray-900 mb-micro">Journey to Excellence</h3>
          <p className="text-body-base text-gray-700">
            From sunset crisis to sunrise success - every day is a first day
          </p>
        </div>
      </div>
    </Card>
  );
};