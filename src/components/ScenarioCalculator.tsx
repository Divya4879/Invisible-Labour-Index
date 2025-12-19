import React, { useState, useEffect } from 'react';
import { Calculator, Sliders, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency, formatHours, formatPercentage } from '../utils/calculations';

interface ScenarioInputs {
  dailyHours: number;
  hourlyWage: number;
  population: number;
  femalePopulationPercent: number;
  gdp: number;
}

interface ScenarioResults {
  annualHours: number;
  economicValue: number;
  gdpPercentage: number;
}

const ScenarioCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ScenarioInputs>({
    dailyHours: 4.0,
    hourlyWage: 15.0,
    population: 50000000,
    femalePopulationPercent: 50.0,
    gdp: 1000000000000
  });

  const [results, setResults] = useState<ScenarioResults>({
    annualHours: 0,
    economicValue: 0,
    gdpPercentage: 0
  });

  useEffect(() => {
    const femalePopulation = (inputs.population * inputs.femalePopulationPercent) / 100;
    const annualHours = inputs.dailyHours * 365 * femalePopulation;
    const economicValue = annualHours * inputs.hourlyWage;
    const gdpPercentage = (economicValue / inputs.gdp) * 100;

    setResults({
      annualHours,
      economicValue,
      gdpPercentage
    });
  }, [inputs]);

  const handleInputChange = (field: keyof ScenarioInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-8">
        <Calculator className="h-8 w-8 text-neutral-700" />
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Interactive Scenario Calculator</h2>
          <p className="text-neutral-600">Adjust parameters to model different economic scenarios</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-neutral-900 flex items-center space-x-2">
            <Sliders className="h-5 w-5" />
            <span>Scenario Parameters</span>
          </h3>

          {/* Daily Hours Slider */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Daily Unpaid Work Hours: {formatHours(inputs.dailyHours)}
            </label>
            <input
              type="range"
              min="0"
              max="12"
              step="0.1"
              value={inputs.dailyHours}
              onChange={(e) => handleInputChange('dailyHours', parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>0 hrs</span>
              <span>12 hrs</span>
            </div>
          </div>

          {/* Hourly Wage Slider */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Hourly Wage Proxy: ${inputs.hourlyWage.toFixed(2)}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="0.5"
              value={inputs.hourlyWage}
              onChange={(e) => handleInputChange('hourlyWage', parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>$1</span>
              <span>$50</span>
            </div>
          </div>

          {/* Population Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Total Population: {(inputs.population / 1000000).toFixed(1)}M
            </label>
            <input
              type="range"
              min="1000000"
              max="1500000000"
              step="1000000"
              value={inputs.population}
              onChange={(e) => handleInputChange('population', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>1M</span>
              <span>1.5B</span>
            </div>
          </div>

          {/* Female Population Percentage */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Female Population: {inputs.femalePopulationPercent.toFixed(1)}%
            </label>
            <input
              type="range"
              min="45"
              max="55"
              step="0.1"
              value={inputs.femalePopulationPercent}
              onChange={(e) => handleInputChange('femalePopulationPercent', parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>45%</span>
              <span>55%</span>
            </div>
          </div>

          {/* GDP Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              National GDP: {formatCurrency(inputs.gdp)}
            </label>
            <input
              type="range"
              min="10000000000"
              max="25000000000000"
              step="10000000000"
              value={inputs.gdp}
              onChange={(e) => handleInputChange('gdp', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>$10B</span>
              <span>$25T</span>
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-neutral-900 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Economic Impact Results</span>
          </h3>

          <div className="space-y-4">
            <div className="stat-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-neutral-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    {(results.annualHours / 1000000000).toFixed(1)}B
                  </div>
                  <div className="text-neutral-600">Annual unpaid hours</div>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-neutral-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    {formatCurrency(results.economicValue)}
                  </div>
                  <div className="text-neutral-600">Total economic value</div>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-neutral-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    {formatPercentage(results.gdpPercentage)}
                  </div>
                  <div className="text-neutral-600">Percentage of GDP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <h4 className="font-semibold text-neutral-900 mb-2">Key Insights</h4>
            <ul className="text-sm text-neutral-700 space-y-1">
              <li>• {((inputs.population * inputs.femalePopulationPercent) / 100 / 1000000).toFixed(1)}M women performing unpaid work</li>
              <li>• Equivalent to {(results.economicValue / inputs.hourlyWage / 2000 / 1000000).toFixed(1)}M full-time jobs</li>
              <li>• {results.gdpPercentage > 10 ? 'Significant' : results.gdpPercentage > 5 ? 'Moderate' : 'Small'} economic impact relative to GDP</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCalculator;
