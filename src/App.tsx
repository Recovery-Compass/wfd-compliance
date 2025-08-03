import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteTypeProvider } from "@/hooks/useSiteType";
import Index from "./pages/Index";
import ManagerSurvey from "./pages/ManagerSurvey";
import ResearchDashboard from "./pages/ResearchDashboard";
import TechnologySurvey from "./pages/TechnologySurvey";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail";
import StoryMode from "./pages/StoryMode";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import FundingCalculator from "./pages/FundingCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SiteTypeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/survey" element={<ManagerSurvey />} />
            <Route path="/research" element={<ResearchDashboard />} />
            <Route path="/technology-survey" element={<TechnologySurvey />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:programName" element={<ProgramDetail />} />
            <Route path="/story-mode" element={<StoryMode />} />
            <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
            <Route path="/funding-calculator" element={<FundingCalculator />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SiteTypeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
