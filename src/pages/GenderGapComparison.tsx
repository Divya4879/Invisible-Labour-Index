import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchCountryData } from '../services/dataService';
import { calculateCountryEconomics } from '../utils/calculations';
import { formatHours, formatPercentage } from '../utils/calculations';
import { CountryEconomicData } from '../types';

const GenderGapComparison: React.FC = () => {
  const [countries, setCountries] = useState<CountryEconomicData[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['IN', 'US']);
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
        : [...prev, countryCode]
    );
  };

  const selectedData = countries.filter(c => selectedCountries.includes(c.country.code));

  const chartData = selectedData.map(country => ({
    country: country.country.name,
    women: country.country.femaleUnpaidHours,
    men: country.country.maleUnpaidHours,
    gap: country.genderGapHours
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Gender Gap Comparison
          </h1>
          <p className="text-lg text-neutral-600">
            Compare unpaid work inequality across countries. Select countries to analyze side-by-side.
          </p>
        </div>

        {/* Country Selector */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Select Countries to Compare
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {countries.map(country => (
              <label
                key={country.country.code}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(country.country.code)}
                  onChange={() => handleCountryToggle(country.country.code)}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-neutral-700">{country.country.name}</span>
              </label>
            ))}
          </div>
        </div>

        {selectedData.length > 0 && (
          <>
            {/* Comparison Chart */}
            <div className="card mb-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                Daily Unpaid Work Hours by Gender
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value} hours/day`, 
                      name === 'women' ? 'Women' : name === 'men' ? 'Men' : 'Gap'
                    ]}
                  />
                  <Bar dataKey="women" fill="#dc2626" name="women" />
                  <Bar dataKey="men" fill="#2563eb" name="men" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Comparison Table */}
            <div className="card mb-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                Detailed Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900">Country</th>
                      <th className="text-right py-3 px-4 font-semibold text-neutral-900">Women (hrs/day)</th>
                      <th className="text-right py-3 px-4 font-semibold text-neutral-900">Men (hrs/day)</th>
                      <th className="text-right py-3 px-4 font-semibold text-neutral-900">Gap (hrs)</th>
                      <th className="text-right py-3 px-4 font-semibold text-neutral-900">Ratio</th>
                      <th className="text-right py-3 px-4 font-semibold text-neutral-900">% of GDP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedData.map(country => (
                      <tr key={country.country.code} className="border-b border-neutral-100">
                        <td className="py-3 px-4 font-medium text-neutral-900">
                          {country.country.name}
                        </td>
                        <td className="py-3 px-4 text-right text-red-600 font-medium">
                          {formatHours(country.country.femaleUnpaidHours)}
                        </td>
                        <td className="py-3 px-4 text-right text-blue-600 font-medium">
                          {formatHours(country.country.maleUnpaidHours)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          {formatHours(country.genderGapHours)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          {country.genderGapRatio.toFixed(1)}×
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          {formatPercentage(country.gdpPercentage)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insight Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedData.map(country => (
                <div key={country.country.code} className="card">
                  <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                    {country.country.name}
                  </h4>
                  <div className="space-y-2">
                    <p className="text-neutral-700">
                      <strong>Gender Gap:</strong> Women do{' '}
                      <span className="text-red-600 font-semibold">
                        {country.genderGapRatio.toFixed(1)}× more
                      </span>{' '}
                      unpaid work than men
                    </p>
                    <p className="text-neutral-700">
                      <strong>Daily Difference:</strong>{' '}
                      <span className="font-semibold">
                        {formatHours(country.genderGapHours)}
                      </span>{' '}
                      more per day
                    </p>
                    <p className="text-neutral-700">
                      <strong>Economic Impact:</strong> Equivalent to{' '}
                      <span className="text-primary-600 font-semibold">
                        {formatPercentage(country.gdpPercentage)}
                      </span>{' '}
                      of GDP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedData.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-neutral-600 text-lg">
              Select countries above to view comparison data
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenderGapComparison;
