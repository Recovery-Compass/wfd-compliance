import React from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import { FileUploadInterface } from '@/components/compliance/FileUploadInterface';
import { OverviewMetrics } from '@/components/compliance/OverviewMetrics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandShell } from '@/components/BrandShell';

export default function Dashboard() {
  const clientRecords = useComplianceStore(state => state.clientRecords);
  const fileName = useComplianceStore(state => state.fileName);
  const uploadDate = useComplianceStore(state => state.uploadDate);
  
  const hasData = clientRecords.length > 0;
  
  return (
    <BrandShell>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-4xl font-light tracking-tight mb-2">
              WFD Compliance Dashboard
            </h1>
            <p className="text-muted-foreground">
              Dynamic data upload and analysis for Whittier First Day programs
            </p>
            {hasData && (
              <div className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium">Current file:</span> {fileName} •{' '}
                <span className="font-medium">Uploaded:</span>{' '}
                {uploadDate?.toLocaleDateString()}
              </div>
            )}
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {!hasData ? (
            <Card>
              <CardHeader>
                <CardTitle>Upload Housing Tracker Data</CardTitle>
                <CardDescription>
                  Upload your Excel or CSV file containing client data to begin analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploadInterface />
              </CardContent>
            </Card>
          ) : (
            <>
              <OverviewMetrics />
              
              <Card>
                <CardHeader>
                  <CardTitle>Upload New Data</CardTitle>
                  <CardDescription>
                    Upload a new file to replace the current dataset
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploadInterface />
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </BrandShell>
  );
}
