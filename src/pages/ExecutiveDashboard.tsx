import React, { useState, useEffect } from 'react';
import { KPIRow } from '@/components/executive/KPIRow';
import { TrendsComparison } from '@/components/executive/TrendsComparison';
import { Demographics } from '@/components/executive/Demographics';
import { QuickWins } from '@/components/executive/QuickWins';
import { OpportunityPanel } from '@/components/executive/OpportunityPanel';
import { NarrativeSection } from '@/components/executive/NarrativeSection';
import { RoleToggle, ViewRole, getRoleVisibility } from '@/components/executive/RoleToggle';

const ExecutiveDashboard: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<ViewRole>('board');

  // Set document title
  useEffect(() => {
    document.title = 'WFD Performance & Opportunity Briefing';
  }, []);

  const visibility = getRoleVisibility(currentRole);

  const components = {
    kpis: { component: <KPIRow />, show: visibility.showKPIs },
    trends: { component: <TrendsComparison />, show: visibility.showTrends },
    demographics: { component: <Demographics />, show: visibility.showDemographics },
    quickWins: { component: <QuickWins />, show: visibility.showQuickWins },
    opportunity: { component: <OpportunityPanel />, show: visibility.showOpportunity },
    narrative: { component: <NarrativeSection />, show: visibility.showNarrative }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-line sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/99d2ad22-59f8-4c35-8f1b-8947ccf5657e.png" 
                alt="Whittier First Day logo" 
                className="h-8 w-auto"
              />
              <div className="hidden sm:block h-6 w-px bg-line" />
              <img 
                src="/lovable-uploads/afbdd2d6-a84b-471a-a0cb-05b4a50829ee.png" 
                alt="Recovery Compass logo" 
                className="h-8 w-auto"
              />
            </div>
            <div className="text-right">
              <h1 className="text-lg font-semibold text-ink-primary">
                WFD Performance & Opportunity Briefing
              </h1>
              <p className="text-xs text-ink-tertiary">
                Aug 13, 2025 Leadership Demo
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-ink-primary mb-4">
            Heroic Staff vs. Broken System
          </h1>
          <p className="text-lg text-ink-secondary max-w-3xl">
            Real-time organizational intelligence revealing the untold story: 
            exceptional staff delivering increased services despite documentation system barriers 
            that hide $4.4M in annual revenue potential.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-sm font-medium text-ink-secondary">Dashboard View</h2>
              <p className="text-xs text-ink-tertiary">
                Customize visibility and priority based on your role
              </p>
            </div>
            <RoleToggle currentRole={currentRole} onRoleChange={setCurrentRole} />
          </div>
        </div>

        {/* Dynamic Content Based on Role */}
        <div className="space-y-8">
          {visibility.priority.map((key) => {
            const item = components[key as keyof typeof components];
            return item?.show ? (
              <div key={key} className="animate-fade-in">
                {item.component}
              </div>
            ) : null;
          })}
        </div>

        {/* Footer */}
        {/* Clarity Note */}
        <div className="mt-12 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This briefing is based on July 2025 data to demonstrate what's possible. 
              The revised MOU makes this dashboard live and real-time starting September 1.
            </p>
          </div>
        </div>

        <footer className="mt-8 pt-8 border-t border-line">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-ink-tertiary">
              Data current as of July 31, 2025
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="/MOU_WFD_2025-08-11.pdf"
                download
                className="text-sm text-ink-primary hover:text-ink-secondary transition-colors"
              >
                Download MOU
              </a>
              <div className="text-xs text-ink-quaternary">
                Recovery Compass WFD Compliance Platform
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ExecutiveDashboard;