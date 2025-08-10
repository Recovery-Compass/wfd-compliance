import React, { useState } from "react";
import { WFDHeader } from "@/components/WFDHeader";
import { StoryViewer } from "@/components/StoryViewer";
import { Button } from "@/components/ui/button";

type Perspective = "client" | "executive" | "staff" | "funder";

const StoryMode = () => {
  const [selectedPerspective, setSelectedPerspective] = useState<Perspective>("client");

  return (
    <div className="min-h-screen bg-background">
      <WFDHeader />
      
      <main className="container mx-auto px-4 py-8 mt-[80px]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">The $4.4M Discovery</h1>
          <p className="text-xl text-muted-foreground">Stories Behind the Numbers</p>
        </div>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <Button
            variant={selectedPerspective === "client" ? "default" : "outline"}
            onClick={() => setSelectedPerspective("client")}
          >
            Maria's Journey
          </Button>
          <Button
            variant={selectedPerspective === "executive" ? "default" : "outline"}
            onClick={() => setSelectedPerspective("executive")}
          >
            Dr. Gallup's View
          </Button>
          <Button
            variant={selectedPerspective === "staff" ? "default" : "outline"}
            onClick={() => setSelectedPerspective("staff")}
          >
            Frontline Staff
          </Button>
          <Button
            variant={selectedPerspective === "funder" ? "default" : "outline"}
            onClick={() => setSelectedPerspective("funder")}
          >
            Funder's Analysis
          </Button>
        </div>

        <StoryViewer perspective={selectedPerspective} />
      </main>
    </div>
  );
};

export default StoryMode;