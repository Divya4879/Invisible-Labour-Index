import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Users, Filter, ArrowUpDown } from 'lucide-react';
import { fetchCountryData } from '../services/dataService';
import { calculateCountryEconomics } from '../utils/calculations';
import { formatHours, formatPercentage } from '../utils/calculations';
import { CountryEconomicData } from '../types';

const Trends: React.FC = () => {
  const [countries, setCountries] = useState<CountryEconomicData[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['US', 'CN', 'DE', 'IN', 'JP']);
  const [sortBy, setSortBy] = useState<'gap' | 'gdp' | 'hours'>('gap');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const countryData = await fetchCountryData();
        const economicData = countryData.map(calculateCountryEconomics);
        setCountries(economicData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCountryToggle = (countryCode: string) => {
    setSelectedCountries(prev => 
      prev.includes(countryCode)
        ? prev.filter(c => c !== countryCode)
        : prev.length < 8 ? [...prev, countryCode] : prev
    );
  };

  const sortedCountries = [...countries].sort((a, b) => {
    switch (sortBy) {
      case 'gap':
        return b.genderGapRatio - a.genderGapRatio;
      case 'gdp':
        return b.gdpPercentage - a.gdpPercentage;
      case 'hours':
        return b.country.femaleUnpaidHours - a.country.femaleUnpaidHours;
      default:
        return 0;
    }
  });

  const selectedData = countries.filter(c => selectedCountries.includes(c.country.code));

  const comparisonData = selectedData.map(country => ({
    country: country.country.name.length > 10 ? country.country.name.substring(0, 10) + '...' : country.country.name,
    value: sortBy === 'gap' ? country.genderGapRatio : 
           sortBy === 'gdp' ? country.gdpPercentage : 
           country.country.femaleUnpaidHours,
    women: country.country.femaleUnpaidHours,
    men: country.country.maleUnpaidHours,
    gap: country.genderGapRatio,
    gdpPercent: country.gdpPercentage
  })).sort((a, b) => b.value - a.value);

  const scatterData = countries.map(country => ({
    x: country.country.gdp / country.country.population, // GDP per capita
    y: country.genderGapRatio,
    name: country.country.name,
    size: country.gdpPercentage * 10
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-neutral-200 border-t-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-4">
            Global Rankings
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 max-w-4xl mx-auto px-2">
            Where does your country stand? Compare unpaid work patterns across 20 major economies
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start justify-between">
            {/* Country Selection */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-neutral-900 mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Select Nations for Crisis Analysis (max 8)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                {countries.map(country => (
                  <label
                    key={country.country.code}
                    className={`flex items-center space-x-2 p-2 sm:p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                      selectedCountries.includes(country.country.code)
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country.country.code)}
                      onChange={() => handleCountryToggle(country.country.code)}
                      className="sr-only"
                    />
                    <span className="text-xs font-medium">{country.country.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="w-full lg:w-64 mt-4 lg:mt-0">
              <h3 className="text-base font-semibold text-neutral-900 mb-4 flex items-center">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Rank Nations By Crisis Level
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'gap' | 'gdp' | 'hours')}
                className="w-full p-3 text-sm rounded-lg border border-neutral-200 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-200"
              >
                <option value="gap">Economic Crisis Gap Ratio</option>
                <option value="gdp">GDP Impact Severity</option>
                <option value="hours">Daily Crisis Hours</option>
              </select>
              
              {/* Crisis Level Explanations */}
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="text-xs font-semibold text-blue-900 mb-2">Crisis Levels Explained:</h4>
                <div className="space-y-1 text-xs text-blue-800">
                  <div><strong>Gap Ratio:</strong> How many times more unpaid work one group does (higher = worse crisis)</div>
                  <div><strong>GDP Impact:</strong> % of national economy lost to invisible work (higher = bigger economic blind spot)</div>
                  <div><strong>Daily Hours:</strong> Total daily unpaid work burden (higher = more severe time poverty)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Chart */}
        {selectedData.length > 0 && (
          <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Crisis Intelligence: {sortBy === 'gap' ? 'Economic Crisis Gap Ratio' : sortBy === 'gdp' ? 'GDP Impact Severity' : 'Daily Crisis Hours'}
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={comparisonData} margin={{ bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis 
                  dataKey="country" 
                  tick={{ fontSize: 11, fill: '#404040' }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 11, fill: '#404040' }} />
                <Tooltip 
                  formatter={(value) => [
                    sortBy === 'gap' ? `${value.toFixed(1)}× crisis ratio` : 
                    sortBy === 'gdp' ? `${value.toFixed(1)}% GDP impact` : 
                    `${value.toFixed(1)} crisis hours/day`,
                    sortBy === 'gap' ? 'Economic Crisis Gap' : 
                    sortBy === 'gdp' ? 'GDP Impact Severity' : 
                    'Daily Crisis Hours'
                  ]}
                  contentStyle={{ 
                    backgroundColor: '#f8f9fa', 
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill={sortBy === 'gap' ? '#dc2626' : sortBy === 'gdp' ? '#2563eb' : '#7c3aed'} 
                  name="value" 
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-neutral-600 mt-4 text-center px-2">
              {sortBy === 'gap' ? 'Higher ratios reveal nations with the most severe economic inequality crisis. Red zones indicate critical intervention needed.' :
               sortBy === 'gdp' ? 'Higher percentages show nations bleeding the most economic value. These represent massive untapped productivity potential.' :
               'Higher hours reveal nations with the most severe time poverty crisis. Each hour represents lost economic opportunity.'}
            </p>
            
            {/* Dynamic Crisis Intelligence Explanation */}
            <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
              <h4 className="text-sm font-semibold text-red-900 mb-3">
                {sortBy === 'gap' ? 'Economic Crisis Gap Analysis' : 
                 sortBy === 'gdp' ? 'GDP Impact Severity Analysis' : 
                 'Daily Crisis Hours Analysis'}
              </h4>
              
              <div className="space-y-2 text-xs text-red-800">
                {sortBy === 'gap' && (
                  <>
                    <div><strong>What it measures:</strong> How many times more unpaid work one demographic performs vs another (e.g., 5.6× means extreme disparity)</div>
                    <div><strong>Why it matters:</strong> Higher ratios indicate massive economic inequality and social instability risks</div>
                    <div><strong>Economic impact:</strong> Nations with 4×+ ratios lose billions in productivity and face severe talent underutilization</div>
                  </>
                )}
                
                {sortBy === 'gdp' && (
                  <>
                    <div><strong>What it measures:</strong> Percentage of national economy represented by invisible unpaid work (e.g., 21% = $2.1T in a $10T economy)</div>
                    <div><strong>Why it matters:</strong> Shows the scale of economic blind spot - value completely missing from national accounting</div>
                    <div><strong>Economic impact:</strong> Nations with 15%+ ratios have massive untapped economic potential equivalent to major industries</div>
                  </>
                )}
                
                {sortBy === 'hours' && (
                  <>
                    <div><strong>What it measures:</strong> Daily unpaid work burden per person (e.g., 5.6 hrs/day = 40+ hours/week of invisible labor)</div>
                    <div><strong>Why it matters:</strong> Represents time poverty crisis limiting human capital development and economic participation</div>
                    <div><strong>Economic impact:</strong> Nations with 4+ daily hours lose massive productivity potential and face reduced workforce participation</div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Scatter Plot Analysis */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Economic Development vs Crisis Severity
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart data={scatterData} margin={{ bottom: 20, left: 20, right: 20, top: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis 
                dataKey="x" 
                name="GDP per capita"
                tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                type="number"
                domain={['dataMin', 'dataMax']}
                tick={{ fontSize: 11, fill: '#404040' }}
              />
              <YAxis 
                dataKey="y" 
                name="Crisis gap ratio"
                tickFormatter={(value) => `${value.toFixed(1)}×`}
                type="number"
                domain={['dataMin', 'dataMax']}
                tick={{ fontSize: 11, fill: '#404040' }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-neutral-200 p-3 rounded shadow">
                        <p className="font-medium text-neutral-900">{data.name}</p>
                        <p className="text-sm text-neutral-600">GDP per capita: ${(data.x/1000).toFixed(0)}k</p>
                        <p className="text-sm text-neutral-600">Gender gap: {data.y.toFixed(1)}×</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter dataKey="y" fill="#404040" />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="text-xs text-neutral-600 mt-4 text-center px-2">
            Each dot represents a nation's crisis profile. X-axis shows economic development level, Y-axis shows economic inequality severity. 
            Upper-right quadrant reveals the most critical intervention targets.
          </p>
          
          {/* Crisis Pattern Analysis */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="text-xs font-semibold text-amber-900 mb-2">Crisis Pattern Intelligence:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-800">
              <div><strong>High GDP + High Crisis:</strong> Wealthy nations with massive blind spots</div>
              <div><strong>Low GDP + High Crisis:</strong> Developing nations with severe inequality</div>
              <div><strong>High GDP + Low Crisis:</strong> Advanced economies with better balance</div>
              <div><strong>Low GDP + Low Crisis:</strong> Developing nations with natural equality</div>
            </div>
          </div>
        </div>

        {/* Rankings Table */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Crisis Intelligence Rankings - {sortBy === 'gap' ? 'Economic Crisis Gap Ratio' : sortBy === 'gdp' ? 'GDP Impact Severity' : 'Daily Crisis Hours'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-neutral-200 bg-neutral-50">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-neutral-900">Rank</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-neutral-900">Nation</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-neutral-900">Daily Hours (Group A)</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-neutral-900">Daily Hours (Group B)</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-neutral-900">Crisis Ratio</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-neutral-900">GDP Impact</th>
                  <th className="text-center py-2 px-3 text-xs font-semibold text-neutral-900">Crisis Level</th>
                </tr>
              </thead>
              <tbody>
                {sortedCountries.map((country, index) => {
                  const inequalityLevel = (country.country.femaleUnpaidHours / country.country.maleUnpaidHours) >= 4 ? 'EXTREME' : 
                                        (country.country.femaleUnpaidHours / country.country.maleUnpaidHours) >= 3 ? 'HIGH' : 
                                        (country.country.femaleUnpaidHours / country.country.maleUnpaidHours) >= 2 ? 'MODERATE' : 'LOW';
                  const levelColor = inequalityLevel === 'EXTREME' ? 'text-red-600 bg-red-50' :
                                   inequalityLevel === 'HIGH' ? 'text-orange-600 bg-orange-50' :
                                   inequalityLevel === 'MODERATE' ? 'text-yellow-600 bg-yellow-50' :
                                   'text-green-600 bg-green-50';
                  
                  return (
                    <tr key={country.country.code} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-2 px-3 text-xs text-neutral-900">#{index + 1}</td>
                      <td className="py-2 px-3 text-xs text-neutral-900">{country.country.name}</td>
                      <td className="py-2 px-3 text-right text-xs text-red-600">
                        {formatHours(country.country.femaleUnpaidHours)}
                      </td>
                      <td className="py-2 px-3 text-right text-xs text-blue-600">
                        {formatHours(country.country.maleUnpaidHours)}
                      </td>
                      <td className="py-2 px-3 text-right text-xs font-medium text-neutral-900">
                        {(country.country.femaleUnpaidHours / country.country.maleUnpaidHours).toFixed(1)}×
                      </td>
                      <td className="py-2 px-3 text-right text-xs font-medium text-neutral-900">
                        {formatPercentage(country.gdpPercentage)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${levelColor}`}>
                          {inequalityLevel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insights */}
        </div>
      
      {/* Key Global Crisis Intelligence - Full Width */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-r from-neutral-900 to-neutral-800 text-white py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
            Global Crisis Intelligence Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-red-600/20 backdrop-blur-sm rounded-lg border border-red-500/30">
              <h4 className="font-bold text-red-300 mb-2 sm:mb-3 text-base sm:text-lg">🚨 Critical Crisis Zone</h4>
              <p className="text-red-100 text-xs sm:text-sm leading-relaxed">
                <strong>{sortedCountries[0]?.country.name}</strong> bleeds the most economic value with <strong>{sortedCountries[0]?.genderGapRatio.toFixed(1)}× crisis ratio</strong> - 
                representing billions in lost productivity and severe economic inequality requiring immediate intervention
              </p>
            </div>
            <div className="text-center p-6 bg-blue-600/20 backdrop-blur-sm rounded-lg border border-blue-500/30">
              <h4 className="font-bold text-blue-300 mb-3 text-lg">💰 Massive Economic Blind Spot</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                <strong>{(countries.reduce((sum, c) => sum + c.gdpPercentage, 0) / countries.length).toFixed(1)}% average GDP impact</strong> across all nations - 
                equivalent to <strong>$12.6T globally</strong> in invisible economic value completely missing from national accounting systems
              </p>
            </div>
            <div className="text-center p-6 bg-green-600/20 backdrop-blur-sm rounded-lg border border-green-500/30">
              <h4 className="font-bold text-green-300 mb-3 text-lg">✅ Intelligence Success Model</h4>
              <p className="text-green-100 text-sm leading-relaxed">
                <strong>{[...countries].sort((a, b) => a.genderGapRatio - b.genderGapRatio)[0]?.country.name}</strong> demonstrates optimal economic balance with <strong>near-equal distribution</strong> - 
                proving that advanced policy frameworks can eliminate this crisis and unlock massive productivity gains
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;
