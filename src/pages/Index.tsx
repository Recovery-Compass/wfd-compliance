const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-card border-b border-border z-50">
        <div className="container-dashboard py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white text-xl">
                ☀
              </div>
              <span className="text-headline font-bold text-primary">Whittier First Day</span>
            </div>
            
            {/* Navigation */}
            <nav className="flex gap-6">
              <a href="#" className="text-body text-primary border-b-2 border-primary pb-1">Dashboard</a>
              <a href="#" className="text-body text-muted-foreground hover:text-primary transition-colors">Programs</a>
              <a href="#" className="text-body text-muted-foreground hover:text-primary transition-colors">Managers</a>
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
        {/* Hero Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Critical Alert */}
            <div className="card-minimal">
              <h3 className="text-title font-semibold mb-2">Critical Timeline</h3>
              <p className="text-body text-muted-foreground mb-3">
                Clients approaching the 90‑day limit requiring placement
              </p>
              <p className="text-caption text-muted-foreground">Last updated 2 hours ago</p>
            </div>

            {/* Compliance Progress */}
            <div className="card-minimal text-center">
              <p className="text-caption text-muted-foreground mb-2">Current compliance</p>
              <div className="progress-minimal mb-3">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
              <div className="text-5xl font-bold text-primary mb-1">65%</div>
              <p className="text-caption text-red-600 font-semibold mb-3">Target: 95%</p>
              <h2 className="text-headline font-semibold mb-2">Journey to Excellence</h2>
              <p className="text-body text-muted-foreground">
                From sunset crisis to sunrise – every day is a first day.
              </p>
            </div>

            {/* 5x5 Alert */}
            <div className="card-minimal">
              <h3 className="text-title font-semibold mb-2">5×5 Assessments</h3>
              <p className="text-body text-muted-foreground mb-3">
                Overdue assessments requiring completion this week
              </p>
              <p className="text-caption text-muted-foreground">Due: Friday</p>
            </div>
          </div>
        </section>

        {/* KPI Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Housing Placement Rate */}
            <div className="card-minimal">
              <div className="flex justify-between items-start mb-4">
                <p className="text-caption text-muted-foreground">Housing placement rate</p>
                <span className="text-xs text-green-600 font-medium">↑ Improving</span>
              </div>
              <div className="text-kpi-value text-primary mb-2">65%</div>
              <div className="progress-minimal mb-2">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">Target: 95%</p>
            </div>

            {/* Documentation Complete */}
            <div className="card-minimal">
              <div className="flex justify-between items-start mb-4">
                <p className="text-caption text-muted-foreground">Documentation complete</p>
                <span className="text-xs text-green-600 font-medium">↑ Improving</span>
              </div>
              <div className="text-kpi-value text-primary mb-2">78%</div>
              <div className="progress-minimal mb-2">
                <div className="progress-fill" style={{ width: '78%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">Target: 100%</p>
            </div>

            {/* Average Days to Housing */}
            <div className="card-minimal">
              <div className="flex justify-between items-start mb-4">
                <p className="text-caption text-muted-foreground">Avg days to housing</p>
                <span className="text-xs text-red-600 font-medium">↓ Declining</span>
              </div>
              <div className="text-kpi-value text-primary mb-2">45</div>
              <div className="progress-minimal mb-2">
                <div className="progress-fill" style={{ width: '50%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">Target: 30 days</p>
            </div>

            {/* Service Compliance */}
            <div className="card-minimal">
              <div className="flex justify-between items-start mb-4">
                <p className="text-caption text-muted-foreground">Service compliance</p>
                <span className="text-xs text-green-600 font-medium">↑ Improving</span>
              </div>
              <div className="text-kpi-value text-primary mb-2">82%</div>
              <div className="progress-minimal mb-2">
                <div className="progress-fill" style={{ width: '82%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">Target: 95%</p>
            </div>
          </div>
        </section>

        {/* Data Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Program Performance Table */}
          <div className="lg:col-span-2 card-minimal">
            <h3 className="text-title font-semibold mb-4">Program performance overview</h3>
            <div className="overflow-x-auto">
              <table className="table-minimal">
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Clients</th>
                    <th>Compliance</th>
                    <th>Trend</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="font-semibold">Ted's Place</span></td>
                    <td>37</td>
                    <td><span className="badge-minimal badge-danger">58%</span></td>
                    <td><span className="text-xs text-yellow-600">↑ Improving</span></td>
                    <td><button className="btn-minimal">View</button></td>
                  </tr>
                  <tr>
                    <td><span className="font-semibold">Hondo</span></td>
                    <td>122</td>
                    <td><span className="badge-minimal badge-warning">72%</span></td>
                    <td><span className="text-xs text-green-600">↑ Improving</span></td>
                    <td><button className="btn-minimal">View</button></td>
                  </tr>
                  <tr>
                    <td><span className="font-semibold">Pathway Home</span></td>
                    <td>108</td>
                    <td><span className="badge-minimal badge-success">85%</span></td>
                    <td><span className="text-xs text-green-600">↑ Stable</span></td>
                    <td><button className="btn-minimal">View</button></td>
                  </tr>
                  <tr>
                    <td><span className="font-semibold">A2C</span></td>
                    <td>9</td>
                    <td><span className="badge-minimal badge-success">92%</span></td>
                    <td><span className="text-xs text-green-600">↑ Excellent</span></td>
                    <td><button className="btn-minimal">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar with Timeline Cards */}
          <div className="space-y-6">
            {/* Housing Timeline */}
            <div className="card-minimal">
              <div className="pb-4 border-b border-border mb-4">
                <h3 className="text-title font-semibold">90‑day housing timeline</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-600">⚠</span> 2 critical  
                  <span className="text-yellow-600 ml-2">⚠</span> 1 warning
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center text-white">
                      🏠
                    </div>
                    <div>
                      <div className="text-body font-semibold">Maria Rodriguez</div>
                      <div className="text-xs text-muted-foreground">Last update: 2h ago</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold">
                    15 days
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
                    45 days
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
                    72 days
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="btn-minimal w-full">Schedule 5×5 reviews</button>
                </div>
              </div>
            </div>

            {/* Audit Recovery Timeline */}
            <div className="card-minimal">
              <h3 className="text-title font-semibold mb-1">5×5 audit recovery timeline</h3>
              <p className="text-xs text-muted-foreground mb-4">90 days to full compliance</p>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-body font-bold mx-auto mb-2">
                    ✓
                  </div>
                  <div className="font-semibold text-body">Phase 1</div>
                  <div className="text-xs text-green-600 font-medium">Complete</div>
                  <div className="text-xs text-muted-foreground">Crisis assessment & actions</div>
                  <div className="text-xs text-muted-foreground">Completed Jul 15, 2024</div>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-body font-bold mx-auto mb-2">
                    2
                  </div>
                  <div className="font-semibold text-body">Phase 2</div>
                  <div className="text-xs text-yellow-600 font-medium">In progress</div>
                  <div className="text-xs text-muted-foreground">Process improvement & training</div>
                  <div className="text-xs text-muted-foreground">Target Aug 30, 2024</div>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 bg-border rounded-full flex items-center justify-center text-muted-foreground text-body font-bold mx-auto mb-2">
                    3
                  </div>
                  <div className="font-semibold text-body">Phase 3</div>
                  <div className="text-xs text-muted-foreground font-medium">Planned</div>
                  <div className="text-xs text-muted-foreground">Full compliance achievement</div>
                  <div className="text-xs text-muted-foreground">Target Oct 15, 2024</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
                <div className="text-body text-primary font-medium">
                  Goal: achieve 95% compliance within 90 days
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
