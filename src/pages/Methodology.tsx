import React from 'react';
import { ExternalLink, Database, Calculator, AlertTriangle } from 'lucide-react';

const Methodology: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Methodology & Transparency
          </h1>
          <p className="text-lg text-neutral-600">
            Complete documentation of data sources, calculations, and limitations for academic and policy use.
          </p>
        </div>

        {/* Data Sources */}
        <div className="card mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Database className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-semibold text-neutral-900">Data Sources</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Time Use Data
              </h3>
              <ul className="space-y-2 text-neutral-700">
                <li>
                  <strong>India:</strong> National Time Use Survey (TUS) 2019, Ministry of Statistics and Programme Implementation
                </li>
                <li>
                  <strong>United States:</strong> American Time Use Survey (ATUS), Bureau of Labor Statistics
                </li>
                <li>
                  <strong>United Kingdom:</strong> Time Use Survey, Office for National Statistics (ONS)
                </li>
                <li>
                  <strong>Canada:</strong> General Social Survey on Time Use, Statistics Canada
                </li>
                <li>
                  <strong>Australia:</strong> Time Use Survey, Australian Bureau of Statistics (ABS)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Economic Data
              </h3>
              <ul className="space-y-2 text-neutral-700">
                <li>
                  <strong>GDP Data:</strong> World Bank Open Data API
                  <a href="https://data.worldbank.org" className="ml-2 text-primary-600 hover:text-primary-700">
                    <ExternalLink className="h-4 w-4 inline" />
                  </a>
                </li>
                <li>
                  <strong>Population Data:</strong> World Bank Population Statistics
                </li>
                <li>
                  <strong>Wage Data:</strong> International Labour Organization (ILO) Statistics
                  <a href="https://ilostat.ilo.org" className="ml-2 text-primary-600 hover:text-primary-700">
                    <ExternalLink className="h-4 w-4 inline" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Calculation Formula */}
        <div className="card mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Calculator className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-semibold text-neutral-900">Calculation Formula</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-neutral-100 p-4 rounded-lg">
              <h3 className="font-semibold text-neutral-900 mb-2">Step 1: Annual Hours</h3>
              <code className="text-sm text-neutral-700">
                Annual Hours = Average unpaid hours/day × 365 × Female population
              </code>
            </div>

            <div className="bg-neutral-100 p-4 rounded-lg">
              <h3 className="font-semibold text-neutral-900 mb-2">Step 2: Economic Value</h3>
              <code className="text-sm text-neutral-700">
                Economic Value = Annual hours × Hourly wage proxy
              </code>
            </div>

            <div className="bg-neutral-100 p-4 rounded-lg">
              <h3 className="font-semibold text-neutral-900 mb-2">Step 3: GDP Share</h3>
              <code className="text-sm text-neutral-700">
                GDP Share = (Unpaid work value / National GDP) × 100
              </code>
            </div>

            <div className="bg-neutral-100 p-4 rounded-lg">
              <h3 className="font-semibold text-neutral-900 mb-2">Step 4: Gender Gap</h3>
              <code className="text-sm text-neutral-700">
                Gender Gap Ratio = Female unpaid hours / Male unpaid hours
              </code>
            </div>
          </div>
        </div>

        {/* Assumptions */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Key Assumptions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Wage Proxy</h3>
              <p className="text-neutral-700">
                Market wages are used as a proxy for the economic value of unpaid work. This represents 
                the replacement cost if unpaid work were to be performed by paid workers in the formal economy.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Age Group</h3>
              <p className="text-neutral-700">
                Calculations focus on working-age population (15-64 years) where time use data is most comprehensive.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Constant Daily Hours</h3>
              <p className="text-neutral-700">
                Daily averages are multiplied by 365 days, assuming consistent patterns throughout the year.
                Seasonal variations are not accounted for in this model.
              </p>
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="card mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
            <h2 className="text-2xl font-semibold text-neutral-900">Limitations</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Data Availability</h3>
              <p className="text-neutral-700">
                Time use surveys are not conducted annually in all countries. Data years vary from 2019-2021 
                depending on the most recent available survey.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Cultural Reporting Bias</h3>
              <p className="text-neutral-700">
                Self-reported time use may vary across cultures in terms of what activities are considered 
                "work" and how accurately time is estimated.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Wage Approximation</h3>
              <p className="text-neutral-700">
                Using average wages as a proxy does not account for the specialized skills involved in 
                different types of unpaid work (childcare, eldercare, household management).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Individual Variation</h3>
              <p className="text-neutral-700">
                This tool provides country-level averages and does not assign individual economic values 
                or account for personal circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* Citation */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">How to Cite</h2>
          <div className="bg-neutral-100 p-4 rounded-lg">
            <p className="text-sm text-neutral-700 font-mono">
              Invisible Labor Index. (2024). Making unpaid work visible — in real economic terms. 
              Retrieved from [URL]. Data sources: National Time Use Surveys, World Bank, ILO.
            </p>
          </div>
          <p className="text-sm text-neutral-600 mt-4">
            This tool is designed for academic research, policy analysis, and advocacy. 
            All calculations are reproducible and data sources are publicly available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
