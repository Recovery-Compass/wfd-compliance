import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart, FileText, Wrench, Star } from "lucide-react";

export const NarrativeSection: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Heart className="w-6 h-6" />
          Heroic Staff vs. Broken System
        </CardTitle>
        <p className="text-sm text-blue-800">
          The real story behind our service delivery metrics
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Heroic Staff */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <h3 className="font-medium text-blue-900">Our Heroic Staff</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm font-medium text-green-900 mb-1">
                  Service Delivery Excellence
                </div>
                <div className="text-xs text-green-800">
                  • Meals served increased 14.6% (1,641 → 1,880)
                  <br />
                  • Wellness checks up 3.3% (720 → 744)
                  <br />
                  • Laundry services expanded 2.9% (136 → 140)
                  <br />
                  • Launched 4 new service categories independently
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-900 mb-1">
                  Innovation & Adaptation
                </div>
                <div className="text-xs text-blue-800">
                  Staff identified service gaps and launched UHA submissions, 
                  DMV visits, and ID assistance without additional resources or formal approval.
                </div>
              </div>
            </div>
          </div>

          {/* Broken System */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-600" />
              <h3 className="font-medium text-red-900">System Barriers</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <div className="text-sm font-medium text-red-900 mb-1">
                  Documentation Burden
                </div>
                <div className="text-xs text-red-800">
                  Complex paperwork diverts 40% of staff time from direct client care, 
                  creating barriers to access and reducing service quality.
                </div>
              </div>
              
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <div className="text-sm font-medium text-orange-900 mb-1">
                  Outcome Paradox
                </div>
                <div className="text-xs text-orange-800">
                  Despite increased service delivery, housing outcomes declined—
                  revealing system process failures, not staff performance issues.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="bg-white/80 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-purple-900">System Redesign Opportunity</h3>
          </div>
          <p className="text-sm text-purple-800 leading-relaxed">
            <strong>Mobile intake tools</strong> and <strong>streamlined documentation</strong> can reduce 
            administrative burden by 60%, allowing staff to focus on care delivery while automatically 
            capturing the full scope of services for accurate reimbursement. This isn't about working 
            harder—it's about fixing broken systems to empower our exceptional staff.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};