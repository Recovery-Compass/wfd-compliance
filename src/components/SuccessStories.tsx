import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export const SuccessStories = () => {
  const stories = [
    { 
      name: "Maria Rodriguez", 
      status: "Housed after 82 days ✅", 
      tag: "documented!",
      color: "bg-success-light border-success"
    },
    { 
      name: "James Thompson", 
      status: "71 mental health sessions completed 🎯", 
      tag: "tracked",
      color: "bg-wfd-blue/10 border-wfd-blue"
    },
    { 
      name: "Sarah Chen", 
      status: "Job training started - service logged ✓", 
      tag: "captured",
      color: "bg-wfd-purple/10 border-wfd-purple"
    },
    { 
      name: "New Today", 
      status: "45 residents at Ted's Place receiving daily services", 
      tag: "counting",
      color: "bg-wfd-gold/10 border-wfd-gold"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stories.map((story, idx) => (
        <Card key={idx} className={`${story.color} border`}>
          <CardContent className="p-4">
            <div className="font-semibold text-foreground mb-2">{story.name}</div>
            <div className="text-sm text-muted-foreground mb-3">{story.status}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-success uppercase">{story.tag}</span>
              <Check className="w-4 h-4 text-success" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};