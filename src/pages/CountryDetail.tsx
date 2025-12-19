import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchSingleCountryData } from '../services/dataService';
import { calculateCountryEconomics } from '../utils/calculations';
import { formatHours, formatCurrency, formatPercentage } from '../utils/calculations';
import { CountryEconomicData } from '../types';

const CountryDetail: React.FC = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [countryData, setCountryData] = useState<CountryEconomicData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!countryCode) return;
      
      try {
        const country = await fetchSingleCountryData(countryCode);
        if (country) {
          const economicData = calculateCountryEconomics(country);
          setCountryData(economicData);
        }
      } catch (error) {
        console.error('Error loading country data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [countryCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-neutral-200 border-t-neutral-900"></div>
      </div>
    );
  }

  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Country Not Found</h2>
          <p className="text-neutral-600 mb-6">Unable to load real-time data for this country.</p>
          <Link to="/map" className="btn-primary">
            Back to Map
          </Link>
        </div>
      </div>
    );
  }

  const chartData = [
    {
      category: 'Women',
      hours: countryData.country.femaleUnpaidHours,
      fill: '#404040'
    },
    {
      category: 'Men',
      hours: countryData.country.maleUnpaidHours,
      fill: '#737373'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/map"
            className="inline-flex items-center space-x-2 text-neutral-700 hover:text-neutral-900 mb-4 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Global Map</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {countryData.country.name}
          </h1>
          <p className="text-lg text-neutral-600">
            Real-time economic analysis of unpaid work (Data: {countryData.country.year})
          </p>
        </div>

        {/* Country Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <Clock className="h-8 w-8 text-neutral-700 mb-3" />
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {formatHours(countryData.country.femaleUnpaidHours)}
            </div>
            <div className="text-neutral-600">Women's daily unpaid work</div>
          </div>

          <div className="stat-card">
            <Users className="h-8 w-8 text-neutral-700 mb-3" />
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {countryData.genderGapRatio.toFixed(1)}×
            </div>
            <div className="text-neutral-600">Gender gap ratio</div>
          </div>

          <div className="stat-card">
            <DollarSign className="h-8 w-8 text-neutral-700 mb-3" />
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {formatCurrency(countryData.economicValue)}
            </div>
            <div className="text-neutral-600">Annual economic value</div>
          </div>

          <div className="stat-card">
            <TrendingUp className="h-8 w-8 text-neutral-700 mb-3" />
            <div className="text-2xl font-bold text-neutral-900 mb-1">
              {formatPercentage(countryData.gdpPercentage)}
            </div>
            <div className="text-neutral-600">Of national GDP</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gender Gap Visualization */}
          <div className="card">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              Daily Unpaid Work Hours by Gender
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} hours/day`, 'Hours']}
                />
                <Bar dataKey="hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Economic Breakdown */}
          <div className="card">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              Real-Time Economic Valuation
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-neutral-200">
                <span className="text-neutral-600">Female population:</span>
                <span className="font-medium">
                  {(countryData.country.femalePopulation / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-neutral-200">
                <span className="text-neutral-600">Daily unpaid hours (women):</span>
                <span className="font-medium">
                  {formatHours(countryData.country.femaleUnpaidHours)}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-neutral-200">
                <span className="text-neutral-600">Annual unpaid hours:</span>
                <span className="font-medium">
                  {(countryData.annualUnpaidHours / 1000000000).toFixed(1)}B hours
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-neutral-200">
                <span className="text-neutral-600">GDP-based wage proxy:</span>
                <span className="font-medium">
                  ${countryData.country.averageWage.toFixed(2)}/hour
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-neutral-200">
                <span className="text-neutral-600">Current GDP:</span>
                <span className="font-medium">
                  {formatCurrency(countryData.country.gdp)}
                </span>
              </div>
              <div className="flex justify-between py-3 font-semibold text-lg">
                <span>Total economic value:</span>
                <span className="text-neutral-900">
                  {formatCurrency(countryData.economicValue)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Context Panel */}
        <div className="card mt-8">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">
            Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-neutral-900 mb-2">Gender Inequality</h4>
              <p className="text-neutral-600">
                Women in {countryData.country.name} perform{' '}
                <strong>{countryData.genderGapRatio.toFixed(1)} times more</strong> unpaid work than men,
                spending an additional <strong>{formatHours(countryData.genderGapHours)}</strong> daily
                on unpaid care and domestic work.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-neutral-900 mb-2">Economic Impact</h4>
              <p className="text-neutral-600">
                Using real-time GDP data and population statistics, women's unpaid work contributes{' '}
                <strong>{formatPercentage(countryData.gdpPercentage)}</strong> to the national GDP,
                equivalent to <strong>{formatCurrency(countryData.economicValue)}</strong> annually.
              </p>
            </div>
          </div>
        </div>

        {/* Data Source */}
        <div className="mt-8 p-4 bg-neutral-100 rounded-lg">
          <p className="text-sm text-neutral-600">
            <strong>Time Use Data:</strong> {countryData.country.year} |{' '}
            <strong>Economic Data:</strong> World Bank API (Real-time) |{' '}
            <Link to="/methodology" className="text-neutral-900 hover:text-neutral-700 font-medium">
              View Methodology
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
