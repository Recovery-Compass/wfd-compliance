import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Clipboard } from "lucide-react";

export type ViewRole = 'board' | 'funder' | 'staff';

interface RoleToggleProps {
  currentRole: ViewRole;
  onRoleChange: (role: ViewRole) => void;
}

export const RoleToggle: React.FC<RoleToggleProps> = ({ currentRole, onRoleChange }) => {
  const roles = [
    {
      id: 'board' as ViewRole,
      label: 'Board',
      icon: <Users className="w-4 h-4" />,
      description: 'Strategic oversight'
    },
    {
      id: 'funder' as ViewRole,
      label: 'Funder',
      icon: <DollarSign className="w-4 h-4" />,
      description: 'ROI & compliance'
    },
    {
      id: 'staff' as ViewRole,
      label: 'Program Staff',
      icon: <Clipboard className="w-4 h-4" />,
      description: 'Operational details'
    }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-2 p-1 bg-ink-quaternary rounded-lg">
      {roles.map((role) => (
        <Button
          key={role.id}
          variant={currentRole === role.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onRoleChange(role.id)}
          className={`flex-1 justify-start gap-2 ${
            currentRole === role.id 
              ? 'bg-white shadow-sm text-ink-primary' 
              : 'text-ink-secondary hover:text-ink-primary'
          }`}
        >
          {role.icon}
          <span className="font-medium">{role.label}</span>
          {currentRole === role.id && (
            <Badge variant="secondary" className="ml-auto text-xs">
              Active
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
};

// Component visibility configuration for different roles
export const getRoleVisibility = (role: ViewRole) => {
  const config = {
    board: {
      showKPIs: true,
      showTrends: true,
      showDemographics: false,
      showQuickWins: true,
      showOpportunity: true,
      showNarrative: true,
      priority: ['kpis', 'opportunity', 'narrative', 'trends', 'quickWins']
    },
    funder: {
      showKPIs: true,
      showTrends: true,
      showDemographics: true,
      showQuickWins: true,
      showOpportunity: true,
      showNarrative: false,
      priority: ['kpis', 'opportunity', 'trends', 'demographics', 'quickWins']
    },
    staff: {
      showKPIs: true,
      showTrends: true,
      showDemographics: true,
      showQuickWins: true,
      showOpportunity: false,
      showNarrative: true,
      priority: ['kpis', 'trends', 'quickWins', 'demographics', 'narrative']
    }
  };

  return config[role];
};