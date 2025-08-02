import { SiteTypeSelector } from "@/components/SiteTypeSelector";
import { DynamicComplianceMetrics } from "@/components/DynamicComplianceMetrics";
import { useSiteType } from "@/hooks/useSiteType";
import { getProgramsBySiteType, getComplianceStatsBySiteType } from "@/data/programs";

const Index = () => {
  const { selectedSiteType, currentSiteType } = useSiteType();
  const filteredPrograms = getProgramsBySiteType(selectedSiteType);
  const complianceStats = getComplianceStatsBySiteType(selectedSiteType);

  const getBadgeVariant = (compliance: number) => {
    if (compliance >= 85) return "badge-success";
    if (compliance >= 70) return "badge-warning";
    return "badge-danger";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return "↑ Improving";
      case "declining": return "↓ Declining";
      default: return "→ Stable";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving": return "text-green-600";
      case "declining": return "text-red-600";
      default: return "text-yellow-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-card border-b border-border z-50">
        <div className="container-dashboard py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/99d2ad22-59f8-4c35-8f1b-8947ccf5657e.png" 
                alt="Whittier First Day Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-headline font-bold text-primary hidden sm:inline">Whittier First Day</span>
            </div>
            
            {/* Navigation */}
            <nav className="flex gap-6">
              <a href="#" className="text-body text-primary border-b-2 border-primary pb-1">Dashboard</a>
              <a href="#" className="text-body text-muted-foreground hover:text-primary transition-colors">Programs</a>
              <a href="/technology-survey" className="text-body text-muted-foreground hover:text-primary transition-colors">Pre-Training Survey</a>
              <a href="#" className="text-body text-muted-foreground hover:text-primary transition-colors">Research Export</a>
              <a href="#" className="text-body text-muted-foreground hover:text-primary transition-colors">Story Mode</a>
            </nav>
            
            {/* User Menu */}
            <div className="flex items-center gap-3">
              <span className="text-body text-muted-foreground">Donna Gallup</span>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-body font-semibold">
                DG
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 container-dashboard py-8 fade-in">
        {/* Site Type Selector */}
        <SiteTypeSelector />
        
        {/* Hero Section - Research Study Frame */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Research Study Banner */}
            <div className="card-minimal bg-primary/10 border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <h3 className="text-title font-semibold text-primary">Research Study</h3>
              </div>
              <p className="text-body font-medium mb-2">Digital Transformation in Homeless Services</p>
              <p className="text-caption text-muted-foreground">
                Gates Foundation validated framework tracking compliance improvement from crisis to excellence
              </p>
              <div className="mt-3 flex gap-2">
                <span className="badge-minimal badge-success text-xs">Pilot Study</span>
                <span className="badge-minimal badge-warning text-xs">Active Study</span>
              </div>
            </div>

            {/* Compliance Progress - Dynamic with Research Context */}
            <div className="card-minimal text-center">
              <p className="text-caption text-muted-foreground mb-2">
                Research Study: {currentSiteType.name} Compliance Journey
              </p>
              <div className="progress-minimal mb-3">
                <div className="progress-fill" style={{ width: `${complianceStats.average}%` }}></div>
              </div>
              <div className="text-5xl font-bold text-primary mb-1">{complianceStats.average}%</div>
              <p className="text-caption text-red-600 font-semibold mb-3">
                Target: {currentSiteType.complianceTarget}%
              </p>
              <h2 className="text-headline font-semibold mb-2">65% → 95% Journey</h2>
              <p className="text-body text-muted-foreground">
                Evidence-based transformation measuring impact through validated research tools
              </p>
              <div className="mt-3 text-caption text-primary font-medium">
                📊 PSSUQ Usability: Post-60 days | 📈 Longitudinal: 6 months
              </div>
            </div>

            {/* Assessment Alert - Dynamic with Research Components */}
            <div className="card-minimal">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-title font-semibold">
                  {currentSiteType.requirements.assessmentType}
                </h3>
                <span className="text-xs bg-wfd-blue/10 text-wfd-blue px-2 py-1 rounded-full">
                  Research Data
                </span>
              </div>
              <p className="text-body text-muted-foreground mb-3">
                {currentSiteType.id === "DHS" 
                  ? "Pre/Post assessments measuring dashboard impact on compliance tracking"
                  : currentSiteType.id === "NONHDS"
                  ? "Research framework adapted for non-DHS contract requirements"
                  : "Multi-site research design capturing diverse program impacts"}
              </p>
              <p className="text-caption text-muted-foreground">
                {currentSiteType.requirements.timingRequirement}
              </p>
              <div className="mt-3 text-caption text-green-600 font-medium">
                ✓ Baseline captured | ⏳ Implementation phase | 📋 PSSUQ pending
              </div>
            </div>
          </div>
        </section>

        {/* KPI Section - Dynamic Metrics */}
        <section className="mb-12">
          <h2 className="text-headline font-semibold mb-6 text-primary">
            {currentSiteType.name} Performance Metrics
          </h2>
          <DynamicComplianceMetrics />
        </section>

        {/* Data Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Program Performance Table - Dynamic */}
          <div className="lg:col-span-2 card-minimal">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-title font-semibold">Program Performance Overview</h3>
              <span className="text-caption text-muted-foreground">
                {selectedSiteType === "ALL" ? "All Programs" : `${currentSiteType.name} Only`}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="table-minimal">
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Type</th>
                    <th>Clients</th>
                    <th>Compliance</th>
                    <th>Trend</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrograms.map((program) => (
                    <tr key={program.id}>
                      <td><span className="font-semibold">{program.name}</span></td>
                      <td>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          program.siteType === "DHS" 
                            ? "bg-primary/10 text-primary" 
                            : "bg-wfd-blue/10 text-wfd-blue"
                        }`}>
                          {program.siteType}
                        </span>
                      </td>
                      <td>{program.clients}</td>
                      <td>
                        <span className={`badge-minimal ${getBadgeVariant(program.compliance)}`}>
                          {program.compliance}%
                        </span>
                      </td>
                      <td>
                        <span className={`text-xs ${getTrendColor(program.trend)}`}>
                          {getTrendIcon(program.trend)}
                        </span>
                      </td>
                      <td><button className="btn-minimal">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar with Timeline Cards */}
          <div className="space-y-6">
            {/* Timeline Card - Dynamic based on site type */}
            <div className="card-minimal">
              <div className="pb-4 border-b border-border mb-4">
                <h3 className="text-title font-semibold">
                  {currentSiteType.id === "DHS" ? "90‑day Housing Timeline" : 
                   currentSiteType.id === "NONHDS" ? "Contract Timeline" : "Multi-Program Timeline"}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-600">⚠</span> 2 critical  
                  <span className="text-yellow-600 ml-2">⚠</span> 1 warning
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-wfd-gold rounded-full flex items-center justify-center text-primary">
                      🏠
                    </div>
                    <div>
                      <div className="text-body font-semibold">Maria Rodriguez</div>
                      <div className="text-xs text-muted-foreground">Last update: 2h ago</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold">
                    {currentSiteType.id === "DHS" ? "15 days" : "Due Soon"}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center text-white">
                      🏠
                    </div>
                    <div>
                      <div className="text-body font-semibold">James Thompson</div>
                      <div className="text-xs text-muted-foreground">Last update: 1 day ago</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-yellow-600 text-white rounded-full text-xs font-semibold">
                    {currentSiteType.id === "DHS" ? "45 days" : "Review"}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center text-white">
                      🏠
                    </div>
                    <div>
                      <div className="text-body font-semibold">Sarah Chen</div>
                      <div className="text-xs text-muted-foreground">Last update: 3h ago</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                    {currentSiteType.id === "DHS" ? "72 days" : "On Track"}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="btn-minimal w-full">
                    {currentSiteType.id === "DHS" ? "Schedule 5×5 reviews" : "Review Contracts"}
                  </button>
                </div>
              </div>
            </div>

            {/* Recovery Timeline */}
            <div className="card-minimal">
              <h3 className="text-title font-semibold mb-1">
                {currentSiteType.id === "DHS" ? "5×5 Audit Recovery" : 
                 currentSiteType.id === "NONHDS" ? "Contract Compliance" : "System Recovery"}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                {currentSiteType.id === "DHS" ? "90 days to full compliance" : "Contract timeline"}
              </p>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-body font-bold mx-auto mb-2">
                    ✓
                  </div>
                  <div className="font-semibold text-body">Phase 1</div>
                  <div className="text-xs text-green-600 font-medium">Complete</div>
                  <div className="text-xs text-muted-foreground">
                    {currentSiteType.id === "DHS" ? "Crisis assessment & actions" : "Initial compliance review"}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed Jul 15, 2024</div>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-body font-bold mx-auto mb-2">
                    2
                  </div>
                  <div className="font-semibold text-body">Phase 2</div>
                  <div className="text-xs text-yellow-600 font-medium">In progress</div>
                  <div className="text-xs text-muted-foreground">
                    {currentSiteType.id === "DHS" ? "Process improvement & training" : "Contract adjustments"}
                  </div>
                  <div className="text-xs text-muted-foreground">Target Aug 30, 2024</div>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 bg-border rounded-full flex items-center justify-center text-muted-foreground text-body font-bold mx-auto mb-2">
                    3
                  </div>
                  <div className="font-semibold text-body">Phase 3</div>
                  <div className="text-xs text-muted-foreground font-medium">Planned</div>
                  <div className="text-xs text-muted-foreground">
                    {currentSiteType.id === "DHS" ? "Full compliance achievement" : "Full contract compliance"}
                  </div>
                  <div className="text-xs text-muted-foreground">Target Oct 15, 2024</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
                <div className="text-body text-primary font-medium">
                  Goal: achieve {currentSiteType.complianceTarget}% compliance within 90 days
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