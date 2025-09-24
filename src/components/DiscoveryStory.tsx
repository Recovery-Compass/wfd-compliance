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
      color: "bg-muted"
    },
    { 
      date: "April 2025", 
      text: "Data audit revealed we're delivering MORE than required...", 
      icon: "🤔",
      color: "bg-wfd-blue/10"
    },
    { 
      date: "May 2025", 
      text: "Problem identified: Documentation, not dedication", 
      icon: "💡",
      color: "bg-warning-light"
    },
    { 
      date: "June 2025", 
      text: "Quick wins implemented - 65% → 77%", 
      icon: "📈",
      color: "bg-success-light"
    },
    { 
      date: "July 2025", 
      text: "Environmental Response Design™ methodology deployed", 
      icon: "🚀",
      color: "bg-wfd-purple/10"
    },
    { 
      date: "August 2025", 
      text: "TARGET: 90% documentation = Full funding secured", 
      icon: "🎯",
      color: "bg-wfd-gold/10"
    }
  ];

  return (
    <section id="discovery-story" className="mb-8">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-wfd-blue to-wfd-purple text-white p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">The Data Standardization Achievement</h2>
          <p className="text-center text-lg opacity-90">
            How Environmental Response Design™ prevented a data disaster
          </p>
        </div>
        
        <CardContent className="p-8">
          <div className="text-center mb-12">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-wfd-blue to-wfd-purple">
              95%
            </div>
            <div className="text-xl text-muted-foreground mt-2">Data quality achieved</div>
            <div className="text-sm text-muted-foreground/70 mt-1">Grant applications now mathematically sound</div>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {timeline.map((item, idx) => (
              <div key={idx} className={`flex gap-4 p-4 rounded-lg ${item.color} transform hover:scale-105 transition-all border border-border`}>
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div className="flex-grow">
                  <div className="font-semibold text-foreground">{item.date}</div>
                  <div className="text-muted-foreground">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-gradient-to-r from-success-light to-wfd-blue/10 rounded-lg text-center border border-border">
            <p className="text-lg font-semibold text-foreground">
              The discovery: We're not failing at service delivery.
            </p>
            <p className="text-lg text-muted-foreground mt-2">
              We're excelling at it - and now we're documenting that excellence.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};