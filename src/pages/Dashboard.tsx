import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Clock, AlertTriangle, Globe, ArrowRight, Brain, BarChart3 } from 'lucide-react';
import { fetchCountryData } from '../services/dataService';
import { calculateGlobalStats, calculateCountryEconomics } from '../utils/calculations';
import { formatCurrency, formatHours } from '../utils/calculations';
import { CountryData, GlobalStats } from '../types';

const Dashboard: React.FC = () => {
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [topCountries, setTopCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const countries = await fetchCountryData();
        const stats = calculateGlobalStats(countries);
        
        // Get top 10 countries by economic impact
        const economicData = countries.map(calculateCountryEconomics)
          .sort((a, b) => b.economicValue - a.economicValue)
          .slice(0, 10);
        
        setGlobalStats(stats);
        setTopCountries(economicData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-neutral-300 border-t-neutral-900"></div>
      </div>
    );
  }

  const genderGapData = topCountries.map(country => ({
    country: country.country.name, // Use full country name
    women: country.country.femaleUnpaidHours,
    men: country.country.maleUnpaidHours,
    gap: country.genderGapHours
  }));

  const economicImpactData = topCountries.slice(0, 5).map(country => ({
    name: country.country.name,
    value: country.economicValue / 1000000000000, // Convert to trillions
    gdpPercent: country.gdpPercentage
  }));

  const COLORS = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d']; // Crisis red to warning green

  return (
    <div className="min-h-screen bg-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-4">
            Crisis Monitor
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 max-w-4xl mx-auto px-2">
            Real-time invisible economy tracking across global markets
          </p>
          <div className="mt-3 text-xs sm:text-sm text-neutral-600">
            Data updated: December 16, 2025 • World Bank API • 20 Countries
          </div>
        </div>

        {/* Crisis Alert */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 sm:p-8 rounded-xl mb-12 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
            <div className="bg-white/20 rounded-full p-3 mb-2 sm:mb-0 sm:mr-4">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold">Economic Emergency</h2>
          </div>
          <p className="text-base sm:text-lg text-red-100 max-w-4xl mx-auto px-4">
            Women perform 2.2× more unpaid work than men globally. This represents $12.6T in unrecognized economic value — 
            <strong className="text-white"> larger than the entire US economy.</strong>
          </p>
        </div>

        {/* Crisis Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-red-900 uppercase tracking-wide">CRISIS</h3>
              <Clock className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-2xl font-semibold text-red-600 mb-1">4.2 hrs/day</div>
            <div className="text-sm text-red-700">Women's daily unpaid work</div>
            <div className="text-xs text-red-600 font-medium mt-1">118% more than men</div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-orange-900 uppercase tracking-wide">HIDDEN VALUE</h3>
              <DollarSign className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-2xl font-semibold text-orange-600 mb-1">$12.6T</div>
            <div className="text-sm text-orange-700">Total invisible economy</div>
            <div className="text-xs text-orange-600 font-medium mt-1">Larger than US GDP</div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-purple-900 uppercase tracking-wide">INEQUALITY</h3>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-semibold text-purple-600 mb-1">2.2×</div>
            <div className="text-sm text-purple-700">Gender inequality ratio</div>
            <div className="text-xs text-purple-600 font-medium mt-1">Extreme disparity</div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-blue-900 uppercase tracking-wide">GDP IMPACT</h3>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-semibold text-blue-600 mb-1">15.4%</div>
            <div className="text-sm text-blue-700">Average of national GDP</div>
            <div className="text-xs text-blue-600 font-medium mt-1">Across 20 countries</div>
          </div>
        </div>

        

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Gender Gap Chart */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-medium text-neutral-900 mb-4 sm:mb-6 flex items-center">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Daily Hours: The Inequality Crisis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genderGapData} margin={{ bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis 
                  dataKey="country" 
                  tick={{ fill: '#404040', fontSize: 11, textAnchor: 'middle' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis tick={{ fill: '#404040', fontSize: 12 }} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} hours/day`, 
                    name === 'women' ? 'Women' : 'Men'
                  ]}
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', color: '#404040' }}
                />
                <Bar dataKey="women" fill="#dc2626" name="women" />
                <Bar dataKey="men" fill="#2563eb" name="men" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs sm:text-sm text-neutral-600 mt-4 text-center px-2">
              Daily unpaid work hours by country. Red bars represent one demographic, blue bars another. 
              The larger the gap, the greater the economic imbalance and untapped productivity potential.
            </p>
          </div>

          {/* Economic Impact Pie Chart */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-medium text-neutral-900 mb-4 sm:mb-6 flex items-center">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Invisible Economy by Nation
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={economicImpactData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toFixed(1)}T`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {economicImpactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value.toFixed(1)} trillion`, 'Economic Value']}
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', color: '#404040' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-sm text-neutral-600 mt-4 text-center">
              Top 5 economies by invisible economic value. Combined total: $9.3T - equivalent to China's entire GDP. 
              This represents massive untapped economic potential in each nation.
            </p>
          </div>
        </div>

        {/* Top Countries Table */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-medium text-neutral-900 mb-4 sm:mb-6">
            Global Rankings: Unpaid Work Economic Impact
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-3 px-4 font-medium text-neutral-900">Rank</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-900">Country</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-900">Women (hrs/day)</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-900">Men (hrs/day)</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-900">Gap Ratio</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-900">Economic Value</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-900">% of GDP</th>
                </tr>
              </thead>
              <tbody>
                {topCountries.map((country, index) => (
                  <tr key={country.country.code} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4 text-sm text-neutral-900">#{index + 1}</td>
                    <td className="py-3 px-4 text-sm text-neutral-900">{country.country.name}</td>
                    <td className="py-3 px-4 text-right text-sm text-red-600">
                      {formatHours(country.country.femaleUnpaidHours)}
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-blue-600">
                      {formatHours(country.country.maleUnpaidHours)}
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-neutral-900">
                      {country.genderGapRatio.toFixed(1)}×
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-neutral-900">
                      {formatCurrency(country.economicValue)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-neutral-900">
                      {country.gdpPercentage.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Data Sources & Methodology</h4>
              <div className="text-xs text-blue-800 leading-relaxed space-y-1">
                <div><strong>Time Use Data:</strong> OECD Time Use Database, US ATUS, India TUS 2019</div>
                <div><strong>Economic Data:</strong> World Bank API (GDP, Population)</div>
                <div><strong>Calculations:</strong> Economic value estimated using replacement cost method with national wage rates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action - Full Width */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] hero-gradient text-white p-6 sm:p-8 lg:p-12">
        <div className="text-center max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            The $12.6T Crisis Demands Action
          </h3>
          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            The data reveals a massive economic blind spot. The impact is undeniable. 
            Now it's time for intelligence-driven policy solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/global-rankings"
              className="bg-white text-neutral-900 px-8 py-4 rounded-lg font-medium text-base transition-all duration-300 hover:bg-neutral-100 flex items-center justify-center space-x-3"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Analyze Global Rankings</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/policy-impact-engine"
              className="bg-transparent text-white border border-white px-8 py-4 rounded-lg font-medium text-base transition-all duration-300 hover:bg-white hover:text-neutral-900 flex items-center justify-center space-x-3"
            >
              <Brain className="h-5 w-5" />
              <span>Launch AI Policy Engine</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
