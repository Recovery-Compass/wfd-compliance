import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export const SuccessStories = () => {
  const stories = [
    { 
      name: "Maria Rodriguez", 
      status: "Housed after 82 days ✅", 
      tag: "documented!",
      color: "bg-green-50 border-green-200"
    },
    { 
      name: "James Thompson", 
      status: "71 mental health sessions completed 🎯", 
      tag: "tracked",
      color: "bg-blue-50 border-blue-200"
    },
    { 
      name: "Sarah Chen", 
      status: "Job training started - service logged ✓", 
      tag: "captured",
      color: "bg-purple-50 border-purple-200"
    },
    { 
      name: "New Today", 
      status: "45 residents at Ted's Place receiving daily services", 
      tag: "counting",
      color: "bg-amber-50 border-amber-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stories.map((story, idx) => (
        <Card key={idx} className={`${story.color} border`}>
          <CardContent className="p-4">
            <div className="font-semibold text-gray-800 mb-2">{story.name}</div>
            <div className="text-sm text-gray-700 mb-3">{story.status}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-green-600 uppercase">{story.tag}</span>
              <Check className="w-4 h-4 text-green-500" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};