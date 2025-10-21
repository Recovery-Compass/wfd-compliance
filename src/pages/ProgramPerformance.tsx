import React from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import { ProgramPerformanceTable } from '@/components/compliance/ProgramPerformanceTable';
import { BrandShell } from '@/components/BrandShell';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function ProgramPerformance() {
  const clientRecords = useComplianceStore(state => state.clientRecords);
  
  return (
    <BrandShell>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-4xl font-light tracking-tight mb-2">Program Performance</h1>
            <p className="text-muted-foreground">
              Side-by-side comparison of all WFD programs
            </p>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-6 py-8">
          {clientRecords.length === 0 ? (
            <div className="text-center py-16">
              <Upload className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Data Uploaded</h3>
              <p className="text-muted-foreground mb-4">
                Upload a Housing Tracker file to view program performance
              </p>
              <Link to="/compliance">
                <Button>Go to Dashboard</Button>
              </Link>
            </div>
          ) : (
            <ProgramPerformanceTable />
          )}
        </main>
      </div>
    </BrandShell>
  );
}
