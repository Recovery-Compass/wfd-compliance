import React from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DataQualityDashboard() {
  const dataQuality = useComplianceStore(state => state.dataQuality);
  
  if (!dataQuality) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Upload data to view quality validation
      </div>
    );
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'green': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'yellow': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'red': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'border-green-500 bg-green-50 dark:bg-green-950';
      case 'yellow': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'red': return 'border-red-500 bg-red-50 dark:bg-red-950';
      default: return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className={getStatusColor(dataQuality.isCompliant ? 'green' : 'red')}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {dataQuality.isCompliant ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <span className="text-green-700 dark:text-green-300">MOU Compliant</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-600" />
                <span className="text-red-700 dark:text-red-300">MOU Non-Compliant</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Data Quality Score</span>
              <span className="text-2xl font-bold">{dataQuality.overallScore.toFixed(1)}%</span>
            </div>
            <Progress value={dataQuality.overallScore} className="h-3" />
          </div>
        </CardContent>
      </Card>
      
      {dataQuality.criticalIssues.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Issues Detected</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {dataQuality.criticalIssues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Field Coverage Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataQuality.fieldCoverages.map((field) => (
              <div key={field.fieldName} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(field.status)}
                    <span className="font-mono text-sm font-medium">{field.fieldName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={field.status === 'green' ? 'default' : 'destructive'}>
                      {field.coverage.toFixed(1)}%
                    </Badge>
                    {field.missingCount > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {field.missingCount} missing
                      </span>
                    )}
                  </div>
                </div>
                <Progress
                  value={field.coverage}
                  className="h-2"
                />
                {field.missingRecords.length > 0 && (
                  <div className="text-xs text-muted-foreground pl-7">
                    Examples: {field.missingRecords.slice(0, 5).join(', ')}
                    {field.missingRecords.length > 5 && '...'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>≥80% (Compliant)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>60-79% (Warning)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span>&lt;60% (Critical)</span>
        </div>
      </div>
    </div>
  );
}
