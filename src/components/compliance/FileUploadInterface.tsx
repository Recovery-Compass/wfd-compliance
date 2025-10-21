import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { read, utils } from 'xlsx';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useComplianceStore } from '@/stores/complianceStore';
import { ClientRecord, UploadValidation } from '@/types/compliance';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const REQUIRED_COLUMNS = [
  'ClientID',
  'ProgramName',
  'IntakeDate',
  'ExitDate',
  'ExitDestination',
  'HousingPlacementDate',
  'LengthOfStay'
];

export function FileUploadInterface() {
  const [validation, setValidation] = useState<UploadValidation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const setClientRecords = useComplianceStore(state => state.setClientRecords);
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setIsProcessing(true);
    const file = acceptedFiles[0];
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = read(arrayBuffer);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = utils.sheet_to_json(worksheet) as any[];
      
      if (data.length === 0) {
        setValidation({
          isValid: false,
          error: 'File is empty. Please upload a file with client data.',
        });
        setIsProcessing(false);
        return;
      }
      
      const headers = Object.keys(data[0]);
      const missingColumns = REQUIRED_COLUMNS.filter(col => !headers.includes(col));
      
      if (missingColumns.length > 0) {
        setValidation({
          isValid: false,
          error: `Missing required columns: ${missingColumns.join(', ')}`,
          missingColumns,
        });
        setIsProcessing(false);
        return;
      }
      
      const records: ClientRecord[] = data.map(row => ({
        ClientID: row.ClientID?.toString() || '',
        ProgramName: row.ProgramName || '',
        IntakeDate: row.IntakeDate || null,
        ExitDate: row.ExitDate || null,
        ExitDestination: row.ExitDestination || null,
        HousingPlacementDate: row.HousingPlacementDate || null,
        LengthOfStay: row.LengthOfStay ? Number(row.LengthOfStay) : null,
      }));
      
      setClientRecords(records, file.name);
      
      setValidation({
        isValid: true,
        recordCount: records.length,
      });
      
    } catch (error: any) {
      setValidation({
        isValid: false,
        error: `Failed to parse file: ${error.message}`,
      });
    } finally {
      setIsProcessing(false);
    }
  }, [setClientRecords]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    },
    multiple: false,
  });
  
  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
          ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          {isProcessing ? (
            <>
              <FileSpreadsheet className="w-16 h-16 text-primary animate-pulse" />
              <p className="text-lg font-medium">Processing file...</p>
            </>
          ) : (
            <>
              <Upload className="w-16 h-16 text-primary" />
              <div>
                <p className="text-xl font-semibold mb-2">
                  {isDragActive ? 'Drop file here...' : 'Drag & drop Excel/CSV file here'}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse • Accepts .xlsx, .xls, .csv
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {validation && (
        validation.isValid ? (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200 font-medium">
              ✅ Successfully uploaded {validation.recordCount} client records
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {validation.error}
            </AlertDescription>
          </Alert>
        )
      )}
      
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Required Columns:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          {REQUIRED_COLUMNS.map(col => (
            <div key={col} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-xs">{col}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
