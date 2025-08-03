import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

export const HotSpots = () => {
  const hotspots = [
    {
      status: "critical",
      icon: <AlertCircle className="w-5 h-5" />,
      program: "Midvale",
      issue: "0% - $91K at risk",
      action: "INTERVENE",
      color: "destructive"
    },
    {
      status: "warning",
      icon: <AlertTriangle className="w-5 h-5" />,
      program: "Ted's Place",
      issue: "58% - $202K opportunity",
      action: "REVIEW PLAN",
      color: "warning"
    },
    {
      status: "success",
      icon: <CheckCircle className="w-5 h-5" />,
      program: "A2C",
      issue: "92% - Share best practices",
      action: "CELEBRATE",
      color: "success"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hot Spots Requiring Attention</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {hotspots.map((spot, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between p-4 border rounded-lg ${
                spot.color === 'destructive' ? 'bg-destructive/10 border-destructive/20' :
                spot.color === 'warning' ? 'bg-warning/10 border-warning/20' :
                'bg-success/10 border-success/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`${
                  spot.color === 'destructive' ? 'text-destructive' :
                  spot.color === 'warning' ? 'text-warning' :
                  'text-success'
                }`}>
                  {spot.icon}
                </div>
                <div>
                  <div className="font-semibold">{spot.program}</div>
                  <div className="text-sm text-muted-foreground">{spot.issue}</div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant={spot.color === 'destructive' ? 'destructive' : 'outline'}
              >
                {spot.action}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};