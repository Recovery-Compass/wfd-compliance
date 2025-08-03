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
      
      <main className="container mx-auto px-4 py-8 mt-[80px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Program Documentation Centers</h1>
          <p className="text-muted-foreground">Click any program to view detailed metrics and log services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enhancedPrograms.map((program) => (
            <Card key={program.name} className={`hover:shadow-lg transition-shadow ${
              program.status === 'critical' ? 'border-destructive/50 bg-destructive/5' :
              program.status === 'priority' ? 'border-warning/50 bg-warning/5' :
              program.status === 'champion' ? 'border-success/50 bg-success/5' :
              ''
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {program.name}
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    program.documentationRate >= 90 ? 'bg-success/20 text-success' :
                    program.documentationRate >= 70 ? 'bg-primary/20 text-primary' :
                    program.documentationRate >= 50 ? 'bg-warning/20 text-warning' :
                    'bg-destructive/20 text-destructive'
                  }`}>
                    {program.documentationRate}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{program.clients} clients served</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{program.servicesDelivered.toLocaleString()} services/month</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-semibold text-destructive">Gap: {program.documentationGap}</span>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-3">{program.quickWin}</p>
                    
                    <Link to={`/programs/${program.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button className="w-full" variant={program.status === 'critical' ? 'destructive' : 'default'}>
                        View Dashboard & Log Services
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
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