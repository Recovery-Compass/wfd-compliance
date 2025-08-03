import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Calendar } from "lucide-react";

export const DecisionSupport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Decision Support
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-primary/10 p-4 rounded-lg mb-4">
          <p className="text-sm">
            "If we achieve 85% documentation by Sept 1, we unlock $2.7M in additional annual funding. 
            Recommend immediate deployment of mobile logging tools to Midvale and ICMS."
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button className="flex-1">
            <Calendar className="w-4 h-4 mr-2" />
            Approve Actions
          </Button>
          <Button variant="outline" className="flex-1">
            Schedule Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};