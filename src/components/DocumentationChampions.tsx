import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star, TrendingUp } from "lucide-react";

interface DocumentationChampionsProps {
  program: {
    name: string;
  };
}

export const DocumentationChampions = ({ program }: DocumentationChampionsProps) => {
  const champions = [
    { name: "Maria S.", achievement: "Logged 47 services yesterday", icon: "⭐" },
    { name: "James T.", achievement: "100% documentation rate this week", icon: "🎯" },
    { name: "Sarah Chen", achievement: "Most improved - 80% this month", icon: "📈" },
    { name: "Your name here?", achievement: "Start logging today!", icon: "✨" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-warning" />
          Documentation Champions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {champions.map((champion, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-3 p-3 rounded-lg ${
                idx === champions.length - 1 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'bg-muted/50'
              }`}
            >
              <span className="text-2xl">{champion.icon}</span>
              <div>
                <div className="font-semibold">{champion.name}</div>
                <div className="text-sm text-muted-foreground">{champion.achievement}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};