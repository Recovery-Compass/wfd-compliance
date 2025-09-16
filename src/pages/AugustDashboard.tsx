import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Home,
  Utensils,
  FileText,
  DollarSign,
  Building2,
  Award,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Share2,
  Eye,
  BarChart3,
  TrendingUp,
  Heart,
  Brain,
  ArrowUpRight,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';

import augustMetrics, {
  getTopPerformer,
  generateGrantNarrative,
} from '@/data/augustMetrics';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

// Import logos
import wfdLogo from '@/assets/wfd-logo.jpg';
import rcLogo from '@/assets/rc-logo.png';

// Simple glass-effect card wrapper - no framer-motion
const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg transition-all hover:bg-white/10 ${className}`}
  >
    {children}
  </div>
);

// Status indicator without animation
const StatusIndicator: React.FC<{
  status: 'success' | 'warning' | 'danger' | 'info';
  label: string;
}> = ({ status, label }) => {
  const config = {
    success: { Icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/20' },
    warning: { Icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
    danger: { Icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/20' },
    info: { Icon: AlertCircle, color: 'text-blue-400', bg: 'bg-blue-400/20' },
  }[status];
  const { Icon, color, bg } = config;
  
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${bg} border border-white/10`}>
      <Icon className={`w-4 h-4 ${color}`} />
      <span className={`text-sm font-medium ${color}`}>{label}</span>
    </div>
  );
};

export default function AugustDashboard() {
  const [selectedView, setSelectedView] = useState<'overview' | 'impact' | 'programs' | 'financials' | 'grant'>('overview');

  // Pull dynamic data from augustMetrics
  const topPerformer = getTopPerformer();
  const grantNarrative = generateGrantNarrative();

  // Corrected overview metrics from audit
  const totalClients = augustMetrics.overview.totalClients;
  const totalMeals = 20272; // corrected from 13,865
  const totalBedNights = 6638; // corrected from 7,605
  const totalHousing = augustMetrics.overview.housingPlacements;
  const totalExits = augustMetrics.overview.totalExits;
  const successRate = ((totalHousing / totalExits) * 100).toFixed(1);

  // Derived per-client metrics
  const mealsPerClient = (totalMeals / totalClients).toFixed(1);
  const bedNightsPerClient = (totalBedNights / totalClients).toFixed(1);
  const documentSuccessRate = ((augustMetrics.overview.documentsObtained.total / totalClients) * 100).toFixed(1);

  // Service totals (corrected)
  const correctedServices = {
    medicalServices: 420,
    mentalHealthSessions: 125,
    transportation: 243,
  };

  // Prepare program data for charts
  const programPerformanceData = augustMetrics.programs.map((p) => ({
    name: p.name,
    clients: p.metrics.uniqueClients,
    housed: p.metrics.housedClients,
    successRate: p.metrics.successRate,
    performance: p.performance,
  }));

  // Service distribution with corrected values
  const serviceDistribution = [
    { name: 'Meals', value: totalMeals, color: '#3b82f6' },
    { name: 'Medical', value: correctedServices.medicalServices, color: '#10b981' },
    { name: 'Mental Health', value: correctedServices.mentalHealthSessions, color: '#8b5cf6' },
    { name: 'Transportation', value: correctedServices.transportation, color: '#f59e0b' },
  ];

  // Outcomes trend data
  const outcomesTrend = [
    { month: 'Jun', housed: 47, clients: 36, rate: 130.5 },
    { month: 'Jul', housed: 47, clients: 36, rate: 130.5 },
    { month: 'Aug', housed: 8, clients: 291, rate: 34.8 },
    { month: 'Sep (Proj)', housed: 10, clients: 300, rate: 40 },
    { month: 'Oct (Proj)', housed: 12, clients: 310, rate: 42 },
    { month: 'Nov (Proj)', housed: 14, clients: 320, rate: 45 }
  ];

  const CHART_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative">
      {/* Verification Badge - Steve Jobs style, minimal */}
      <div className="fixed top-4 right-4 z-50">
        <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
          Data Verified: September 16, 2025
        </Badge>
      </div>

      {/* Header - Steve Jobs minimalist design with both logos */}
      <GlassCard className="sticky top-0 z-40 rounded-none border-x-0 border-t-0">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Left: Partnership branding */}
            <div className="flex items-center gap-6">
              {/* Logo partnership display - clean, minimal */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <img src={rcLogo} alt="Recovery Compass" className="w-10 h-10 rounded-full" />
                  <div className="w-px h-8 bg-white/20"></div>
                  <img src={wfdLogo} alt="Whittier First Day" className="w-10 h-10 rounded" />
                </div>
              </div>
              
              {/* Title section */}
              <div>
                <h1 className="text-2xl font-light text-white tracking-tight">
                  WFD Performance Dashboard
                </h1>
                <p className="text-sm text-white/60 font-light">
                  August 2025 • {totalClients.toLocaleString()} Lives Impacted
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <StatusIndicator status="success" label="Live Data" />
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group">
                  <Download className="w-5 h-5 text-white/70 group-hover:text-white" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group">
                  <Share2 className="w-5 h-5 text-white/70 group-hover:text-white" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group">
                  <Eye className="w-5 h-5 text-white/70 group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Navigation - Refined Steve Jobs style */}
      <div className="container mx-auto px-8 py-6">
        <GlassCard className="p-1">
          <div className="flex gap-1">
            {(['overview', 'impact', 'programs', 'financials', 'grant'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`
                  flex-1 px-6 py-4 rounded-xl font-medium capitalize transition-all duration-200 text-sm
                  ${selectedView === view 
                    ? 'bg-white/20 text-white shadow-sm backdrop-blur-sm' 
                    : 'text-white/60 hover:bg-white/10 hover:text-white/80'
                  }
                `}
              >
                {view === 'overview' && <BarChart3 className="w-4 h-4 inline mr-2" />}
                {view === 'impact' && <TrendingUp className="w-4 h-4 inline mr-2" />}
                {view === 'programs' && <Building2 className="w-4 h-4 inline mr-2" />}
                {view === 'financials' && <DollarSign className="w-4 h-4 inline mr-2" />}
                {view === 'grant' && <Target className="w-4 h-4 inline mr-2" />}
                {view}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="container mx-auto px-8 pb-12">
        {/* Overview Section */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Hero metrics - Large, clean numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Clients */}
              <GlassCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
                    <Users className="w-6 h-6 text-purple-300" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-0 font-medium">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +708%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/50 font-light tracking-wide uppercase">Total Clients Served</p>
                  <p className="text-4xl font-light text-white tabular-nums">{totalClients.toLocaleString()}</p>
                  <p className="text-xs text-white/40 font-light">Up from 36 in July</p>
                </div>
              </GlassCard>

              {/* Housing Placements */}
              <GlassCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-green-500/20 rounded-xl border border-green-400/30">
                    <Home className="w-6 h-6 text-green-300" />
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-300 border-0 font-medium">{successRate}%</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/50 font-light tracking-wide uppercase">Housing Placements</p>
                  <p className="text-4xl font-light text-white tabular-nums">{totalHousing.toLocaleString()}</p>
                  <div className="mt-4">
                    <Progress value={parseFloat(successRate)} className="h-2 bg-white/10" />
                  </div>
                </div>
              </GlassCard>

              {/* Meals Served */}
              <GlassCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
                    <Utensils className="w-6 h-6 text-blue-300" />
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-300 border-0 font-medium">{mealsPerClient}/client</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/50 font-light tracking-wide uppercase">Meals Served</p>
                  <p className="text-4xl font-light text-white tabular-nums">{totalMeals.toLocaleString()}</p>
                  <p className="text-xs text-white/40 font-light">Essential nutrition support</p>
                </div>
              </GlassCard>

              {/* Documents Obtained */}
              <GlassCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-400/30">
                    <FileText className="w-6 h-6 text-orange-300" />
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300 border-0 font-medium">{documentSuccessRate}%</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/50 font-light tracking-wide uppercase">Documents Obtained</p>
                  <p className="text-4xl font-light text-white tabular-nums">{augustMetrics.overview.documentsObtained.total.toLocaleString()}</p>
                  <p className="text-xs text-white/40 font-light">
                    {augustMetrics.overview.documentsObtained.ids} IDs, {augustMetrics.overview.documentsObtained.ssCards} SS Cards
                  </p>
                </div>
              </GlassCard>
            </div>

            {/* Client Journey Flow - Apple-style process flow */}
            <GlassCard>
              <CardHeader className="border-b border-white/10 pb-6">
                <CardTitle className="text-white font-light text-xl flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                  Client Journey Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  {[
                    { label: 'Intake', value: totalClients, color: 'from-purple-500 to-blue-500' },
                    { label: 'Active', value: totalClients - totalExits, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Exits', value: totalExits, color: 'from-cyan-500 to-green-500' },
                    { label: 'Housed', value: totalHousing, color: 'from-green-500 to-emerald-500' },
                  ].map((stage, index) => (
                    <React.Fragment key={stage.label}>
                      <div className="flex-1 text-center">
                        <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${stage.color} shadow-xl border border-white/20`}>
                          <div className="text-5xl font-light text-white mb-3 tabular-nums">{stage.value.toLocaleString()}</div>
                          <div className="text-sm text-white/80 font-light tracking-wide uppercase">{stage.label}</div>
                          {stage.label === 'Housed' && (
                            <Badge className="mt-3 bg-white/20 text-white border-0 font-medium">
                              {successRate}% Success Rate
                            </Badge>
                          )}
                        </div>
                      </div>
                      {index < 3 && (
                        <ChevronRight className="w-8 h-8 text-white/20 mx-4" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </GlassCard>

            {/* Top Performer - Elegant showcase */}
            <GlassCard className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <Award className="w-8 h-8 text-yellow-400" />
                      <h3 className="text-2xl font-light text-white">Top Performing Program</h3>
                    </div>
                    <p className="text-5xl font-light text-white mb-4">{topPerformer.name}</p>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-6xl font-light bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent tabular-nums">
                          {topPerformer.metrics.successRate}%
                        </p>
                        <p className="text-sm text-white/50 font-light tracking-wide uppercase">Success Rate</p>
                      </div>
                      <div className="space-y-3">
                        <Badge className="bg-green-500/20 text-green-300 border-green-400/30 border font-medium">
                          {topPerformer.metrics.housedClients} housed
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 border font-medium block">
                          {topPerformer.metrics.exitedClients} exits
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-white/40 font-light mt-4 max-w-2xl">
                      {topPerformer.notes}
                    </p>
                  </div>
                  
                  {/* Simple circular progress indicator */}
                  <div className="relative w-48 h-48 flex items-center justify-center ml-8">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30"></div>
                    <div className="relative text-center">
                      <div className="text-3xl font-light text-yellow-300 tabular-nums">
                        {topPerformer.metrics.successRate}%
                      </div>
                      <div className="text-xs text-white/50 font-light tracking-wide uppercase">
                        Excellence
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          </div>
        )}

        {/* Impact Section */}
        {selectedView === 'impact' && (
          <div className="space-y-8">
            {/* Housing trajectory */}
            <GlassCard>
              <CardHeader className="border-b border-white/10 pb-6">
                <CardTitle className="text-white font-light text-xl">Housing Outcomes Trajectory</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={outcomesTrend}>
                    <defs>
                      <linearGradient id="colorHoused" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Area type="monotone" dataKey="clients" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorClients)" strokeWidth={2} />
                    <Area type="monotone" dataKey="housed" stroke="#10b981" fillOpacity={1} fill="url(#colorHoused)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </GlassCard>

            {/* Service Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GlassCard>
                <CardHeader className="border-b border-white/10 pb-6">
                  <CardTitle className="text-white font-light text-xl">Service Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={280}>
                    <RePieChart>
                      <Pie 
                        data={serviceDistribution} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60} 
                        outerRadius={100} 
                        paddingAngle={5} 
                        dataKey="value"
                      >
                        {serviceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="mt-6 space-y-3">
                    {serviceDistribution.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-white/70 font-light">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-white tabular-nums">{item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>

              <GlassCard>
                <CardHeader className="border-b border-white/10 pb-6">
                  <CardTitle className="text-white font-light text-xl">Monthly Service Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {[
                      { label: 'Medical Services', value: correctedServices.medicalServices, max: 500, color: 'bg-green-500', icon: Heart },
                      { label: 'Mental Health Sessions', value: correctedServices.mentalHealthSessions, max: 200, color: 'bg-purple-500', icon: Brain },
                      { label: 'Transportation Services', value: correctedServices.transportation, max: 300, color: 'bg-blue-500', icon: ArrowUpRight },
                      { label: 'Documents Obtained', value: augustMetrics.overview.documentsObtained.total, max: 50, color: 'bg-orange-500', icon: FileText },
                    ].map((metric) => (
                      <div key={metric.label} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <metric.icon className="w-5 h-5 text-white/60" />
                            <span className="text-sm text-white/70 font-light">{metric.label}</span>
                          </div>
                          <span className="text-sm text-white font-medium tabular-nums">{metric.value.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${metric.color} rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min((metric.value / metric.max) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </div>
          </div>
        )}

        {/* Programs Section */}
        {selectedView === 'programs' && (
          <div className="space-y-8">
            {/* Program cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {augustMetrics.programs.map((program) => {
                const performanceColor = {
                  exceptional: 'from-green-500 to-emerald-500',
                  good: 'from-blue-500 to-cyan-500',
                  'needs-improvement': 'from-orange-500 to-red-500',
                  building: 'from-gray-500 to-gray-600',
                }[program.performance];
                
                return (
                  <GlassCard key={program.name} className="hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className={`h-1 bg-gradient-to-r ${performanceColor}`} />
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-light text-white">{program.name}</h3>
                        <Badge 
                          className={`font-medium border ${
                            program.performance === 'exceptional'
                              ? 'bg-green-500/20 text-green-300 border-green-400/30'
                              : program.performance === 'good'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                              : program.performance === 'needs-improvement'
                              ? 'bg-orange-500/20 text-orange-300 border-orange-400/30'
                              : 'bg-gray-500/20 text-gray-300 border-gray-400/30'
                          }`}
                        >
                          {program.performance}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-3xl font-light text-white tabular-nums">{program.metrics.uniqueClients}</p>
                          <p className="text-xs text-white/50 font-light tracking-wide uppercase">Clients</p>
                        </div>
                        <div>
                          <p className="text-3xl font-light text-green-300 tabular-nums">{program.metrics.housedClients}</p>
                          <p className="text-xs text-white/50 font-light tracking-wide uppercase">Housed</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white/60 font-light">Success Rate</span>
                            <span className="text-white font-medium tabular-nums">{program.metrics.successRate}%</span>
                          </div>
                          <Progress value={program.metrics.successRate} className="h-2 bg-white/10" />
                        </div>
                        
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-xs text-white/40 font-light italic leading-relaxed">{program.notes}</p>
                        </div>
                        
                        {program.metrics.uhaApplications && program.metrics.uhaApplications > 0 && (
                          <Badge className="w-full justify-center bg-purple-500/20 text-purple-300 border-purple-400/30 border font-medium">
                            {program.metrics.uhaApplications} UHA Applications
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </GlassCard>
                );
              })}
            </div>

            {/* Program comparison chart */}
            <GlassCard>
              <CardHeader className="border-b border-white/10 pb-6">
                <CardTitle className="text-white font-light text-xl">Program Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={programPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="clients" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Total Clients" />
                    <Bar dataKey="housed" fill="#10b981" radius={[4, 4, 0, 0]} name="Housed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </GlassCard>
          </div>
        )}

        {/* Financials Section */}
        {selectedView === 'financials' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GlassCard className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  <h3 className="text-lg font-light text-white">Total Service Value</h3>
                </div>
                <p className="text-4xl font-light text-white tabular-nums mb-2">
                  ${augustMetrics.financialImpact.totalServicesValue.toLocaleString()}
                </p>
                <p className="text-sm text-white/50 font-light">Services delivered</p>
              </GlassCard>

              <GlassCard className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="w-8 h-8 text-blue-400" />
                  <h3 className="text-lg font-light text-white">Cost per Housing</h3>
                </div>
                <p className="text-4xl font-light text-white tabular-nums mb-2">
                  ${augustMetrics.financialImpact.costPerHousing.toLocaleString()}
                </p>
                <p className="text-sm text-white/50 font-light">Per successful placement</p>
              </GlassCard>

              <GlassCard className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                  <h3 className="text-lg font-light text-white">ROI Multiple</h3>
                </div>
                <p className="text-4xl font-light text-white tabular-nums mb-2">
                  {augustMetrics.grantMetrics.roiMultiple.toFixed(1)}x
                </p>
                <p className="text-sm text-white/50 font-light">Return on investment</p>
              </GlassCard>
            </div>

            {/* Grant narrative */}
            <GlassCard>
              <CardHeader className="border-b border-white/10 pb-6">
                <CardTitle className="text-white font-light text-xl">Grant Narrative</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-white/70 font-light leading-relaxed text-lg">
                  {grantNarrative}
                </p>
              </CardContent>
            </GlassCard>
          </div>
        )}

        {/* Grant Section */}
        {selectedView === 'grant' && (
          <div className="space-y-8">
            <GlassCard>
              <CardHeader className="border-b border-white/10 pb-6">
                <CardTitle className="text-white font-light text-xl">CCF Grant Alignment</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-light text-white mb-4">Current Performance</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-white/60">Annual Clients (Projected)</span>
                        <span className="text-white font-medium">{augustMetrics.grantMetrics.projections.withCurrentFunding.annualClients.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Annual Housing Placements</span>
                        <span className="text-white font-medium">{augustMetrics.grantMetrics.projections.withCurrentFunding.annualHoused.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Success Rate</span>
                        <span className="text-white font-medium">{augustMetrics.grantMetrics.projections.withCurrentFunding.successRate}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-light text-white mb-4">With CCF Funding</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-white/60">Annual Clients (Projected)</span>
                        <span className="text-green-300 font-medium">{augustMetrics.grantMetrics.projections.withCCFFunding.annualClients.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Annual Housing Placements</span>
                        <span className="text-green-300 font-medium">{augustMetrics.grantMetrics.projections.withCCFFunding.annualHoused.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Success Rate</span>
                        <span className="text-green-300 font-medium">{augustMetrics.grantMetrics.projections.withCCFFunding.successRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          </div>
        )}
      </div>

      {/* Footer - Partnership branding */}
      <GlassCard className="rounded-none border-x-0 border-b-0">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img src={rcLogo} alt="Recovery Compass" className="w-6 h-6 rounded-full opacity-70" />
                <span className="text-sm text-white/40 font-light">Recovery Compass</span>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-3">
                <img src={wfdLogo} alt="Whittier First Day" className="w-6 h-6 rounded opacity-70" />
                <span className="text-sm text-white/40 font-light">Whittier First Day</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-white/40 font-light">
              <span>Data: August 2025</span>
              <a 
                href="/MOU_WFD_2025-08-11.pdf" 
                target="_blank"
                className="hover:text-white/60 transition-colors"
              >
                Download MOU
              </a>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}