import { create } from 'zustand';
import { ClientRecord, OverviewMetrics, ProgramMetrics, DataQualityReport } from '@/types/compliance';
import { calculateMetrics, calculateProgramMetrics, validateDataQuality } from '@/lib/complianceCalculations';

interface ComplianceState {
  clientRecords: ClientRecord[];
  uploadDate: Date | null;
  fileName: string | null;
  overviewMetrics: OverviewMetrics | null;
  programMetrics: ProgramMetrics[];
  dataQuality: DataQualityReport | null;
  selectedProgram: string | null;
  searchQuery: string;
  
  setClientRecords: (records: ClientRecord[], fileName: string) => void;
  setSelectedProgram: (program: string | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredRecords: () => ClientRecord[];
  clearData: () => void;
}

export const useComplianceStore = create<ComplianceState>((set, get) => ({
  clientRecords: [],
  uploadDate: null,
  fileName: null,
  overviewMetrics: null,
  programMetrics: [],
  dataQuality: null,
  selectedProgram: null,
  searchQuery: '',
  
  setClientRecords: (records, fileName) => {
    const overviewMetrics = calculateMetrics(records);
    const programMetrics = calculateProgramMetrics(records);
    const dataQuality = validateDataQuality(records);
    
    set({
      clientRecords: records,
      fileName,
      uploadDate: new Date(),
      overviewMetrics,
      programMetrics,
      dataQuality,
    });
  },
  
  setSelectedProgram: (program) => set({ selectedProgram: program }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  getFilteredRecords: () => {
    const { clientRecords, selectedProgram, searchQuery } = get();
    
    return clientRecords.filter(record => {
      if (selectedProgram && record.ProgramName !== selectedProgram) {
        return false;
      }
      
      if (searchQuery && !record.ClientID.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  },
  
  clearData: () => set({
    clientRecords: [],
    uploadDate: null,
    fileName: null,
    overviewMetrics: null,
    programMetrics: [],
    dataQuality: null,
    selectedProgram: null,
    searchQuery: '',
  }),
}));
