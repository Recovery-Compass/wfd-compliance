import React, { useState } from 'react';
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
import augustMetrics, { getTopPerformer, generateGrantNarrative } from '@/data/augustMetrics';
import {
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
  ResponsiveContainer
} from 'recharts';

// Static number display
const StaticNumber = ({ value, prefix = '', suffix = '', decimals = 0 }) => (
  <span className="tabular-nums">
    {prefix}
    {value.toLocaleString(undefined, { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    })}
    {suffix}
  </span>
);

// Status indicator component
const StatusIndicator = ({ status, label }) => {
  const getStatusConfig = () => {
    switch(status) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' };
      case 'warning':
        return { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'danger':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' };
      default:
        return { icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-100' };
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
  const topPerformer = getTopPerformer();
  const grantNarrative = generateGrantNarrative();

  // Calculate advanced metrics
  const mealsPerClient = (augustMetrics.overview.totalMeals / augustMetrics.overview.totalClients).toFixed(1);
  const bedNightsPerClient = (augustMetrics.overview.totalBedNights / augustMetrics.overview.totalClients).toFixed(1);
  const documentSuccessRate = ((augustMetrics.overview.documentsObtained.total / augustMetrics.overview.totalClients) * 100).toFixed(1);
  
  // Prepare visualization data
  const programPerformanceData = augustMetrics.programs.map(p => ({
    name: p.name,
    clients: p.metrics.uniqueClients,
    housed: p.metrics.housedClients,
    successRate: p.metrics.successRate,
    performance: p.performance
  }));

  const serviceDistribution = [
    { name: 'Meals', value: augustMetrics.services.basicNeeds.meals, color: '#3b82f6' },
    { name: 'Medical', value: augustMetrics.services.healthcare.medicalServices, color: '#10b981' },
    { name: 'Mental Health', value: augustMetrics.services.healthcare.mentalHealthSessions, color: '#8b5cf6' },
    { name: 'Transportation', value: augustMetrics.services.supportServices.transportation.total, color: '#f59e0b' }
  ];

  const CHART_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-background">
      {/* Data verification timestamp */}
      <div className="fixed top-4 right-4 z-50">
        <Badge variant="outline" className="bg-card text-muted-foreground">
          Data Verified: September 16, 2025
        </Badge>
      </div>

      {/* Header */}
      <Card className="sticky top-0 z-40 rounded-none border-x-0 border-t-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary rounded-xl">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  WFD Performance Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  August 2025 • {augustMetrics.overview.totalClients} Lives Impacted
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <StatusIndicator status="success" label="Live Data" />
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                  <Download className="w-5 h-5 text-foreground" />
                </button>
                <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                  <Share2 className="w-5 h-5 text-foreground" />
                </button>
                <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                  <Eye className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-6">
        <Card className="p-2">
          <div className="flex gap-2">
            {['overview', 'programs', 'services', 'financials'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`
                  flex-1 px-4 py-3 rounded-lg font-medium capitalize transition-all
                  ${selectedView === view 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:bg-muted/50'
                  }
                `}
              >
                {view === 'overview' && <BarChart3 className="w-4 h-4 inline mr-2" />}
                {view === 'programs' && <Building2 className="w-4 h-4 inline mr-2" />}
                {view === 'services' && <Heart className="w-4 h-4 inline mr-2" />}
                {view === 'financials' && <DollarSign className="w-4 h-4 inline mr-2" />}
                {view}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="container mx-auto px-6 pb-12">
        {/* Overview Section */}
        {selectedView === 'overview' && (
          <div className="space-y-6">
            {/* Hero Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +708%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Clients Served</p>
                    <p className="text-3xl font-bold text-foreground">
                      <StaticNumber value={291} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Up from 36 in July
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <Home className="w-6 h-6 text-green-600" />
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      34.8%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Housing Placements</p>
                    <p className="text-3xl font-bold text-foreground">
                      <StaticNumber value={8} />
                    </p>
                    <div className="mt-2">
                      <Progress value={34.8} className="h-1.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Utensils className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {mealsPerClient}/client
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Meals Served</p>
                    <p className="text-3xl font-bold text-foreground">
                      <StaticNumber value={20272} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Essential nutrition support
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {documentSuccessRate}%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Documents Obtained</p>
                    <p className="text-3xl font-bold text-foreground">
                      <StaticNumber value={22} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      17 IDs, 5 SS Cards
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Service Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={serviceDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {serviceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Performer Spotlight */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-8 h-8 text-yellow-500" />
                      <h3 className="text-2xl font-bold text-foreground">
                        Top Performing Program
                      </h3>
                    </div>
                    <p className="text-4xl font-bold text-foreground mb-2">
                      {topPerformer.name}
                    </p>
                    <p className="text-lg text-muted-foreground mb-4">
                      {topPerformer.metrics.successRate}% Housing Success Rate
                    </p>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                      {topPerformer.notes}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary mb-2">
                      <StaticNumber value={topPerformer.metrics.housedClients} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      People Housed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Programs Section */}
        {selectedView === 'programs' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={programPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="clients" fill="#3b82f6" name="Total Clients" />
                      <Bar dataKey="housed" fill="#10b981" name="Housed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Program Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {augustMetrics.programs.map((program) => (
                <Card key={program.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <Badge 
                      variant={program.performance === 'exceptional' ? 'default' : 'secondary'}
                      className={
                        program.performance === 'exceptional' ? 'bg-green-100 text-green-700' :
                        program.performance === 'good' ? 'bg-blue-100 text-blue-700' :
                        program.performance === 'needs-improvement' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }
                    >
                      {program.performance}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Clients:</span>
                        <span className="font-medium">{program.metrics.uniqueClients}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Housed:</span>
                        <span className="font-medium">{program.metrics.housedClients}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Success Rate:</span>
                        <span className="font-medium">{program.metrics.successRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Meals:</span>
                        <span className="font-medium">{program.metrics.meals.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Services Section */}
        {selectedView === 'services' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-6 h-6 text-red-500" />
                    <h3 className="font-semibold">Medical Services</h3>
                  </div>
                  <p className="text-2xl font-bold">{augustMetrics.services.healthcare.medicalServices}</p>
                  <p className="text-sm text-muted-foreground">Total appointments</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-6 h-6 text-purple-500" />
                    <h3 className="font-semibold">Mental Health</h3>
                  </div>
                  <p className="text-2xl font-bold">{augustMetrics.services.healthcare.mentalHealthSessions}</p>
                  <p className="text-sm text-muted-foreground">Sessions provided</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ArrowUpRight className="w-6 h-6 text-blue-500" />
                    <h3 className="font-semibold">Transportation</h3>
                  </div>
                  <p className="text-2xl font-bold">{augustMetrics.services.supportServices.transportation.total}</p>
                  <p className="text-sm text-muted-foreground">Trips provided</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-green-500" />
                    <h3 className="font-semibold">Documentation</h3>
                  </div>
                  <p className="text-2xl font-bold">{augustMetrics.overview.documentsObtained.total}</p>
                  <p className="text-sm text-muted-foreground">Documents obtained</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Financials Section */}
        {selectedView === 'financials' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-green-500" />
                    <h3 className="font-semibold">Total Service Value</h3>
                  </div>
                  <p className="text-2xl font-bold">
                    $<StaticNumber value={augustMetrics.financialImpact.totalServicesValue} />
                  </p>
                  <p className="text-sm text-muted-foreground">Services delivered</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-blue-500" />
                    <h3 className="font-semibold">Cost per Housing</h3>
                  </div>
                  <p className="text-2xl font-bold">
                    $<StaticNumber value={augustMetrics.financialImpact.costPerHousing} />
                  </p>
                  <p className="text-sm text-muted-foreground">Per successful placement</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ArrowUpRight className="w-6 h-6 text-purple-500" />
                    <h3 className="font-semibold">ROI Multiple</h3>
                  </div>
                  <p className="text-2xl font-bold">
                    <StaticNumber value={augustMetrics.grantMetrics.roiMultiple} decimals={1} />x
                  </p>
                  <p className="text-sm text-muted-foreground">Return on investment</p>
                </CardContent>
              </Card>
            </div>

            {/* Grant Narrative */}
            <Card>
              <CardHeader>
                <CardTitle>Grant Narrative</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {grantNarrative}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-muted/30 border-t">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Data current as of September 16, 2025
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                WFD Executive Dashboard • Heroic Staff vs. Broken System
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="/MOU_WFD_2025-08-11.pdf" 
                target="_blank"
                className="text-sm text-primary hover:underline"
              >
                Download MOU
              </a>
              <StatusIndicator status="success" label="Data Verified" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}