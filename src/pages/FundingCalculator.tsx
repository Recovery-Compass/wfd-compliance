import React from "react";
import { WFDHeader } from "@/components/WFDHeader";
import { ScenarioBuilder } from "@/components/ScenarioBuilder";

const FundingCalculator = () => {
  return (
    <div className="min-h-screen bg-background">
      <WFDHeader />
      
      <main className="container mx-auto px-4 py-8 mt-[80px]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Funding Recovery Calculator</h1>
            <p className="text-muted-foreground">Build Your Custom Documentation Improvement Scenario</p>
          </div>

          <ScenarioBuilder />
        </div>
      </main>
    </div>
  );
};

export default FundingCalculator;