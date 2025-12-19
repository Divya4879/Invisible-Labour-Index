import React, { memo } from 'react';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { EconomicImpact, ConfidenceInterval } from '../types/policy';

interface EconomicImpactDashboardProps {
  economicImpact: EconomicImpact;
}

const ConfidenceDisplay = memo(({ 
  interval, 
  label, 
  unit = '',
  color = 'blue'
}: { 
  interval: ConfidenceInterval; 
  label: string; 
  unit?: string;
  color?: string;
}) => {
  const formatValue = (value: number) => {
    if (unit === 'B') return `$${(value/1000000000).toFixed(1)}B`;
    if (unit === '%') return `${value.toFixed(1)}%`;
    if (unit === 'M') return `${value.toFixed(1)}M`;
    return value.toFixed(1);
  };

  const colorClasses = {
    blue: 'text-blue-600 border-blue-500',
    red: 'text-red-600 border-red-500',
    orange: 'text-orange-600 border-orange-500',
    green: 'text-green-600 border-green-500'
  };

  return (
    <div className={`text-center p-4 bg-white rounded-lg shadow-sm border-l-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-center mb-2">
        <span className={`text-2xl font-bold ${colorClasses[color as keyof typeof colorClasses].split(' ')[0]}`}>
          {formatValue(interval.mid)}
        </span>
        <AlertCircle className="h-4 w-4 ml-1 text-slate-400" title={`Confidence: ${(interval.confidence * 100).toFixed(0)}%`} />
      </div>
      <div className="text-sm font-medium text-slate-700 mb-2">{label}</div>
      <div className="text-xs text-slate-500">
        Range: {formatValue(interval.low)} - {formatValue(interval.high)}
      </div>
      <div className="text-xs text-slate-400">
        Confidence: {(interval.confidence * 100).toFixed(0)}%
      </div>
    </div>
  );
});

ConfidenceDisplay.displayName = 'ConfidenceDisplay';

const SensitivityChart = memo(({ 
  sensitivity, 
  title 
}: { 
  sensitivity: any; 
  title: string;
}) => (
  <div className="bg-slate-50 p-4 rounded-lg">
    <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
      <TrendingUp className="h-4 w-4 mr-2" />
      {title} Sensitivity
    </h4>
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span>Pessimistic:</span>
        <span className="font-medium">{sensitivity.pessimistic.toFixed(1)}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span>Base Case:</span>
        <span className="font-semibold">{sensitivity.baseCase.toFixed(1)}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span>Optimistic:</span>
        <span className="font-medium">{sensitivity.optimistic.toFixed(1)}</span>
      </div>
    </div>
    <div className="mt-3">
      <div className="text-xs text-slate-600 mb-1">Key Factors:</div>
      {sensitivity.sensitivityFactors.slice(0, 2).map((factor: any, idx: number) => (
        <div key={idx} className="text-xs text-slate-500 flex justify-between">
          <span>{factor.factor}:</span>
          <span>{(factor.impact * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  </div>
));

SensitivityChart.displayName = 'SensitivityChart';

const EconomicImpactDashboard = memo(({ economicImpact }: EconomicImpactDashboardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-xl border border-slate-200">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-5 rounded-t-xl">
        <h2 className="text-xl font-semibold flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          📊 Economic Impact Analysis with Confidence Intervals
        </h2>
      </div>
      
      {/* Main Metrics */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <ConfidenceDisplay 
          interval={economicImpact.hiddenValue} 
          label="Hidden Economic Value" 
          unit="B"
          color="red"
        />
        <ConfidenceDisplay 
          interval={economicImpact.gdpPercentage} 
          label="GDP Impact" 
          unit="%"
          color="orange"
        />
        <ConfidenceDisplay 
          interval={economicImpact.workforceEquivalent} 
          label="Workforce Equivalent" 
          unit="M"
          color="blue"
        />
        <ConfidenceDisplay 
          interval={economicImpact.productivityGain} 
          label="Productivity Gain" 
          unit="%"
          color="green"
        />
      </div>

      {/* Sensitivity Analysis */}
      <div className="border-t border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Sensitivity Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SensitivityChart 
            sensitivity={economicImpact.sensitivity.wageAssumption}
            title="Wage Assumptions"
          />
          <SensitivityChart 
            sensitivity={economicImpact.sensitivity.participationRate}
            title="Participation Rate"
          />
          <SensitivityChart 
            sensitivity={economicImpact.sensitivity.hoursReduction}
            title="Hours Reduction"
          />
        </div>
      </div>

      {/* Methodology Note */}
      <div className="border-t border-slate-200 bg-slate-50 p-4 rounded-b-xl">
        <div className="text-xs text-slate-600">
          <strong>Methodology:</strong> Confidence intervals calculated using Monte Carlo simulation with country-specific data quality adjustments. 
          Sensitivity analysis incorporates correlation effects between key variables. All projections include uncertainty bounds based on international evidence.
        </div>
      </div>
    </div>
  );
});

EconomicImpactDashboard.displayName = 'EconomicImpactDashboard';

export default EconomicImpactDashboard;
