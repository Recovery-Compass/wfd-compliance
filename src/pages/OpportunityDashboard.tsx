import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OpportunityDashboard = () => {
  // Data governance achievements
  const dataGovernanceData = [
    { category: 'Before Fix', dataQuality: 65, grantReadiness: 25, credibility: 40 },
    { category: 'After Fix', dataQuality: 95, grantReadiness: 95, credibility: 98 },
    { category: 'Future State', dataQuality: 98, grantReadiness: 100, credibility: 100 }
  ];

  const dataGovernanceWins = [
    { name: 'Grant Application Readiness', impact: 'Protected', description: 'Prevented rejection due to data issues' },
    { name: 'Funder Credibility', impact: 'Secured', description: 'Mathematical integrity maintained' },
    { name: 'Scaling Foundation', impact: 'Established', description: 'Ready for 10x growth with accurate metrics' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2B4C] to-[#0d3b66] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link 
            to="/august-dashboard" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to August Dashboard
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-blue-400/50 rounded-lg p-6 mb-8">
          <h1 className="text-4xl font-bold mb-2">📊 The Data Clarity Achievement</h1>
          <p className="text-xl">We fixed our data architecture before it destroyed our grant applications.</p>
        </div>

        {/* Data Governance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/40 border-blue-400/30">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-blue-400">Data Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">95%</p>
              <p className="text-sm text-white/70">Compliance achieved</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-green-400/30">
            <CardHeader>
              <Users className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-green-400">Actual Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">291</p>
              <p className="text-sm text-white/70">Verified count</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-yellow-400/30">
            <CardHeader>
              <Award className="w-8 h-8 text-yellow-400 mb-2" />
              <CardTitle className="text-yellow-400">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">34.8%</p>
              <p className="text-sm text-white/70">Accurate calculation</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-purple-400/30">
            <CardHeader>
              <DollarSign className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-purple-400">Grant Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">100%</p>
              <p className="text-sm text-white/70">Review ready</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Governance Progress */}
        <Card className="bg-slate-900/40 border-sky-400/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-sky-300">Data Governance Transformation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dataGovernanceData}>
                <XAxis dataKey="category" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid #38bdf8' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="dataQuality" name="Data Quality %" fill="#3b82f6" />
                <Bar dataKey="grantReadiness" name="Grant Readiness %" fill="#22c55e" />
                <Bar dataKey="credibility" name="Funder Credibility %" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Data Governance Wins */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dataGovernanceWins.map((win, idx) => (
            <Card key={idx} className="bg-slate-900/40 border-blue-400/20 hover:border-blue-400/40 transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-white">{win.name}</CardTitle>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-400/30">
                    {win.impact}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70 mb-4">{win.description}</p>
                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-green-400">✓ Mathematical integrity</p>
                  <p className="text-xs text-green-400">✓ Funder credibility</p>
                  <p className="text-xs text-green-400">✓ Grant application ready</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Real Achievement */}
        <div className="mt-8 text-center p-8 bg-gradient-to-r from-blue-600/10 to-green-600/10 rounded-lg border border-white/20">
          <h2 className="text-3xl font-bold mb-4">We prevented a data disaster that could have cost millions</h2>
          <p className="text-xl text-white/80">Now we're ready to scale with confidence and mathematical integrity.</p>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDashboard;