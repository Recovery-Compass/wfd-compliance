import { WFDHeader } from "@/components/WFDHeader";
import { ExecutiveMetrics } from "@/components/ExecutiveMetrics";
import { HotSpots } from "@/components/HotSpots";
import { OneClickReports } from "@/components/OneClickReports";
import { DecisionSupport } from "@/components/DecisionSupport";

const ExecutiveDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <WFDHeader />
      
      <main className="container mx-auto px-4 py-8 mt-[80px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Executive Command Center</h1>
          <p className="text-muted-foreground">Real-Time Organizational Intelligence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ExecutiveMetrics />
            <HotSpots />
            <DecisionSupport />
          </div>
          
          <div>
            <OneClickReports />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveDashboard;