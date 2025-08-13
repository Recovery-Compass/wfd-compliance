import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { enhancedPrograms } from "@/data/enhanced-programs";

interface CalculationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program?: {
    name: string;
    documentationGap: string;
  };
}

export const CalculationModal = ({ open, onOpenChange, program }: CalculationModalProps) => {
  const programBreakdown = [
    { name: "Ted's Place", gap: 2318, annual: "$202,000" },
    { name: "Midvale Tiny Homes", gap: 1050, annual: "$91,350" },
    { name: "ICMS", gap: 1440, annual: "$125,000" },
    { name: "Hondo Center", gap: 604, annual: "$52,000" },
    { name: "Others", gap: 0, annual: "$65,000" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">How We Calculated $4.4M</DialogTitle>
          <DialogDescription>
            Complete methodology and breakdown
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">The Formula:</h3>
            <div className="font-mono text-sm space-y-2">
              <div>Services Discovered: 48,697</div>
              <div>× Reimbursement Rate: $87</div>
              <div>× Annual Projection: 12 months</div>
              <div className="border-t pt-2 font-bold">
                = $4,396,356 in undocumented value
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Breakdown by Program:</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Program</th>
                  <th className="text-right py-2">Monthly Gap</th>
                  <th className="text-right py-2">Annual Impact</th>
                </tr>
              </thead>
              <tbody>
                {programBreakdown.map((item, idx) => (
                  <tr key={idx} className={`border-b ${program?.name === item.name ? 'bg-primary/5' : ''}`}>
                    <td className="py-2">{item.name}</td>
                    <td className="text-right">{item.gap > 0 ? `${item.gap} services` : 'Various'}</td>
                    <td className="text-right font-semibold">{item.annual}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold text-lg">
                  <td className="pt-4">TOTAL</td>
                  <td></td>
                  <td className="text-right pt-4">$4,396,356</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download Detailed Methodology
            </Button>
            <Button variant="outline" className="flex-1">
              View Raw Data
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};