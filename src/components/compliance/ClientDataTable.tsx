import React, { useState, useMemo } from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Search } from 'lucide-react';
import { utils, writeFile } from 'xlsx';

const PROGRAMS = ["Ted's Place", "Hondo", "Pathway Home", "Midvale", "A2C", "ICMS"];
const ROWS_PER_PAGE = 25;

export function ClientDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const {
    getFilteredRecords,
    selectedProgram,
    setSelectedProgram,
    searchQuery,
    setSearchQuery,
  } = useComplianceStore();
  
  const filteredRecords = getFilteredRecords();
  
  const sortedRecords = useMemo(() => {
    if (!sortColumn) return filteredRecords;
    
    return [...filteredRecords].sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredRecords, sortColumn, sortDirection]);
  
  const totalPages = Math.ceil(sortedRecords.length / ROWS_PER_PAGE);
  const paginatedRecords = sortedRecords.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );
  
  const handleExport = () => {
    const ws = utils.json_to_sheet(filteredRecords);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Client Data');
    writeFile(wb, `WFD_Client_Data_${new Date().toISOString().split('T')[0]}.xlsx`);
  };
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by Client ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedProgram || 'all'} onValueChange={(v) => setSelectedProgram(v === 'all' ? null : v)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Programs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              {PROGRAMS.map(prog => (
                <SelectItem key={prog} value={prog}>{prog}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleExport} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export to CSV
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {paginatedRecords.length} of {sortedRecords.length} records
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('ClientID')}>
                Client ID {sortColumn === 'ClientID' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('ProgramName')}>
                Program {sortColumn === 'ProgramName' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('IntakeDate')}>
                Intake Date {sortColumn === 'IntakeDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('ExitDate')}>
                Exit Date {sortColumn === 'ExitDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Exit Destination</TableHead>
              <TableHead>Housing Date</TableHead>
              <TableHead className="text-right">Length of Stay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRecords.map((record, idx) => (
              <TableRow key={`${record.ClientID}-${idx}`}>
                <TableCell className="font-mono text-sm">{record.ClientID}</TableCell>
                <TableCell>{record.ProgramName}</TableCell>
                <TableCell>{record.IntakeDate || '—'}</TableCell>
                <TableCell>
                  {record.ExitDate || <span className="text-green-600 font-medium">Active</span>}
                </TableCell>
                <TableCell>{record.ExitDestination || '—'}</TableCell>
                <TableCell>{record.HousingPlacementDate || '—'}</TableCell>
                <TableCell className="text-right font-medium">
                  {record.LengthOfStay !== null ? `${record.LengthOfStay} days` : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
