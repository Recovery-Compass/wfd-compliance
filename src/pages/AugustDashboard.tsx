import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Home, 
  Utensils, 
  Activity,
  FileText,
  DollarSign,
  Building2,
  Heart,
  Brain,
  Award,
  Target,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Share2,
  Calendar,
  ChevronRight,
  Sparkles,
  BarChart3,
  PieChart,
  TrendingUp as TrendIcon
} from 'lucide-react';
import augustMetrics, { getTopPerformer, generateGrantNarrative, calculateProgramKPIs } from '@/data/augustMetrics';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

// Premium color palette
const colors = {
  primary: '#8b5cf6',
  secondary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  gradient: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    blue: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    dark: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
  }
};

// Glassmorphic card component
const GlassCard = ({ children, className = '', gradient = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`
      relative overflow-hidden rounded-2xl
      backdrop-blur-xl bg-white/10
      border border-white/20
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      ${gradient ? 'bg-gradient-to-br from-white/20 to-white/5' : ''}
      ${className}
    `}
  >
    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
    {children}
  </motion.div>
);

// Animated number component
const AnimatedNumber = ({ value, prefix = '', suffix = '', decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {prefix}
      <motion.span
        animate={{ 
          opacity: [0.5, 1],
          scale: [0.98, 1]
        }}
        transition={{ duration: 0.5 }}
      >
        {displayValue.toLocaleString(undefined, { 
          minimumFractionDigits: decimals, 
          maximumFractionDigits: decimals 
        })}
      </motion.span>
      {suffix}
    </motion.span>
  );
};

// Status indicator component
const StatusIndicator = ({ status, label }) => {
  const getStatusConfig = () => {
    switch(status) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/20' };
      case 'warning':
        return { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
      case 'danger':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/20' };
      default:
        return { icon: AlertCircle, color: 'text-blue-400', bg: 'bg-blue-400/20' };
    }
  };
  
  const { icon: Icon, color, bg } = getStatusConfig();
  
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${bg}`}>
      <Icon className={`w-4 h-4 ${color}`} />
      <span className={`text-sm font-medium ${color}`}>{label}</span>
    </div>
  );
};

export default function AugustDashboard() {
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [timeRange, setTimeRange] = useState('month');
  const topPerformer = getTopPerformer();
  const grantNarrative = generateGrantNarrative();

  // Calculate advanced metrics
  const mealsPerClient = (augustMetrics.overview.totalMeals / augustMetrics.overview.totalClients).toFixed(1);
  const bedNightsPerClient = (augustMetrics.overview.totalBedNights / augustMetrics.overview.totalClients).toFixed(1);
  const documentSuccessRate = ((augustMetrics.overview.documentsObtained.total / augustMetrics.overview.totalClients) * 100).toFixed(1);
  const costPerOutcome = augustMetrics.grantMetrics.costPerOutcome;
  const monthlyBurnRate = augustMetrics.financialImpact.monthlyOperatingCost;
  
  // Prepare visualization data
  const programPerformanceData = augustMetrics.programs.map(p => ({
    name: p.name,
    clients: p.metrics.uniqueClients,
    housed: p.metrics.housedClients,
    successRate: p.metrics.successRate,
    performance: p.performance
  }));

  const serviceDistribution = [
    { name: 'Basic Needs', value: augustMetrics.services.basicNeeds.mealValue + augustMetrics.services.basicNeeds.bedNightValue, percentage: 65 },
    { name: 'Healthcare', value: augustMetrics.services.healthcare.medicalServices * 500, percentage: 20 },
    { name: 'Support Services', value: augustMetrics.services.supportServices.caseManagement * 50, percentage: 10 },
    { name: 'Documentation', value: augustMetrics.services.documentation.idsObtained * 200, percentage: 5 }
  ];

  const outcomesTrend = [
    { month: 'Jun', housed: 47, clients: 36, rate: 130.5 },
    { month: 'Jul', housed: 47, clients: 36, rate: 130.5 },
    { month: 'Aug', housed: 8, clients: 291, rate: 34.8 },
    { month: 'Sep (Proj)', housed: 10, clients: 300, rate: 40 },
    { month: 'Oct (Proj)', housed: 12, clients: 310, rate: 42 },
    { month: 'Nov (Proj)', housed: 14, clients: 320, rate: 45 }
  ];

  const CHART_COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Premium Header */}
      <GlassCard className="sticky top-0 z-50 rounded-none border-x-0 border-t-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl"
              >
                <Activity className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  WFD Performance Command Center
                </h1>
                <p className="text-sm text-white/70">
                  August 2025 • {augustMetrics.overview.totalClients} Lives Impacted
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <StatusIndicator 
                status="success" 
                label="Live Data"
              />
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Download className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Eye className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-6">
        <GlassCard className="p-2">
          <div className="flex gap-2">
            {['overview', 'impact', 'programs', 'financials', 'grant'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`
                  flex-1 px-4 py-3 rounded-lg font-medium capitalize transition-all
                  ${selectedView === view 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                    : 'text-white/70 hover:bg-white/10'
                  }
                `}
              >
                {view === 'overview' && <BarChart3 className="w-4 h-4 inline mr-2" />}
                {view === 'impact' && <TrendIcon className="w-4 h-4 inline mr-2" />}
                {view === 'programs' && <Building2 className="w-4 h-4 inline mr-2" />}
                {view === 'financials' && <DollarSign className="w-4 h-4 inline mr-2" />}
                {view === 'grant' && <Target className="w-4 h-4 inline mr-2" />}
                {view}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <AnimatePresence mode="wait">
          {/* Overview Section */}
          {selectedView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Hero Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard gradient>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-500/20 rounded-xl">
                        <Users className="w-6 h-6 text-purple-400" />
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-0">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +708%
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/60">Total Clients Served</p>
                      <p className="text-3xl font-bold text-white">
                        <AnimatedNumber value={291} />
                      </p>
                      <p className="text-xs text-white/50">
                        Up from 36 in July
                      </p>
                    </div>
                  </CardContent>
                </GlassCard>

                <GlassCard gradient>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-500/20 rounded-xl">
                        <Home className="w-6 h-6 text-green-400" />
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-0">
                        34.8%
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/60">Housing Placements</p>
                      <p className="text-3xl font-bold text-white">
                        <AnimatedNumber value={8} />
                      </p>
                      <div className="mt-2">
                        <Progress value={34.8} className="h-1.5 bg-white/10" />
                      </div>
                    </div>
                  </CardContent>
                </GlassCard>

                <GlassCard gradient>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-500/20 rounded-xl">
                        <Utensils className="w-6 h-6 text-blue-400" />
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-0">
                        {mealsPerClient}/client
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/60">Meals Served</p>
                      <p className="text-3xl font-bold text-white">
                        <AnimatedNumber value={13865} />
                      </p>
                      <p className="text-xs text-white/50">
                        Essential nutrition support
                      </p>
                    </div>
                  </CardContent>
                </GlassCard>

                <GlassCard gradient>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-orange-500/20 rounded-xl">
                        <FileText className="w-6 h-6 text-orange-400" />
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-0">
                        {documentSuccessRate}%
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/60">Documents Obtained</p>
                      <p className="text-3xl font-bold text-white">
                        <AnimatedNumber value={22} />
                      </p>
                      <p className="text-xs text-white/50">
                        17 IDs, 5 SS Cards
                      </p>
                    </div>
                  </CardContent>
                </GlassCard>
              </div>

              {/* Client Journey Flow */}
              <GlassCard>
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    Client Journey Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    {[
                      { label: 'Intake', value: 291, color: 'from-purple-500 to-blue-500' },
                      { label: 'Active', value: 268, color: 'from-blue-500 to-cyan-500' },
                      { label: 'Exits', value: 23, color: 'from-cyan-500 to-green-500' },
                      { label: 'Housed', value: 8, color: 'from-green-500 to-emerald-500' }
                    ].map((stage, index) => (
                      <React.Fragment key={stage.label}>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex-1 text-center"
                        >
                          <div className={`
                            relative p-6 rounded-2xl
                            bg-gradient-to-br ${stage.color}
                            shadow-xl
                          `}>
                            <div className="text-4xl font-bold text-white mb-2">
                              <AnimatedNumber value={stage.value} />
                            </div>
                            <div className="text-sm text-white/80">{stage.label}</div>
                            {stage.label === 'Housed' && (
                              <Badge className="mt-2 bg-white/20 text-white border-0">
                                34.8% Success
                              </Badge>
                            )}
                          </div>
                        </motion.div>
                        {index < 3 && (
                          <ChevronRight className="w-8 h-8 text-white/30" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>

              {/* Top Performer Spotlight */}
              <GlassCard className="overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent" />
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Award className="w-8 h-8 text-yellow-400" />
                        <h3 className="text-2xl font-bold text-white">
                          Top Performing Program
                        </h3>
                      </div>
                      <p className="text-4xl font-bold text-white mb-2">
                        {topPerformer.name}
                      </p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            {topPerformer.metrics.successRate}%
                          </p>
                          <p className="text-sm text-white/60">Success Rate</p>
                        </div>
                        <div className="space-y-2">
                          <Badge className="bg-green-500/20 text-green-400 border-0">
                            {topPerformer.metrics.housedClients} housed
                          </Badge>
                          <Badge className="bg-blue-500/20 text-blue-400 border-0">
                            {topPerformer.metrics.exitedClients} exits
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-48 h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart data={[{ value: topPerformer.metrics.successRate, fill: '#fbbf24' }]}>
                          <RadialBar
                            dataKey="value"
                            cornerRadius={10}
                            fill="#fbbf24"
                            background={{ fill: 'rgba(255,255,255,0.1)' }}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </GlassCard>
            </motion.div>
          )}

          {/* Impact Section */}
          {selectedView === 'impact' && (
            <motion.div
              key="impact"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Outcome Trends */}
              <GlassCard>
                <CardHeader className="border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Housing Outcomes Trajectory</CardTitle>
                    <div className="flex gap-2">
                      {['month', 'quarter', 'year'].map((range) => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`
                            px-3 py-1 rounded-lg text-sm capitalize transition-all
                            ${timeRange === range 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                            }
                          `}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={outcomesTrend}>
                      <defs>
                        <linearGradient id="colorHoused" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="clients" 
                        stroke="#8b5cf6" 
                        fillOpacity={1} 
                        fill="url(#colorClients)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="housed" 
                        stroke="#10b981" 
                        fillOpacity={1} 
                        fill="url(#colorHoused)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </GlassCard>

              {/* Service Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                  <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-white">Service Value Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ResponsiveContainer width="100%" height={250}>
                      <RePieChart>
                        <Pie
                          data={serviceDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="percentage"
                        >
                          {serviceDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {serviceDistribution.map((item, index) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                            />
                            <span className="text-sm text-white/70">{item.name}</span>
                          </div>
                          <span className="text-sm font-medium text-white">
                            ${item.value.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </GlassCard>

                <GlassCard>
                  <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-white">Monthly Service Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        { label: 'Meals per Client', value: parseFloat(mealsPerClient), max: 100, color: 'bg-blue-500' },
                        { label: 'Bed Nights per Client', value: parseFloat(bedNightsPerClient), max: 50, color: 'bg-purple-500' },
                        { label: 'Medical Services', value: 178, max: 250, color: 'bg-green-500' },
                        { label: 'Mental Health Sessions', value: 60, max: 100, color: 'bg-orange-500' }
                      ].map((metric) => (
                        <div key={metric.label} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">{metric.label}</span>
                            <span className="text-white font-medium">{metric.value}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full ${metric.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </GlassCard>
              </div>

              {/* Social Return on Investment */}
              <GlassCard className="bg-gradient-to-br from-green-500/10 to-transparent">
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Social Return on Investment
                    </h3>
                    <div className="flex items-center justify-center gap-8">
                      <div>
                        <p className="text-5xl font-bold text-green-400">
                          {augustMetrics.grantMetrics.roiMultiple}x
                        </p>
                        <p className="text-sm text-white/60 mt-2">ROI Multiple</p>
                      </div>
                      <div className="text-left space-y-2">
                        <p className="text-white/80">
                          <span className="text-green-400 font-bold">$657,550</span> in services delivered
                        </p>
                        <p className="text-white/80">
                          <span className="text-blue-400 font-bold">$328,775</span> in tax savings
                        </p>
                        <p className="text-white/80">
                          <span className="text-purple-400 font-bold">$1.3M</span> social value created
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </GlassCard>
            </motion.div>
          )}

          {/* Programs Section */}
          {selectedView === 'programs' && (
            <motion.div
              key="programs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Program Performance Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {augustMetrics.programs.map((program) => {
                  const kpis = calculateProgramKPIs(program.name);
                  const performanceColor = {
                    exceptional: 'from-green-500 to-emerald-500',
                    good: 'from-blue-500 to-cyan-500',
                    'needs-improvement': 'from-orange-500 to-red-500',
                    building: 'from-gray-500 to-gray-600'
                  }[program.performance];

                  return (
                    <GlassCard key={program.name} className="cursor-pointer hover:scale-105 transition-transform">
                      <div className={`h-2 bg-gradient-to-r ${performanceColor}`} />
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-white">{program.name}</h3>
                          <Badge className={`
                            ${program.performance === 'exceptional' ? 'bg-green-500/20 text-green-400' :
                              program.performance === 'good' ? 'bg-blue-500/20 text-blue-400' :
                              program.performance === 'needs-improvement' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-gray-500/20 text-gray-400'
                            } border-0
                          `}>
                            {program.performance}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-3xl font-bold text-white">
                              {program.metrics.uniqueClients}
                            </p>
                            <p className="text-xs text-white/60">Clients</p>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-green-400">
                              {program.metrics.housedClients}
                            </p>
                            <p className="text-xs text-white/60">Housed</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white/60">Success Rate</span>
                              <span className="text-white font-medium">{program.metrics.successRate}%</span>
                            </div>
                            <Progress 
                              value={program.metrics.successRate} 
                              className="h-2 bg-white/10"
                            />
                          </div>
                          
                          <div className="pt-3 border-t border-white/10">
                            <p className="text-xs text-white/50 italic">
                              {program.notes}
                            </p>
                          </div>

                          {program.metrics.uhaApplications && (
                            <Badge className="w-full justify-center bg-purple-500/20 text-purple-400 border-0">
                              {program.metrics.uhaApplications} UHA Applications
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </GlassCard>
                  );
                })}
              </div>

              {/* Program Comparison Chart */}
              <GlassCard>
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-white">Program Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={programPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="clients" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="housed" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </GlassCard>
            </motion.div>
          )}

          {/* Financials Section */}
          {selectedView === 'financials' && (
            <motion.div
              key="financials"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Financial KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard gradient>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <DollarSign className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="text-sm text-white/60">Total Service Value</p>
                        <p className="text-2xl font-bold text-white">
                          $<AnimatedNumber value={657550} />
                        </p>
                      </div>
                    </div>
                    <Progress value={75} className="h-2 bg-white/10" />
                    <p className="text-xs text-white/50 mt-2">75% of annual target</p>
                  </CardContent>
                </GlassCard>

                <GlassCard gradient>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-sm text-white/60">Cost per Housing</p>
                        <p className="text-2xl font-bold text-white">
                          $<AnimatedNumber value={costPerOutcome} />
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">15% below benchmark</span>
                    </div>
                  </CardContent>
                </GlassCard>

                <GlassCard gradient>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-8 h-8 text-purple-400" />
                      <div>
                        <p className="text-sm text-white/60">Efficiency Ratio</p>
                        <p className="text-2xl font-bold text-white">
                          <AnimatedNumber value={1.36} decimals={2} />x
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-white/50">Value created per dollar spent</p>
                  </CardContent>
                </GlassCard>
              </div>

              {/* Cost Breakdown */}
              <GlassCard>
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-white">Program Cost Efficiency Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {augustMetrics.programs.map((program) => {
                      const efficiency = program.metrics.housedClients > 0 
                        ? (program.metrics.uniqueClients * 2000 / program.metrics.housedClients).toFixed(0)
                        : 'Building';
                      
                      return (
                        <div key={program.name} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{program.name}</p>
                            <p className="text-sm text-white/60">
                              {program.metrics.uniqueClients} clients • {program.metrics.housedClients} housed
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-white">
                              {efficiency === 'Building' ? efficiency : `$${efficiency}`}
                            </p>
                            <p className="text-xs text-white/50">
                              {efficiency === 'Building' ? 'Pipeline Phase' : 'Per Housing'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </GlassCard>
            </motion.div>
          )}

          {/* Grant Section */}
          {selectedView === 'grant' && (
            <motion.div
              key="grant"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Grant Opportunity Hero */}
              <GlassCard className="bg-gradient-to-br from-green-500/10 to-transparent">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      CCF Grant Application Ready
                    </h2>
                    <p className="text-white/70">
                      Data-driven evidence for transformative funding
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-green-400">
                        $<AnimatedNumber value={150000} />
                      </p>
                      <p className="text-sm text-white/60 mt-2">Request Amount</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-blue-400">
                        +<AnimatedNumber value={29} />
                      </p>
                      <p className="text-sm text-white/60 mt-2">Additional Housed/Year</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-purple-400">
                        <AnimatedNumber value={3.25} decimals={2} />x
                      </p>
                      <p className="text-sm text-white/60 mt-2">ROI Multiple</p>
                    </div>
                  </div>

                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-xl">
                    <h3 className="text-lg font-semibold text-white mb-3">Grant Narrative</h3>
                    <p className="text-white/90 leading-relaxed">
                      {grantNarrative}
                    </p>
                  </div>
                </CardContent>
              </GlassCard>

              {/* Alignment Scorecard */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                  <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-white">CCF Alignment Scorecard</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {Object.entries(augustMetrics.grantMetrics.ccfAlignment).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-sm text-white/70 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          {value ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </GlassCard>

                <GlassCard>
                  <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-white">Impact Projections</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-white/60">Current Rate</span>
                          <span className="text-white font-medium">34.8%</span>
                        </div>
                        <Progress value={34.8} className="h-3 bg-white/10" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-white/60">With CCF Funding</span>
                          <span className="text-white font-medium">45.2%</span>
                        </div>
                        <Progress value={45.2} className="h-3 bg-white/10" />
                      </div>
                      <div className="p-3 bg-green-500/20 rounded-lg text-center">
                        <p className="text-green-400 font-bold">30% Improvement</p>
                      </div>
                    </div>
                  </CardContent>
                </GlassCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <GlassCard className="rounded-none border-x-0 border-b-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-white/50">
            <p>Recovery Compass + Whittier First Day Partnership</p>
            <p>Data: {augustMetrics.dataSource}</p>
            <p>MOU: August 29, 2025</p>
          </div>
        </div>
      </GlassCard>

    </div>
  );
}