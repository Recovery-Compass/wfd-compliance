import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Target } from "lucide-react";

export const OpportunityTimeline = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🎯 Documentation Opportunity Timeline</CardTitle>
        <p className="text-sm text-muted-foreground">From Discovery to Full Funding in 90 Days</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <CheckCircle className="w-8 h-8 text-success flex-shrink-0" />
            <div className="flex-grow">
              <h3 className="font-semibold text-success">Phase 1: Data Governance Complete ✅</h3>
              <p className="text-muted-foreground">Prevented grant application disasters</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Completed July 15, 2025</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <Clock className="w-8 h-8 text-wfd-gold flex-shrink-0 animate-pulse" />
            <div className="flex-grow">
              <h3 className="font-semibold text-wfd-gold">Phase 2: Documentation Sprint 🔄</h3>
              <p className="text-muted-foreground">Capturing hidden value across all programs</p>
              <p className="text-sm text-muted-foreground/70 mt-1">In Progress - Target: August 30, 2025</p>
              <div className="mt-2 space-y-1 text-sm">
                <div>✓ Week 1: Deploy counting systems</div>
                <div className="font-bold text-wfd-gold">→ Week 2: Train documentation champions</div>
                <div>• Week 3: Achieve 85% capture rate</div>
                <div>• Week 4: Validate & celebrate</div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 items-start opacity-60">
            <Target className="w-8 h-8 text-muted-foreground flex-shrink-0" />
            <div className="flex-grow">
              <h3 className="font-semibold text-muted-foreground">Phase 3: Excellence Sustained 📈</h3>
              <p className="text-muted-foreground">90%+ documentation = Maximum funding secured</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Target: October 15, 2025</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-wfd-blue/10 rounded-lg border border-wfd-blue">
          <p className="text-center text-wfd-blue font-medium">
            Goal: Capture 100% of the value we're already creating
          </p>
        </div>
      </CardContent>
    </Card>
  );
};