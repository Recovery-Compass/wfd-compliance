import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid, LabelList } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

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

// Data for Program Performance with Brand Colors
const programPerformanceData = [
  { name: 'ICMS', clients: 107, color: WFD_BLUE },
  { name: 'Pathway Home', clients: 105, color: 'rgba(0, 159, 223, 0.8)' },
  { name: 'Hondo', clients: 94, color: 'rgba(0, 159, 223, 0.6)' },
  { name: 'Ted\'s Place', clients: 35, color: WFD_GOLD },
  { name: 'A2C', clients: 32, color: 'rgba(253, 184, 19, 0.8)' },
  { name: 'Midvale', clients: 25, color: 'rgba(253, 184, 19, 0.6)' },
];

// Data for Housing Outcomes
const housingOutcomesData = [
  { name: 'Housed', value: 7 },
  { name: 'Other Positive Exits', value: 19 },
  { name: 'Negative Exits', value: 10 },
];
const HOUSING_COLORS = [WFD_BLUE, WFD_GOLD, WFD_NEGATIVE_RED];

// Data for Housing Outcomes Trajectory
const trajectoryData = [
    { month: 'March', housed: 2, positive: 12, negative: 8 },
    { month: 'April', housed: 4, positive: 15, negative: 6 },
    { month: 'May', housed: 5, positive: 14, negative: 9 },
    { month: 'June', housed: 6, positive: 18, negative: 7 },
    { month: 'July', housed: 8, positive: 16, negative: 5 },
    { month: 'August', housed: 7, positive: 19, negative: 10 },
];

// Data for the new Exit Comparison Chart
const exitComparisonData = [
    { category: 'Other Positive Exits', value: 319 },
    { category: 'Housed', value: 101 }
];


// Main Dashboard Component
export const AugustDashboard = () => {
  const [selectedView, setSelectedView] = useState('impact'); // Default to 'impact' to showcase new chart

  const renderContent = () => {
    switch (selectedView) {
      case 'overview':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-sky-300">Total Clients Served</CardTitle>
                    <p className="text-sm text-white/70">Across all programs in August</p>
                </CardHeader>
                <CardContent>
                    <p className="text-6xl font-bold">398</p>
                </CardContent>
            </GlassCard>
            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-sky-300">Housing Placement Rate</CardTitle>
                    <p className="text-sm text-white/70">Of all exits this month</p>
                </CardHeader>
                <CardContent>
                    <p className="text-6xl font-bold">27%</p>
                    <p className="text-sm text-white/70 mt-2">(7 of 26 total exits)</p>
                </CardContent>
            </GlassCard>
            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-sky-300">Avg. Length of Stay (Housed)</CardTitle>
                    <p className="text-sm text-white/70">For clients who secured housing</p>
                </CardHeader>
                <CardContent>
                    <p className="text-6xl font-bold">319 <span className="text-2xl">days</span></p>
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
                    <CardTitle className="text-xl font-bold text-sky-300">Avg. Length of Stay by Exit Type</CardTitle>
                    <p className="text-sm text-white/70 pt-1">Direct response to the August 13 strategic question about client pathway trends</p>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={exitComparisonData} margin={{ top: 30, right: 20, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                            <XAxis dataKey="category" stroke="rgba(255, 255, 255, 0.7)" />
                            <YAxis stroke="rgba(255, 255, 255, 0.7)" domain={[0, 350]} unit=" days" />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 159, 223, 0.1)' }}/>
                            <Bar dataKey="value" name="Avg. Length of Stay">
                                <LabelList dataKey="value" position="top" style={{ fill: 'white', fontSize: '16px', fontWeight: 'bold' }} />
                                {exitComparisonData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? WFD_GOLD : WFD_BLUE} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </GlassCard>

            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-sky-300">Housing Outcomes Trajectory</CardTitle>
                     <p className="text-sm text-white/70 pt-1">6-Month Trend</p>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={trajectoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)"/>
                            <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.7)"/>
                            <YAxis stroke="rgba(255, 255, 255, 0.7)"/>
                            <Tooltip content={<CustomTooltip />}/>
                            <Legend wrapperStyle={{ color: 'white' }}/>
                            <Line type="monotone" dataKey="housed" name="Housed" stroke={WFD_BLUE} strokeWidth={3} />
                            <Line type="monotone" dataKey="positive" name="Other Positive" stroke={WFD_GOLD} strokeWidth={2} />
                            <Line type="monotone" dataKey="negative" name="Negative" stroke={WFD_NEGATIVE_RED} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </GlassCard>
            <GlassCard>
                <CardHeader>
                    <CardTitle className="text-sky-300">August Exit Distribution</CardTitle>
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
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2B4C] to-[#0d3b66] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">August 2025 Performance</h1>
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
      </div>
    </div>
  );
};

export default AugustDashboard;