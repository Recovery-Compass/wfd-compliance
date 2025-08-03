import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ServiceLoggerProps {
  program: {
    name: string;
    documentationRate: number;
    documentationGap: string;
  };
}

export const ServiceLogger = ({ program }: ServiceLoggerProps) => {
  const [isLogging, setIsLogging] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const serviceTypes = [
    { id: 'bed-night', label: 'Bed Night', icon: '🛏️' },
    { id: 'meal', label: 'Meal', icon: '🍽️' },
    { id: 'case-mgmt', label: 'Case Mgmt', icon: '📋' },
    { id: 'mental-health', label: 'Mental Health', icon: '🧠' },
    { id: 'transport', label: 'Transport', icon: '🚐' },
    { id: 'other', label: 'Other', icon: '➕' }
  ];

  const quantities = [1, 2, 3, 5, 10];

  const handleLog = async () => {
    if (!selectedService) {
      toast.error("Please select a service type");
      return;
    }

    setIsLogging(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const value = quantity * 87;
    toast.success(
      `Cha-ching! 💰 That's $${value} captured for ${program.name}!`
    );
    
    setIsLogging(false);
    setSelectedService("");
    setQuantity(1);
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-6 h-6" />
          Log a Service in 10 Seconds!
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Service Type:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {serviceTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedService === type.id ? "default" : "outline"}
                  className="h-auto py-3 px-2"
                  onClick={() => setSelectedService(type.id)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-xs">{type.label}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              How many?
            </label>
            <div className="flex gap-2 flex-wrap">
              {quantities.map((q) => (
                <Button
                  key={q}
                  variant={quantity === q ? "default" : "outline"}
                  size="sm"
                  onClick={() => setQuantity(q)}
                >
                  {q}
                </Button>
              ))}
              <Input
                type="number"
                className="w-20"
                placeholder="Custom"
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
              />
            </div>
          </div>

          <Button
            className="w-full text-lg py-6"
            onClick={handleLog}
            disabled={isLogging || !selectedService}
          >
            {isLogging ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Logging...
              </>
            ) : (
              <>
                LOG IT! 💰
                <span className="ml-2 text-sm opacity-80">
                  (Worth ${quantity * 87})
                </span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};