import React, { useState } from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

export function ProgramPerformanceTable() {
  const programMetrics = useComplianceStore(state => state.programMetrics);
  const [sortKey, setSortKey] = useState<string>('placementRate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  if (!programMetrics || programMetrics.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Upload data to view program performance
      </div>
    );
  }
  
  const sortedPrograms = [...programMetrics].sort((a, b) => {
    const aValue = a[sortKey as keyof typeof a] ?? 0;
    const bValue = b[sortKey as keyof typeof b] ?? 0;
    
    return sortDirection === 'asc'
      ? (aValue > bValue ? 1 : -1)
      : (aValue < bValue ? 1 : -1);
  });
  
  const topPerformer = sortedPrograms[0];
  
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('totalClients')}
                >
                  Total Clients {sortKey === 'totalClients' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('activeEnrollments')}
                >
                  Active {sortKey === 'activeEnrollments' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('housingPlacements')}
                >
                  Placements {sortKey === 'housingPlacements' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('avgLengthOfStay')}
                >
                  Avg LoS (days) {sortKey === 'avgLengthOfStay' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('placementRate')}
                >
                  Placement Rate {sortKey === 'placementRate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPrograms.map((program) => {
                const isTopPerformer = program.programName === topPerformer.programName;
                
                return (
                  <TableRow key={program.programName} className={isTopPerformer ? 'bg-green-50 dark:bg-green-950' : ''}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {isTopPerformer && <Trophy className="w-4 h-4 text-yellow-600" />}
                        {program.programName}
                      </div>
                    </TableCell>
                    <TableCell>{program.totalClients}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{program.activeEnrollments}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {program.housingPlacements}
                    </TableCell>
                    <TableCell>
                      {program.avgLengthOfStay !== null
                        ? Math.round(program.avgLengthOfStay)
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={program.placementRate >= 50 ? 'default' : 'secondary'}
                        className={program.placementRate >= 50 ? 'bg-green-600' : ''}
                      >
                        {program.placementRate.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
