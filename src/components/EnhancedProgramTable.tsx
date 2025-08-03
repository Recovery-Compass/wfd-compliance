import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { enhancedPrograms, getEnhancedProgramsBySiteType } from "@/data/enhanced-programs";
import { AlertCircle, TrendingUp } from "lucide-react";
import { useSiteType } from "@/hooks/useSiteType";

export const EnhancedProgramTable = () => {
  const { selectedSiteType } = useSiteType();
  const filteredPrograms = getEnhancedProgramsBySiteType(selectedSiteType);
  
  const getRowClassName = (program: typeof enhancedPrograms[0]) => {
    if (program.status === 'critical') return 'bg-red-50 animate-pulse';
    if (program.status === 'priority') return 'bg-yellow-50';
    if (program.status === 'champion') return 'bg-green-50';
    return '';
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      champion: 'bg-green-100 text-green-800',
      strong: 'bg-blue-100 text-blue-800',
      improving: 'bg-amber-100 text-amber-800',
      priority: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || '';
  };

  const totalClients = filteredPrograms.reduce((sum, p) => sum + p.clients, 0);
  const totalDelivered = filteredPrograms.reduce((sum, p) => sum + p.servicesDelivered, 0);
  const totalDocumented = filteredPrograms.reduce((sum, p) => sum + p.servicesDocumented, 0);
  const overallRate = totalDelivered > 0 ? Math.round((totalDocumented / totalDelivered) * 100) : 0;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Program Documentation Performance</CardTitle>
        <p className="text-sm text-gray-600">Services Delivered vs. Services Documented = Funding Opportunity</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Program</th>
                <th className="text-center p-3">Clients Served</th>
                <th className="text-center p-3">Services Delivered</th>
                <th className="text-center p-3">Services Documented</th>
                <th className="text-center p-3">Documentation Rate</th>
                <th className="text-center p-3">Funding Gap</th>
                <th className="text-left p-3">Quick Win Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.map((program) => (
                <tr key={program.name} className={`border-b ${getRowClassName(program)}`}>
                  <td className="p-3 font-medium">
                    {program.name}
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getStatusBadge(program.status)}`}>
                      {program.status}
                    </span>
                  </td>
                  <td className="text-center p-3">{program.clients}</td>
                  <td className="text-center p-3 font-semibold">{program.servicesDelivered.toLocaleString()}</td>
                  <td className="text-center p-3">{program.servicesDocumented.toLocaleString()}</td>
                  <td className="text-center p-3">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`font-bold ${program.documentationRate >= 80 ? 'text-green-600' : program.documentationRate >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {program.documentationRate}%
                      </span>
                      {program.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                    </div>
                  </td>
                  <td className="text-center p-3">
                    <span className="font-bold text-red-600">{program.documentationGap}</span>
                  </td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-2">
                      {(program.status === 'critical' || program.status === 'priority') && 
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      }
                      {program.quickWin}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-50">
                <td className="p-3">TOTAL</td>
                <td className="text-center p-3">{totalClients}</td>
                <td className="text-center p-3">{totalDelivered.toLocaleString()}</td>
                <td className="text-center p-3">{totalDocumented.toLocaleString()}</td>
                <td className="text-center p-3 text-blue-600">{overallRate}%</td>
                <td className="text-center p-3 text-red-600">$550,000</td>
                <td className="p-3 text-sm">System-wide opportunity</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};