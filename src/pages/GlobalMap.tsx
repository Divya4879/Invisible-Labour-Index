import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, Users, Clock, DollarSign, Search } from 'lucide-react';
import { fetchCountryData } from '../services/dataService';
import { calculateCountryEconomics } from '../utils/calculations';
import { formatHours, formatCurrency, formatPercentage } from '../utils/calculations';
import { CountryData, CountryEconomicData } from '../types';

const GlobalMap: React.FC = () => {
  const [countries, setCountries] = useState<CountryEconomicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'hours' | 'gdp'>('hours');
  const [searchTerm, setSearchTerm] = useState('');

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

  const getIntensityClass = (value: number, metric: 'hours' | 'gdp'): string => {
    if (metric === 'hours') {
      if (value >= 5) return 'bg-neutral-900';
      if (value >= 4) return 'bg-neutral-800';
      if (value >= 3) return 'bg-neutral-700';
      if (value >= 2) return 'bg-neutral-600';
      return 'bg-neutral-500';
    } else {
      if (value >= 20) return 'bg-neutral-900';
      if (value >= 15) return 'bg-neutral-800';
      if (value >= 10) return 'bg-neutral-700';
      if (value >= 5) return 'bg-neutral-600';
      return 'bg-neutral-500';
    }
  };

  const filteredCountries = countries.filter(country =>
    country.country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-neutral-200 border-t-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Global Economic Intelligence Rankings
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Which nations are bleeding the most economic value? See where your country ranks in the world's 
            largest $12.6T economic blind spot across 20 major economies.
          </p>
        </div>

        {/* Controls */}
        <div className="glass-card p-6 mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200 transition-all duration-300 bg-white"
              />
            </div>

            {/* Metric Selector */}
            <div className="flex items-center space-x-2 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedMetric('hours')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedMetric === 'hours'
                    ? 'bg-neutral-900 text-white shadow-elegant'
                    : 'text-neutral-700 hover:bg-white hover:shadow-elegant'
                }`}
              >
                <Clock className="h-4 w-4 inline mr-2" />
                Unpaid Hours/Day
              </button>
              <button
                onClick={() => setSelectedMetric('gdp')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedMetric === 'gdp'
                    ? 'bg-neutral-900 text-white shadow-elegant'
                    : 'text-neutral-700 hover:bg-white hover:shadow-elegant'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-2" />
                % of GDP
              </button>
            </div>
          </div>
        </div>

        {/* Country Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCountries.map((countryData, index) => (
            <Link
              key={countryData.country.code}
              to={`/country/${countryData.country.code}`}
              className="country-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Country Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-neutral-200 transition-colors duration-300">
                    <MapPin className="h-6 w-6 text-neutral-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors duration-300">
                      {countryData.country.name}
                    </h3>
                    <p className="text-sm text-neutral-500">Data from {countryData.country.year}</p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full ${getIntensityClass(
                    selectedMetric === 'hours'
                      ? countryData.country.femaleUnpaidHours
                      : countryData.gdpPercentage,
                    selectedMetric
                  )} shadow-elegant`}
                />
              </div>

              {/* Key Metrics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-neutral-600" />
                    <span className="text-neutral-700 font-medium">Women's work</span>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {formatHours(countryData.country.femaleUnpaidHours)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-neutral-600" />
                    <span className="text-neutral-700 font-medium">Men's work</span>
                  </div>
                  <span className="font-bold text-neutral-700">
                    {formatHours(countryData.country.maleUnpaidHours)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-neutral-600" />
                    <span className="text-neutral-700 font-medium">Gender gap</span>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {countryData.genderGapRatio.toFixed(1)}× more
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-neutral-600" />
                    <span className="text-neutral-700 font-medium">Economic value</span>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {formatCurrency(countryData.economicValue)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-neutral-600" />
                    <span className="text-neutral-700 font-medium">% of GDP</span>
                  </div>
                  <span className="font-bold text-neutral-900">
                    {formatPercentage(countryData.gdpPercentage)}
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="mt-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-neutral-700 font-medium">Click for detailed analysis →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Legend */}
        <div className="card animate-slide-up">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">
            Intensity Scale: {selectedMetric === 'hours' ? 'Daily Unpaid Hours (Women)' : '% of GDP'}
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            {[
              { color: 'bg-neutral-500', label: selectedMetric === 'hours' ? '< 2 hrs' : '< 5%', desc: 'Lower inequality' },
              { color: 'bg-neutral-600', label: selectedMetric === 'hours' ? '2-3 hrs' : '5-10%', desc: 'Moderate' },
              { color: 'bg-neutral-700', label: selectedMetric === 'hours' ? '3-4 hrs' : '10-15%', desc: 'High' },
              { color: 'bg-neutral-800', label: selectedMetric === 'hours' ? '4-5 hrs' : '15-20%', desc: 'Very high' },
              { color: 'bg-neutral-900', label: selectedMetric === 'hours' ? '5+ hrs' : '20%+', desc: 'Extreme inequality' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full ${item.color} shadow-elegant`}></div>
                <div>
                  <span className="font-medium text-neutral-900">{item.label}</span>
                  <div className="text-sm text-neutral-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;
