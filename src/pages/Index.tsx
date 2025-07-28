import { WFDHeader } from "@/components/WFDHeader";
import { ComplianceGauge } from "@/components/ComplianceGauge";
import { ClientCountdownCard } from "@/components/ClientCountdownCard";
import { KPIMetricsGrid } from "@/components/KPIMetricsGrid";
import { Mountain } from "lucide-react";

// Sample data for demo
const sampleClients = [
  { id: '1', name: 'Maria Rodriguez', daysRemaining: 15, status: 'critical' as const, lastUpdate: '2 hours ago' },
  { id: '2', name: 'James Thompson', daysRemaining: 45, status: 'warning' as const, lastUpdate: '1 day ago' },
  { id: '3', name: 'Sarah Chen', daysRemaining: 72, status: 'stable' as const, lastUpdate: '3 hours ago' },
  { id: '4', name: 'Michael Brown', daysRemaining: 8, status: 'critical' as const, lastUpdate: '30 minutes ago' },
];

const sampleMetrics = [
  {
    id: '1',
    title: 'Housing Placement Rate',
    current: 65,
    target: 95,
    unit: '%' as const,
    trend: 'up' as const,
    icon: 'users' as const,
    description: 'Client housing success'
  },
  {
    id: '2',
    title: 'Documentation Complete',
    current: 78,
    target: 100,
    unit: '%' as const,
    trend: 'up' as const,
    icon: 'files' as const,
    description: 'Required paperwork'
  },
  {
    id: '3',
    title: 'Average Days to Housing',
    current: 45,
    target: 30,
    unit: 'days' as const,
    trend: 'down' as const,
    icon: 'calendar' as const,
    description: 'Time to placement'
  },
  {
    id: '4',
    title: 'Service Compliance',
    current: 82,
    target: 95,
    unit: '%' as const,
    trend: 'up' as const,
    icon: 'check' as const,
    description: 'County requirements'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wfd-gold/5 via-background to-wfd-blue/5">
      <WFDHeader />
      
      <main className="max-w-7xl mx-auto px-xl py-xl space-y-xl">
        {/* Hero Section with Compliance Gauge */}
        <section className="text-center space-y-lg">
          <div className="space-y-xs">
            <h1 className="text-h1-hero text-primary">From Sunset to Sunrise</h1>
            <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
              Journey from 65% to 95% compliance - saving county funding, changing lives
            </p>
          </div>
          
          <ComplianceGauge 
            currentCompliance={65} 
            targetCompliance={95}
            className="max-w-2xl mx-auto"
          />
        </section>

        {/* Key Metrics Grid */}
        <section className="space-y-lg">
          <h2 className="text-h2-section text-primary">Key Performance Indicators</h2>
          <KPIMetricsGrid metrics={sampleMetrics} />
        </section>

        {/* Client Timeline */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          <ClientCountdownCard clients={sampleClients} />
          
          {/* Recovery Timeline */}
          <div className="card-enterprise p-xl">
            <h3 className="text-h3-card text-primary mb-lg flex items-center space-x-xs">
              <Mountain className="h-5 w-5 text-wfd-blue" />
              <span>5x5 Audit Recovery Timeline</span>
            </h3>
            
            <div className="space-y-sm">
              <div className="flex items-center space-x-sm p-sm bg-wfd-blue/10 rounded-lg">
                <div className="w-3 h-3 bg-wfd-blue rounded-full"></div>
                <span className="text-body-base font-medium">Phase 1: Crisis Assessment</span>
                <span className="text-label text-muted-foreground ml-auto">Complete</span>
              </div>
              
              <div className="flex items-center space-x-sm p-sm bg-wfd-gold/10 rounded-lg">
                <div className="w-3 h-3 bg-wfd-gold rounded-full animate-pulse"></div>
                <span className="text-body-base font-medium">Phase 2: Process Improvement</span>
                <span className="text-label text-muted-foreground ml-auto">In Progress</span>
              </div>
              
              <div className="flex items-center space-x-sm p-sm bg-muted rounded-lg">
                <div className="w-3 h-3 bg-muted-foreground/50 rounded-full"></div>
                <span className="text-body-base font-medium text-muted-foreground">Phase 3: Full Compliance</span>
                <span className="text-label text-muted-foreground ml-auto">Planned</span>
              </div>
            </div>
            
            <div className="mt-lg p-sm bg-gradient-to-r from-wfd-purple/10 to-wfd-blue/10 rounded-lg">
              <p className="text-body-base text-center text-muted-foreground">
                <strong>Goal:</strong> Achieve 95% compliance within 90 days to maintain county funding
              </p>
            </div>
          </div>
        </section>

        {/* Success Story Preview */}
        <section className="bg-gradient-to-r from-wfd-purple/5 via-wfd-gold/5 to-wfd-blue/5 rounded-lg p-xl text-center">
          <h3 className="text-h3-card text-primary mb-sm">Success Story Mode for Funders</h3>
          <p className="text-body-large text-muted-foreground mb-lg max-w-2xl mx-auto">
            Transform compliance data into compelling narratives that demonstrate impact and accountability
          </p>
          <div className="flex items-center justify-center space-x-xl">
            <div className="text-center">
              <div className="text-data-large text-wfd-purple">65%</div>
              <div className="text-label text-muted-foreground">Starting Point</div>
            </div>
            <div className="text-wfd-gold text-h3-card">→</div>
            <div className="text-center">
              <div className="text-data-large text-wfd-gold">80%</div>
              <div className="text-label text-muted-foreground">Current Progress</div>
            </div>
            <div className="text-wfd-gold text-h3-card">→</div>
            <div className="text-center">
              <div className="text-data-large text-wfd-blue">95%</div>
              <div className="text-label text-muted-foreground">Target Goal</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
