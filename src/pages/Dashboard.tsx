import React from 'react';
import { Link } from 'react-router-dom';
import { useComplianceStore } from '@/stores/complianceStore';
import { FileUploadInterface } from '@/components/compliance/FileUploadInterface';
import { OverviewMetrics } from '@/components/compliance/OverviewMetrics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandShell } from '@/components/BrandShell';
import { Sparkles, PartyPopper, Coffee, Smile, Heart } from 'lucide-react';

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
          {/* Fun Zone Call-to-Action - Always Visible */}
          <Link to="/fun">
            <Card className="border-2 border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all hover:shadow-lg cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
                      <div>
                        <h3 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
                          Fun Zone
                          <span className="text-3xl">✨</span>
                        </h3>
                        <p className="text-purple-700 mt-1">
                          Team celebrations, coffee counter, daily memes & acts of kindness!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-3 text-3xl">
                    <PartyPopper className="w-10 h-10 text-pink-500" />
                    <Coffee className="w-10 h-10 text-amber-600" />
                    <Smile className="w-10 h-10 text-yellow-500" />
                    <Heart className="w-10 h-10 text-red-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-purple-600 font-semibold">
                  <span>Click here to explore</span>
                  <span className="text-xl">→</span>
                </div>
              </CardContent>
            </Card>
          </Link>

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
