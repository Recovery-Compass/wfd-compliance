import React, { useState, useEffect } from "react";
import { WFDHeader } from "@/components/WFDHeader";
import { ServiceLogger } from "@/components/ServiceLogger";
import { ProgramMetrics } from "@/components/ProgramMetrics";
import { DocumentationChampions } from "@/components/DocumentationChampions";
import { QuickWinTutorials } from "@/components/QuickWinTutorials";
import { enhancedPrograms } from "@/data/enhanced-programs";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProgramDetail = () => {
  const { programName } = useParams<{ programName: string }>();
  
  const program = enhancedPrograms.find(
    p => p.name.toLowerCase().replace(/\s+/g, '-') === programName
  );

  if (!program) {
    return (
      <div className="min-h-screen bg-background">
        <WFDHeader />
        <main className="container mx-auto px-4 py-8 mt-[80px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Program not found</h1>
            <Link to="/programs">
              <Button>Return to Programs</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <WFDHeader />
      
      <main className="container mx-auto px-4 py-8 mt-[80px]">
        <div className="mb-6">
          <Link to="/programs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Programs
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProgramMetrics program={program} />
            <ServiceLogger program={program} />
            <DocumentationChampions program={program} />
          </div>
          
          <div className="space-y-6">
            <QuickWinTutorials program={program} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgramDetail;