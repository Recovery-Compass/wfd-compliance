import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Clock, AlertTriangle } from "lucide-react";

interface ClientData {
  id: string;
  name: string;
  daysRemaining: number;
  status: 'critical' | 'warning' | 'stable';
  lastUpdate: string;
}

interface ClientCountdownCardProps {
  clients: ClientData[];
  className?: string;
}

export const ClientCountdownCard = ({ clients, className = "" }: ClientCountdownCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-wfd-purple';
      case 'warning': return 'text-wfd-gold';
      case 'stable': return 'text-wfd-blue';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-wfd-purple text-white';
      case 'warning': return 'bg-wfd-gold text-wfd-purple';
      case 'stable': return 'bg-wfd-blue text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const criticalClients = clients.filter(c => c.status === 'critical').length;
  const warningClients = clients.filter(c => c.status === 'warning').length;

  return (
    <Card className={`card-enterprise ${className}`}>
      <CardHeader className="bg-gradient-to-r from-wfd-purple to-wfd-purple-light text-white p-xl">
        <CardTitle className="text-h3-card flex items-center space-x-xs">
          <Home className="h-5 w-5" />
          <span>90-Day Housing Timeline</span>
        </CardTitle>
        <div className="flex space-x-md text-body-base mt-xs">
          <div className="flex items-center space-x-micro">
            <AlertTriangle className="h-4 w-4" />
            <span>{criticalClients} Critical</span>
          </div>
          <div className="flex items-center space-x-micro">
            <Clock className="h-4 w-4" />
            <span>{warningClients} Warning</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-xl">
        <div className="space-y-sm max-h-64 overflow-y-auto">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center justify-between p-sm bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center space-x-sm">
                <Home className={`h-4 w-4 house-bounce ${getStatusColor(client.status)}`} />
                <div>
                  <div className="text-body-base font-medium">{client.name}</div>
                  <div className="text-label text-muted-foreground">Last update: {client.lastUpdate}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-xs">
                <div className="text-right">
                  <div className={`text-data-large ${getStatusColor(client.status)}`}>
                    {client.daysRemaining}
                  </div>
                  <div className="text-label text-muted-foreground">days remaining</div>
                </div>
                <Badge className={getStatusBadge(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {clients.length === 0 && (
          <div className="text-center py-xl text-muted-foreground">
            <Home className="h-12 w-12 mx-auto mb-xs opacity-50" />
            <p className="text-body-base">No clients in housing timeline</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};