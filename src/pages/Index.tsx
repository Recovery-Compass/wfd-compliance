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
    <div className="min-h-screen bg-gray-100">
      <WFDHeader />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-dashboard mx-auto px-xl py-sm">
          <nav className="text-label text-gray-700">
            Dashboard / <span className="text-wfd-purple font-medium">Executive Overview</span>
          </nav>
        </div>
      </div>
      
      <main className="max-w-dashboard mx-auto px-xl py-xl page-transition">
        {/* Hero Section - Compliance Gauge with Critical Alerts */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-lg mb-xl">
          {/* Left Alert Card */}
          <div className="lg:col-span-3">
            <div className="card-enterprise hover-lift h-full">
              <div className="alert-critical">
                <div className="flex items-start space-x-sm">
                  <div className="w-8 h-8 bg-danger rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-body-base font-bold">15</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h3-card text-danger font-semibold mb-micro">Critical Timeline</h3>
                    <p className="text-body-base text-gray-700">Clients at 90-day limit requiring immediate housing placement</p>
                    <div className="mt-sm text-label text-gray-500">Last updated: 2 hours ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Compliance Gauge */}
          <div className="lg:col-span-6">
            <ComplianceGauge 
              currentCompliance={65} 
              targetCompliance={95}
              className="h-gauge"
            />
          </div>

          {/* Right Alert Card */}
          <div className="lg:col-span-3">
            <div className="card-enterprise hover-lift h-full">
              <div className="alert-warning">
                <div className="flex items-start space-x-sm">
                  <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-body-base font-bold">7</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h3-card text-warning font-semibold mb-micro">5x5 Assessments</h3>
                    <p className="text-body-base text-gray-700">Overdue assessments requiring completion this week</p>
                    <div className="mt-sm text-label text-gray-500">Due: This Friday</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Performance Indicators Grid */}
        <section className="mb-xl">
          <div className="flex items-center justify-between mb-lg">
            <h2 className="text-h2-section text-gray-900">Key Performance Indicators</h2>
            <div className="text-body-base text-gray-500">Updated every 4 hours</div>
          </div>
          <KPIMetricsGrid metrics={sampleMetrics} />
        </section>

        {/* Data Section - 70/30 Split */}
        <section className="grid grid-cols-1 lg:grid-cols-10 gap-xl mb-xl">
          {/* Left: Program Performance Table (70%) */}
          <div className="lg:col-span-7">
            <div className="card-enterprise hover-lift">
              <div className="p-xl">
                <h3 className="text-h3-card text-gray-900 mb-lg">Program Performance Overview</h3>
                <div className="overflow-x-auto">
                  <table className="data-table w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Program</th>
                        <th className="text-center">Clients</th>
                        <th className="text-center">Compliance</th>
                        <th className="text-center">Trend</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-medium">Ted's Place</td>
                        <td className="text-center">37</td>
                        <td className="text-center">
                          <span className="text-danger font-semibold">58%</span>
                        </td>
                        <td className="text-center">
                          <span className="text-warning">↗ Improving</span>
                        </td>
                        <td className="text-right">
                          <button className="text-wfd-blue hover:text-wfd-blue-dark text-body-base font-medium">View Details</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium">Hondo</td>
                        <td className="text-center">122</td>
                        <td className="text-center">
                          <span className="text-warning font-semibold">72%</span>
                        </td>
                        <td className="text-center">
                          <span className="text-success">↗ Improving</span>
                        </td>
                        <td className="text-right">
                          <button className="text-wfd-blue hover:text-wfd-blue-dark text-body-base font-medium">View Details</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium">Pathway Home</td>
                        <td className="text-center">108</td>
                        <td className="text-center">
                          <span className="text-success font-semibold">94%</span>
                        </td>
                        <td className="text-center">
                          <span className="text-success">↗ Excellent</span>
                        </td>
                        <td className="text-right">
                          <button className="text-wfd-blue hover:text-wfd-blue-dark text-body-base font-medium">View Details</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Timeline & Alerts (30%) */}
          <div className="lg:col-span-3 space-y-lg">
            <ClientCountdownCard clients={sampleClients} />
            
            {/* Quick Actions */}
            <div className="card-enterprise hover-lift">
              <div className="p-lg">
                <h4 className="text-h3-card text-gray-900 mb-md">Quick Actions</h4>
                <div className="space-y-sm">
                  <button className="w-full text-left p-sm rounded-lg bg-wfd-blue/10 hover:bg-wfd-blue/20 transition-colors text-body-base text-wfd-blue font-medium">
                    Generate Weekly Report
                  </button>
                  <button className="w-full text-left p-sm rounded-lg bg-wfd-gold/10 hover:bg-wfd-gold/20 transition-colors text-body-base text-wfd-gold-dark font-medium">
                    Schedule 5x5 Reviews
                  </button>
                  <button className="w-full text-left p-sm rounded-lg bg-success/10 hover:bg-success/20 transition-colors text-body-base text-success font-medium">
                    Export Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Timeline */}
        <section className="mb-xl">
          <div className="card-enterprise hover-lift">
            <div className="p-xl">
              <h3 className="text-h3-card text-gray-900 mb-lg flex items-center space-x-sm">
                <Mountain className="h-6 w-6 text-wfd-blue" />
                <span>5x5 Audit Recovery Timeline</span>
                <div className="ml-auto text-label text-gray-500">90 days to full compliance</div>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                <div className="relative">
                  <div className="alert-success">
                    <div className="flex items-center space-x-sm mb-sm">
                      <div className="w-4 h-4 bg-success rounded-full"></div>
                      <span className="text-h3-card font-semibold text-success">Phase 1 Complete</span>
                    </div>
                    <p className="text-body-base text-gray-700">Crisis Assessment & Immediate Actions</p>
                    <div className="mt-sm text-label text-gray-500">Completed July 15, 2024</div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="alert-warning">
                    <div className="flex items-center space-x-sm mb-sm">
                      <div className="w-4 h-4 bg-warning rounded-full animate-pulse"></div>
                      <span className="text-h3-card font-semibold text-warning">Phase 2 Active</span>
                    </div>
                    <p className="text-body-base text-gray-700">Process Improvement & Training</p>
                    <div className="mt-sm text-label text-gray-500">Target: August 30, 2024</div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="border border-gray-300 p-md rounded-lg bg-gray-100/50">
                    <div className="flex items-center space-x-sm mb-sm">
                      <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                      <span className="text-h3-card font-semibold text-gray-500">Phase 3 Planned</span>
                    </div>
                    <p className="text-body-base text-gray-500">Full Compliance Achievement</p>
                    <div className="mt-sm text-label text-gray-500">Target: October 15, 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Summary for Funders */}
        <section>
          <div className="card-enterprise hover-lift">
            <div className="bg-gradient-to-r from-wfd-purple to-wfd-blue text-white p-xl rounded-t-lg">
              <h3 className="text-h2-section font-semibold mb-sm">Executive Summary</h3>
              <p className="text-body-large opacity-90">Transforming compliance crisis into sustainable success</p>
            </div>
            <div className="p-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-xl text-center">
                <div>
                  <div className="text-data-xl text-danger mb-xs">65%</div>
                  <div className="text-h3-card text-gray-700 mb-micro">Crisis Point</div>
                  <div className="text-body-base text-gray-500">Failed county audit</div>
                </div>
                <div>
                  <div className="text-data-xl text-warning mb-xs">80%</div>
                  <div className="text-h3-card text-gray-700 mb-micro">Current Progress</div>
                  <div className="text-body-base text-gray-500">Steady improvement</div>
                </div>
                <div>
                  <div className="text-data-xl text-success mb-xs">95%</div>
                  <div className="text-h3-card text-gray-700 mb-micro">Target Achievement</div>
                  <div className="text-body-base text-gray-500">Funding secured</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
