import React, { memo } from 'react';
import { AlertTriangle } from 'lucide-react';

interface PolicyHeaderProps {
  crisisValue: string;
}

const PolicyHeader = memo(({ crisisValue }: PolicyHeaderProps) => {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-900 rounded-full text-sm font-semibold mb-6">
        <AlertTriangle className="h-4 w-4 mr-2" />
        POLICY EMERGENCY: {crisisValue} GLOBAL CRISIS
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
        Global Policy Intelligence Engine
      </h1>
      <p className="text-xl text-slate-700 max-w-4xl mx-auto mb-3 font-medium">
        Advanced AI-Powered Analysis for Trillion-Dollar Policy Decisions
      </p>
      <p className="text-base text-slate-600 max-w-5xl mx-auto font-normal">
        Deploy cutting-edge artificial intelligence to model policy interventions across 20 major economies. 
        Generate evidence-based recommendations that could reshape national economies and liberate millions of women from unpaid labor.
      </p>
    </div>
  );
});

PolicyHeader.displayName = 'PolicyHeader';

export default PolicyHeader;
