import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSiteType } from "@/hooks/useSiteType";
import { siteTypes } from "@/data/siteTypes";

export const SiteTypeSelector = () => {
  const { selectedSiteType, setSelectedSiteType, currentSiteType } = useSiteType();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <label htmlFor="site-type-select" className="text-body font-medium whitespace-nowrap">
          Site Type:
        </label>
        <Select value={selectedSiteType} onValueChange={setSelectedSiteType}>
          <SelectTrigger id="site-type-select" className="w-48">
            <SelectValue placeholder="Select site type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(siteTypes).map((siteType) => (
              <SelectItem key={siteType.id} value={siteType.id}>
                <div className="flex items-center gap-2">
                  <span>{siteType.name}</span>
                  {siteType.id !== "ALL" && (
                    <Badge variant="outline" className="text-xs">
                      Target: {siteType.complianceTarget}%
                    </Badge>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-caption text-muted-foreground">
          {currentSiteType.description}
        </span>
        {currentSiteType.id !== "ALL" && (
          <Badge 
            variant="outline" 
            className={`text-xs ${
              currentSiteType.id === "DHS" 
                ? "border-primary text-primary" 
                : "border-wfd-blue text-wfd-blue"
            }`}
          >
            Assessment: {currentSiteType.requirements.assessmentType}
          </Badge>
        )}
      </div>
    </div>
  );
};