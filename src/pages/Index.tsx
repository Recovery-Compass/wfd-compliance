import { SiteTypeSelector } from "@/components/SiteTypeSelector";
import { DiscoveryHero } from "@/components/DiscoveryHero";
import { ValueMetrics } from "@/components/ValueMetrics";
import { EnhancedProgramTable } from "@/components/EnhancedProgramTable";
import { DocumentationCalculator } from "@/components/DocumentationCalculator";
import { DiscoveryStory } from "@/components/DiscoveryStory";
import { SuccessStories } from "@/components/SuccessStories";
import { OpportunityTimeline } from "@/components/OpportunityTimeline";
import { useSiteType } from "@/hooks/useSiteType";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { selectedSiteType, currentSiteType } = useSiteType();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
        
        {/* Hero Section - $4.4M Discovery */}
        <DiscoveryHero />
        
        {/* Value-Focused Metrics */}
        <ValueMetrics />
        
        {/* Documentation Calculator */}
        <DocumentationCalculator />
        
        {/* Enhanced Program Table */}
        <EnhancedProgramTable />
        
        {/* Success Stories */}
        <h2 className="text-2xl font-bold mb-4">Client Success Stories 🎉</h2>
        <SuccessStories />
        
        {/* Discovery Story */}
        <DiscoveryStory />
        
        {/* Opportunity Timeline */}
        <OpportunityTimeline />
      </main>
      
      {/* Mobile Quick Entry FAB */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default Index;