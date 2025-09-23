import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OpportunityDashboard = () => {
  // What we found vs what was hidden
  const discoveryData = [
    { category: 'Initially Reported', housed: 8, clients: 291, funding: 250000 },
    { category: 'Actually Achieved', housed: 101, clients: 420, funding: 3100000 },
    { category: 'Potential w/ Dashboard', housed: 150, clients: 420, funding: 4400000 }
  ];

  const fundingOpportunities = [
    { name: 'CCF Grant', amount: 150000, status: 'Ready', days: 7 },
    { name: 'Weingart Foundation', amount: 200000, status: 'Pending', days: 30 },
    { name: 'Innovation Fund', amount: 4000000, status: 'Q1 2026', days: 90 }
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
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-400/50 rounded-lg p-6 mb-8">
          <h1 className="text-4xl font-bold mb-2">🎯 The $4.4M Discovery</h1>
          <p className="text-xl">We found 93 hidden housing placements. Imagine what else we'll find.</p>
        </div>

        {/* Discovery Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/40 border-green-400/30">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-green-400">Hidden Success Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">+93</p>
              <p className="text-sm text-white/70">Housing placements discovered</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-blue-400/30">
            <CardHeader>
              <Users className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-blue-400">True Scale Revealed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">420</p>
              <p className="text-sm text-white/70">Actual clients served</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-yellow-400/30">
            <CardHeader>
              <Award className="w-8 h-8 text-yellow-400 mb-2" />
              <CardTitle className="text-yellow-400">Performance Multiple</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">12.6x</p>
              <p className="text-sm text-white/70">Better than reported</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-purple-400/30">
            <CardHeader>
              <DollarSign className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-purple-400">Funding Unlocked</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">$4.4M</p>
              <p className="text-sm text-white/70">Now accessible</p>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        <Card className="bg-slate-900/40 border-sky-400/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-sky-300">The Power of Accurate Data</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={discoveryData}>
                <XAxis dataKey="category" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid #38bdf8' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="housed" name="People Housed" fill="#22c55e" />
                <Bar dataKey="clients" name="Clients Served" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Funding Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fundingOpportunities.map((opp, idx) => (
            <Card key={idx} className="bg-slate-900/40 border-green-400/20 hover:border-green-400/40 transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-white">{opp.name}</CardTitle>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    opp.status === 'Ready' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
                    opp.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30' :
                    'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                  }`}>
                    {opp.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-white mb-2">
                  ${opp.amount.toLocaleString()}
                </p>
                <p className="text-sm text-white/70">Available in {opp.days} days</p>
                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-green-400">✓ Evidence ready</p>
                  <p className="text-xs text-green-400">✓ Data validated</p>
                  <p className="text-xs text-green-400">✓ Story compelling</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center p-8 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-lg border border-white/20">
          <h2 className="text-3xl font-bold mb-4">If we found 93 hidden successes in one month...</h2>
          <p className="text-xl text-white/80">Imagine what we'll discover with real-time data.</p>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDashboard;