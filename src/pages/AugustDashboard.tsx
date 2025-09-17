import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { augustMetrics } from '@/data/augustMetrics';
import { AlertTriangle, Info, Calendar } from 'lucide-react';

// WFD Brand Colors
const WFD_NAVY = '#0A2B4C';
const WFD_BLUE = '#009FDF';
const WFD_GOLD = '#FDB813';
const WFD_NEGATIVE_RED = '#ef4444'; // Maintained for universal "negative" meaning

// A simple, reusable glassmorphism card component, now brand-aligned
const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-900/40 backdrop-blur-lg rounded-2xl shadow-lg border border-sky-400/20 text-white p-6 ${className}`}>
    {children}
  </div>
);

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/80 p-3 border border-sky-400/30 rounded-lg text-sm shadow-xl">
        <p className="label font-bold text-base mb-1">{`${label}`}</p>
        <p className="intro" style={{ color: payload[0].color }}>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Generate program performance data from augustMetrics
const programPerformanceData = augustMetrics.programs.map((program, index) => ({
  name: program.name,
  clients: program.metrics.uniqueClients,
  color: [WFD_BLUE, 'rgba(0, 159, 223, 0.8)', 'rgba(0, 159, 223, 0.6)', WFD_GOLD, 'rgba(253, 184, 19, 0.8)'][index] || WFD_BLUE
}));

// Calculate housing outcomes from augustMetrics (8 housed + 15 other exits)
const totalExits = augustMetrics.overview.totalExits;
const housingPlacements = augustMetrics.overview.housingPlacements;
const otherExits = totalExits - housingPlacements;

const housingOutcomesData = [
  { name: 'Housed', value: housingPlacements },
  { name: 'Other Exits', value: otherExits }
];
const HOUSING_COLORS = [WFD_BLUE, WFD_GOLD];

// July to August trajectory data from monthOverMonth
const trajectoryData = [
  { 
    month: 'July', 
    clients: augustMetrics.monthOverMonth.july2025.clients,
    exits: 0, // Not available in data structure
    housed: augustMetrics.monthOverMonth.july2025.housed
  },
  { 
    month: 'August', 
    clients: augustMetrics.monthOverMonth.august2025.clients,
    exits: augustMetrics.overview.totalExits,
    housed: augustMetrics.monthOverMonth.august2025.housed
  }
];


// Main Dashboard Component
export const AugustDashboard = () => {
  const [selectedView, setSelectedView] = useState('overview');

  const renderContent = () => {
    switch (selectedView) {
      case 'overview':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-sky-300">Total Clients Served</CardTitle>
                    <p className="text-sm text-white/70">Unique clients across all programs</p>
                </CardHeader>
                <CardContent>
                    <p className="text-6xl font-bold">{augustMetrics.overview.totalClients}</p>
                </CardContent>
            </GlassCard>
            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-sky-300">Housing Success Rate</CardTitle>
                    <p className="text-sm text-white/70">Of all program exits</p>
                </CardHeader>
                <CardContent>
                    <p className="text-6xl font-bold">{augustMetrics.overview.successRate}%</p>
                    <p className="text-sm text-white/70 mt-2">({augustMetrics.overview.housingPlacements} of {augustMetrics.overview.totalExits} exits)</p>
                </CardContent>
            </GlassCard>
            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-sky-300">Services Delivered</CardTitle>
                    <p className="text-sm text-white/70">Total service interactions</p>
                </CardHeader>
                <CardContent>
                    <p className="text-6xl font-bold">{augustMetrics.overview.totalMeals}</p>
                    <p className="text-sm text-white/70 mt-1">Meals + Bed Nights</p>
                </CardContent>
            </GlassCard>
            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-sky-300">Data Quality</CardTitle>
                    <p className="text-sm text-white/70">Compliance score</p>
                </CardHeader>
                <CardContent>
                    <p className="text-6xl font-bold">{augustMetrics.compliance.overallCompliance}%</p>
                </CardContent>
            </GlassCard>
          </motion.div>
        );
      case 'programs':
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GlassCard className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-sky-300">Client Distribution by Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={programPerformanceData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis type="number" stroke="rgba(255, 255, 255, 0.7)" />
                                <YAxis dataKey="name" type="category" stroke="rgba(255, 255, 255, 0.7)" width={120} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 159, 223, 0.1)' }} />
                                <Bar dataKey="clients" name="Clients Served" barSize={30}>
                                    {programPerformanceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </GlassCard>
            </motion.div>
        );
      case 'impact':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-sky-300">July → August Growth</CardTitle>
                    <p className="text-sm text-white/70 pt-1">Pre-pilot scale-up trajectory</p>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={trajectoryData} margin={{ top: 30, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                            <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.7)" />
                            <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 159, 223, 0.1)' }}/>
                            <Legend wrapperStyle={{ color: 'white' }}/>
                            <Bar dataKey="clients" name="Total Clients" fill={WFD_BLUE} />
                            <Bar dataKey="exits" name="Total Exits" fill={WFD_GOLD} />
                            <Bar dataKey="housed" name="Housing Placements" fill="rgba(0, 159, 223, 0.8)" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </GlassCard>

            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-sky-300">August Exit Outcomes</CardTitle>
                    <p className="text-sm text-white/70 pt-1">Program completion distribution</p>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={housingOutcomesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {housingOutcomesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={HOUSING_COLORS[index % HOUSING_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </GlassCard>

            <GlassCard className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-sky-300">Key Performance Indicators</CardTitle>
                    <p className="text-sm text-white/70 pt-1">August 2025 baseline metrics</p>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {augustMetrics.kpis.map((kpi, index) => (
                        <div key={index} className="text-center">
                            <p className="text-2xl font-bold text-sky-300">{kpi.value}</p>
                            <p className="text-sm text-white/70">{kpi.label}</p>
                        </div>
                    ))}
                </CardContent>
            </GlassCard>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2B4C] to-[#0d3b66] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Pre-Pilot Banner */}
        <div className="bg-amber-600/20 border border-amber-500/50 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="text-amber-400 h-5 w-5" />
          <div className="flex-1">
            <h2 className="font-semibold text-amber-200">August 2025 Pre-Pilot Baseline Data</h2>
            <p className="text-sm text-amber-100/80">
              This dashboard displays baseline metrics collected prior to the September 1, 2025 pilot validation phase. 
              Data sourced from WFD Excel reports under the Recovery Compass + Whittier First Day MOU partnership.
            </p>
          </div>
          <Calendar className="text-amber-400 h-5 w-5" />
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">August 2025 Baseline Dashboard</h1>
            <p className="text-sky-200/80 mt-2">Environmental Response Design Evidence Collection</p>
          </div>
          <div className="bg-slate-900/40 p-1 rounded-full flex space-x-1 border border-sky-400/20">
            {['overview', 'programs', 'impact'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors relative ${selectedView === view ? 'text-white' : 'text-white/60 hover:bg-white/10'}`}
              >
                {selectedView === view && <motion.div layoutId="active-pill" className="absolute inset-0 bg-sky-500/50 rounded-full" />}
                <span className="relative z-10 capitalize">{view}</span>
              </button>
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>

        {/* Data Provenance Footer */}
        <div className="mt-12 pt-6 border-t border-sky-400/20">
          <div className="flex items-center justify-between text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>Data Quality: {augustMetrics.compliance.overallCompliance}% compliance</span>
            </div>
            <div className="text-right">
              <p>Data Source: WFD Master Program Data Sheet</p>
              <p>Last Updated: September 12, 2025, 2:27 PM PDT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AugustDashboard;