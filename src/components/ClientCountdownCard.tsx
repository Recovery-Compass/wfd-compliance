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
    <Card className={`border-wfd-purple/20 ${className}`}>
      <CardHeader className="bg-gradient-to-r from-wfd-purple to-wfd-purple-light text-white">
        <CardTitle className="flex items-center space-x-2">
          <Home className="h-5 w-5" />
          <span>90-Day Housing Timeline</span>
        </CardTitle>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <AlertTriangle className="h-4 w-4" />
            <span>{criticalClients} Critical</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{warningClients} Warning</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Home className={`h-4 w-4 house-bounce ${getStatusColor(client.status)}`} />
                <div>
                  <div className="font-medium text-sm">{client.name}</div>
                  <div className="text-xs text-muted-foreground">Last update: {client.lastUpdate}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className={`font-bold ${getStatusColor(client.status)}`}>
                    {client.daysRemaining} days
                  </div>
                  <div className="text-xs text-muted-foreground">remaining</div>
                </div>
                <Badge className={getStatusBadge(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {clients.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Home className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No clients in housing timeline</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};