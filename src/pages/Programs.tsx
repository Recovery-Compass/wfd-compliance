import { WFDHeader } from "@/components/WFDHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { enhancedPrograms } from "@/data/enhanced-programs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Programs = () => {
  return (
    <div className="min-h-screen bg-background">
      <WFDHeader />
      
      <main className="container mx-auto px-4 py-6 md:py-8 mt-16 md:mt-[80px]">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Program Documentation Centers</h1>
          <p className="text-muted-foreground text-sm md:text-base">Click any program to view detailed metrics and log services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enhancedPrograms.map((program) => (
            <Card key={program.name} className="hover:shadow-enterprise transition-all duration-300 hover:-translate-y-1 border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="text-foreground">{program.name}</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full border ${
                    program.documentationRate >= 90 
                      ? 'bg-success/10 text-success border-success/20' 
                      : program.documentationRate >= 70 
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : program.documentationRate >= 50 
                      ? 'bg-warning/10 text-warning border-warning/20'
                      : 'bg-danger/10 text-danger border-danger/20'
                  }`}>
                    {program.documentationRate}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{program.clients} clients served</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{program.servicesDelivered.toLocaleString()} services/month</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 bg-danger/5 border border-danger/20 rounded-md">
                    <AlertCircle className="w-4 h-4 text-danger" />
                    <span className="text-sm font-semibold text-danger">Gap: {program.documentationGap}</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-border space-y-3">
                  <p className="text-xs text-muted-foreground bg-muted/20 p-2 rounded border-l-2 border-primary/30">
                    {program.quickWin}
                  </p>
                  
                  <Link to={`/programs/${program.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button className="w-full" variant="default">
                      View Dashboard & Log Services
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Programs;