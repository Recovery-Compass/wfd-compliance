import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const DiscoveryStory = () => {
  const [counter, setCounter] = useState(48500);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const timeline = [
    { 
      date: "March 2025", 
      text: "We thought we had a service problem...", 
      icon: "😟",
      color: "bg-gray-100"
    },
    { 
      date: "April 2025", 
      text: "Data audit revealed we're delivering MORE than required...", 
      icon: "🤔",
      color: "bg-blue-100"
    },
    { 
      date: "May 2025", 
      text: "Problem identified: Documentation, not dedication", 
      icon: "💡",
      color: "bg-yellow-100"
    },
    { 
      date: "June 2025", 
      text: "Quick wins implemented - 65% → 77%", 
      icon: "📈",
      color: "bg-green-100"
    },
    { 
      date: "July 2025", 
      text: "Environmental Response Design™ methodology deployed", 
      icon: "🚀",
      color: "bg-purple-100"
    },
    { 
      date: "August 2025", 
      text: "TARGET: 90% documentation = Full funding secured", 
      icon: "🎯",
      color: "bg-emerald-100"
    }
  ];

  return (
    <section id="discovery-story" className="mb-8">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">The $4.4M Discovery Story</h2>
          <p className="text-center text-lg opacity-90">
            How Environmental Response Design™ revealed hidden organizational excellence
          </p>
        </div>
        
        <CardContent className="p-8">
          <div className="text-center mb-12">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {counter.toLocaleString()}
            </div>
            <div className="text-xl text-gray-600 mt-2">Services discovered but undocumented</div>
            <div className="text-sm text-gray-500 mt-1">Worth ${(counter * 87).toLocaleString()} in annual funding</div>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {timeline.map((item, idx) => (
              <div key={idx} className={`flex gap-4 p-4 rounded-lg ${item.color} transform hover:scale-105 transition-all`}>
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div className="flex-grow">
                  <div className="font-semibold text-gray-700">{item.date}</div>
                  <div className="text-gray-600">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
            <p className="text-lg font-semibold text-gray-800">
              The discovery: We're not failing at service delivery.
            </p>
            <p className="text-lg text-gray-700 mt-2">
              We're excelling at it - and now we're documenting that excellence.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};