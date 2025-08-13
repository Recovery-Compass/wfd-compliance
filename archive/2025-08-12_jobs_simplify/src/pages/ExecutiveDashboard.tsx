import { WFDHeader } from "@/components/WFDHeader";
import { ExecutiveMetrics } from "@/components/ExecutiveMetrics";
import { HotSpots } from "@/components/HotSpots";
import { OneClickReports } from "@/components/OneClickReports";
import { DecisionSupport } from "@/components/DecisionSupport";
import { buildQualtricsUrl } from "@/lib/qualtrics";
import { JulyDataBuckets } from "@/components/JulyDataBuckets";

// Recovery Compass Strategic Architecture v8.0
// This implementation serves: WFD compliance, academic publication,
// grant evidence, and commercial validation simultaneously
const ExecutiveDashboard = () => {
  const surveyUrl = buildQualtricsUrl('app');
  return (
    <div className="min-h-screen bg-background">
      <WFDHeader />
      
      <main className="container mx-auto px-4 py-6 md:py-8 mt-16 md:mt-[80px]">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Executive Command Center</h1>
          <p className="text-muted-foreground text-sm md:text-base">Real-Time Organizational Intelligence</p>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-accent/5 border border-accent/20 rounded-lg p-3">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Distribution: Microsoft Forms | Instrument: Qualtrics (ORIC-12) | Status: Assessment In-Progress</p>
              <p className="text-sm text-muted-foreground">Uncovering 10x service delivery: 552 tracked → 5,000+ served</p>
            </div>
            <a href={surveyUrl} target="_blank" rel="noopener noreferrer" className="text-body-base font-medium text-wfd-blue hover:text-wfd-blue-light underline">Open Survey</a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ExecutiveMetrics />
            <JulyDataBuckets />
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