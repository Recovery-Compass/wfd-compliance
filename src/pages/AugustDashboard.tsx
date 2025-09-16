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
  CreditCard,
  ArrowRight,
  Calendar,
  Target,
  DollarSign,
  Building2,
  Heart,
  Brain,
  Bus,
  Award
} from 'lucide-react';
import augustMetrics, { getTopPerformer, generateGrantNarrative, calculateProgramKPIs } from '@/data/augustMetrics';

export default function AugustDashboard() {
  const [selectedView, setSelectedView] = useState<'overview' | 'programs' | 'services' | 'grant'>('overview');
  const topPerformer = getTopPerformer();
  const grantNarrative = generateGrantNarrative();

  // Calculate key metrics
  const totalServicesValue = augustMetrics.financialImpact.totalServicesValue;
  const mealsPerClient = (augustMetrics.overview.totalMeals / augustMetrics.overview.totalClients).toFixed(1);
  const bedNightsPerClient = (augustMetrics.overview.totalBedNights / augustMetrics.overview.totalClients).toFixed(1);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900">
      {/* Live Data Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                WFD August 2025 Performance Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive metrics from {augustMetrics.overview.totalClients} clients across 5 programs
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-600 text-white px-3 py-1 text-sm">
                <Calendar className="w-4 h-4 mr-2 inline" />
                LIVE DATA
              </Badge>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Last Updated: {augustMetrics.lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {['overview', 'programs', 'services', 'grant'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view as any)}
                className={`py-4 px-2 border-b-2 transition-colors capitalize ${
                  selectedView === view
                    ? 'border-purple-600 text-purple-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Section */}
        {selectedView === 'overview' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-l-purple-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">
                        {augustMetrics.overview.totalClients}
                      </span>
                      <p className="text-xs text-green-600 mt-1 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +708% from July
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">People Housed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">
                        {augustMetrics.overview.housingPlacements}
                      </span>
                      <p className="text-xs text-blue-600 mt-1">
                        {augustMetrics.overview.successRate}% success rate
                      </p>
                    </div>
                    <Home className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Meals Served</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">
                        {augustMetrics.overview.totalMeals.toLocaleString()}
                      </span>
                      <p className="text-xs text-slate-600 mt-1">
                        {mealsPerClient} per client
                      </p>
                    </div>
                    <Utensils className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">
                        {augustMetrics.overview.documentsObtained.total}
                      </span>
                      <p className="text-xs text-slate-600 mt-1">
                        {augustMetrics.overview.documentsObtained.ids} IDs, {augustMetrics.overview.documentsObtained.ssCards} SS
                      </p>
                    </div>
                    <FileText className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Client Flow Pipeline */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  August 2025 Client Journey Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-950/20 dark:to-green-950/20 rounded-lg">
                  <div className="text-center flex-1">
                    <div className="text-4xl font-bold text-purple-600">
                      {augustMetrics.overview.totalClients}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Intake</div>
                  </div>
                  <ArrowRight className="w-8 h-8 text-slate-400 mx-4" />
                  <div className="text-center flex-1">
                    <div className="text-4xl font-bold text-blue-600">
                      {augustMetrics.overview.totalClients - augustMetrics.overview.totalExits}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Active</div>
                  </div>
                  <ArrowRight className="w-8 h-8 text-slate-400 mx-4" />
                  <div className="text-center flex-1">
                    <div className="text-4xl font-bold text-orange-600">
                      {augustMetrics.overview.totalExits}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Exits</div>
                  </div>
                  <ArrowRight className="w-8 h-8 text-slate-400 mx-4" />
                  <div className="text-center flex-1">
                    <div className="text-4xl font-bold text-green-600">
                      {augustMetrics.overview.housingPlacements}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Housed</div>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      {augustMetrics.overview.successRate}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performer Highlight */}
            <Card className="mb-8 border-2 border-purple-500">
              <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-600" />
                  Top Performing Program
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-600 mb-2">{topPerformer.name}</h3>
                  <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
                    {topPerformer.metrics.successRate}%
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Housing Success Rate
                  </p>
                  <div className="mt-4 flex justify-center gap-4">
                    <Badge variant="secondary">
                      {topPerformer.metrics.housedClients} housed
                    </Badge>
                    <Badge variant="secondary">
                      {topPerformer.metrics.exitedClients} exits
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Programs Section */}
        {selectedView === 'programs' && (
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Program Performance Analysis
            </h2>
            {augustMetrics.programs.map((program) => {
              const kpis = calculateProgramKPIs(program.name);
              return (
                <Card key={program.name} className={`border-l-4 ${
                  program.performance === 'exceptional' ? 'border-l-green-600' :
                  program.performance === 'good' ? 'border-l-blue-600' :
                  program.performance === 'needs-improvement' ? 'border-l-orange-600' :
                  'border-l-gray-400'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{program.name}</CardTitle>
                      <Badge variant={
                        program.performance === 'exceptional' ? 'default' :
                        program.performance === 'good' ? 'secondary' :
                        program.performance === 'needs-improvement' ? 'destructive' :
                        'outline'
                      }>
                        {program.performance}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Clients</p>
                        <p className="text-2xl font-bold">{program.metrics.uniqueClients}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Housed</p>
                        <p className="text-2xl font-bold text-green-600">{program.metrics.housedClients}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Success Rate</p>
                        <p className="text-2xl font-bold">{program.metrics.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Meals</p>
                        <p className="text-2xl font-bold">{program.metrics.meals.toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                      {program.notes}
                    </p>
                    {program.metrics.uhaApplications && (
                      <Badge className="mt-2" variant="outline">
                        {program.metrics.uhaApplications} UHA Applications
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Services Section */}
        {selectedView === 'services' && (
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Service Delivery Metrics
            </h2>
            
            {/* Basic Needs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Basic Needs Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {augustMetrics.services.basicNeeds.meals.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Meals Served</p>
                    <p className="text-xs text-green-600">${augustMetrics.services.basicNeeds.mealValue.toLocaleString()} value</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {augustMetrics.services.basicNeeds.bedNights.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Bed Nights</p>
                    <p className="text-xs text-green-600">${augustMetrics.services.basicNeeds.bedNightValue.toLocaleString()} value</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {augustMetrics.services.basicNeeds.hygieneKits}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Hygiene Kits</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Healthcare */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-500" />
                  Healthcare Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {augustMetrics.services.healthcare.medicalServices}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Medical Services</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {augustMetrics.services.healthcare.mentalHealthSessions}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Mental Health</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {augustMetrics.services.healthcare.wellnessChecks}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Wellness Checks</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {augustMetrics.services.healthcare.medicationsProvided}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Medications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bus className="w-5 h-5 mr-2 text-blue-500" />
                  Support Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {augustMetrics.services.supportServices.transportation.total}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Transportation</p>
                    <p className="text-xs text-slate-500">
                      {augustMetrics.services.supportServices.transportation.medical} medical, 
                      {augustMetrics.services.supportServices.transportation.dmv} DMV
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {augustMetrics.services.supportServices.caseManagement.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Case Mgmt Hours</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {augustMetrics.services.supportServices.groupActivities}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Group Activities</p>
                    <p className="text-xs text-slate-500">
                      {augustMetrics.services.supportServices.participantsInActivities} participants
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Service Value */}
            <Card className="border-2 border-green-500">
              <CardHeader className="bg-green-50 dark:bg-green-950/20">
                <CardTitle>Total Service Value</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-green-600">
                    ${totalServicesValue.toLocaleString()}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Total value of services provided in August 2025
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Grant Section */}
        {selectedView === 'grant' && (
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              CCF Grant Application Positioning
            </h2>
            
            {/* Grant Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Request Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">
                    ${augustMetrics.grantMetrics.requestAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">CCF Grant</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Additional Housing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">
                    +{augustMetrics.grantMetrics.projections.withCCFFunding.annualHoused - 
                       augustMetrics.grantMetrics.projections.withCurrentFunding.annualHoused}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">People/Year</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">ROI Multiple</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-600">
                    {augustMetrics.grantMetrics.roiMultiple}x
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Return on Investment</p>
                </CardContent>
              </Card>
            </div>

            {/* Grant Narrative */}
            <Card className="border-2 border-green-500">
              <CardHeader className="bg-green-50 dark:bg-green-950/20">
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Grant Narrative
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  {grantNarrative}
                </p>
              </CardContent>
            </Card>

            {/* Alignment Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>CCF Alignment Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(augustMetrics.grantMetrics.ccfAlignment).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <Badge variant={value ? "default" : "destructive"}>
                        {value ? "✓ Met" : "✗ Not Met"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projections */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Current Success Rate</span>
                      <span className="font-bold">{augustMetrics.grantMetrics.projections.withCurrentFunding.successRate}%</span>
                    </div>
                    <Progress value={augustMetrics.grantMetrics.projections.withCurrentFunding.successRate} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">With CCF Funding</span>
                      <span className="font-bold">{augustMetrics.grantMetrics.projections.withCCFFunding.successRate}%</span>
                    </div>
                    <Progress value={augustMetrics.grantMetrics.projections.withCCFFunding.successRate} className="bg-green-100" />
                  </div>
                  <Badge className="w-full justify-center py-2 bg-green-600">
                    {augustMetrics.grantMetrics.projections.withCCFFunding.improvement} Improvement
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Data Source: {augustMetrics.dataSource}</p>
          <p className="mt-1">Recovery Compass + Whittier First Day Partnership</p>
          <p className="mt-1">MOU Executed: August 29, 2025</p>
        </div>
      </div>
    </div>
  );
}