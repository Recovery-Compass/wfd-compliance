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
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-card border-b border-border z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-3">
              <img 
                src="/lovable-uploads/99d2ad22-59f8-4c35-8f1b-8947ccf5657e.png" 
                alt="Whittier First Day Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
              <span className="text-lg md:text-headline font-bold text-primary">
                <span className="hidden sm:inline">Whittier First Day</span>
                <span className="sm:hidden">WFD</span>
              </span>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2 rounded-md hover:bg-muted">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-4 lg:gap-6">
              <a href="#" className="text-body text-primary border-b-2 border-primary pb-1">Dashboard</a>
              <a href="/programs" className="text-body text-muted-foreground hover:text-primary transition-colors">Programs</a>
              <a href="/technology-survey" className="text-body text-muted-foreground hover:text-primary transition-colors">Survey</a>
              <a href="/research" className="text-body text-muted-foreground hover:text-primary transition-colors">Research</a>
              <a href="/story-mode" className="text-body text-muted-foreground hover:text-primary transition-colors">Stories</a>
            </nav>
            
            {/* User Menu */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-body text-muted-foreground hidden lg:inline">Donna Gallup</span>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-body font-semibold">
                DG
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 md:pt-20 px-4 py-6 md:py-8 fade-in">
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
          className="rounded-full w-14 h-14 shadow-2xl bg-gradient-to-r from-wfd-blue to-wfd-purple hover:from-wfd-blue-light hover:to-wfd-purple touch-manipulation"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;