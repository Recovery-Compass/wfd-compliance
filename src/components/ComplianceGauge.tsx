import { Card } from "@/components/ui/card";

interface ComplianceGaugeProps {
  currentCompliance: number;
  targetCompliance: number;
  className?: string;
}

export const ComplianceGauge = ({ 
  currentCompliance, 
  targetCompliance, 
  className = "" 
}: ComplianceGaugeProps) => {
  // Determine zone based on compliance percentage
  const getZone = (compliance: number) => {
    if (compliance < 70) return 'crisis';
    if (compliance < 90) return 'dawn';
    return 'sunrise';
  };

  const getZoneColor = (compliance: number) => {
    if (compliance < 70) return 'hsl(var(--alert-red))';
    if (compliance < 90) return 'hsl(var(--warning-yellow))';
    return 'hsl(var(--primary-purple))';
  };

  const getZoneLabel = (compliance: number) => {
    if (compliance < 70) return 'Crisis Zone';
    if (compliance < 90) return 'Dawn Zone';
    return 'Sunrise Zone';
  };

  // Calculate rotation for the progress arc (180 degrees = semicircle)
  const progressRotation = (currentCompliance / 100) * 180;

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <Card className="card-system p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-h2 mb-2" style={{ color: 'hsl(var(--text-dark))' }}>
            Compliance Gauge
          </h2>
          <p className="text-label" style={{ color: 'hsl(var(--grey-500))' }}>
            CURRENT STATUS
          </p>
        </div>

        {/* Gauge Container */}
        <div className="compliance-gauge-container mb-8">
          {/* Background Arc */}
          <div className="compliance-arc-background"></div>
          
          {/* Progress Arc */}
          <div 
            className="compliance-arc-progress"
            style={{
              borderTopColor: getZoneColor(currentCompliance),
              borderLeftColor: getZoneColor(currentCompliance),
              borderRightColor: getZoneColor(currentCompliance),
              transform: `rotate(${-90 + progressRotation}deg)`,
              transformOrigin: '50% 100%'
            }}
          ></div>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
            <div className="text-center">
              <div 
                className="text-data-large mb-1"
                style={{ color: getZoneColor(currentCompliance) }}
              >
                {currentCompliance}%
              </div>
              <div className="text-body" style={{ color: 'hsl(var(--text-dark))' }}>
                Current Compliance
              </div>
              <div className="text-label mt-1" style={{ color: 'hsl(var(--grey-500))' }}>
                Target: {targetCompliance}%
              </div>
            </div>
          </div>
        </div>

        {/* Zone Indicators */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="h-2 rounded-full mb-2" style={{ backgroundColor: 'hsl(var(--alert-red))' }}></div>
            <div className="text-body font-medium" style={{ color: 'hsl(var(--alert-red))' }}>
              Crisis Zone
            </div>
            <div className="text-label" style={{ color: 'hsl(var(--grey-500))' }}>
              &lt; 70%
            </div>
          </div>
          
          <div className="text-center">
            <div className="h-2 rounded-full mb-2" style={{ backgroundColor: 'hsl(var(--warning-yellow))' }}></div>
            <div className="text-body font-medium" style={{ color: 'hsl(var(--warning-yellow))' }}>
              Dawn Zone
            </div>
            <div className="text-label" style={{ color: 'hsl(var(--grey-500))' }}>
              70-90%
            </div>
          </div>
          
          <div className="text-center">
            <div className="h-2 rounded-full mb-2" style={{ backgroundColor: 'hsl(var(--primary-purple))' }}></div>
            <div className="text-body font-medium" style={{ color: 'hsl(var(--primary-purple))' }}>
              Sunrise Zone
            </div>
            <div className="text-label" style={{ color: 'hsl(var(--grey-500))' }}>
              &gt; 90%
            </div>
          </div>
        </div>

        {/* Current Zone Status */}
        <div 
          className="text-center p-4 rounded"
          style={{ backgroundColor: 'hsl(var(--grey-100))' }}
        >
          <div className="text-h3 mb-1" style={{ color: 'hsl(var(--text-dark))' }}>
            Current Zone: {getZoneLabel(currentCompliance)}
          </div>
          <p className="text-body" style={{ color: 'hsl(var(--grey-600))' }}>
            {currentCompliance < 70 
              ? "Critical action needed to reach compliance targets"
              : currentCompliance < 90 
              ? "Making progress - continue improvement efforts" 
              : "Excellent compliance - maintain current standards"
            }
          </p>
        </div>
      </Card>
    </div>
  );
};