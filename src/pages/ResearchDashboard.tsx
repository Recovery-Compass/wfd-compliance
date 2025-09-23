import { WFDHeader } from "@/components/WFDHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BarChart, Code, Mail } from "lucide-react";

const ResearchDashboard = () => {
  const datasets = [
    {
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      title: "Executive Summary Export",
      description: "Ready-to-present materials for leadership",
      items: [
        "Data Governance Achievement One-Pager (PDF)",
        "90-Day Transformation Timeline (PDF)",
        "Before/After Compliance Metrics (Excel)"
      ],
      action: "Download Executive Package"
    },
    {
      icon: <BarChart className="w-8 h-8 text-green-500" />,
      title: "Program-Level Analysis",
      description: "Detailed data for operational improvements",
      items: [
        "Service Delivery vs Documentation by Program (CSV)",
        "Funding Gap Analysis with Formulas (Excel)",
        "Documentation Rate Trends (30/60/90 day)"
      ],
      action: "Download Program Data"
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      title: "Academic Research Dataset",
      description: "Anonymized data for research publications",
      items: [
        "Anonymized service-level data (10,000+ records)",
        "Statistical analysis of documentation patterns",
        "Environmental Response Design™ methodology paper"
      ],
      action: "Request Academic Access"
    },
    {
      icon: <Mail className="w-8 h-8 text-amber-500" />,
      title: "Grant Application Package",
      description: "Evidence-based materials for funding applications",
      items: [
        "Logic model with proven outcomes",
        "Budget justification using WFD case study",
        "Letters of support template",
        "Evaluation metrics framework"
      ],
      action: "Download Grant Package"
    },
    {
      icon: <Code className="w-8 h-8 text-red-500" />,
      title: "Live API Access",
      description: "Real-time integration for developers",
      items: [
        "Real-time documentation metrics",
        "Webhook for service logging events",
        "GraphQL endpoint for custom queries"
      ],
      action: "View API Docs"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <WFDHeader />
      
      <main className="container mx-auto px-4 py-8 mt-[80px]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Documentation Discovery Research Portal</h1>
          <p className="text-muted-foreground">Export Evidence for Grants, Reports & Publications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map((dataset, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">{dataset.icon}</div>
                <CardTitle className="text-center">{dataset.title}</CardTitle>
                <CardDescription className="text-center">
                  {dataset.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {dataset.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-success mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  {dataset.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ResearchDashboard;