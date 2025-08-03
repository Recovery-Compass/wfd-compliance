import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, DollarSign } from "lucide-react";

export const DiscoveryHero = () => {
  const [servicesCount, setServicesCount] = useState(1247);
  const [weekValue, setWeekValue] = useState(127000);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setServicesCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      setWeekValue(prev => prev + Math.floor(Math.random() * 500) + 100);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = 77;
  const targetPercentage = 90;
  const remainingPercentage = targetPercentage - progressPercentage;

  return (
    <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 rounded-2xl p-8 text-white mb-8 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-lg">
            BREAKING
          </span>
          <span className="text-sm opacity-90 font-medium">Documentation Audit Results • Monday, August 5, 2025</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          $4.4M in Services Discovered Through Documentation Audit
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 opacity-95 font-light">
          WFD delivers exceptional services. We just haven't been counting them all.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/15 backdrop-blur rounded-xl p-5 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 opacity-80" />
              <span className="text-xs uppercase tracking-wider opacity-80">Live Count</span>
            </div>
            <div className="text-3xl font-bold">{servicesCount.toLocaleString()}</div>
            <div className="text-sm opacity-90">Services documented today</div>
          </div>
          
          <div className="bg-white/15 backdrop-blur rounded-xl p-5 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 opacity-80" />
              <span className="text-xs uppercase tracking-wider opacity-80">This Week</span>
            </div>
            <div className="text-3xl font-bold">${weekValue.toLocaleString()}</div>
            <div className="text-sm opacity-90">Value captured this week</div>
          </div>
          
          <div className="bg-white/15 backdrop-blur rounded-xl p-5 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <ChevronRight className="w-5 h-5 opacity-80" />
              <span className="text-xs uppercase tracking-wider opacity-80">To Target</span>
            </div>
            <div className="text-3xl font-bold">{remainingPercentage}%</div>
            <div className="text-sm opacity-90">To reach 90% target</div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-3 font-medium">
            <span>Documentation Recovery Progress</span>
            <span className="font-bold">{progressPercentage}% → {targetPercentage}%</span>
          </div>
          <div className="bg-white/20 rounded-full h-8 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-300 transition-all duration-1000 relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs mt-2 opacity-80">
            <span>$3.4M documented</span>
            <span>$1.0M opportunity remaining</span>
          </div>
        </div>
        
        <Button 
          size="lg" 
          className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-all"
          onClick={() => document.getElementById('discovery-story')?.scrollIntoView({ behavior: 'smooth' })}
        >
          See How We Found $4.4M 
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};