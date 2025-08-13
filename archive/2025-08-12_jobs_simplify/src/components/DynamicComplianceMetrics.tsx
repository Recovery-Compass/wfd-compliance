import { useSiteType } from "@/hooks/useSiteType";
import { getComplianceStatsBySiteType } from "@/data/programs";
import { getMetricsForSiteType } from "@/data/siteTypes";

export const DynamicComplianceMetrics = () => {
  const { selectedSiteType, currentSiteType } = useSiteType();
  const metrics = getMetricsForSiteType(selectedSiteType);
  const stats = getComplianceStatsBySiteType(selectedSiteType);

  const getMetricValue = (metric: string) => {
    switch (metric) {
      case "5x5 Assessment Compliance":
        return { value: "78%", trend: "improving", target: "95%" };
      case "90-day Limit Tracking": 
        return { value: "3", trend: "critical", target: "0" };
      case "Medical Documentation":
        return { value: "85%", trend: "stable", target: "100%" };
      case "Housing Placement Rate":
        return { value: "65%", trend: "improving", target: "95%" };
      case "Contract Compliance":
        return { value: "88%", trend: "improving", target: "95%" };
      case "Funding Requirements":
        return { value: "92%", trend: "stable", target: "100%" };
      case "Program-Specific Goals":
        return { value: "76%", trend: "improving", target: "85%" };
      case "Outcome Metrics":
        return { value: "82%", trend: "stable", target: "90%" };
      case "Overall Compliance":
        return { value: `${stats.average}%`, trend: "improving", target: "90%" };
      case "Cross-Program Performance":
        return { value: `${stats.total}`, trend: "stable", target: "6" };
      case "Aggregate Outcomes":
        return { value: "74%", trend: "improving", target: "85%" };
      case "System-wide Metrics":
        return { value: "68%", trend: "improving", target: "80%" };
      default:
        return { value: "N/A", trend: "stable", target: "N/A" };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.slice(0, 4).map((metric, index) => {
        const data = getMetricValue(metric);
        const trendColor = 
          data.trend === "improving" ? "text-green-600" :
          data.trend === "declining" ? "text-red-600" :
          data.trend === "critical" ? "text-red-700" : "text-yellow-600";
        
        return (
          <div key={index} className="card-minimal">
            <div className="flex justify-between items-start mb-4">
              <p className="text-caption text-muted-foreground">{metric}</p>
              <span className={`text-xs font-medium ${trendColor}`}>
                {data.trend === "improving" ? "↑ Improving" :
                 data.trend === "declining" ? "↓ Declining" :
                 data.trend === "critical" ? "⚠ Critical" : "→ Stable"}
              </span>
            </div>
            <div className="text-kpi-value text-primary mb-2">{data.value}</div>
            <div className="progress-minimal mb-2">
              <div 
                className="progress-fill" 
                style={{ 
                  width: data.value.includes('%') ? data.value : 
                         metric === "90-day Limit Tracking" ? "85%" : "70%"
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Target: {data.target}
            </p>
          </div>
        );
      })}
    </div>
  );
};