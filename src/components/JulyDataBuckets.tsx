import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { julyMetrics } from '@/data/julyMetrics';

// Recovery Compass Strategic Architecture v8.0
// This implementation serves: WFD compliance, academic publication,
// grant evidence, and commercial validation simultaneously
export const JulyDataBuckets: React.FC = () => {
  const { intake, services, exits } = julyMetrics;

  return (
    <Card>
      <CardHeader>
        <CardTitle>July Metrics (Demo)</CardTitle>
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">July 2025 Impact</h3>
          <p className="text-sm text-muted-foreground">Path to $4.4M opportunity validation</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Intake */}
          <div className="rounded-lg border border-border p-4 bg-muted/30">
            <div className="text-title mb-2">Intake</div>
            <ul className="text-body space-y-1 text-muted-foreground">
              <li>Demographics: <span className="font-semibold text-foreground">{intake.demographics}</span></li>
              <li>Biopsychosocial: <span className="font-semibold text-foreground">{intake.biopsychosocialAssessments}</span></li>
              <li>Assessments Completed: <span className="font-semibold text-foreground">{intake.assessmentsCompleted}</span></li>
            </ul>
          </div>

          {/* Services */}
          <div className="rounded-lg border border-border p-4 bg-muted/30">
            <div className="text-title mb-2">Services</div>
            <ul className="text-body space-y-1 text-muted-foreground">
              <li>Volunteer Hours: <span className="font-semibold text-foreground">{services.volunteerHours}</span></li>
              <li>Groups: <span className="font-semibold text-foreground">{services.groups}</span></li>
              <li>Meals: <span className="font-semibold text-foreground">{services.meals}</span></li>
              <li>Hygiene Kits: <span className="font-semibold text-foreground">{services.hygieneKits}</span></li>
            </ul>
          </div>

          {/* Exits */}
          <div className="rounded-lg border border-border p-4 bg-muted/30">
            <div className="text-title mb-2">Exits</div>
            <ul className="text-body space-y-1 text-muted-foreground">
              <li>Housing Outcomes: <span className="font-semibold text-foreground">{exits.housingOutcomes}</span></li>
              <li>Median Days to Housing: <span className="font-semibold text-foreground">{exits.medianTimeToHousingDays}</span></li>
              <li>Success Rate: <span className="font-semibold text-foreground">{exits.successRatePct}%</span></li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
