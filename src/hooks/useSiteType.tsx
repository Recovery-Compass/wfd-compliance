import React, { createContext, useContext, useState, ReactNode } from 'react';
import { siteTypes } from '@/data/siteTypes';

interface SiteTypeContextType {
  selectedSiteType: string;
  setSelectedSiteType: (siteType: string) => void;
  currentSiteType: typeof siteTypes[keyof typeof siteTypes];
}

const SiteTypeContext = createContext<SiteTypeContextType | undefined>(undefined);

export const SiteTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSiteType, setSelectedSiteType] = useState<string>("ALL");
  const currentSiteType = siteTypes[selectedSiteType] || siteTypes.ALL;

  return (
    <SiteTypeContext.Provider value={{
      selectedSiteType,
      setSelectedSiteType,
      currentSiteType
    }}>
      {children}
    </SiteTypeContext.Provider>
  );
};

export const useSiteType = () => {
  const context = useContext(SiteTypeContext);
  if (context === undefined) {
    throw new Error('useSiteType must be used within a SiteTypeProvider');
  }
  return context;
};