import React, { memo, useCallback } from 'react';
import { Brain } from 'lucide-react';
import { PolicyScenario, CountryData } from '../types/policy';

interface ScenarioConfigProps {
  scenario: PolicyScenario;
  countryData: Record<string, CountryData>;
  onScenarioChange: (scenario: PolicyScenario) => void;
  onCountryChange: (countryCode: string) => void;
}

const ScenarioConfig = memo(({ 
  scenario, 
  countryData, 
  onScenarioChange, 
  onCountryChange 
}: ScenarioConfigProps) => {
  
  const handleCountryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onCountryChange(e.target.value);
  }, [onCountryChange]);

  const handlePolicyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onScenarioChange({ ...scenario, policyFocus: e.target.value });
  }, [scenario, onScenarioChange]);

  const handleSeverityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onScenarioChange({ ...scenario, unpaidHours: parseFloat(e.target.value) });
  }, [scenario, onScenarioChange]);

  return (
    <div className="bg-white rounded-xl shadow-xl border border-slate-200 mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 rounded-t-xl">
        <h2 className="text-xl font-semibold flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Crisis Intelligence Scenario
        </h2>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800 mb-2">Select Country</label>
          <select
            value={scenario.country}
            onChange={handleCountryChange}
            className="w-full p-3 text-sm rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
          >
            {Object.entries(countryData).map(([code, country]) => (
              <option key={code} value={code}>
                {country.name} - {country.context} economy | {country.unpaidHours}h/day, {country.femaleLabor}% female participation
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800 mb-2">Policy Intervention Target</label>
          <select
            value={scenario.policyFocus}
            onChange={handlePolicyChange}
            className="w-full p-3 text-sm rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="childcare">Universal Childcare Infrastructure</option>
            <option value="eldercare">National Elder Care System</option>
            <option value="cooking">Community Meal Services</option>
            <option value="cleaning">Professional Domestic Services</option>
            <option value="healthcare">Home Healthcare Services</option>
            <option value="education">Extended Education Programs</option>
            <option value="mental">Mental Health & Wellness Support</option>
            <option value="financial">Financial Planning Services</option>
            <option value="comprehensive">Multi-Sector Reform Package</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Crisis Severity: {scenario.unpaidHours.toFixed(1)} hrs/day
          </label>
          <input
            type="range"
            min="1"
            max="8"
            step="0.1"
            value={scenario.unpaidHours}
            onChange={handleSeverityChange}
            className="w-full h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>1hr (Low)</span>
            <span>4hrs (Moderate)</span>
            <span>8hrs (Extreme)</span>
          </div>
        </div>
      </div>
    </div>
  );
});

ScenarioConfig.displayName = 'ScenarioConfig';

export default ScenarioConfig;
